import type { Metadata } from "next";
import { Fjalla_One, Cantarell } from "next/font/google";
import "./globals.css";

const fjallaOne = Fjalla_One({
  weight: "400",
  variable: "--font-fjalla-one",
  subsets: ["latin"]
});

const cantarell = Cantarell({
  weight: "400",
  variable: "--font-cantarell",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Augment Shell",
  description: "This is the official website for AugmentShell, built with the Next.js App Router, TypeScript, and Tailwind CSS. It connects to Supabase for backend services and is deployed on Vercel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fjallaOne.variable} ${cantarell.variable} antialiased
        bg-[url(/background-body.svg)] bg-no-repeat bg-cover bg-center`}
      >
        <main className="flex flex-col items-center gap-10">
          {children}
        </main>
      </body>
    </html>
  );
}
