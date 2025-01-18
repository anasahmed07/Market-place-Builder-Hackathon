import type { Metadata } from "next"
import Footer from "@/components/footer";
import TopBanner from "@/components/topBanner";
import { satoshi } from "@/styles/fonts";
import TopNavbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "SHOP.CO | By Anas Ahmed",
  description: "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;}>) {
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/fav-icon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/fav-icon/favicon.svg" />
        <link rel="shortcut icon" href="/fav-icon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/fav-icon/apple-touch-icon.png" />
        <link rel="manifest" href="/fav-icon/site.webmanifest" />
      </head>
      <body className={`${satoshi.className}bg-white max-w-[2000px] mx-auto`}>
        <TopBanner/>
        <TopNavbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
