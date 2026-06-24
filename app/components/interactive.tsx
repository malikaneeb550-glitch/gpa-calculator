"use client";

import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      aria-hidden="true"
    />
  );
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.8,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 25 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      className="back-to-top"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8, pointerEvents: visible ? "auto" : "none" }}
      whileHover={{ y: -4, scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  );
}

export function MobileNav({
  links,
  theme,
  toggleTheme,
  ctaLabel = "Launch Calculator",
  ctaHref = "#",
  showCta = true,
}: {
  links: { name: string; href: string }[];
  theme: string;
  toggleTheme: () => void;
  ctaLabel?: string;
  ctaHref?: string;
  showCta?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    
    if (open) {
      document.addEventListener("keydown", handleEscape);
    }
    
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  // Close when clicking outside the menu wrapper (covers header overlap cases)
  useEffect(() => {
    const onDocClick = (e: Event) => {
      if (!open) return;
      const target = e.target as Node | null;
      if (target && wrapperRef.current && !wrapperRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, [open]);

  return (
    <div className="md:hidden" ref={wrapperRef}>
      <motion.button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="mobile-menu-btn"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.94 }}
      >
        <motion.span animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="mobile-menu-line" />
        <motion.span animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }} className="mobile-menu-line" />
        <motion.span animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="mobile-menu-line" />
      </motion.button>

      <motion.div
        className="mobile-nav-overlay"
        initial={{ opacity: 0, pointerEvents: "none" }}
        animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(false);
        }}
      />

      <motion.nav
        className="mobile-nav-panel"
        initial={false}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.8 }}
        ref={panelRef as any}
      >
        <div className="mobile-nav-panel__head">
          <p className="mobile-nav-panel__title">Menu</p>
          <p className="mobile-nav-panel__sub">NTU GPA Calculator</p>
        </div>

        <ul className="mobile-nav-panel__links">
          {links.map((link, i) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, x: 24 }}
              animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
              transition={{ delay: open ? i * 0.06 : 0 }}
            >
              <a
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setOpen(false)}
              >
                <span className="mobile-nav-link__index">{String(i + 1).padStart(2, "0")}</span>
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="mobile-nav-panel__foot">
          {showCta && (
            <a href={ctaHref} className="mobile-nav-cta" onClick={() => setOpen(false)}>
              {ctaLabel}
            </a>
          )}
          <button type="button" onClick={toggleTheme} className="mobile-nav-theme">
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        </div>
      </motion.nav>
    </div>
  );
}

export function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 7) % 100}%`,
    top: `${(i * 23 + 11) % 100}%`,
    size: 2 + (i % 3),
    delay: `${i * 0.4}s`,
    duration: `${6 + (i % 5)}s`,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            "--duration": p.duration,
            "--delay": p.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export function MagneticButton({
  children,
  className = "",
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.2);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
    >
      <span className="btn-shimmer" aria-hidden="true" />
      {children}
    </motion.a>
  );
}
