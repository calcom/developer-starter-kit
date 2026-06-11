import { getCalApiConfig } from "./env";
import type { ApiResponse } from "./types";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

type RequestOptions = {
  method?: Method;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  apiVersion?: string;
  cache?: RequestCache;
  next?: { revalidate?: number; tags?: string[] };
};

export class CalApiError extends Error {
  code: string;
  status: number;
  details?: unknown;

  constructor(message: string, code: string, status: number, details?: unknown) {
    super(message);
    this.name = "CalApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

function buildQuery(query?: RequestOptions["query"]): string {
  if (!query) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    params.set(key, String(value));
  }
  const str = params.toString();
  return str ? `?${str}` : "";
}

export async function calApi<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { apiKey, apiUrl, apiVersion } = getCalApiConfig();
  const url = `${apiUrl}${path}${buildQuery(options.query)}`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "cal-api-version": options.apiVersion ?? apiVersion,
    Accept: "application/json",
  };
  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    method: options.method ?? "GET",
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: options.cache,
    next: options.next,
  });

  let payload: ApiResponse<T> | undefined;
  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    if (!response.ok) {
      throw new CalApiError(
        `Cal.com API ${response.status} ${response.statusText}`,
        "UNKNOWN",
        response.status,
      );
    }
    throw new CalApiError("Cal.com API returned no body", "EMPTY_BODY", 500);
  }

  if (!response.ok || payload.status === "error") {
    const err = payload.status === "error" ? payload.error : undefined;
    throw new CalApiError(
      err?.message ?? `Cal.com API ${response.status}`,
      err?.code ?? `HTTP_${response.status}`,
      response.status,
      err?.details,
    );
  }

  return payload.data;
}
