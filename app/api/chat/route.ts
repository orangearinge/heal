import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, type UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

interface UserData {
  name: string;
  device: string;
  manualData?: {
    age: string;
    weight: string;
    height: string;
    sleep: string;
    stress: string;
  };
  wearableExtra?: {
    age: string;
    weight: string;
  };
  wearableData?: {
    restingHR: number;
    hrv: number;
    sleepScore: number;
    sleepDuration: string;
    steps: number;
    stress: number;
  };
}

function buildSystemPrompt(userData: UserData | undefined): string {
  if (!userData) {
    return "You are Heal, a smart health chatbot that provides personalized health advice and education. Be friendly, empathetic, and focus on health-related topics.";
  }

  let prompt = `You are Heal, a smart health chatbot that provides personalized health advice and education based on the user's health data. Be friendly, empathetic, and focus on health-related topics.

User Information:
- Name: ${userData.name}
- Device: ${userData.device === "manual" ? "Manual input" : userData.device}
`;

  if (userData.device === "manual" && userData.manualData) {
    prompt += `
Manual Health Data:
- Age: ${userData.manualData.age} years
- Weight: ${userData.manualData.weight} kg
- Height: ${userData.manualData.height} cm
- Sleep Duration: ${userData.manualData.sleep} hours
- Stress Level: ${userData.manualData.stress}/10
`;
  } else if (userData.wearableExtra && userData.wearableData) {
    prompt += `
Wearable Device Data:
- Age: ${userData.wearableExtra.age} years
- Weight: ${userData.wearableExtra.weight} kg
- Resting Heart Rate: ${userData.wearableData.restingHR} bpm
- HRV (Heart Rate Variability): ${userData.wearableData.hrv} ms
- Sleep Score: ${userData.wearableData.sleepScore}/100
- Sleep Duration: ${userData.wearableData.sleepDuration} hours
- Daily Steps: ${userData.wearableData.steps}
- Stress Level: ${userData.wearableData.stress}/10
`;
  }

  prompt += `
Instructions:
1. Use the user's health data to provide personalized, context-aware responses
2. If data indicates fatigue (low sleep score, high stress, low steps), suggest rest and recovery
3. If data shows good metrics, provide encouragement and maintenance tips
4. Always consider the user's current health metrics when giving advice
5. Be proactive in identifying potential health concerns based on the data
6. Provide actionable, evidence-based health recommendations
7. Respond in Indonesian language
8. Be empathetic and supportive, especially when data suggests the user might be tired or stressed
`;

  return prompt;
}

export async function POST(req: Request) {
  try {
    const {
      messages,
      userData,
    }: {
      messages: UIMessage[];
      model: string;
      webSearch: boolean;
      userData?: UserData;
    } = await req.json();

    const systemPrompt = buildSystemPrompt(userData);

    const result = streamText({
      model: google("gemini-2.0-flash"),
      messages: convertToModelMessages(messages),
      system: systemPrompt,
    });

    // send sources and reasoning back to the client
    return result.toUIMessageStreamResponse({
      sendSources: true,
      sendReasoning: true,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
