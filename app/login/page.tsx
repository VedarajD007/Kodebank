"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{
        show: boolean;
        message: string;
        type: "success" | "error";
    }>({ show: false, message: "", type: "success" });

    const showToast = (message: string, type: "success" | "error") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast((t) => ({ ...t, show: false })), 4000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                showToast("Login successful! Redirecting...", "success");
                setTimeout(() => router.push("/dashboard"), 1500);
            } else {
                showToast(data.error || "Login failed", "error");
            }
        } catch {
            showToast("Network error. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Toast */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed top-6 right-6 z-50 px-5 py-4 rounded-xl shadow-lg border flex items-center gap-3"
                        style={{
                            background: toast.type === "success" ? "#f0fdf4" : "#fef2f2",
                            borderColor: toast.type === "success" ? "#bbf7d0" : "#fecaca",
                            color: toast.type === "success" ? "#166534" : "#991b1b",
                        }}
                    >
                        <span className="text-lg">
                            {toast.type === "success" ? "✓" : "✕"}
                        </span>
                        <p className="font-medium text-sm">{toast.message}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Left — Branding panel */}
            <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden items-center justify-center"
                style={{ background: "var(--gradient-brand-warm)" }}
            >
                {/* Geometric decorations */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-2xl rotate-12" />
                    <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-white rounded-full" />
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-lg rotate-45" />
                    <div className="absolute bottom-10 left-20 w-20 h-20 border-2 border-white/50 rounded-2xl -rotate-6" />
                    <div className="absolute top-20 right-20 w-12 h-12 bg-white/20 rounded-full" />
                </div>

                <div className="relative z-10 text-center px-12">
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-8"
                    >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                                d="M3 6l9-4 9 4v2H3V6zM5 14h2v6H5v-6zM9 14h2v6H9v-6zM13 14h2v6h-2v-6zM17 14h2v6h-2v-6zM3 22h18"
                            />
                        </svg>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold text-white font-display mb-3"
                    >
                        Welcome to KodBank
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/70 text-sm leading-relaxed max-w-xs mx-auto"
                    >
                        Your finances, simplified. Secure access to your accounts anytime, anywhere.
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-10 flex justify-center gap-8"
                    >
                        {[
                            { value: "10K+", label: "Users" },
                            { value: "₹2Cr+", label: "Managed" },
                            { value: "99.9%", label: "Uptime" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <p className="text-white font-bold text-lg font-display">{stat.value}</p>
                                <p className="text-white/50 text-xs mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Right — Login form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-[400px]"
                >
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2.5 mb-8">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ background: "var(--gradient-brand-warm)" }}
                        >
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                                    d="M3 6l9-4 9 4v2H3V6zM5 14h2v6H5v-6zM9 14h2v6H9v-6zM13 14h2v6h-2v-6zM17 14h2v6h-2v-6zM3 22h18"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-bold font-display" style={{ color: "var(--warm-gray-800)" }}>
                            Kod<span style={{ color: "var(--orange-500)" }}>Bank</span>
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold font-display mb-2"
                            style={{ color: "var(--warm-gray-900)" }}
                        >
                            Sign in to your account
                        </h1>
                        <p className="text-sm" style={{ color: "var(--warm-gray-400)" }}>
                            Enter your credentials to access your dashboard
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-2"
                                style={{ color: "var(--warm-gray-600)" }}
                            >
                                Username
                            </label>
                            <input
                                id="login-username"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="kb-input"
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2"
                                style={{ color: "var(--warm-gray-600)" }}
                            >
                                Password
                            </label>
                            <input
                                id="login-password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="kb-input"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileTap={{ scale: 0.98 }}
                            className="kb-btn w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        />
                                    </svg>
                                    Signing In...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-7">
                        <div className="flex-1 h-px" style={{ background: "var(--warm-gray-100)" }} />
                        <span className="text-xs" style={{ color: "var(--warm-gray-300)" }}>or</span>
                        <div className="flex-1 h-px" style={{ background: "var(--warm-gray-100)" }} />
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm" style={{ color: "var(--warm-gray-400)" }}>
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-semibold transition-colors duration-200"
                            style={{ color: "var(--orange-500)" }}
                        >
                            Create Account
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
