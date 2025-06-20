// app/layout.tsx
import type { Metadata } from "next";
import { Manrope } from "next/font/google"; // Changed back to Manrope
import "./globals.css";
import Navbar from "@/components/Navbar";


import {
  ClerkProvider,
} from '@clerk/nextjs'

// Initialize Manrope
const manrope = Manrope({ // Variable name for Manrope
  variable: "--font-manrope", // CSS variable name for Manrope
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"], // Manrope's common weights
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
      <html lang="en">
        {/* Apply the Manrope variable to the body */}
        <body className={`${manrope.variable} antialiased`}>
          <Navbar />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}