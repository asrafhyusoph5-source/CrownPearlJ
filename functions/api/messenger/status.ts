
import type { Env } from "./_lib";

interface MessengerContext {
  request: Request;
  env: Env;
}

export const onRequest = async ({
  request,
  env
}: MessengerContext): Promise<Response> => {
  if (request.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  return Response.json({
    service: "Crown Pearl Messenger Integration",
    testPageConfigured: env.META_PAGE_ID === "109969768655732",
    metaAppConfigured: Boolean(env.META_APP_ID),
    metaSecretConfigured: Boolean(env.META_APP_SECRET),
    pageTokenConfigured: Boolean(env.META_PAGE_ACCESS_TOKEN),
    verifyTokenConfigured: Boolean(env.META_VERIFY_TOKEN),
    firebaseConfigured: Boolean(env.FIREBASE_SERVICE_ACCOUNT_JSON),
    firebaseProject: "crown-pearl",
    database: "(default)"
  });
};
