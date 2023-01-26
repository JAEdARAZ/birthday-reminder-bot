import middy from '@middy/core';
import createHttpError from 'http-errors'
import { APIGatewayProxyEvent } from 'aws-lambda';

export const joiValidatorMiddleware = (options: { schema?: any } = {}) => {
  const before: middy.MiddlewareFn<any, any> = async ({
    event
  }: middy.Request<APIGatewayProxyEvent>) => {
    const schema = options.schema;
    const { error } = schema.validate(event);
    if (error) {
      console.log("JOI validation error: ", error.message);
      throw createHttpError(404, error.message, {});
    }
  }

  return { before }
}