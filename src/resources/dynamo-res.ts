import type { AWS } from "@serverless/typescript";

export const dynamoResources: AWS["resources"]["Resources"] = {
  birthdays: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "${self:custom.birthdaysTable}",
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S"
        },
        {
          AttributeName: "month",
          AttributeType: "N"
        },
        {
          AttributeName: "day",
          AttributeType: "N"
        }
      ],
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH"
        }
      ],
      BillingMode: "PAY_PER_REQUEST",
      GlobalSecondaryIndexes: [
        {
          IndexName: "GS1",
          KeySchema: [
            {
              AttributeName: "month",
              KeyType: "HASH"
            },
            {
              AttributeName: "day",
              KeyType: "RANGE"
            }
          ],
          Projection: {
            ProjectionType: "ALL"
          }
        }
      ]
    }
  }
}