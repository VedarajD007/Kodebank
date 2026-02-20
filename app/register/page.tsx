"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{
        show: boolean;
        message: string;
        type: "success" | "error";
    }>({ show: false, message: "", type: "success" });

    // Track current step for multi-step feel
    const [step, setStep] = useState(1);

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
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                showToast(data.message || "Registration successful!", "success");
                setTimeout(() => router.push("/login"), 2000);
            } else {
                showToast(data.error || "Registration failed", "error");
            }
        } catch {
            showToast("Network error. Please try again.", "error");
        } finally {
            setLoading(false);
        }
    };

    const canProceed = step === 1
        ? formData.username.length > 0 && formData.email.length > 0
        : true;

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

            {/* Left — Branding panel (mirrored from login, flipped side) */}
            <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden items-center justify-center order-2"
                style={{ background: "var(--gradient-brand-warm)" }}
            >
                {/* Geometric decorations */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-16 right-16 w-28 h-28 border-2 border-white rounded-2xl -rotate-12" />
                    <div className="absolute bottom-16 left-16 w-20 h-20 border-2 border-white rounded-full" />
                    <div className="absolute top-1/3 right-1/4 w-14 h-14 bg-white rounded-lg rotate-45" />
                    <div className="absolute bottom-1/3 left-1/3 w-24 h-24 border-2 border-white/40 rounded-2xl rotate-6" />
                </div>

                <div className="relative z-10 text-center px-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-8"
                    >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                        </svg>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold text-white font-display mb-3"
                    >
                        Join KodBank
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/70 text-sm leading-relaxed max-w-xs mx-auto"
                    >
                        Create your account in seconds. No paperwork, no branch visits. Just modern banking.
                    </motion.p>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-10 space-y-3 text-left max-w-xs mx-auto"
                    >
                        {[
                            "Zero maintenance charges",
                            "Instant account activation",
                            "Bank-grade 256-bit encryption",
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                                <span className="text-white/80 text-sm">{feature}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Right — Registration form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 order-1">
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
                            Create your account
                        </h1>
                        <p className="text-sm" style={{ color: "var(--warm-gray-400)" }}>
                            Step {step} of 2 — {step === 1 ? "Personal details" : "Security setup"}
                        </p>
                        {/* Progress bar */}
                        <div className="mt-4 h-1 rounded-full overflow-hidden" style={{ background: "var(--warm-gray-100)" }}>
                            <motion.div
                                className="h-full rounded-full"
                                style={{ background: "var(--gradient-brand-warm)" }}
                                initial={{ width: "50%" }}
                                animate={{ width: step === 1 ? "50%" : "100%" }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-5"
                                >
                                    <div>
                                        <label className="block text-sm font-medium mb-2"
                                            style={{ color: "var(--warm-gray-600)" }}
                                        >
                                            Username
                                        </label>
                                        <input
                                            id="register-username"
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="kb-input"
                                            placeholder="Choose a username"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2"
                                            style={{ color: "var(--warm-gray-600)" }}
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="register-email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="kb-input"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => canProceed && setStep(2)}
                                        className={`kb-btn w-full py-4 text-base ${!canProceed ? "opacity-50 cursor-not-allowed" : ""}`}
                                        disabled={!canProceed}
                                    >
                                        Continue →
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-5"
                                >
                                    <div>
                                        <label className="block text-sm font-medium mb-2"
                                            style={{ color: "var(--warm-gray-600)" }}
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            id="register-phone"
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="kb-input"
                                            placeholder="+91 XXXXX XXXXX"
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
                                            id="register-password"
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="kb-input"
                                            placeholder="Min. 6 characters"
                                            required
                                            minLength={6}
                                        />
                                        <p className="mt-2 text-xs" style={{ color: "var(--warm-gray-300)" }}>
                                            Use at least 6 characters with a mix of letters & numbers
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="kb-btn-outline flex-1 py-4 text-base"
                                        >
                                            ← Back
                                        </button>
                                        <motion.button
                                            type="submit"
                                            disabled={loading}
                                            whileTap={{ scale: 0.98 }}
                                            className="kb-btn flex-[2] py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                    Creating...
                                                </span>
                                            ) : (
                                                "Create Account"
                                            )}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-7">
                        <div className="flex-1 h-px" style={{ background: "var(--warm-gray-100)" }} />
                        <span className="text-xs" style={{ color: "var(--warm-gray-300)" }}>or</span>
                        <div className="flex-1 h-px" style={{ background: "var(--warm-gray-100)" }} />
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm" style={{ color: "var(--warm-gray-400)" }}>
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold transition-colors duration-200"
                            style={{ color: "var(--orange-500)" }}
                        >
                            Sign In
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
