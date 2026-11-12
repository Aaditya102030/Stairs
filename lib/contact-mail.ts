/**
 * Opens the visitor's own mail service with a ready-to-send message addressed to the clinic.
 *
 * A website cannot see which mail service a visitor uses, so we infer it from the email
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

type Provider = "gmail" | "outlook" | "yahoo" | "default";

export function detectProvider(email: string): Provider {
  const domain = email.trim().toLowerCase().split("@")[1] ?? "";
  if (domain === "gmail.com" || domain === "googlemail.com") return "gmail";
  if (/^(outlook|hotmail|live)\.[a-z.]+$/.test(domain) || domain === "msn.com") return "outlook";
  if (/^yahoo\.[a-z.]+$/.test(domain) || domain === "ymail.com" || domain === "rocketmail.com") return "yahoo";
  return "default";
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
      // mailto: expects CRLF line breaks in the body
      url = `mailto:${CONTACT_EMAIL}?subject=${su}&body=${encodeURIComponent(body.replace(/\n/g, "\r\n"))}`;
  }

  if (provider === "default") {
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return provider;
}
