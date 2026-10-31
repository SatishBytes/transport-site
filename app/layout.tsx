import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ConversionActions } from "@/components/conversion-actions";
import { ScrollProgress } from "@/components/scroll-progress";
import { siteConfig } from "@/lib/site-config";

const themeInitScript = `var root=document.documentElement;root.dataset.jsEnabled="true";try{var theme=localStorage.getItem("theme");var dark=theme==="dark"||(theme!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);root.classList.toggle("dark",dark);var accent=localStorage.getItem("accent");root.dataset.accent=["amber","blue","green","violet"].includes(accent)?accent:"amber"}catch{root.classList.toggle("dark",window.matchMedia("(prefers-color-scheme: dark)").matches);root.dataset.accent="amber"}`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.productionDomain),
  title: {
    default: `${siteConfig.companyName} | Goods Transport`,
    template: `%s | ${siteConfig.companyName}`,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ScrollProgress />
        <a
          href="#main-content"
          className="sr-only z-50 rounded-md bg-accent-bright px-4 py-2 font-bold text-[#172033] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
        <ConversionActions />
      </body>
    </html>
  );
}
