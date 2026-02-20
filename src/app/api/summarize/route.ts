
import { NextRequest, NextResponse } from "next/server";
import { hf } from "@/lib/huggingface";
import { YoutubeTranscript } from "youtube-transcript";

export const dynamic = 'force-dynamic';

const SYSTEM_PROMPT = `You are an expert AI study assistant. Analyze the following video transcript and create concise, structured study notes.

Format your response like this:
## Study Notes

### Key Concepts
- **Concept 1**: Explanation

### Key Takeaways
1. Point 1
2. Point 2

### Summary
2-3 sentence summary.`;

async function summarizeText(transcript: string): Promise<NextResponse> {
    const MAX_CHARS = 8000;
    const truncated = transcript.slice(0, MAX_CHARS);

    console.log("Sending to Hugging Face...");
    const completion = await hf.chatCompletion({
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Transcript:\n${truncated}` }
        ],
        max_tokens: 1024,
    });

    const summary = completion.choices[0]?.message?.content || "No summary generated.";
    console.log("Summary generated!");
    return NextResponse.json({ summary });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Direct transcript paste mode — skip YouTube entirely
        if (body.transcript) {
            const directTranscript = (body.transcript as string).trim();
            if (directTranscript.length < 20) {
                return NextResponse.json({ error: "Transcript text is too short." }, { status: 400 });
            }
            return await summarizeText(directTranscript);
        }

        // YouTube URL mode
        const { url } = body;
        if (!url) {
            return NextResponse.json({ error: "URL or transcript is required" }, { status: 400 });
        }

        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        const videoId = (match && match[2].length === 11) ? match[2] : null;

        if (!videoId) {
            return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
        }

        console.log(`Fetching transcript for video: ${videoId}`);

        let fullTranscript: string;
        try {
            const segments = await YoutubeTranscript.fetchTranscript(videoId, { lang: "en" });
            fullTranscript = segments.map((s) => s.text).join(" ").replace(/\s+/g, " ").trim();
            if (!fullTranscript || fullTranscript.length < 20) {
                throw new Error("Transcript is empty.");
            }
        } catch (err: any) {
            const realError = err?.message || String(err);
            console.error("Transcript error:", realError);
            return NextResponse.json({
                error: `Could not fetch transcript automatically. Please use "Paste Transcript" mode instead. (Error: ${realError})`
            }, { status: 400 });
        }

        console.log(`Transcript length: ${fullTranscript.length} chars`);
        return await summarizeText(fullTranscript);

    } catch (error: any) {
        console.error("Summarization error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
