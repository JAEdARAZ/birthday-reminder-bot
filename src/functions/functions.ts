import type { AWS } from "@serverless/typescript";

export const functions: AWS["functions"] = {
  combinationAPI: {
    handler: 'src/functions/get-birthdays/index.handler',
    events: [
      {
        httpApi: {
          path: '/birthdays',
          method: 'get'
        }
      }
    ]
  }
}