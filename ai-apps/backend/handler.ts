import { APIGatewayEvent, APIGatewayEventRequestContext, Context } from "aws-lambda";
import OpenAI from "openai";

const env = <{ OPENAI_KEY: string }>process.env;

type RequestBody = {
    textToCheck: string
};

type ReplacementsArgType = {
    changeFrom: string,
    changeTo: string,
    reason: "Grammar" | "Spelling"
}[]

export async function main(event: APIGatewayEvent, context: Context) {
    const body = <RequestBody>JSON.parse(event.body!);
    if (!body?.textToCheck?.length) return { 
        statusCode: 400, 
        body: JSON.stringify({ message: 'Invalid request' })
    };
    const openai = new OpenAI({ apiKey: env.OPENAI_KEY });

    const prompt = "Correct the spelling and grammatical errors in the following text:\n\n";

    const gptResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: prompt + body.textToCheck
            }
        ],
        functions: [
            {
                name: "makeCorrections",
                description: "Makes spelling or grammar corrections to a body of text",
                parameters: {
                    type: "object",
                    properties: {
                        replacements: {
                            type: "array",
                            description: "Array of corrections",
                            items: {
                                type: "object",
                                properties: {
                                    changeFrom: {
                                        type: "string",
                                        description: "The word or phrase to change"
                                    },
                                    changeTo: {
                                        type: "string",
                                        description: "The new word or phrase to replace it with"
                                    },
                                    reason: {
                                        type: "string",
                                        description: "The reason this change is being made",
                                        enum: ["Grammar", "Spelling"]
                                    }                                    
                                }
                            }
                        }
                    }
                }
            }
        ],
        function_call: { name: 'makeCorrections' }
    });

    const args = <{ replacements: ReplacementsArgType[] }>JSON.parse(
            gptResponse.choices[0].message.function_call!.arguments);

    return {
        statusCode: 200,
        headers: {
            ["Access-Control-Allow-Origin"]: "http://localhost:5173"
        },
        body: JSON.stringify(args.replacements)
    };
}
