# Saimum Al-Mahmud - Personal Website

This repository powers my personal portfolio website:

https://saimum-aditto.vercel.app

It is maintained as a long-term home for my background, projects, skills, and contact information. The site is built with React and Vite, uses Bootstrap for the interface, and keeps reusable UI, data, hooks, and layout code organized for ongoing updates.

## Owner

Saimum Al-Mahmud  
Computer Science, 4th Year  
North South University, Dhaka

## Tech Stack

- React 19
- Vite
- React Router v6
- Bootstrap 5.3
- Bootstrap Icons
- Framer Motion
- React Intersection Observer
- React CountUp
- React Helmet Async
- ESLint

## Main Features

- Multi-page portfolio experience with client-side routing.
- Responsive Bootstrap layout for desktop, tablet, and mobile screens.
- Dark and light theme support through `ThemeContext`.
- SEO metadata per page with `react-helmet-async`.
- Animated page transitions and scroll reveal effects with Framer Motion.
- Project filtering by category.
- Animated skill bars and circular progress rings.
- Timeline section for education and experience.
- Stat counters for portfolio highlights.
- Controlled contact form with validation and toast feedback.
- Back-to-top button for long pages.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home, hero section, highlights, stats, and quick links. |
| `/about` | Personal profile, background, details, and journey timeline. |
| `/projects` | Project cards, category filters, and roadmap. |
| `/skills` | Technical skills, tools, proficiency rings, and soft skills. |
| `/contact` | Contact information and validated message form. |

## Project Structure

```text
src/
|-- components/
|   |-- BackToTop.jsx
|   |-- Button.jsx
|   |-- ContactForm.jsx
|   |-- FilterBar.jsx
|   |-- Navbar.jsx
|   |-- PageHeader.jsx
|   |-- ProgressRing.jsx
|   |-- ProjectCard.jsx
|   |-- ScrollReveal.jsx
|   |-- SEOHead.jsx
|   |-- SectionToggle.jsx
|   |-- SkillBar.jsx
|   |-- StatCounter.jsx
|   |-- ThemeToggle.jsx
|   |-- Timeline.jsx
|   `-- Toast.jsx
|-- context/
|   `-- ThemeContext.jsx
|-- data/
|   |-- projects.js
|   |-- skills.js
|   |-- stats.js
|   `-- timeline.js
|-- hooks/
|   |-- useLocalStorage.js
|   `-- useScrollSpy.js
|-- layouts/
|   `-- MainLayout.jsx
|-- pages/
|   |-- About.jsx
|   |-- Contact.jsx
|   |-- Home.jsx
|   |-- Projects.jsx
|   `-- Skills.jsx
|-- utils/
|   `-- variants.js
|-- App.jsx
|-- index.css
`-- main.jsx
```

## Content Updates

Most portfolio content is intentionally kept in `src/data/` so it can be updated without digging through page layout code:

- `projects.js` for project cards.
- `skills.js` for languages, tools, and soft skills.
- `stats.js` for animated homepage counters.
- `timeline.js` for education and experience entries.

Reusable interface patterns live in `src/components/`, shared layout lives in `src/layouts/`, and theme state lives in `src/context/ThemeContext.jsx`.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## Available Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Creates a production build in `dist/`. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs ESLint checks. |

## Deployment

The live site is deployed on Vercel. Updates pushed to the deployment branch are picked up by Vercel automatically.

## Maintenance Notes

- Keep personal content current in `src/data/`.
- Keep new UI patterns reusable when they are shared across pages.
- Run `npm run build` before publishing meaningful changes.
- Avoid committing `node_modules/` or `dist/`; both are ignored by Git.
