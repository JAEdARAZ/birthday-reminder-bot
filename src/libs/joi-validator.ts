import middy from '@middy/core';
//import createHttpError from 'http-errors'
import { APIGatewayProxyEvent } from 'aws-lambda';
import { AppError } from './app-error';

export const joiValidatorMiddleware = (options: { schema?: any } = {}) => {
  const before: middy.MiddlewareFn<any, any> = async ({
    event
  }: middy.Request<APIGatewayProxyEvent>) => {
    const schema = options.schema;
    const { error } = schema.validate(event);
    if (error) {
      console.log("JOI validation error: ", error.message);
      throw new AppError(error.message, 400);
    }
  }

  return { before }
}