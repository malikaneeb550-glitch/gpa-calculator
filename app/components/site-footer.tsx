"use client";

import Image from "next/image";
import logoImg from "../../National_Textile_University_Logo.png";
import { motion } from "framer-motion";

const footerLinks = {
  platform: [
    { label: "Features", href: "#features" },
    { label: "Insights", href: "#insights" },
    { label: "Momentum", href: "#momentum" },
  ],
  team: [
    { label: "Meet the Team", href: "#team" },
    { label: "Malik Aneeb", href: "#team" },
    { label: "Nawab Hasnain Raza", href: "#team" },
  ],
};

const teamMembers = [
  {
    name: "Malik Aneeb",
    role: "Lead Developer",
    detail: "MERN Stack · Platform Design",
    accent: "var(--accent-1)",
  },
  {
    name: "Nawab Hasnain Raza",
    role: "Research Lead",
    detail: "GPA Logic · Credit Hours",
    accent: "var(--accent-2)",
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="team" className="site-footer">
      <div className="site-footer__glow" aria-hidden="true" />

      <div className="site-footer__inner">
        <motion.div
          className="site-footer__top"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <div className="site-footer__brand-col">
            <a href="#" className="site-footer__brand">
              <Image src={logoImg} alt="NTU logo" width={48} height={48} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-1" />
              <div>
                <p className="site-footer__brand-name">NTU GPA Calculator</p>
                <p className="site-footer__brand-tag">Smart academic planning for NTU students</p>
              </div>
            </a>
            <p className="site-footer__desc">
              A professional GPA planning platform built by NTU students to help you forecast outcomes,
              track goals, and make confident academic decisions.
            </p>
            <div className="site-footer__badge">
              <span className="pulse-dot" />
              GMD Department · Batch 2025–2029
            </div>
          </div>

          <div className="site-footer__links-col">
            <p className="site-footer__col-title">Platform</p>
            <ul className="site-footer__link-list">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="site-footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__links-col">
            <p className="site-footer__col-title">Team</p>
            <ul className="site-footer__link-list">
              {footerLinks.team.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="site-footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__team-col">
            <p className="site-footer__col-title">Contributors</p>
            <div className="site-footer__team-cards">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  className="site-footer__member"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <span className="site-footer__member-dot" style={{ background: member.accent }} />
                  <div>
                    <p className="site-footer__member-name">{member.name}</p>
                    <p className="site-footer__member-role">{member.role}</p>
                    <p className="site-footer__member-detail">{member.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="site-footer__divider" aria-hidden="true" />

        <motion.div
          className="site-footer__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="site-footer__copyright">
            © {year} NTU GPA Calculator. All rights reserved.
          </p>
          <p className="site-footer__credit">
            Crafted with care by{" "}
            <span className="site-footer__credit-highlight">Malik Aneeb</span>
            {/* {" & "}
            <span className="site-footer__credit-highlight"></span> */}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
