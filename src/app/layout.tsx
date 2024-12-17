import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import ClientGNBWrapper from "@/features/common/components/navbar/clientGnbWrapper";

export const metadata: Metadata = {
  title: "터치즈 MVP 기능구현",
  description: "스프린트3단계",
  icons: {
    icon: "/icon.ico",
    shortcut: "/icon32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex flex-col align-center justify-center">
        <Suspense>
          <main
            id="main"
            className="relative bg-gray-50 flex flex-col min-h-screen max-w-[var(--max-width)]"
            style={{ boxShadow: "0 0 0 1px rgba(209, 213, 219)" }}
          >
            {children}
          </main>
          <ClientGNBWrapper />
        </Suspense>
      </body>
    </html>
  );
}
