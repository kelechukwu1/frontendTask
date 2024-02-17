import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Technical Test",
  description: "Built by Ayoola",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} w-[90%] mx-auto lg:w-[80%] xl:w-[85%] 2xl:w-[65%]`}
      >
        {children}
      </body>
    </html>
  );
}
