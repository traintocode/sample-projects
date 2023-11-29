import { APIGatewayEvent, APIGatewayEventRequestContext, Context } from "aws-lambda";


const env = <{ OPENAI_KEY: string }>process.env;

export async function main(event: APIGatewayEvent, context: Context) {
    return {        
        statusCode: 200,
        headers: {
        }
    };
}


