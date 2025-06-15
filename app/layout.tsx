import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'AI Chat App',
  description: 'A simple AI chat app like ChatGPT',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}