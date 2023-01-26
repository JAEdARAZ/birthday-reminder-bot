import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import type { AWS } from "@serverless/typescript";
import { joiValidatorMiddleware } from "./joiValidator";
import { errorHandlerMiddleware } from "./errorHandler";

export const middyfy = (handler, schema) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(joiValidatorMiddleware({ schema }))
    .use(errorHandlerMiddleware())
}
// AWSFunction type
export type AWSFunction = AWS['functions'][0];