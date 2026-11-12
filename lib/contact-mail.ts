/**
 * Opens the visitor's own mail service with a ready-to-send message addressed to the clinic.
 *
 * ON PHONES AND TABLETS the Gmail app is opened directly, with the recipient, subject and message
 * (name, phone, email, message) already filled in:
 *   Android -> Chrome "intent:" link targeting the Gmail app (com.google.android.gm).
 *              If Gmail is not installed, it falls back to a mailto: link (default mail app).
 *   iPhone / iPad -> googlegmail:// link (Gmail app). If Gmail is not installed (the page never
 *              goes to the background), it falls back to a mailto: link (Apple Mail etc.).
 *
 * ON COMPUTERS, a website cannot see which mail service a visitor uses, so we infer it from the email
 * address they typed into the form:
 *   gmail.com / googlemail.com                    -> Gmail compose (new tab)
 *   outlook.* / hotmail.* / live.* / msn.com      -> Outlook on the web compose (new tab)
 *   yahoo.* / ymail.com / rocketmail.com          -> Yahoo Mail compose (new tab)
 *   anything else (work domains, iCloud, ...)     -> mailto: link, which opens their default mail app
 */

export const CONTACT_EMAIL = "info@stairsphysiotherapy.in";

export type ContactForm = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

type Provider = "gmail" | "outlook" | "yahoo" | "default" | "gmail-app";

export function detectProvider(email: string): Provider {
  const domain = email.trim().toLowerCase().split("@")[1] ?? "";
  if (domain === "gmail.com" || domain === "googlemail.com") return "gmail";
  if (/^(outlook|hotmail|live)\.[a-z.]+$/.test(domain) || domain === "msn.com") return "outlook";
  if (/^yahoo\.[a-z.]+$/.test(domain) || domain === "ymail.com" || domain === "rocketmail.com") return "yahoo";
  return "default";
}

/** True on phones and tablets (Android, iPhone, iPad - including iPadOS, which reports itself as a Mac). */
export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) return true;
  return /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
}

function isAndroid(): boolean {
  return typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);
}

/** Opens a mailto: link, falling back to the default mail app. */
function openMailto(mailto: string) {
  window.location.href = mailto;
}

/** iPhone / iPad: try the Gmail app, fall back to mailto: if the app did not take over the screen. */
function openGmailAppIOS(gmailUrl: string, mailto: string) {
  let left = false;
  const onHide = () => {
    if (document.hidden) left = true;
  };
  document.addEventListener("visibilitychange", onHide);
  window.addEventListener("pagehide", onHide);

  window.location.href = gmailUrl;

  window.setTimeout(() => {
    document.removeEventListener("visibilitychange", onHide);
    window.removeEventListener("pagehide", onHide);
    if (!left && !document.hidden) openMailto(mailto);
  }, 1500);
}

export function openMailCompose(form: ContactForm): Provider {
  const subject = form.subject.trim() || `Website enquiry from ${form.name}`;
  const body =
    `Name: ${form.name}\n` +
    `Phone: ${form.phone || "-"}\n` +
    `Email: ${form.email}\n\n` +
    `${form.message}`;

  const to = encodeURIComponent(CONTACT_EMAIL);
  const su = encodeURIComponent(subject);
  const bd = encodeURIComponent(body);

  // mailto: expects CRLF line breaks in the body
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${su}&body=${encodeURIComponent(body.replace(/\n/g, "\r\n"))}`;

  // ---- Phones & tablets: open the Gmail app ----
  if (isMobileDevice()) {
    if (isAndroid()) {
      // Chrome intent: forces the Gmail app; browser_fallback_url is used when Gmail is not installed.
      const intent =
        `intent:#Intent;action=android.intent.action.SENDTO;` +
        `data=${encodeURIComponent(mailto)};` +
        `package=com.google.android.gm;` +
        `S.browser_fallback_url=${encodeURIComponent(mailto)};end`;
      window.location.href = intent;
    } else {
      openGmailAppIOS(`googlegmail:///co?to=${to}&subject=${su}&body=${bd}`, mailto);
    }
    return "gmail-app";
  }

  // ---- Computers ----
  const provider = detectProvider(form.email);
  let url: string;
  switch (provider) {
    case "gmail":
      url = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${bd}`;
      break;
    case "outlook":
      url = `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}&body=${bd}`;
      break;
    case "yahoo":
      url = `https://compose.mail.yahoo.com/?to=${to}&subject=${su}&body=${bd}`;
      break;
    default:
      url = mailto;
  }

  if (provider === "default") {
    openMailto(url);
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return provider;
}
