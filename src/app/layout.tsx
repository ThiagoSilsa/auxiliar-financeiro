import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Font from google font
const roboto = Roboto()

export const metadata: Metadata = {
  title: "Assistente Financeiro",
  description: "Assistente financeiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
      className={`${roboto.className} antialiased`}
      >
        <main>{children}</main>
        <Toaster/>
      </body>
    </html>
  );
}
