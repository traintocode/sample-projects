import { APIGatewayEvent, APIGatewayEventRequestContext, Context } from "aws-lambda";
import OpenAI from "openai";

const env = <{ OPENAI_KEY: string }>process.env;

type RequestBody = {
    subject: string
};

export async function main(event: APIGatewayEvent, context: Context) {
    const body = <RequestBody>JSON.parse(event.body!);
    if (!body || !body.subject) return { 
        statusCode: 400, 
        body: JSON.stringify({ message: 'Invalid request' })
    };
    const openai = new OpenAI({ apiKey: env.OPENAI_KEY });

    const prompt = `Tell me a joke about ${body.subject}`;

    const gptResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: prompt
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
