import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from './api-gateway';

export const errorHandlerMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request) => {
    const { error } = request;
    request.response = formatJSONResponse({ body: { message: error.message.replace(/"/g, '\'') } }, 404);
  }

  return { onError }
}