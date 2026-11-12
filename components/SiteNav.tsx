"use client";

import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";

/**
 * Single source of truth for the site navigation.
 * Every page renders this component, so every route always shows the same
 * seven links. The current route only decides which link gets the "active"
 * class (red text + underline) - it never hides or removes any link.
 *
 *   HOME | ABOUT | SERVICES | TEAM | INITIATIVES | FIT2RUN | CONTACT
 */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/trainers", label: "Team" },
  { href: "/pricing", label: "Initiatives" },
  { href: "/fit2run", label: "Fit2Run" },
] as const;

export const CONTACT_LINK = { href: "/contact", label: "Contact" } as const;

/* Routes that belong to a section of the nav but live under another path. */
const ROUTE_ALIASES: Record<string, string> = {
  "/new-pricing-plan": "/pricing",
};

function isActive(pathname: string, href: string) {
  const current = ROUTE_ALIASES[pathname] ?? pathname;
  if (href === "/") return current === "/";
  return current === href || current.startsWith(href + "/");
}

/* The base navbar look (colours, fonts, underline, contact pill) lives in each
   page's own stylesheet. These rules only make sure all seven links keep
   fitting on screen: they tighten the spacing on narrower desktops and hand
   over to the hamburger menu (which lists every link) on tablets and phones. */
const RESPONSIVE_CSS = `
@media (max-width: 1400px) {
  html #navbar .nav-links { gap: 24px; }
  html #navbar .nav-links a { letter-spacing: 2px; }
  html #navbar .nav-links .contact-btn { padding: 9px 20px; }
}
@media (max-width: 1180px) {
  html #navbar, html #navbar.scrolled { padding-left: 30px; padding-right: 30px; }
  html #navbar .nav-links { gap: 16px; }
  html #navbar .nav-links a { font-size: 0.7rem; letter-spacing: 1.4px; }
  html #navbar .nav-links .contact-btn { padding: 8px 16px; letter-spacing: 1.4px; }
}
@media (max-width: 960px) {
  html #navbar .nav-links { display: none; }
  html #navbar .hamburger { display: flex; }
}
`;

type SiteNavProps = {
  /* Optional: pages may still pass their own open/close state. */
  menuOpen?: boolean;
  setMenuOpen?: Dispatch<SetStateAction<boolean>>;
};

export default function SiteNav({ menuOpen, setMenuOpen }: SiteNavProps) {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

  const open = menuOpen ?? internalOpen;
  const setOpen = setMenuOpen ?? setInternalOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Never leave the mobile dropdown stuck open after the screen gets wider. */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 960) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setOpen]);

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <style>{RESPONSIVE_CSS}</style>
      <a href="/" className="nav-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="Stairs" style={{ height: 70, width: "auto" }} />
      </a>
      <div
        className="nav-links"
        style={
          open
            ? {
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "rgba(10,10,10,0.97)",
                padding: 20,
                gap: 18,
                zIndex: 999,
              }
            : {}
        }
      >
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} className={isActive(pathname, l.href) ? "active" : ""}>
            {l.label}
          </a>
        ))}
        <a
          href={CONTACT_LINK.href}
          className={isActive(pathname, CONTACT_LINK.href) ? "contact-btn active" : "contact-btn"}
        >
          {CONTACT_LINK.label}
        </a>
      </div>
      <div
        className="hamburger"
        role="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </div>
    </nav>
  );
}
