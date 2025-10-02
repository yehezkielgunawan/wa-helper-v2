export interface CountryCodeEntry {
  code: string;
  name: string;
  dial_code: string;
}

export const COUNTRY_DB_URL =
  "https://raw.githubusercontent.com/yehezkielgunawan/country-call-code/main/db.json";

export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  return digits;
}

export function buildWaUrl(
  phoneNumber: string,
  message: string | undefined,
): string {
  const base = `https://wa.me/${phoneNumber}`;
  if (message && message.trim().length > 0) {
    const q = new URLSearchParams({ text: message }).toString();
    return `${base}?${q}`;
  }
  return base;
}

export function resolveDialCode(
  query: string,
  countries: CountryCodeEntry[],
  fallback: string,
): string {
  const v = query.trim();
  if (!v) return fallback;

  // 1) Exact label match "Country (+62)"
  const byLabel = countries.find((c) => `${c.name} (${c.dial_code})` === v);
  if (byLabel) return byLabel.dial_code;

  // 2) Exact country name or alpha-2 code
  const lower = v.toLowerCase();
  const byNameOrCode = countries.find(
    (c) => c.name.toLowerCase() === lower || c.code.toLowerCase() === lower,
  );
  if (byNameOrCode) return byNameOrCode.dial_code;

  // 3) Dial code input (with or without '+')
  const normalized = v.startsWith("+") ? v : `+${v}`;
  const byDial = countries.find(
    (c) => c.dial_code === normalized || c.dial_code.replace("+", "") === v,
  );
  if (byDial) return byDial.dial_code;

  // 4) Looks like a dial code; accept as-is
  if (/^\+?\d{1,4}$/.test(v)) return normalized;

  return fallback;
}
