import type { AWS } from "@serverless/typescript";

export const dynamoResources: AWS["resources"]["Resources"] = {
  myTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "Birthdays",
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
      }
    }
  }
}