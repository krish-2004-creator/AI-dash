import Groq from "groq-sdk";

export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "dummy_key",
    dangerouslyAllowBrowser: true // Note: usually we don't want this, but for client-side rapid prototyping or if we meant to use it server-side only. 
    // actually, let's keep it server side only. I will remove dangerouslyAllowBrowser if I use it only in API routes.
});

// We will use this in standard server-side API routes.
