"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const CELEBRATION_EMOJIS = ["🎉", "💰", "🏦", "✨", "🪙", "💎"];

interface ConfettiPiece {
    id: number;
    x: number;
    emoji: string;
    size: number;
    duration: number;
    delay: number;
}

export default function DashboardPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [showBalance, setShowBalance] = useState(false);
    const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
    const [authChecking, setAuthChecking] = useState(true);
    const [currentTime, setCurrentTime] = useState("");

    // Update time
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    // Check auth on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/getBalance");
                if (res.ok) {
                    const data = await res.json();
                    setUsername(data.username);
                } else {
                    router.push("/login");
                }
            } catch {
                router.push("/login");
            } finally {
                setAuthChecking(false);
            }
        };
        checkAuth();
    }, [router]);

    const generateConfetti = useCallback(() => {
        const pieces: ConfettiPiece[] = [];
        for (let i = 0; i < 30; i++) {
            pieces.push({
                id: i,
                x: Math.random() * 100,
                emoji: CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)],
                size: Math.random() * 20 + 14,
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 1,
            });
        }
        setConfetti(pieces);
        setTimeout(() => setConfetti([]), 4500);
    }, []);

    const handleCheckBalance = async () => {
        setLoading(true);
        setShowBalance(false);

        try {
            const res = await fetch("/api/getBalance");
            const data = await res.json();

            if (res.ok) {
                setBalance(data.balance);
                setShowBalance(true);
                generateConfetti();
            } else {
                if (res.status === 401) {
                    router.push("/login");
                }
            }
        } catch {
            // Network error
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        router.push("/login");
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    if (authChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--white)" }}>
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-10 h-10 rounded-full border-3"
                        style={{
                            borderColor: "var(--orange-100)",
                            borderTopColor: "var(--orange-500)",
                            borderWidth: "3px",
                        }}
                    />
                    <p className="text-sm" style={{ color: "var(--warm-gray-400)" }}>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative" style={{ background: "var(--off-white)" }}>
            {/* Confetti Layer */}
            <AnimatePresence>
                {confetti.map((piece) => (
                    <motion.div
                        key={piece.id}
                        initial={{
                            opacity: 0,
                            y: typeof window !== "undefined" ? window.innerHeight + 50 : 1000,
                            x: typeof window !== "undefined" ? (piece.x / 100) * window.innerWidth : piece.x * 10,
                            rotate: 0,
                            scale: 0,
                        }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            y: -100,
                            rotate: 720,
                            scale: [0, 1, 1, 0.5],
                        }}
                        transition={{
                            duration: piece.duration,
                            delay: piece.delay,
                            ease: "easeOut",
                        }}
                        className="fixed pointer-events-none z-50"
                        style={{ fontSize: piece.size }}
                    >
                        {piece.emoji}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* ---- Navbar ---- */}
            <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-20 flex items-center justify-between px-6 md:px-12 py-4"
                style={{ background: "var(--white)", borderBottom: "1px solid var(--warm-gray-100)" }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--gradient-brand-warm)" }}
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                                d="M3 6l9-4 9 4v2H3V6zM5 14h2v6H5v-6zM9 14h2v6H9v-6zM13 14h2v6h-2v-6zM17 14h2v6h-2v-6zM3 22h18"
                            />
                        </svg>
                    </div>
                    <span className="text-lg font-bold font-display" style={{ color: "var(--warm-gray-800)" }}>
                        Kod<span style={{ color: "var(--orange-500)" }}>Bank</span>
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <span className="hidden sm:block text-xs font-mono-alt" style={{ color: "var(--warm-gray-300)" }}>
                        {currentTime}
                    </span>
                    <div className="w-px h-5" style={{ background: "var(--warm-gray-100)" }} />
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                        style={{ color: "var(--warm-gray-500)" }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--orange-50)";
                            e.currentTarget.style.color = "var(--orange-600)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "var(--warm-gray-500)";
                        }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        Logout
                    </button>
                </div>
            </motion.nav>

            {/* ---- Main Content ---- */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-10 md:py-16">
                {/* Welcome header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <p className="text-sm font-medium mb-1" style={{ color: "var(--orange-500)" }}>
                        {getGreeting()} 👋
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold font-display" style={{ color: "var(--warm-gray-900)" }}>
                        {username}
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "var(--warm-gray-400)" }}>
                        Here&apos;s your account overview
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid md:grid-cols-3 gap-5 mb-8">
                    {/* Quick stat cards */}
                    {[
                        {
                            icon: "🔒",
                            label: "Security",
                            value: "Active",
                            valueColor: "#059669",
                            bg: "#f0fdf4",
                            borderColor: "#bbf7d0",
                        },
                        {
                            icon: "👤",
                            label: "Account Type",
                            value: "Customer",
                            valueColor: "var(--orange-600)",
                            bg: "var(--orange-50)",
                            borderColor: "var(--orange-200)",
                        },
                        {
                            icon: "📊",
                            label: "Status",
                            value: "Verified",
                            valueColor: "#2563eb",
                            bg: "#eff6ff",
                            borderColor: "#bfdbfe",
                        },
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                            className="kb-card p-5"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                                    style={{ background: card.bg, border: `1px solid ${card.borderColor}` }}
                                >
                                    {card.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider"
                                        style={{ color: "var(--warm-gray-400)" }}
                                    >
                                        {card.label}
                                    </p>
                                    <p className="text-sm font-bold" style={{ color: card.valueColor }}>
                                        {card.value}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Balance Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="kb-card overflow-hidden">
                        {/* Card top accent */}
                        <div className="h-1" style={{ background: "var(--gradient-brand-warm)" }} />

                        <div className="p-8 md:p-10">
                            {/* Card Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                                        style={{ background: "var(--orange-50)", border: "1px solid var(--orange-200)" }}
                                    >
                                        <svg className="w-5 h-5" style={{ color: "var(--orange-500)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold font-display"
                                            style={{ color: "var(--warm-gray-800)" }}
                                        >
                                            Account Balance
                                        </h2>
                                        <p className="text-xs" style={{ color: "var(--warm-gray-400)" }}>
                                            Primary savings account
                                        </p>
                                    </div>
                                </div>

                                {showBalance && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                                        style={{
                                            background: "#f0fdf4",
                                            color: "#059669",
                                            border: "1px solid #bbf7d0",
                                        }}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Live
                                    </motion.span>
                                )}
                            </div>

                            {/* Balance Display */}
                            <AnimatePresence mode="wait">
                                {showBalance && balance !== null ? (
                                    <motion.div
                                        key="balance"
                                        initial={{ opacity: 0, scale: 0.9, y: 15 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="text-center py-10"
                                    >
                                        <motion.p
                                            className="text-xs font-semibold uppercase tracking-widest mb-3"
                                            style={{ color: "var(--orange-400)" }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            Available Balance
                                        </motion.p>
                                        <motion.h2
                                            className="text-5xl md:text-6xl font-extrabold font-display text-brand-gradient"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
                                        >
                                            ₹{balance.toLocaleString("en-IN")}
                                        </motion.h2>
                                        <motion.p
                                            className="mt-4 text-sm font-medium"
                                            style={{ color: "#059669" }}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            ✓ Account in good standing
                                        </motion.p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center py-10"
                                    >
                                        <div
                                            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                            style={{ background: "var(--warm-gray-50)", border: "1px solid var(--warm-gray-100)" }}
                                        >
                                            <svg className="w-6 h-6" style={{ color: "var(--warm-gray-300)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-sm" style={{ color: "var(--warm-gray-400)" }}>
                                            Tap below to reveal your balance
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Check Balance Button */}
                            <motion.button
                                onClick={handleCheckBalance}
                                disabled={loading}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className={`w-full py-4 rounded-xl font-semibold text-base text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${showBalance ? "kb-btn-success" : "kb-btn"
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Fetching...
                                    </span>
                                ) : showBalance ? (
                                    "↻ Refresh Balance"
                                ) : (
                                    "Check Balance"
                                )}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-xs mt-10"
                    style={{ color: "var(--warm-gray-300)" }}
                >
                    Your data is protected with 256-bit encryption
                </motion.p>
            </div>
        </div>
    );
}
