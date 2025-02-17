import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;}>) {
  
  return (
    <html lang="en">
      <Analytics/>
      <SpeedInsights/>
      <body>
        {children}
      </body>
    </html>
  );
}
