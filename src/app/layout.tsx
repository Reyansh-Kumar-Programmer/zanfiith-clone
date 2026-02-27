import type { Metadata } from "next";
import { Geist, Chivo } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/hooks/useCart";
import CartDrawer from "@/components/cart/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zeninfith Clone | Masterpiece of Evolution",
  description: "A premium ecommerce experience cloned from zeninfith.in",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${chivo.variable}`}>
        <CartProvider>
          {children}
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
