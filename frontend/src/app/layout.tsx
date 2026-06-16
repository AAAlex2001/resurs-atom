import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Resurs Atom",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
