import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/Footer/Footer";
import Navbar from "@/components/common/Navbar/Navbar";
import { QueryProvider } from "@/libs/queryProvider";
import { appFRONT } from "@/utils/appENV";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KONFERO",
  description: "KONFERO website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;
    if (pathname !== "/login") {
      localStorage.setItem(
        "lastVisitedPage",
        appFRONT.defaults.baseURL + pathname
      );
    }
  }

  return (
    <html lang="pl">
      <body className={inter.className}>
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
