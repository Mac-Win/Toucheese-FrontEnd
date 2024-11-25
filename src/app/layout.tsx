import NavBar from "@/features/navbar/Navbar";
import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./Loading/page";

export const metadata: Metadata = {
  title: "터치즈 MVP 기능구현",
  description: "스프린트1단계",
  icons: {
    icon: "/icon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex justify-center ">
        <div
          className="w-full max-w-[var(--max-width)]"
          style={{ boxShadow: "0 0 0 1px rgba(209, 213, 219)" }}
        >
          <Suspense fallback={<Loading />}>
            <main
              id="main"
              className="bg-white pb-28 flex flex-col p-4 min-h-screen"
            >
              {children}
            </main>
            <NavBar />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
