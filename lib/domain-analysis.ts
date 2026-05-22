import type { DomainSignals } from "@/types/analysis";

const URL_SHORTENERS = new Set([
  "bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "short.link",
  "tiny.cc", "is.gd", "buff.ly", "rebrand.ly", "cutt.ly", "shorturl.at",
  "tr.im", "snip.ly", "bl.ink", "encurtador.com.br", "encurta.link",
]);

const FAMOUS_BRANDS: Record<string, string[]> = {
  "nubank": ["nubank", "nu-bank", "nu_bank", "nubankbrasil"],
  "bradesco": ["bradesco", "bradesc0", "bradesc"],
  "itau": ["itau", "ita0", "itaú", "itauunibanco"],
  "santander": ["santander", "santandr", "sant4nder"],
  "caixa": ["caixa", "caixa-economica", "caixaeconomica"],
  "bb": ["bancodobrasil", "bb-com", "brbrasil"],
  "mercadolivre": ["mercadolivre", "mercado-livre", "mercadolibre", "ml-compras"],
  "olx": ["olx", "olx-br", "olxbrasil"],
  "magazineluiza": ["magazineluiza", "magalu", "magazine-luiza"],
  "americanas": ["americanas", "amrericanas", "americanas-br"],
  "amazon": ["amazon", "amaz0n", "amazom", "amazon-br"],
  "shopee": ["shopee", "sh0pee", "shoppe"],
  "ifood": ["ifood", "i-food", "ifoood"],
  "correios": ["correios", "corre1os", "correio"],
  "receita": ["receita", "receitafederal", "rfb-brasil"],
  "detran": ["detran", "detr4n"],
  "gov": ["gov", "gov-br", "govbr"],
  "serasa": ["serasa", "ser4sa", "serasaexperian"],
  "boa": ["boaboa", "boavista", "boa-vista"],
  "whatsapp": ["whatsapp", "whats-app", "whatsap"],
  "instagram": ["instagram", "inst4gram", "lnstagram"],
  "facebook": ["facebook", "f4cebook", "facebok"],
  "netflix": ["netflix", "netfl1x", "netfix"],
};

const SUSPICIOUS_CHARS_PATTERN = /[а-яА-ЯіїєҐЀ-ӿ]|[０-９Ａ-Ｚａ-ｚ]|[​-‏­]/;

function extractDomainParts(url: string): { domain: string; subdomain: string; tld: string; protocol: string } | null {
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    const protocol = parsed.protocol.replace(":", "");
    const hostname = parsed.hostname.toLowerCase();
    const parts = hostname.split(".");

    if (parts.length < 2) return null;

    const tld = parts.slice(-2).join(".");
    const domain = parts.length >= 3 ? parts.slice(-3).join(".") : hostname;
    const subdomain = parts.length >= 3 ? parts.slice(0, -2).join(".") : "";

    return { domain, subdomain, tld, protocol };
  } catch {
    return null;
  }
}

function detectShortener(hostname: string): { isShortener: boolean; service?: string } {
  for (const shortener of URL_SHORTENERS) {
    if (hostname === shortener || hostname.endsWith(`.${shortener}`)) {
      return { isShortener: true, service: shortener };
    }
  }
  return { isShortener: false };
}

function detectTyposquatting(hostname: string): string | undefined {
  const normalized = hostname
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/8/g, "b")
    .replace(/-/g, "")
    .replace(/\./g, "");

  for (const [brand, variants] of Object.entries(FAMOUS_BRANDS)) {
    for (const variant of variants) {
      if (normalized.includes(variant) || variant.includes(normalized)) {
        if (!hostname.endsWith(`.${brand}.com.br`) && hostname !== `${brand}.com.br`) {
          return brand;
        }
      }
    }
  }
  return undefined;
}

function detectSuspiciousChars(hostname: string): string[] {
  const found: string[] = [];
  if (SUSPICIOUS_CHARS_PATTERN.test(hostname)) {
    found.push("caracteres unicode suspeitos (possível ataque homógrafo)");
  }
  if (/\d{3,}/.test(hostname)) {
    found.push("sequência longa de números no domínio");
  }
  if ((hostname.match(/-/g) || []).length >= 3) {
    found.push("excesso de hífens no domínio");
  }
  if (hostname.length > 50) {
    found.push("domínio muito longo");
  }
  return found;
}

function detectDeceptiveSubdomain(hostname: string): { hasDeceptive: boolean; value?: string } {
  const parts = hostname.split(".");
  if (parts.length <= 2) return { hasDeceptive: false };

  const subdomain = parts.slice(0, -2).join(".");

  for (const [brand] of Object.entries(FAMOUS_BRANDS)) {
    if (subdomain.includes(brand)) {
      return { hasDeceptive: true, value: subdomain };
    }
  }

  const trustedTerms = ["banco", "bank", "secure", "seguro", "login", "account", "conta", "pagamento", "payment", "oficial", "verify"];
  for (const term of trustedTerms) {
    if (subdomain.includes(term)) {
      return { hasDeceptive: true, value: subdomain };
    }
  }

  return { hasDeceptive: false };
}

export function analyzeDomain(url: string): DomainSignals {
  const signals: string[] = [];
  let riskScore = 0;

  const parts = extractDomainParts(url);
  if (!parts) {
    return {
      domain: url,
      protocol: "unknown",
      isHttps: false,
      isShortener: false,
      hasSuspiciousChars: false,
      hasDeceptiveSubdomain: false,
      riskScore: 30,
      signals: ["URL com formato inválido"],
    };
  }

  const { domain, subdomain, protocol } = parts;
  const isHttps = protocol === "https";

  if (!isHttps) {
    signals.push("Sem criptografia HTTPS — seus dados não estão protegidos");
    riskScore += 25;
  }

  const shortenerResult = detectShortener(domain);
  if (shortenerResult.isShortener) {
    signals.push(`Link encurtado por ${shortenerResult.service || "serviço desconhecido"} — destino oculto`);
    riskScore += 30;
  }

  const similarBrand = detectTyposquatting(domain);
  if (similarBrand) {
    signals.push(`Domínio imita a marca "${similarBrand}" — possível falsificação`);
    riskScore += 40;
  }

  const suspiciousChars = detectSuspiciousChars(domain);
  if (suspiciousChars.length > 0) {
    suspiciousChars.forEach((c) => signals.push(c));
    riskScore += suspiciousChars.length * 15;
  }

  const deceptiveSubdomain = detectDeceptiveSubdomain(domain + (subdomain ? `.${subdomain}` : ""));
  if (deceptiveSubdomain.hasDeceptive) {
    signals.push(`Subdomínio enganoso detectado: "${deceptiveSubdomain.value}" — tenta parecer site oficial`);
    riskScore += 35;
  }

  return {
    domain,
    protocol,
    isHttps,
    isShortener: shortenerResult.isShortener,
    shortenerService: shortenerResult.service,
    similarToFamousBrand: similarBrand,
    hasSuspiciousChars: suspiciousChars.length > 0,
    suspiciousChars: suspiciousChars.length > 0 ? suspiciousChars : undefined,
    hasDeceptiveSubdomain: deceptiveSubdomain.hasDeceptive,
    deceptiveSubdomain: deceptiveSubdomain.value,
    riskScore: Math.min(100, riskScore),
    signals,
  };
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url.startsWith("http") ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
}
