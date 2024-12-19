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
            className="relative flex flex-col justify-center min-h-screen max-w-[var(--max-width)] px-4"
            style={{ boxShadow: "0 0 0 1px rgba(209, 213, 219)" }}
          >
            <div className="pb-24 pt-16 flex-1 flex flex-col">{children}</div>
          </main>
          <ClientGNBWrapper />
        </Suspense>
      </body>
    </html>
  );
}
