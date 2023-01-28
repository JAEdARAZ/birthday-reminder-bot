import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from './api-gateway';
import { AppError } from './app-error';

export const errorHandlerMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request) => {
    const { error } = request;
    let statusCode = 500;

    if (error instanceof AppError) {
      statusCode = error.statusCode;
    }

    console.log(error);
    request.response = formatJSONResponse({
      response: { message: error.message.replace(/"/g, '\'') },
      statusCode: 400
    });
  }

  return { onError }
}