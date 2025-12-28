import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers";

const parkinsans = localFont({
  src: [
    {
      path: "../public/fonts/static/Parkinsans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/static/Parkinsans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/static/Parkinsans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/static/Parkinsans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-parkinsans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReePower - Turn Waste into Wealth",
  description:
    "Connect with verified buyers and sellers of recyclable materials. Trade smarter, faster, and with confidence — powered by escrow and product verification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${parkinsans.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}

