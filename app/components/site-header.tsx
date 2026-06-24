"use client";

import Image from "next/image";
import logoImg from "../../National_Textile_University_Logo.png";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MagneticButton, MobileNav } from "./interactive";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Insights", href: "#insights" },
  { name: "Momentum", href: "#momentum" },
  { name: "Team", href: "#team-cards" },
];

export function SiteHeader({
  theme,
  toggleTheme,
  scrolled,
}: {
  theme: string;
  toggleTheme: () => void;
  scrolled: boolean;
}) {
  const [activeSection, setActiveSection] = useState("");
  const [isHomePage, setIsHomePage] = useState(true);
  const [isCalculatorPage, setIsCalculatorPage] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const rawPath = window.location.pathname || "/";
      const path = rawPath.replace(/\/+$/, "");
      const isHome = path === "/" || path === "";
      const isCalc = path === "/calculator" || path.startsWith("/calculator/");
      setIsHomePage(isHome);
      setIsCalculatorPage(isCalc);
    }

    const sections = navLinks
      .map((l) => {
        try {
          return document.querySelector(l.href);
        } catch {
          return null;
        }
      })
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.3, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const getHref = (href: string) => {
    return isHomePage ? href : `/${href}`;
  };

  return (
    <motion.header
      className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="site-header__accent" aria-hidden="true" />

      <nav className="site-header__inner" aria-label="Main navigation">
        <motion.a
          href="#"
          className="site-header__brand"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="site-header__logo">
            <Image src={logoImg} alt="NTU logo" width={42} height={42} className="rounded-lg" />
          </span>
          <span className="site-header__brand-text">
            <span className="site-header__brand-title">NTU GPA Calculator</span>
            <span className="site-header__brand-sub">National Textile University</span>
          </span>
        </motion.a>

        <ul className="site-header__nav hidden lg:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={getHref(link.href)}
                className={`site-header__nav-link ${activeSection === link.href ? "site-header__nav-link--active" : ""}`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="site-header__actions">
          <motion.button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="site-header__theme"
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.06 }}
          >
            <motion.span
              className="site-header__theme-icon"
              animate={{ rotate: theme === "dark" ? 0 : 180 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" fill="currentColor" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </motion.span>
          </motion.button>

          {!isCalculatorPage && (
            <MagneticButton href="/calculator" className="site-header__cta hidden md:inline-flex">
              Launch Calculator
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="ml-1.5">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
          )}

          {/* Compact mobile CTA: visible on small screens only when not on calculator page */}
          {!isCalculatorPage && (
            <MagneticButton href="/calculator" className="site-header__cta-mobile md:hidden" >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
          )}

          <MobileNav
            links={navLinks.map((l) => ({ ...l, href: getHref(l.href) }))}
            theme={theme}
            toggleTheme={toggleTheme}
            ctaLabel="Launch Calculator"
            ctaHref="/calculator"
            showCta={!isCalculatorPage}
          />
        </div>
      </nav>
    </motion.header>
  );
}
