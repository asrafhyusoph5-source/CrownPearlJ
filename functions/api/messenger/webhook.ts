import {
  type Env,
  saveMessengerMessage,
  verifyMetaSignature
} from "./_lib";

interface MessengerContext {
  request: Request;
  env: Env;
}

interface MessengerEvent {
  sender?: { id?: string };
  recipient?: { id?: string };
  timestamp?: number;
  message?: {
    mid?: string;
    text?: string;
    is_echo?: boolean;
  };
}

interface WebhookPayload {
  object?: string;
  entry?: Array<{
    id?: string;
    messaging?: MessengerEvent[];
  }>;
}

export const onRequest = async ({
  request,
  env
}: MessengerContext): Promise<Response> => {
  const url = new URL(request.url);

  

if (request.method === "GET") {
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (url.searchParams.get("debug") === "1") {
    const configured = env.META_VERIFY_TOKEN || "";

    return Response.json({
      diagnostic: "Crown Pearl webhook",
      functionRunning: true,
      verifyTokenConfigured: Boolean(configured),
      receivedToken: Boolean(token),
      configuredLength: configured.length,
      receivedLength: token?.length ?? 0,
      exactMatch: Boolean(configured && token === configured),
      trimmedMatch: Boolean(
        configured && token &&
        configured.trim() === token.trim()
      ),
      modeMatches: mode === "subscribe",
      challengeReceived: Boolean(challenge)
    });
  }

  if (
    mode === "subscribe" &&
    token === env.META_VERIFY_TOKEN &&
    challenge
  ) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Webhook verification failed", {
    status: 403
  });
}



  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const rawBody = await request.text();

  const valid = await verifyMetaSignature(
    request,
    rawBody,
    env.META_APP_SECRET
  );

  if (!valid) {
    return new Response("Invalid signature", { status: 401 });
  }

  let payload: WebhookPayload;

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (payload.object !== "page") {
    return new Response("Unsupported event", { status: 404 });
  }

  for (const entry of payload.entry || []) {
    if (entry.id !== env.META_PAGE_ID) continue;

    for (const event of entry.messaging || []) {
      if (
        !event.sender?.id ||
        !event.message?.mid ||
        !event.message.text ||
        event.message.is_echo
      ) {
        continue;
      }

      await saveMessengerMessage(
        env,
        event.sender.id,
        event.message.mid,
        event.message.text,
        event.timestamp || Date.now()
      );
    }
  }

  return new Response("EVENT_RECEIVED", { status: 200 });
};
