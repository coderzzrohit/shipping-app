import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddb } from "../lib/dynamodb.server";
// import { ddb } from "../lib/dynamodb.server";

export async function saveShop({ shop, accessToken }) {
  await ddb.send(
    new PutCommand({
      TableName: "ShopifyApps",
      Item: {
        shop,
        accessToken,
        plan: "free",
        status: "active",
        installedAt: new Date().toISOString(),
      },
    })
  );
}
