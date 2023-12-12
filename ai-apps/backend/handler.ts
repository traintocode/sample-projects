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

    const prompt = `Create a cartoon image of ${body.subject}`;

    const gptResponse = await openai.images.generate({
        prompt,
        model: "dall-e-3",
        response_format: "url"
    });
    const result = gptResponse.data[0].url;

    return {
        statusCode: 200,
        headers: {
            ["Access-Control-Allow-Origin"]: "http://localhost:5173"
        },
        body: result
    };
}
