# ⚡ Maaz Vhora - Personal Developer Portfolio

A modern, high-performance, and visually stunning personal portfolio website built with pure **HTML5**, **Vanilla CSS3**, and **Vanilla JavaScript (ES6+)**.

---

## ✨ Features & Highlights

- **Aesthetic Design**:
  - Dark mode by default with tailored Plum & Milk palette (`#381932`, `#fff3e6`, velvet obsidian plum `#180b15`, berry plum `#7b2964`).
  - Smooth light mode toggle with state persisted in `localStorage`.
  - Modern glassmorphism with backdrop filters and clean card surfaces.
  - Simple, distraction-free solid background with high performance.
  - Native, smooth system cursor with pointer hover feedback.
  - Top scroll-progress indicator bar.

- **Interactive Sections**:
  - **Hero**: Rotating typewriter headline, floating tech tags, 3D mouse tilt card, and live stats chips.
  - **Interactive CLI Terminal**: Functional in-browser terminal widget with commands (`whoami`, `skills`, `projects`, `contact`, `date`, `clear`, `sudo`).
  - **Dynamic Metrics**: Number counters animated via `IntersectionObserver`.
  - **Filterable Tech Stack**: Category tabs (Frontend, Backend, Cloud & DevOps, Architecture) with animated progress bars.
  - **Curated Projects Showcase**: Category filters (SaaS, AI, FinTech, DevTools) and interactive **Quick-View Modal** with architecture breakdowns.
  - **Experience Roadmap**: Timeline highlighting roles, achievements, and technical milestones.
  - **Contact & Communication**: One-click "Copy Email to Clipboard" with toast notification, live local time clock (IST UTC+5:30), and fully validated contact form.

---

## 📂 Project Structure

```
portfolio-maaz/
├── index.html              # Semantic HTML5 markup with SEO & OpenGraph tags
├── css/
│   └── style.css           # Design tokens, CSS variables, glassmorphic system, responsive styles
├── js/
│   └── main.js             # Canvas engine, terminal logic, modal, theme switcher, validation
├── assets/
│   └── images/             # Ultra-high-resolution avatars and project mockups
│       ├── hero-avatar.jpg
│       ├── project-saas.jpg
│       ├── project-ai.jpg
│       ├── project-fintech.jpg
│       └── project-collab.jpg
└── README.md
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or launch a lightweight local server:

### Option 1: Python HTTP Server (Built-in)
```bash
python3 -m http.server 4321
```
Then visit: [http://localhost:4321](http://localhost:4321)

### Option 2: Node.js (npx serve)
```bash
npx -y serve .
```

### Option 3: Direct File
Double-click `index.html` to open in Google Chrome, Safari, Firefox, or Edge.
