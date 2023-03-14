import type { AWS } from "@serverless/typescript";

export const functions: AWS["functions"] = {
  birthdaysBot: {
    handler: 'src/functions/birthdays-bot/index.handler',
    events: [
      {
        httpApi: {
          path: '/bot',
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
  },
  birthdaysChecker: {
    handler: 'src/functions/birthdays-checker/index.handler',
    events: [
      {
        schedule: {
          rate: [
            //"rate(1 minute)"
            "cron(0 12 * * ? *)"
          ]
        }
      }
    ]
  }
}