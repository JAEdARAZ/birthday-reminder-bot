import type { AWS } from "@serverless/typescript";

export const functions: AWS["functions"] = {
  getBirthdays: {
    handler: 'src/functions/get-birthdays/index.handler',
    events: [
      {
        httpApi: {
          path: '/birthdays',
          method: 'get'
        }
      }
    ]
  },
  addBirthday: {
    handler: 'src/functions/add-birthday/index.handler',
    events: [
      {
        httpApi: {
          path: '/birthdays',
          method: 'post'
        }
      }
    ]
  }
}