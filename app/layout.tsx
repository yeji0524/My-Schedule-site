import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "김예지 포트폴리오",
  description: "비엔티 김예지의 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className="bg-neutral-50 text-neutral-800"
        style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
