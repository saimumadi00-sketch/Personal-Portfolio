# 💼 Md Saimum Al Mahmud — Personal Portfolio

A multi-page personal portfolio website built as part of the **CSE482 — Internet and Web Technology** lab series at **North South University, Dhaka**.

---

## 📄 Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero section, carousel, feature cards, modal |
| About | `about.html` | Profile card, personal details table, education |
| Projects | `projects.html` | Project cards, roadmap table, modal |
| Skills | `skills.html` | Animated progress bars, tools table, soft skills |
| Contact | `contact.html` | Contact info, validated contact form |

---

## 🛠️ Technologies Used

- **HTML5** — Semantic structure across all pages
- **CSS3** — Animations, transitions, media queries
- **Bootstrap 5.3.3** — Responsive grid, components, utilities
- **JavaScript (ES6)** — External file `main.js` for all interactivity

---

## ✨ Features

### Lab 1 — Basic HTML & CSS
- 5-page structure with consistent header navigation
- Basic CSS styling: colors, fonts, margins, borders

### Lab 2 — Bootstrap
- Responsive Bootstrap navbar (collapses on mobile)
- Bootstrap components: Cards, Alerts, Badges, Buttons, Tables, Forms, Modal, Carousel

### Lab 3 — Responsive Design & Animations
- Fully responsive layout using Bootstrap grid and CSS media queries
- CSS animations: `fadeSlideUp` on page load with staggered delays
- Card hover lift transitions (`transform` + `box-shadow`)
- Navbar underline slide effect using `::after` pseudo-element
- Animated skill progress bars triggered on scroll
- Form shake animation on invalid submit

### Lab 4 — JavaScript (External File: `main.js`)
- **Dark / Light mode** toggle (persisted via `localStorage`)
- **Typewriter effect** on hero — cycles through 5 phrases
- **Dynamic greeting** — changes based on time of day
- **Show / Hide sections** — Portfolio Highlights, Personal Details
- **Toast notifications** — animated, auto-dismissing alerts
- **Form validation** — real-time `is-valid`/`is-invalid` feedback
- **Live character counter** on contact form textarea
- **Back-to-top button** — dynamically added to the DOM
- **Reading-time badges** — injected into card paragraphs
- **Navbar scroll shadow** — enhances depth on scroll

---

## 📁 File Structure

```
lab-cse482/
├── index.html       # Home page
├── about.html       # About page
├── projects.html    # Projects page
├── skills.html      # Skills page
├── contact.html     # Contact page
└── main.js          # External JavaScript (Lab 4)
```

---

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/saimumadi00-sketch/lab-cse482.git
   ```
2. Open `index.html` in any modern browser — no build step or server required.

---

## 👤 Author

**Md Saimum Al Mahmud**
- 🎓 B.Sc. Computer Science, 4th Year
- 🏫 North South University, Dhaka, Bangladesh
- 🐙 [github.com/saimumadi00-sketch](https://github.com/saimumadi00-sketch)

---

## 📜 License

This project was created for academic purposes as part of NSU CSE482 coursework.
