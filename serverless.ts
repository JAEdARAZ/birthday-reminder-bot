import type { AWS } from '@serverless/typescript';
import { functions } from '@functions/functions';
import { dynamoResources } from 'src/resources/dynamo-res';


const serverlessConfiguration: AWS = {
  service: 'birthday-reminder-bot',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "dynamodb:*",
        Resource:
          "arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.birthdaysTable}",
      },
      {
        Effect: "Allow",
        Action: ["ses:SendEmail", "ses:SendRawEmail"],
        Resource: "*"
      },
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      BIRTHDAY_TABLE_NAME: '${self:custom.birthdaysTable}'
    },
  },
  // import the function via paths
  functions,
  resources: {
    Resources: {
      ...dynamoResources
    }
  },
  package: { individually: true },
  custom: {
    birthdaysTable: 'Birthdays',

    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
