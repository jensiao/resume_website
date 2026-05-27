# 金潇 — Personal Portfolio

Personal resume & portfolio website built with React, TypeScript, and Vite.

## Preview

> Take a screenshot of your homepage and replace the placeholder below:

<!-- ![Homepage](screenshot.png) -->

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS v4** — styling
- **Framer Motion** — animations
- **react-i18next** — i18n (中文 / English)
- **Lucide React** — icons
- **React Router** — routing

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](https://jensiao.github.io/resume_website/#/)

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/     # Navbar, FadeIn, ThemeToggle, LanguageToggle
├── context/        # ThemeContext (dark/light)
├── i18n/           # locales (zh.json, en.json)
├── pages/          # Home, ProjectDetail
├── sections/       # Hero, About, Projects
├── App.tsx
└── main.tsx
```
