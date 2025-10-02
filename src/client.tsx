import { createRoot } from "hono/jsx/dom/client";
import { useEffect, useMemo, useState } from "hono/jsx/dom";

// Types based on API shape
interface CountryCodeEntry {
  code: string; // e.g. "ID"
  name: string; // e.g. "Indonesia"
  dial_code: string; // e.g. "+62"
}

function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  return digits;
}

function buildWaUrl(phoneNumber: string, message: string | undefined): string {
  const base = `https://wa.me/${phoneNumber}`;
  if (message && message.trim().length > 0) {
    const q = new URLSearchParams({ text: message }).toString();
    return `${base}?${q}`;
  }
  return base;
}

// Data source and helpers
const COUNTRY_DB_URL =
  "https://raw.githubusercontent.com/yehezkielgunawan/country-call-code/main/db.json";

function resolveDialCode(
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

function App() {
  const [allCountries, setAllCountries] = useState<CountryCodeEntry[]>([]);
  const [countryQuery, setCountryQuery] = useState<string>("+62");
  const [localNumber, setLocalNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Fetch countries on mount
  useEffect(() => {
    let cancelled = false;
    fetch(COUNTRY_DB_URL)
      .then((r) => r.json())
      .then((data: unknown) => {
        if (cancelled) return;
        if (Array.isArray(data)) {
          const valid = (data as any[]).every(
            (d) =>
              d &&
              typeof d.code === "string" &&
              typeof d.name === "string" &&
              typeof d.dial_code === "string",
          );
          if (valid) setAllCountries(data as CountryCodeEntry[]);
          else setAllCountries([]);
        } else {
          setAllCountries([]);
        }
      })
      .catch(() => {
        if (!cancelled) setAllCountries([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const suggestions = useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return allCountries;
    return allCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial_code.replace("+", "").startsWith(q) ||
        c.code.toLowerCase().startsWith(q),
    );
  }, [countryQuery, allCountries]);

  const computedDialCode = useMemo(
    () => resolveDialCode(countryQuery, allCountries, "+62"),
    [countryQuery, allCountries],
  );

  const waUrl = useMemo(() => {
    const phone = normalizePhone(`${computedDialCode}${localNumber}`);
    return buildWaUrl(phone, message && message.trim() ? message : undefined);
  }, [computedDialCode, localNumber, message]);

  async function copyLink() {
    const g = globalThis as any;
    try {
      if (g?.navigator?.clipboard?.writeText) {
        await g.navigator.clipboard.writeText(waUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
        return;
      }
      throw new Error("Clipboard API not available");
    } catch {
      const doc = (globalThis as any).document;
      if (!doc) return;
      const temp: any = doc.createElement("input");
      temp.value = waUrl;
      doc.body.appendChild(temp);
      temp.select();
      try {
        if (doc.execCommand) {
          doc.execCommand("copy");
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }
      } finally {
        doc.body.removeChild(temp);
      }
    }
  }

  function onSubmit(e: any) {
    if (e && e.preventDefault) e.preventDefault();
    const full = `${computedDialCode}${localNumber}`;
    const phone = normalizePhone(full);
    if (!phone) return;
    const url = buildWaUrl(phone, message);
    const g = globalThis as any;
    if (g?.location) {
      g.location.href = url;
    }
  }

  return (
    <section class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <form onSubmit={onSubmit} class="space-y-4">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            Phone number
          </label>
          <div class="flex gap-2">
            <div class="w-56">
              <input
                list="country-codes"
                value={countryQuery}
                onInput={(e: any) => setCountryQuery(e.currentTarget.value)}
                onChange={(e: any) => setCountryQuery(e.currentTarget.value)}
                placeholder="Country or code (+62)"
                class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-gray-400"
              />
              <datalist id="country-codes">
                {suggestions.map((c) => {
                  const label = `${c.name} (${c.dial_code})`;
                  return <option value={c.dial_code}>{label}</option>;
                })}
              </datalist>
            </div>
            <input
              value={localNumber}
              onInput={(e: any) => setLocalNumber(e.currentTarget.value)}
              class="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
              placeholder="81234567890"
              inputMode="tel"
              pattern="[0-9]*"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            Message (optional)
          </label>
          <textarea
            value={message}
            onInput={(e: any) => setMessage(e.currentTarget.value)}
            rows={4}
            class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
            placeholder="Type your message..."
          />
        </div>

        <div class="space-y-3">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              Generated link
            </label>
            <div class="flex gap-2">
              <input
                readOnly
                value={waUrl}
                class="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-xs text-gray-700 outline-none"
              />
              <button
                type="button"
                onClick={copyLink}
                class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                aria-label="Copy WhatsApp link"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              class="inline-flex w-full items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none"
            >
              Open WhatsApp
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

const container = document.getElementById("app")!;
createRoot(container).render(<App />);
