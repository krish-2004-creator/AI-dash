import FirecrawlApp from "@mendable/firecrawl-js";

const apiKey = process.env.FIRECRAWL_API_KEY;

if (!apiKey) {
    console.warn("FIRECRAWL_API_KEY is not set. Deep search will fail.");
}

export const firecrawl = new FirecrawlApp({
    apiKey: apiKey || "fc_placeholder", // Prevent crash on init, will fail on call if missing
});
