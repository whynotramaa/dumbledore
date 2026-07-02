// app/layout.tsx
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

import { ClerkProvider } from '@clerk/nextjs'

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  // only the weights actually used in the UI — smaller font payload
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dumbledore AI",
  description: "Siri who? Dumbledore teaches now.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "#fe5933" } }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${manrope.variable} antialiased min-h-screen flex flex-col`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <footer className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-6 py-10 md:px-10">
              <p className="text-xs text-muted-foreground/70">
                Made with <span className="text-primary">♥</span> by Rama
              </p>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
