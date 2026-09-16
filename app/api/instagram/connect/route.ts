import { NextRequest, NextResponse } from "next/server";
import { canManageWorkspace, getCurrentWorkspaceContext } from "@/lib/workspace-access";
import { getBaseUrl, getMissingInstagramOAuthEnv } from "@/lib/env";
import { createOAuthState, getAuthorizationUrl } from "@/lib/meta/oauth";

export async function GET(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
  const baseUrl = host ? `${proto}://${host}` : getBaseUrl();

  const context = await getCurrentWorkspaceContext();
  if (!context) {
    return NextResponse.redirect(`${baseUrl}/login`);
  }
  if (!canManageWorkspace(context.role)) {
    return NextResponse.redirect(`${baseUrl}/settings?instagram=forbidden`);
  }

  const missingEnv = getMissingInstagramOAuthEnv();
  if (missingEnv.length > 0) {
    return NextResponse.redirect(
      `${baseUrl}/settings?instagram=misconfigured&missing=${encodeURIComponent(
        missingEnv.join(",")
      )}`
    );
  }

  const redirectUri = `${baseUrl}/api/instagram/callback`;
  const state = createOAuthState(context.workspaceId);

  return NextResponse.redirect(getAuthorizationUrl(redirectUri, state));
}
