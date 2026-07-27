import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oharagercke.com"),
  title: {
    default: "O'Hara & Gercke — Fine Homebuilding in Vermont & New Hampshire",
    template: "%s · O'Hara & Gercke",
  },
  description:
    "O'Hara & Gercke, Inc. is a general contractor in the Upper Valley of Vermont and New Hampshire, building exceptional custom homes with craft, transparency and care since 2002.",
  openGraph: {
    title: "O'Hara & Gercke, Inc.",
    description:
      "Fine homebuilding in Vermont & New Hampshire since 2002 — LEED, Net Zero and Passive House craftsmanship.",
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${fraunces.variable}`}
    >
      <body className="min-h-screen bg-bone text-ink antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1b1916",
              color: "#fbf8f2",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "14px",
              fontFamily: "var(--font-inter)",
            },
          }}
        />
      </body>
    </html>
  );
}
