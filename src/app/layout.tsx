// layout.tsx (with "use client" directive)

"use client";

import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
  params = {},
}: {
  children: React.ReactNode;
  params?: {
    session?: any;
  };
}) {
  const { session } = params;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          <SessionProvider session={session}>{children}</SessionProvider>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
