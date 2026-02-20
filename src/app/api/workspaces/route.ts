import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { workspaces } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
    try {
        const allWorkspaces = await db.select().from(workspaces).orderBy(workspaces.createdAt);
        return NextResponse.json(allWorkspaces);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch workspaces" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title } = body;

        if (!title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        // Ensure we have a user to link to
        let user = await db.query.users.findFirst();
        if (!user) {
            console.log("No users found, creating demo user...");
            const newUsers = await db.insert(require("@/db/schema").users).values({
                name: "Demo User",
                email: "demo@example.com",
                role: "admin",
                status: "active"
            }).returning() as any;
            user = newUsers[0];
        }

        const newWorkspace = await db.insert(workspaces).values({
            title,
            userId: user!.id,
        }).returning() as any;

        return NextResponse.json(newWorkspace[0]);
    } catch (error: any) {
        console.error("Error creating workspace:", error);
        return NextResponse.json({ error: "Failed to create workspace: " + (error.message || error) }, { status: 500 });
    }
}
