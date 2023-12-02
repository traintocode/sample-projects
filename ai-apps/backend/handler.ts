import { APIGatewayEvent, APIGatewayEventRequestContext, Context } from "aws-lambda";
import OpenAI from "openai";

const env = <{ OPENAI_KEY: string }>process.env;

type RequestBody = {
    messages: { text: string, from: 'ai' | 'user' }[]
};

export async function main(event: APIGatewayEvent, context: Context) {
    const body = <RequestBody>JSON.parse(event.body!);
    if (!body?.messages?.length) return { 
        statusCode: 400, 
        body: JSON.stringify({ message: 'Invalid request' })
    };
    const openai = new OpenAI({ apiKey: env.OPENAI_KEY });

    const gptResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "system",
            content: "You are a helpful assistant who talks like a pirate"
        }, ...body.messages.map<{
            role: "system" | "assistant" | "user",
            content: string  
        }>(message => ({
            role: message.from === "ai" ? "assistant" : "user",
            content: message.text
        }))]
    });

    const result = gptResponse.choices[0].message.content;

    return {
        statusCode: 200,
        headers: {
            ["Access-Control-Allow-Origin"]: "http://localhost:5173"
        },
        body: result
    };
}
