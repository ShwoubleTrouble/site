# Project: shwouble's personal website

Personal bio/portfolio website of `shwouble`. Static single-page website without build tools or external runtime dependencies.

---

## 🛠 Tech Stack

- **HTML5**: Semantic markup, accessibility (`aria-*`).
- **CSS3**: Modern CSS, CSS Custom Properties, **Material Design 3 (Material You)** design system, Flexbox/Grid, responsive layout.
- **JavaScript (Vanilla)**: Clean ES6+, direct DOM manipulation, no frameworks or libraries.
- **Fonts**: Google Fonts (`Roboto:wght@400;500;700`).

---

## 📁 Project Structure

- `index.html` — main page markup:
  - Theme toggle button (`.theme-toggle-container`).
  - Main profile card (`.main-profile-card`): avatar, handle, bio, and social links (Telegram, GitHub, Email) styled as M3 buttons.
  - Projects window (`.projects-window`): project cards (`senko_bot`, `captain_bot`) with repository links and descriptions.
  - Devices window (`.devices-window`): interactive canvas (`.devices-canvas`) with floating devices (ThinkPad, POCO X3 NFC).
- `style.css` — styles and design system:
  - Material You design tokens (`--md-sys-color-*`) for light theme (`:root`) and dark theme (`[data-theme="dark"]`).
  - Card components, M3 buttons, responsive layout grid (`.layout-wrapper`).
  - Interactive devices canvas styling, animations, and custom floating tooltip (`.device-tooltip`).
- `script.js` — client-side logic:
  - Theme switching: `localStorage` persistence and `prefers-color-scheme` media query support.
  - Avatar fallback: shows a placeholder letter (`#avatar-fallback`) if `avatar.jpg` fails to load.
  - Random device positioning (`randomizeDevices`): placement across non-overlapping sectors with random rotation (`--rot`).
  - Interactive cursor tooltip: mouse tracking (`mouseenter`, `mousemove`, `mouseleave`).
- Assets:
  - `avatar.jpg` — profile avatar image.
  - `thinkpad.png`, `phone.png` — device images.

---

## 📐 Architecture Guidelines & Development Rules

1. **No Third-Party Build Tools**:
   - Do not add `package.json`, webpack, vite, tailwind, or npm packages unless explicitly instructed. The site must run out-of-the-box by opening `index.html` or via any simple HTTP server (e.g., `python3 -m http.server`).
2. **Material You Design System**:
   - Always use `--md-sys-color-*` variables when adding or modifying colors.
   - Maintain contrast and consistency between dark and light themes.
3. **Mobile Responsiveness**:
   - Ensure all layout changes adapt properly across mobile screen sizes (media queries in `style.css`).
4. **Targeted Changes**:
   - Make minimal, targeted code modifications without unnecessarily rewriting entire files or disrupting existing code style.
