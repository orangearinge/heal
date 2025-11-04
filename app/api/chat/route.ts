import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, type UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    model,
    webSearch,
  }: { 
    messages: UIMessage[]; 
    model: string; 
    webSearch: boolean;
  } = await req.json();

  // Model mapping
  const getModel = (modelId: string) => {
    switch (modelId) {
      case "google/gemini-2.0-flash":
        return google("gemini-2.0-flash-exp");
      case "google/gemini-pro":
        return google("gemini-pro");
      default:
        return google("gemini-2.0-flash-exp");
    }
  };

  const result = streamText({
    model: webSearch ? "perplexity/sonar" : getModel(model),
    messages: convertToModelMessages(messages),
    system: "You are a helpful assistant that can answer questions and help with tasks",
  });

  // send sources and reasoning back to the client
  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
  });
}

