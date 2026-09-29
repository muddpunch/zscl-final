import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import SiteChrome from "./components/SiteChrome";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZSCL - Strona Samorządowa",
  description: "Oficjalna strona Samorządu Uczniowskiego ZSCL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${lexend.variable} antialiased`}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
