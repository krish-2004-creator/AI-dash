
import { NextRequest, NextResponse } from "next/server";
import { hf } from "@/lib/huggingface";
import { db } from "@/lib/db";
import { documents } from "@/db/schema";
import { eq } from "drizzle-orm";

// Polyfill for DOMMatrix (needed by pdf-parse in Node environments)
if (!global.DOMMatrix) {
    // @ts-ignore
    global.DOMMatrix = class DOMMatrix {
        constructor() {
            (this as any).a = 1; (this as any).b = 0; (this as any).c = 0; (this as any).d = 1; (this as any).e = 0; (this as any).f = 0;
        }
        setMatrixValue(str: string) { }
        toString() { return "matrix(1, 0, 0, 1, 0, 0)"; }
        multiply() { return this; }
        translate() { return this; }
        scale() { return this; }
        rotate() { return this; }
    };
}

// Polyfill for Promise.withResolvers (needed by newer pdf.js)
if (typeof Promise.withResolvers === 'undefined') {
    // @ts-ignore
    Promise.withResolvers = function () {
        let resolve, reject;
        const promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return { promise, resolve, reject };
    };
}

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        // Check for API Key
        if (!process.env.HUGGINGFACE_API_KEY) {
            console.error("Missing HUGGINGFACE_API_KEY");
            return NextResponse.json({ error: "Server configuration error: Missing API Key" }, { status: 500 });
        }

        let question = "";
        let contextText = "";

        const contentType = req.headers.get("content-type") || "";

        if (contentType.includes("multipart/form-data")) {
            // Handle File Upload path (from Documents Page)
            const formData = await req.formData();
            const file = formData.get("file") as File | null;
            question = formData.get("question") as string || "";

            if (!file) {
                return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
            }

            try {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                // Dynamic import to prevent module-level crash (known pdf-parse issue)
                const pdfParse = (await import("pdf-parse")).default;
                const data = await pdfParse(buffer);
                contextText = data.text.slice(0, 10000); // Limit context from PDF
            } catch (err) {
                console.error("Error parsing PDF:", err);
                return NextResponse.json({ error: "Failed to parse PDF file" }, { status: 500 });
            }

        } else {
            // Handle JSON path (Workspace Chat)
            const body = await req.json();
            const { workspaceId } = body;
            question = body.question;

            if (!workspaceId || !question) {
                return NextResponse.json({ error: "Workspace ID and question are required" }, { status: 400 });
            }

            // 1. Fetch all documents for this workspace
            const docs = await db.select({
                name: documents.name,
                content: documents.content
            }).from(documents).where(eq(documents.workspaceId, workspaceId));

            if (docs.length === 0) {
                // Fallback or early return logic could be here, but let's check DeepSearch first
            }

            // 2. Construct Prompt with Context Stuffing from DB
            const MAX_CONTEXT_CHARS = 12000; // ~3-4k tokens
            let totalChars = 0;

            // --- Deep Search (Firecrawl) Integration ---
            const { useDeepSearch } = body;
            if (useDeepSearch) {
                console.log("Deep Search enabled. Searching Firecrawl...");
                try {
                    // Dynamic import to avoid errors if lib not set up fully
                    const { firecrawl } = await import("@/lib/firecrawl");
                    // Search for the question
                    const searchResults = await firecrawl.search(question, {
                        pageOptions: {
                            onlyMainContent: true,
                            fetchPageContent: true
                        },
                        searchOptions: {
                            limit: 3
                        }
                    } as any);

                    const results = searchResults as any;
                    if (results && results.data && results.data.length > 0) {
                        console.log(`Firecrawl found ${results.data.length} results.`);
                        for (const result of results.data) {
                            const content = result.markdown || result.content || "";
                            const truncated = content.slice(0, 2000); // Limit each web result

                            if (totalChars + truncated.length > MAX_CONTEXT_CHARS) break;

                            contextText += `\n--- Web Source: ${result.title} (${result.url}) ---\n${truncated}\n`;
                            totalChars += truncated.length;
                        }
                    } else {
                        console.log("Firecrawl returned no results.");
                    }
                } catch (fcError) {
                    console.error("Firecrawl Deep Search Error:", fcError);
                    contextText += `\n[System Note: Deep Search failed to retrieve results. Answer based on documents only.]\n`;
                }
            }
            // -------------------------------------------

            for (const doc of docs) {
                const content = doc.content || "";
                // Truncate individual doc if huge to forbid one doc hogging all
                const truncatedContent = content.slice(0, 5000);

                if (totalChars + truncatedContent.length > MAX_CONTEXT_CHARS) {
                    break; // Stop taking more context
                }

                contextText += `\n--- Document: ${doc.name} ---\n${truncatedContent}\n`;
                totalChars += truncatedContent.length;
            }
        }

        if (!question) {
            return NextResponse.json({ error: "Question is required" }, { status: 400 });
        }

        const systemPrompt = `You are a helpful AI assistant. 
    You are answering questions based on the provided context (documents or web search results).
    Structure your answer clearly.
    ALWAYS cite your sources if possible (e.g., "According to the document...").
    If the answer is not in the provided context, strictly state that you cannot find the information.`;

        const userPrompt = `Context:
    ${contextText || "No context available."}

    Question: ${question}`;

        console.log("Sending request to Hugging Face...");

        // 3. Call Hugging Face
        const completion = await hf.chatCompletion({
            model: "meta-llama/Meta-Llama-3-8B-Instruct",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 800,
        });

        const answer = completion.choices[0]?.message?.content || "No answer generated.";
        console.log("Response received");

        return NextResponse.json({ answer });

    } catch (error: any) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
