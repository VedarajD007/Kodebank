"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ---- Navbar ---- */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-6 md:px-16 py-5"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "var(--gradient-brand-warm)" }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M3 6l9-4 9 4v2H3V6zM5 14h2v6H5v-6zM9 14h2v6H9v-6zM13 14h2v6h-2v-6zM17 14h2v6h-2v-6zM3 22h18"
              />
            </svg>
          </div>
          <span className="text-xl font-bold font-display text-warm-gray-800"
            style={{ color: "var(--warm-gray-800)" }}
          >
            Kod<span style={{ color: "var(--orange-500)" }}>Bank</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <button className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-orange-50"
              style={{ color: "var(--warm-gray-600)" }}
            >
              Sign In
            </button>
          </Link>
          <Link href="/register">
            <button className="kb-btn text-sm px-5 py-2.5">
              Get Started
            </button>
          </Link>
        </div>
      </motion.nav>

      {/* ---- Hero Section ---- */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-16 py-12 md:py-0">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left — Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{
                background: "var(--orange-50)",
                borderColor: "var(--orange-200)",
                color: "var(--orange-700)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--orange-500)" }} />
              Trusted by 10,000+ users
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-5 font-display"
              style={{ color: "var(--warm-gray-900)" }}
            >
              Banking that{" "}
              <span className="relative inline-block">
                <span className="text-brand-gradient">works</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                  className="absolute -bottom-1 left-0 w-full h-1 rounded-full origin-left"
                  style={{ background: "var(--gradient-brand-warm)" }}
                />
              </span>
              <br />
              for your life.
            </h1>

            <p className="text-base md:text-lg leading-relaxed mb-8 max-w-md"
              style={{ color: "var(--warm-gray-400)" }}
            >
              Secure, fast, and built for the future. KodBank makes managing your finances effortless — no hidden fees, no complexity.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link href="/register">
                <button className="kb-btn text-base px-8 py-4 min-w-[180px]">
                  Open Account →
                </button>
              </Link>
              <Link href="/login">
                <button className="kb-btn-outline text-base px-8 py-4 min-w-[180px]">
                  Sign In
                </button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-10 flex items-center gap-6"
            >
              {[
                { icon: "🔒", label: "Bank-grade security" },
                { icon: "⚡", label: "Instant transfers" },
                { icon: "₹0", label: "Zero fees" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs font-medium" style={{ color: "var(--warm-gray-400)" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Visual card element */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative hidden md:flex items-center justify-center"
          >
            {/* Background decorative circle */}
            <div
              className="absolute w-[380px] h-[380px] rounded-full opacity-[0.06]"
              style={{ background: "var(--gradient-brand)" }}
            />

            {/* Credit card mockup */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              {/* Main card */}
              <div
                className="w-[340px] h-[210px] rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1c1917 0%, #292524 50%, #44403c 100%)",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.3), 0 0 40px rgba(249,115,22,0.1)",
                }}
              >
                {/* Card accent stripe */}
                <div
                  className="absolute top-0 right-0 w-[200px] h-full opacity-20"
                  style={{
                    background: "var(--gradient-brand)",
                    clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  }}
                />

                {/* Card content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-display font-bold text-lg tracking-wider">
                      Kod<span style={{ color: "var(--orange-400)" }}>Bank</span>
                    </span>
                    <div className="flex gap-1">
                      <div className="w-7 h-7 rounded-full bg-orange-500 opacity-80" />
                      <div className="w-7 h-7 rounded-full bg-orange-300 opacity-60 -ml-3" />
                    </div>
                  </div>

                  {/* Chip */}
                  <div
                    className="w-10 h-7 rounded-md"
                    style={{
                      background: "linear-gradient(135deg, #d4a464 0%, #c9953c 100%)",
                    }}
                  />

                  <div>
                    <p className="text-white/40 text-xs mb-1 font-mono-alt">CARD NUMBER</p>
                    <p className="text-white/90 text-sm tracking-[0.2em] font-mono-alt">
                      •••• •••• •••• 4289
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-6 -left-8 kb-card-flat px-4 py-3 flex items-center gap-3"
                style={{ background: "var(--white)" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--orange-50)" }}
                >
                  <span className="text-sm">↑</span>
                </div>
                <div>
                  <p className="text-xs" style={{ color: "var(--warm-gray-400)" }}>Savings</p>
                  <p className="text-sm font-bold" style={{ color: "var(--warm-gray-800)" }}>+12.5%</p>
                </div>
              </motion.div>

              {/* Floating notification */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="absolute -top-4 -right-6 kb-card-flat px-4 py-2.5 flex items-center gap-2"
                style={{
                  background: "var(--white)",
                  borderColor: "#d1fae5",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <p className="text-xs font-medium" style={{ color: "#059669" }}>
                  Verified ✓
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ---- Bottom bar ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="px-6 md:px-16 py-6 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--warm-gray-100)" }}
      >
        <p className="text-xs" style={{ color: "var(--warm-gray-300)" }}>
          © 2026 KodBank. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {["Privacy", "Terms", "Support"].map((link, i) => (
            <a key={i} href="#" className="text-xs transition-colors duration-200"
              style={{ color: "var(--warm-gray-300)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange-500)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--warm-gray-300)")}
            >
              {link}
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
