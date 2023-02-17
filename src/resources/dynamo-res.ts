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
        }
      ],
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH"
        }
      ],
      ProvisionedThroughput: {
        "ReadCapacityUnits": 1,
        "WriteCapacityUnits": 1
      },
      StreamSpecification: {
        StreamViewType: "OLD_IMAGE"
      },
      TimeToLiveSpecification: {
        "AttributeName": "TTL",
        "Enabled": true
      }
    }
  }
}