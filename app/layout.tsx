import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ConversionActions } from "@/components/conversion-actions";
import { RouteProgress } from "@/components/route-progress";
import { ScrollProgress } from "@/components/scroll-progress";
import { siteConfig } from "@/lib/site-config";

const themeInitScript = `var root=document.documentElement;root.dataset.jsEnabled="true";try{var theme=localStorage.getItem("theme");var dark=theme==="dark"||(theme!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);root.classList.toggle("dark",dark);var accent=localStorage.getItem("accent");root.dataset.accent=["amber","blue","green","violet"].includes(accent)?accent:"amber"}catch{root.classList.toggle("dark",window.matchMedia("(prefers-color-scheme: dark)").matches);root.dataset.accent="amber"}try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches&&!/(bot|crawler|spider|slurp|bingpreview|inspectiontool|lighthouse|pagespeed|prerender)/i.test(navigator.userAgent)&&!sessionStorage.getItem("seen-loader")){sessionStorage.setItem("seen-loader","1");root.dataset.showLoader="true";setTimeout(function(){delete root.dataset.showLoader},900)}}catch{}`;

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
        <RouteProgress />
        <ScrollProgress />
        <div aria-hidden="true" className="first-visit-loader">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="size-5 shrink-0 text-accent"
          >
            <path
              d="M3 7h11v10H3zM14 10h4l3 3v4h-7zM7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
          <span className="first-visit-loader-content">
            <span className="first-visit-loader-name">
              {siteConfig.companyName}
            </span>
            <span className="first-visit-loader-track">
              <span className="first-visit-loader-fill" />
            </span>
          </span>
        </div>
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
