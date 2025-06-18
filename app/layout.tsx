import type { Metadata } from "next";
import { Manrope } from "next/font/google"; // Changed from Bricolage_Grotesque
import "./globals.css";
import Navbar from "@/components/Navbar";

const manrope = Manrope({ // Changed variable name and font
  variable: "--font-manrope", // Updated CSS variable name
  subsets: ["latin"],
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
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <Navbar />
        {children}
      </body>

    </html>
  );
}