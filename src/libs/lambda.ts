import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import type { AWS } from "@serverless/typescript";
import { joiValidatorMiddleware } from "./joi-validator";
import { errorHandlerMiddleware } from "./error-handler";

export const middyfy = (handler, schema) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(joiValidatorMiddleware({ schema }))
    .use(errorHandlerMiddleware())
}

export const middifyBot = (handler) => {
  return middy(handler)
    .use(middyJsonBodyParser())
}

// AWSFunction type
export type AWSFunction = AWS['functions'][0];