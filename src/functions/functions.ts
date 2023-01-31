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
  },
  sendBirthdayAlert: {
    handler: 'src/functions/send-birthday-alert/index.handler',
    events: [
      {
        stream: {
          type: 'dynamodb',
          batchSize: 1,
          startingPosition: 'LATEST',
          arn: { "Fn::GetAtt": ["birthdays", "StreamArn"] }
        }
      }
    ]
  }
}