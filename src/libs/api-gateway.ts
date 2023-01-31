import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";

type ValidatedAPIGatewayProxyEvent = Omit<APIGatewayProxyEvent, 'body'> & { body: any }
export type ValidatedEventAPIGatewayProxyEvent = Handler<ValidatedAPIGatewayProxyEvent, APIGatewayProxyResult>

export const formatJSONResponse = ({
  statusCode = 200,
  response = {}
}: {
  statusCode?: number;
  response?: Record<string, unknown>;
}) => {
  return {
    statusCode,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    }
  };
}
