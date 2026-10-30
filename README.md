<div align="center">

# 🚚 Goods &amp; Part Load Transport Website

**A fast, SEO-focused, frontend-only business website for a goods transport company in India.**

[![Live Site](https://img.shields.io/badge/Live-Website-0f172a?style=for-the-badge&logo=vercel&logoColor=white)](https://brc-transport-gamma.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

[Live Demo](https://brc-transport-gamma.vercel.app) · [Report a Bug](https://github.com/SatishBytes/transport-site/issues)

</div>

<!-- Add a screenshot: save it as docs/screenshot.png and uncomment the line below -->
<!-- ![Home page screenshot](docs/screenshot.png) -->

---

## 📖 About

A client project built for a goods transport and part load logistics company. The goal is simple: help customers find the business on Google and send a transport enquiry in a few taps.

There is **no backend and no database**. The quote form validates the input and opens a pre-filled **WhatsApp** message, so enquiries reach the business directly.

## ✨ Features

- **16 statically rendered pages**: 10 main pages and 6 city/state landing pages (Mumbai, Thane, Vadodara, Ahmedabad, Uttar Pradesh, Rajasthan).
- **Technical SEO**: unique title and description per page, canonical URLs, Open Graph and Twitter cards, `sitemap.xml`, `robots.txt`, breadcrumbs, and JSON-LD structured data (Organization, Service, BreadcrumbList, FAQPage).
- **Reusable location template**: one component, six pages, each with its own locally relevant copy and FAQs (no duplicated doorway pages).
- **Quote form (frontend only)**: required-field validation, 10-digit mobile and 6-digit PIN code checks, input sanitising, honeypot, and a submit cooldown. Builds a pre-filled WhatsApp message.
- **Security headers**: Content-Security-Policy, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.
- **Accessible by design**: semantic HTML, skip link, labelled form fields, `aria-current` on navigation, keyboard-friendly menu and FAQ, visible focus states.
- **Subtle animations**: scroll reveal, hover effects, and a smooth mobile menu using only CSS and `IntersectionObserver` (no animation library). Content stays visible without JavaScript and respects `prefers-reduced-motion`.
- **Easy to customise**: company name, contact details, and domain live in a single config file.

## 🛠️ Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, lucide-react |
| Language | TypeScript |
| SEO | Next.js Metadata API, JSON-LD |
| Quality | ESLint |
| Hosting | Vercel |

## 📁 Project Structure

```text
transport-site/
├── app/                 # Routes (pages), layout, sitemap, robots, 404
│   ├── about/ services/ routes/ contact/ faq/ get-a-quote/ ...
│   ├── goods-transport-mumbai/ ... (6 location pages)
│   ├── layout.tsx       # Navbar + Footer + fonts + default metadata
│   ├── sitemap.ts
│   └── robots.ts
├── components/          # Reusable UI (navbar, footer, quote form, FAQ, ...)
├── data/                # Locations, services, FAQs, navigation, routes
├── lib/
│   ├── site-config.ts   # Company name, contact details, domain
│   └── metadata.ts      # Reusable SEO metadata helper
├── public/              # Images, favicon, security.txt
└── next.config.ts       # Security headers and Next.js settings
```

## 🚀 Getting Started

**Requirements:** Node.js 20.9 or later and npm.

```bash
# 1. Clone the repository
git clone https://github.com/SatishBytes/transport-site.git
cd transport-site

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Check TypeScript types |

## ⚙️ Configuration

Business details are kept in **`lib/site-config.ts`**: company name, tagline, phone, WhatsApp number, email, address, and developer credit. Update them there and the whole site changes.

The production domain is read from an environment variable, so canonical URLs, the sitemap, and Open Graph tags all use the same address.

Create a `.env.local` file (for local testing) or add the variable in your hosting dashboard:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Use the full `https://` address with no trailing slash. Content for locations, services, and FAQs is in the `data/` folder.

## ☁️ Deployment

This project is deployed on **Vercel**.

1. Push the code to GitHub.
2. Import the repository in [Vercel](https://vercel.com/new). The Next.js preset is detected automatically.
3. Add `NEXT_PUBLIC_SITE_URL` under **Settings → Environment Variables**.
4. Deploy. Every push to `main` triggers a new deployment.

## 🔒 Notes

- The quote form does **not** save or send data to a server. It only prepares a WhatsApp message that the visitor sends themselves.
- SEO work improves how well search engines understand the site. It does not guarantee rankings.

## 👨‍💻 Developer

**Satish Yadav** · Web Developer, Mumbai

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/satish-yadav-9202ab25a)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/SatishBytes)
