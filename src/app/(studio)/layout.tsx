import type { Metadata } from "next";
import Link from "next/link";



export const metadata: Metadata = {
  title: "Manage SHOP.CO | By Anas Ahmed",
  description: "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;}>) {
  
  return (
    <html lang="en">
      <body>
        <div className="h-10 bg-white border-b">
          <Link className="text-2xl font-bold m-10" href={"/studio"}>SHOP.CO | CMS</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
