import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight:['200','300','400','500','600','700','800','900']
});


export const metadata: Metadata = {
  title: "SummarAIze",
  description: "AI-Powered PDF Summarisation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
     <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${fontSans.variable} antialiased`}
        >
        <Header/>
        
        <main>{children}</main>
        <Toaster/>
      </body>
    </html>
    </ClerkProvider>
  );
}
