import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KodBank — Modern Digital Banking",
  description:
    "KodBank is a secure, modern digital banking platform. Manage your finances with confidence using our state-of-the-art banking services.",
  keywords: ["banking", "finance", "digital banking", "KodBank", "secure banking"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Decorative background — subtle geometric shapes */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Top-right angular shape */}
          <div
            className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-[0.04]"
            style={{
              background: "var(--gradient-brand)",
              clipPath: "polygon(30% 0%, 100% 0%, 100% 70%, 0% 100%)",
            }}
          />
          {/* Bottom-left angular shape */}
          <div
            className="absolute -bottom-20 -left-20 w-[400px] h-[400px] opacity-[0.03]"
            style={{
              background: "var(--gradient-brand)",
              clipPath: "polygon(0% 30%, 100% 0%, 70% 100%, 0% 100%)",
            }}
          />
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 kb-dot-pattern opacity-40" />
        </div>

        {/* Main content */}
        <main className="relative z-10 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
