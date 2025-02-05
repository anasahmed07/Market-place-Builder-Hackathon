import type { Metadata } from "next";
import Link from "next/link";



export const metadata: Metadata = {
  title: "Manage SHOP.CO | By Anas Ahmed"
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;}>) {
  
  return (
    <html lang="en">
      <body>
        <header>
          <nav className="w-screen flex justify-around sm:justify-end sm:px-10 text-lg font-bold sm:space-x-9 py-4 border-b">
            <Link href="/">Website</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/studio">Sanity Dahboard</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
