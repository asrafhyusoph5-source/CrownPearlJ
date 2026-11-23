
export interface Env {
  META_APP_ID: string;
  META_PAGE_ID: string;
  META_VERIFY_TOKEN: string;
  META_APP_SECRET: string;
  META_PAGE_ACCESS_TOKEN: string;
  FIREBASE_SERVICE_ACCOUNT_JSON: string;
}

function base64Url(value: string | ArrayBuffer): string {
  const bytes =
    typeof value === "string"
      ? new TextEncoder().encode(value)
      : new Uint8Array(value);

  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getGoogleAccessToken(env: Env): Promise<string> {
  const account = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT_JSON);

  if (account.project_id !== "crown-pearl") {
    throw new Error("Firebase service account belongs to the wrong project.");
  }

  const now = Math.floor(Date.now() / 1000);

  const header = base64Url(JSON.stringify({
    alg: "RS256",
    typ: "JWT"
  }));

  const claim = base64Url(JSON.stringify({
    iss: account.client_email,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600
  }));

  const unsigned = `${header}.${claim}`;

  const pem = account.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s/g, "");

  const keyBytes = Uint8Array.from(
    atob(pem),
    c => c.charCodeAt(0)
  );

  const key = await crypto.subtle.importKey(
    "pkcs8",
    keyBytes,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsigned)
  );

  const assertion = `${unsigned}.${base64Url(signature)}`;

  const response = await fetch(
    "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion
      })
    }
  );

  const result = await response.json() as {
    access_token?: string;
    error_description?: string;
  };

  if (!response.ok || !result.access_token) {
    throw new Error(
      result.error_description || "Firebase authentication failed."
    );
  }

  return result.access_token;
}

export async function saveMessengerMessage(
  env: Env,
  senderId: string,
  messageId: string,
  messageText: string,
  timestamp: number
): Promise<void> {
  const accessToken = await getGoogleAccessToken(env);

  const database = "(default)";
  const root =
    `https://firestore.googleapis.com/v1/projects/crown-pearl/databases/${encodeURIComponent(database)}/documents`;

  const conversationId = senderId.replace(/[^a-zA-Z0-9_-]/g, "_");
  const safeMessageId = messageId.replace(/[^a-zA-Z0-9_-]/g, "_");

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  };

  const conversationResponse = await fetch(
    `${root}/messengerConversations/${conversationId}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        fields: {
          customerId: { stringValue: senderId },
          customerName: { stringValue: `Messenger customer ${senderId.slice(-5)}` },
          lastMessage: { stringValue: messageText },
          lastMessageTime: {
            timestampValue: new Date(timestamp).toISOString()
          },
          updatedAt: {
            timestampValue: new Date().toISOString()
          },
          pageId: { stringValue: env.META_PAGE_ID },
          source: { stringValue: "facebook_messenger" }
        }
      })
    }
  );

  if (!conversationResponse.ok) {
    throw new Error("Could not save Messenger conversation.");
  }

  const messageResponse = await fetch(
    `${root}/messengerConversations/${conversationId}/messages/${safeMessageId}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        fields: {
          messageId: { stringValue: messageId },
          conversationId: { stringValue: conversationId },
          text: { stringValue: messageText },
          sender: { stringValue: "customer" },
          timestamp: {
            timestampValue: new Date(timestamp).toISOString()
          },
          status: { stringValue: "received" }
        }
      })
    }
  );

  if (!messageResponse.ok) {
    throw new Error("Could not save Messenger message.");
  }
}

export async function verifyMetaSignature(
  request: Request,
  rawBody: string,
  appSecret: string
): Promise<boolean> {
  const signature = request.headers.get("x-hub-signature-256");

  if (!signature?.startsWith("sha256=")) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(appSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const expected = new Uint8Array(
    await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(rawBody)
    )
  );

  const supplied = signature.slice(7);

  const expectedHex = Array.from(expected)
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");

  if (supplied.length !== expectedHex.length) return false;

  let difference = 0;
  for (let i = 0; i < supplied.length; i++) {
    difference |= supplied.charCodeAt(i) ^ expectedHex.charCodeAt(i);
  }

  return difference === 0;
}
