import { useState } from "react";
import { useFetcher } from "react-router";
// ✅ Add this line to load default Polaris CSS
import "@shopify/polaris/build/esm/styles.css";
import {
  Page,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Checkbox,
  Select,
  TextField,
  Button,
} from "@shopify/polaris";

import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";

/* ---------- Loader ---------- */
export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Dashboard() {
  const fetcher = useFetcher();

  const [enabled, setEnabled] = useState(true);
  const [country, setCountry] = useState("all");
  const [message, setMessage] = useState(
    "Customers can update their shipping address before checkout."
  );

  return (
    <Page title="Shipping Address Control">
      <Card>
        <BlockStack gap="300">
          {/* Section title */}
          <Text as="h2" variant="headingSm">
            Settings
          </Text>

          {/* Toggle row */}
          <InlineStack align="space-between">
            <Text>Creste by Rohit </Text>
            <Text>Enable shipping address change </Text>
            <Checkbox
              checked={enabled}
              onChange={(value) => setEnabled(value)}
            />
          </InlineStack>

          {/* Country */}
          <Select
            label="Allowed country"
            options={[
              { label: "All countries", value: "all" },
              { label: "India", value: "IN" },
              { label: "United States", value: "US" },
            ]}
            value={country}
            onChange={(value) => setCountry(value)}
          />

          {/* Message */}
          <TextField
            label="Customer message"
            value={message}
            onChange={(value) => setMessage(value)}
            multiline={2}
          />

          {/* Save */}
          <InlineStack align="end">
            <Button variant="primary">Save</Button>
          </InlineStack>
        </BlockStack>
      </Card>
    </Page>
  );
}

/* ---------- Headers ---------- */
export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
