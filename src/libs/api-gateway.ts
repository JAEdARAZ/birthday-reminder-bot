import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";

type ValidatedAPIGatewayProxyEvent = Omit<APIGatewayProxyEvent, 'body'> & { body: any }
export type ValidatedEventAPIGatewayProxyEvent = Handler<ValidatedAPIGatewayProxyEvent, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>, statusCode: number = 200) => {
  return {
    statusCode,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    }
  }
}