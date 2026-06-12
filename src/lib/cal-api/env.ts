function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}. Copy .env.example to .env.local and fill it in.`);
  }
  return value;
}

export function getCalApiConfig() {
  return {
    apiKey: required("CAL_API_KEY"),
    apiUrl: process.env.CAL_API_URL ?? "https://api.cal.com/v2",
    apiVersion: process.env.CAL_API_VERSION ?? "2024-08-13",
  };
}

export function getDefaultUsername() {
  return process.env.NEXT_PUBLIC_CAL_USERNAME ?? "";
}

export function getDefaultEventTypeSlug() {
  return process.env.NEXT_PUBLIC_CAL_EVENT_TYPE_SLUG ?? "30min";
}

export function getBrandName() {
  return process.env.NEXT_PUBLIC_BRAND_NAME ?? "Cal Platform Starter";
}
