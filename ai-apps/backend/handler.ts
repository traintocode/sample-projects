import { APIGatewayEvent, APIGatewayEventRequestContext, Context } from "aws-lambda";
import OpenAI from "openai";

const env = <{ OPENAI_KEY: string }>process.env;

type RequestBody = {
    subject: string,
    temperature?: number,
    model?: "gpt-3.5-turbo" | "gpt-4"
};

export async function main(event: APIGatewayEvent, context: Context) {
    const body = <RequestBody>JSON.parse(event.body!);
    if (!body?.subject?.length) return { 
        statusCode: 400, 
        body: JSON.stringify({ message: 'Invalid request' })
    };
    const openai = new OpenAI({ apiKey: env.OPENAI_KEY });

    const poemPrompt = `Write me a poem about ${body.subject}.  
    The poem should be cheerful and include rhyme, alliteration, metaphors, or similes to add depth to the poem.
    Keep it to about 100 words.
    Respond with just the poem.`

    const gptResponse = await openai.chat.completions.create({
        model: body.model || "gpt-3.5-turbo",
        temperature: body.temperature,
        messages: [
            {
                role: "user",
                content: poemPrompt
            }
        ]
    });

    const result = gptResponse.choices[0].message.content;

    return {
        statusCode: 200,
        headers: {
        },
        body: result
    };
}
