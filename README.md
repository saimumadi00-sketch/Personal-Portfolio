
The goal of this project is to demonstrate how a traditional static portfolio can be refactored into a component-based React application. The old site used separate HTML files and one shared JavaScript file. The new site uses React Router for page navigation, reusable components for repeated UI sections, and React hooks for stateful behavior.

This conversion focuses on:

- Replacing direct DOM manipulation with React state and effects.
- Moving repeated UI into reusable components.
- Using props to pass data and callbacks.
- Keeping Bootstrap as the visual framework.
- Preserving the same portfolio content and page structure.
- Improving maintainability through a clean folder structure.

## Tech Stack

- **React** for UI components.
- **Vite** for development server and production builds.
- **React Router v6** for client-side page routing.
- **Bootstrap 5** for layout, cards, forms, tables, navbar, carousel, alerts, badges, and modals.
- **Bootstrap Icons** for interface icons.
- **ESLint** for code quality checks.
- **JavaScript ES Modules** for imports and exports.

## Main Features

### React Router Pages

The application includes five routed pages:

- `/` - Home
- `/about` - About
- `/projects` - Projects
- `/skills` - Skills
- `/contact` - Contact

Navigation is handled with `BrowserRouter`, `Routes`, `Route`, and `NavLink`.

### Dark and Light Mode

Dark mode is controlled from `App.jsx` using React state:

- Theme preference is saved in `localStorage`.
- The `data-bs-theme` attribute is updated on `document.documentElement`.
- Bootstrap automatically adapts many components based on the active theme.
- The theme toggle is fully controlled by props.

### Typewriter Hero Text

The Home page includes a typewriter animation built with:

- `useState`
- `useEffect`
- `useRef`
- `setTimeout`

The rotating phrases describe the portfolio owner as a Computer Science student, aspiring web developer, frontend enthusiast, problem solver, and NSU final-year student.

### Controlled Contact Form

The Contact page uses a fully controlled React form. All input values are stored in component state.

Validation includes:

- Name is required and must be at least 2 characters.
- Email is required and must match a valid email pattern.
- Subject is required.
- Message is required, must be at least 10 characters, and cannot exceed 500 characters.
- Consent checkbox must be selected.

The form also includes:

- Real-time Bootstrap `is-valid` and `is-invalid` feedback.
- Inline error messages.
- Live message character counter.
- Success alert after valid submission.
- Toast notification through a parent callback.

### Project Filtering

The Projects page demonstrates adding and removing rendered elements through state.

Users can filter project cards by:

- All
- Web
- Python
- Java

The visible project list is stored in state and updated with `.filter()`.

### Toast Alerts

Toast-style alerts are managed by the root app state.

Each toast has:

- `id`
- `message`
- `type`

Toasts are added when events occur and automatically removed after 4 seconds.

### Show and Hide Sections

The `SectionToggle` component demonstrates conditional rendering. It accepts a title, children, and a default visibility value. It is used for sections such as Portfolio Highlights and Personal Details.

### Back-to-Top Button

The `BackToTop` component:

- Listens for window scroll events.
- Appears only when the user scrolls past 300 pixels.
- Uses smooth scrolling to return to the top.
- Is conditionally rendered instead of only hidden with CSS.

### Animated Skill Bars

Skill bars animate from `0` to their target percentage using:

- `useState`
- `useEffect`
- Delayed state update
- CSS transition

## Folder Structure

```text
.
|-- old-html-version/
|   |-- about.html
|   |-- contact.html
|   |-- index.html
|   |-- main.js
|   |-- projects.html
|   |-- README.md
|   `-- skills.html
|-- public/
|   |-- favicon.svg
|   `-- icons.svg
|-- src/
|   |-- components/
|   |   |-- BackToTop.jsx
|   |   |-- ContactForm.jsx
|   |   |-- Navbar.jsx
|   |   |-- ProjectCard.jsx
|   |   |-- SectionToggle.jsx
|   |   |-- SkillBar.jsx
|   |   |-- ThemeToggle.jsx
|   |   `-- Toast.jsx
|   |-- data/
|   |   |-- projects.js
|   |   `-- skills.js
|   |-- layouts/
|   |   `-- MainLayout.jsx
|   |-- pages/
|   |   |-- About.jsx
|   |   |-- Contact.jsx
|   |   |-- Home.jsx
|   |   |-- Projects.jsx
|   |   `-- Skills.jsx
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- .gitignore
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- README.md
`-- vite.config.js
```

## Component Summary

### `Navbar.jsx`

Renders the Bootstrap navigation bar and page links. It uses React Router `NavLink` so the active page receives the `active` class automatically.

### `ThemeToggle.jsx`

Renders a controlled dark and light mode button. It receives `darkMode` and `onToggle` from its parent.

### `ProjectCard.jsx`

Displays a project title, tags, description, status, and a detail button. All content is passed through props.

### `SkillBar.jsx`

Displays a skill label, badge, and animated progress bar.

### `ContactForm.jsx`

Contains controlled form inputs, validation logic, error messages, success feedback, and character counting.

### `Toast.jsx`

Renders toast alerts from the root `toasts` array.

### `BackToTop.jsx`

Shows a floating button after scrolling down the page.

### `SectionToggle.jsx`

Provides reusable show and hide behavior for page sections.

### `MainLayout.jsx`

Wraps all pages with the shared navbar, main content area, footer, toast container, and back-to-top button.

## Data Files

### `src/data/projects.js`

Stores project data as an array of objects. Each project includes:

- `id`
- `title`
- `tags`
- `description`
- `status`

### `src/data/skills.js`

Stores skill data in grouped arrays:

- `languages`
- `tools`
- `soft`

This keeps page components cleaner and avoids hardcoding repeated data directly inside JSX.

## React Concepts Demonstrated

This project demonstrates the following React concepts:

- Functional components only.
- `useState` for local and root state.
- `useEffect` for side effects.
- `useRef` for typewriter animation indexes.
- Controlled inputs.
- Props for data and callbacks.
- Conditional rendering.
- Array mapping for repeated UI.
- State-based filtering.
- State-based alerts and automatic removal.
- Component composition.
- Client-side routing.

## Bootstrap Concepts Used

The UI uses Bootstrap for:

- Responsive navbar.
- Cards.
- Grid system.
- Buttons.
- Badges.
- Tables.
- Progress bars.
- Alerts.
- Modal-style overlay.
- Carousel.
- Form validation styling.
- Utility classes.

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the local development server:

```bash
npm run dev
```

The app will be available at:

```text
http://localhost:5173/
```

If port `5173` is busy, Vite may choose another available port.

## Build

Create a production build:

```bash
npm run build
```

The production files are generated in the `dist/` folder.

## Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Lint

Run ESLint:

```bash
npm run lint
```

## Available Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Builds the app for production. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Runs ESLint checks. |

## Original HTML Version

The original portfolio files were moved into `old-html-version/`.

This folder is kept to show the before and after structure:

- Before: separate HTML files plus `main.js`.
- After: React components, hooks, data files, and routed pages.

The old files are not used by the React app.

## Notes

- The React app is at the repository root, not inside a nested `lab5-portfolio/` folder.
- `node_modules/` and `dist/` are ignored by Git.
- The app uses only React built-in hooks and does not use Redux or any external state management library.
- All major interactive behavior from the original `main.js` has been replaced with React components and hooks.

## Author

Md Saimum Al Mahmud  
Computer Science, 4th Year  
North South University, Dhaka
