import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { documents } from "@/db/schema";
import { eq } from "drizzle-orm";

// Polyfill for pdf-parse (needed in this route too)
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

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const workspaceId = parseInt(id);

        if (isNaN(workspaceId)) {
            return NextResponse.json({ error: "Invalid workspace ID" }, { status: 400 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "File is required" }, { status: 400 });
        }

        console.log(`Processing file upload for workspace ${workspaceId}: ${file.name}`);

        // 1. Parse content based on type
        let textContent = "";
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileType = file.type === "application/pdf" ? "pdf" : "txt";

        if (fileType === "pdf") {
            try {
                // @ts-ignore
                const pdfModule = await import("pdf-parse/lib/pdf-parse.js");
                const pdfParse = pdfModule.default || pdfModule;
                const data = await pdfParse(buffer);
                textContent = data.text;
            } catch (e: any) {
                console.error("PDF Parsing Error:", e);
                return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
            }
        } else {
            textContent = buffer.toString("utf-8");
        }

        // 2. Save to DB
        // In a real app, you'd upload the file to S3/Blob storage and save the URL.
        // For this demo, we'll store the content directly (truncated if needed, but best to keep whole for RAG).
        // WARNING: Storing large text in DB can be heavy. Text type in Postgres holds up to 1GB so it's fine for demo.

        const newDoc = await db.insert(documents).values({
            workspaceId,
            name: file.name,
            type: fileType,
            url: "stored_in_db", // Placeholder as we store content directly
            content: textContent,
        }).returning();

        return NextResponse.json(newDoc[0]);

    } catch (error) {
        console.error("Error saving document:", error);
        return NextResponse.json({ error: "Failed to upload document" }, { status: 500 });
    }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const workspaceId = parseInt(id);

        if (isNaN(workspaceId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

        const docs = await db.select({
            id: documents.id,
            name: documents.name,
            type: documents.type,
            createdAt: documents.createdAt
        })
            .from(documents)
            .where(eq(documents.workspaceId, workspaceId))
            .orderBy(documents.createdAt);

        return NextResponse.json(docs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
    }
}
