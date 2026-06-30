# Manish Rajak — Cinematic Portfolio

A premium **Next.js 16** portfolio with a talking-head hero video, floating particle layer, scroll-reveal animations, and a dark cinematic aesthetic.

---

## ⚡ Quick Start (Run Locally)

### Step 1 — Prerequisites
Make sure you have these installed:
- **Node.js 18+** → https://nodejs.org
- **npm** (comes with Node.js)

Check your versions:
```bash
node --version   # should be 18.x or higher
npm --version    # should be 9.x or higher
```

### Step 2 — Extract the zip
```bash
unzip manish-portfolio.zip
cd manish-portfolio
```

### Step 3 — Install dependencies
```bash
npm install
```
This installs all packages (Next.js, GSAP, etc). Takes about 30–60 seconds.

### Step 4 — Start development server
```bash
npm run dev
```

### Step 5 — Open in browser
Visit: **http://localhost:3000**

You should see your full cinematic portfolio with the hero video playing.

---

## 🏗️ Build for Production

```bash
npm run build    # creates optimized build
npm start        # runs production server on http://localhost:3000
```

---

## 🚀 Deploy to Vercel (Free, 2 minutes)

1. Push this folder to a **GitHub repo**
2. Go to **https://vercel.com** → Sign in with GitHub
3. Click **"Add New Project"** → Import your repo
4. Click **"Deploy"** — zero configuration needed
5. Your site will be live at `your-name.vercel.app`

---

## 📁 Project Structure

```
manish-portfolio/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx            # Fixed nav, scroll-aware, mobile hamburger
│   │   ├── HeroSection.tsx       # Cinematic video hero (fg + blurred bg)
│   │   ├── ParticleCanvas.tsx    # Canvas particle system with mouse parallax
│   │   ├── RevealUtils.tsx       # Scroll-reveal hook + shared section components
│   │   ├── AboutSection.tsx      # Stats cards + skill cloud
│   │   ├── ExperienceSection.tsx # Work experience timeline
│   │   ├── ProjectsSection.tsx   # Project cards with stack chips
│   │   ├── AchievementsSection.tsx
│   │   └── ContactSection.tsx    # Links + footer
│   ├── data/
│   │   └── resume.ts             # ← All your content lives here
│   ├── globals.css               # CSS variables + base styles
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── hero.mp4                  # Your talking-head video
├── package.json
└── README.md
```

---

## ✏️ How to Customize

### Update your links
Open `app/data/resume.ts` and update:
```ts
links: {
  github: "https://github.com/YOUR_HANDLE",
  linkedin: "https://linkedin.com/in/YOUR_HANDLE",
  leetcode: "https://leetcode.com/YOUR_HANDLE",
},
```

### Update project GitHub links
In the same file, change the `github` field in each project under `projects: [...]`.

### Replace the hero video
Drop your new video at `public/hero.mp4` (keep the same filename).

### Change accent color
In `app/globals.css`, change:
```css
--orange: #f97316;
```

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Animations | CSS transitions + IntersectionObserver |
| Particles | Custom HTML Canvas (no dependencies) |
| Fonts | Inter + Space Grotesk (Google Fonts) |
| Video | HTML5 `<video>` autoplay |

