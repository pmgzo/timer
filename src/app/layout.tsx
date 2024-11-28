import type { Metadata } from "next";
import "./globals.css";
import { digital } from "./local_fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${digital.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
