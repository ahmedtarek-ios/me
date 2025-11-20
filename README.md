# Ahmed Tarek Ahmed · Senior iOS Engineer Portfolio

I’m Ahmed—“Medo” to most teams—a Cairo-based senior iOS engineer obsessed with Swift craftsmanship, clean architecture, and human-centered product thinking. I’ve delivered 25+ production apps ranging from nationwide pharmacies and healthcare platforms to omnichannel chat solutions. This repo contains the interactive portfolio that showcases my story, process, and selected work. My latest résumé is included at `public/Ahmed_Tareks_Resume.pdf` and surfaced on the hero download badge.

## Snapshot
- 25+ shipped mobile products across health, retail, fintech, and enterprise communication.
- Fluent in Swift, SwiftUI, Combine, Objective-C, Kotlin, Java, Spring, SQL, and UI/UX collaboration.
- Based in Maadi, Cairo with global freelance, contract, and full-time experience.
- Passionate about mentorship, MV* architectures, and shipping polished App Store experiences.

## Portfolio Highlights
- Hero, About, Experience, Projects, Skills, Education, Testimonials, and Contact sections are driven from one curated JSON file (`src/data/profile.json`) so updates stay effortless.
- `/projects` is a deep dive gallery with VIP pinning, technology tags, modal walk-throughs, and store links for each app.
- Contact area blends WhatsApp one-taps, EmailJS-powered validation, and a Google Map pinned to Maadi.
- Floating share widgets, WhatsApp quick actions, and theme toggling switch between light/dark portraits to keep the brand personal.
- Structured data, sitemap, and SEO metadata ensure recruiters or clients can find me (and message me) fast.

## Signature Work
- **El Ezaby Pharmacy** – Led the SwiftUI + Combine rewrite of Egypt’s largest pharmacy app, shipping subscription ordering and loyalty mechanics.
- **Wayak Healthcare Platform** – Built telehealth booking, prescription delivery, and Wayak card savings journeys with scalable architecture.
- **TEBCOM Tele-Consultation Suite** – Delivered doctor/patient apps with SignalR and Twilio integrations for secure remote care.
- **Awfar Chat & Connect** – Unified WhatsApp, Facebook, Instagram, Telegram, and X conversations for call centers in one Swift-based interface.

## Toolbox
- **Frontend & Runtime:** React 18, TypeScript, Vite, React Router DOM, TanStack Query, next-themes.
- **Design System:** Tailwind CSS with custom gradients/tokens, shadcn/ui primitives, Lucide icons, Embla carousel, Sonner toasts.
- **Maps & Messaging:** `@react-google-maps/api`, EmailJS, WhatsApp deep links.
- **Quality:** ESLint 9, TypeScript strict configs, componentized UI kit in `src/components/ui`.

## Explore the Codebase
- `src/pages/Index.tsx` stitches together all sections with theme + SEO providers.
- `src/pages/Projects.tsx` powers the dedicated project explorer with modal slideshows.
- `src/components/` houses every section (Hero, About, Experience, Skills, Education, Testimonials, Contact), floating actions, and the theme toggle.
- `src/components/ui/` mirrors shadcn/ui atoms so new UI stays consistent.
- `src/data/profile.json` is the single source of truth for biography, work, education, skills, testimonials, and projects.
- `public/` stores favicon assets, sitemap/robots, and my PDF résumé (`Ahmed_Tareks_Resume.pdf`).

## Run It Locally
1. **Install dependencies** (Node.js 18+ recommended):
   ```bash
   npm install
   ```
2. **Start the dev server**:
   ```bash
   npm run dev
   ```
   Visit the printed Vite URL (default `http://localhost:5173`).
3. **Create a production build**:
   ```bash
   npm run build
   npm run preview   # optional: serve the build locally
   ```
4. **Lint/quality check**:
   ```bash
   npm run lint
   ```

## Personalization & Branding
1. **Profile + projects:** Edit `src/data/profile.json` to refresh copy, roles, technology tags, testimonials, and skills percentages. The UI reflects changes instantly.
2. **Imagery + résumé:** Replace light/dark portraits in the JSON and swap the CV PDF in `public/Ahmed_Tareks_Resume.pdf` to ship updated downloads.
3. **Design tokens:** Tune the gradient-driven palette and typography inside `src/index.css` plus `tailwind.config.ts`.
4. **Routes & sections:** Extend `App.tsx` if you want extra case-study pages, blog posts, or landing screens.

## Integrations & Keys
- **EmailJS:** `src/components/Contact.tsx` stores service/template/public IDs inline. Swap them for your own keys (or move them to env variables before deploying).
- **Google Maps:** Replace `GOOGLE_MAPS_API_KEY` and the `center` coordinates in `Contact.tsx` for your city.
- **Social & WhatsApp:** Numbers/links live in `profile.social_accounts`, powering floating buttons and the footer.

## Resume & Contact
- Résumé path: `public/Ahmed_Tareks_Resume.pdf` (download button on the hero + direct link for ATS submissions).
- Email: `ahmed.tarek.dev@outlook.com`
- WhatsApp: `+20 112 566 1193`
- WhatsApp Business: `+20 111 540 8161`
- LinkedIn/GitHub/StackOverflow URLs are embedded throughout the portfolio and in `profile.json`.

## Deployment
Run `npm run build`, then host the `dist/` folder on Vercel, Netlify, GitHub Pages, Cloudflare Pages, or any static-friendly platform. If you use Lovable, publish straight from the Lovable dashboard or by pushing to this repo—no extra configuration required.
