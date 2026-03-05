# BRUTALIST_MD // DOCUMENTATION_V0.7beta

## 01_INTRODUCTION
**BRUTALIST_MD** is a high-performance, aesthetically bold Markdown editor built with React, TypeScript, and Vite. It rejects the soft gradients and rounded corners of modern UI, embracing a **Raw, Functional, and Brutalist** design philosophy.

It provides a "Digital Lab" environment for writers and developers who value speed, high contrast, and manual control over their workspace.

---

## 02_TECH_STACK
- **Framework:** React 18+ (TypeScript)
- **Build Tool:** Vite (Ultra-fast HMR)
- **Parser:** [Marked](https://marked.js.org/) (High-speed synchronous parsing)
- **Sanitizer:** [DOMPurify](https://github.com/cure53/dompurify) (XSS protection)
- **Icons:** [Lucide-React](https://lucide.dev/) (Sharp, consistent stroke icons)
- **Styling:** Vanilla CSS (CSS Variables for real-time theme injection)

---

## 03_ARCHITECTURE_EXPLANATION

### THE DATA FLOW (SINGLE SOURCE OF TRUTH)
The application follows a strict unidirectional data flow:
1.  **INPUT LAYER:** A controlled `<textarea>` captures raw text. Every keystroke updates the `text` state.
2.  **TRANSFORM LAYER:** A `useMemo` hook monitors the `text` state. When it changes, it triggers `marked.parse()`, followed by `DOMPurify.sanitize()`. This ensures the preview is always valid and safe HTML.
3.  **OUTPUT LAYER:** The resulting HTML string is injected into a preview container via `dangerouslySetInnerHTML`.

### THE WINDOWING SYSTEM (`BrutalWindow.tsx`)
Unlike standard modal dialogs, BRUTALIST_MD uses a custom-built windowing engine:
- **Absolute Positioning:** Windows exist in a separate coordinate space.
- **Z-Index Management:** Clicking a window brings it to the front (`activeWindow` state).
- **Custom Drag Logic:** Implemented using `mousemove` and `mouseup` event listeners on the document level to prevent "drag-lag" and ensure smooth movement even when the mouse leaves the window header.

---

## 04_CORE_FEATURES

### 1. TRIPLE_VIEW_MODES
- **WRITE:** Maximize focus. Only the editor is visible.
- **SPLIT:** The standard "Lab" mode. 50/50 split between code and result.
- **PREVIEW:** Final validation mode. Hides all UI clutter.

### 2. SYSTEM_CONFIG (CUSTOMIZATION)
- **ACCENT_INJECTION:** Users can change the system's primary accent color (Neon Pink, Green, Cyan). This is handled by updating `--accent` CSS variable at the `:root` level.
- **DYNAMIC_TYPOGRAPHY:** Real-time font size scaling and font family switching (Space Mono, Fira Code, etc.).
- **PERSISTENCE:** All content and settings are synced to `localStorage`. Your work survives a browser crash or refresh.

### 3. EXPORT_ENGINE
- **RAW_EXPORT:** Downloads the current buffer as a `.md` file.
- **HTML_EXPORT:** Generates a standalone `.html` file containing the rendered output.

---

## 05_DESIGN_PHILOSOPHY: BRUTALISM
The UI is built on these four pillars:
1.  **HIGH_CONTRAST:** Deep blacks and pure whites for maximum readability.
2.  **BOLD_BORDERS:** 2px solid borders on every interactive element.
3.  **ZERO_RADIUS:** No rounded corners. Everything is sharp.
4.  **MONOSPACE_FIRST:** Monospace fonts are used for all UI elements to emphasize the "machine-like" nature of the tool.

---

## 06_INSTALLATION_&_RUNNING

### PREREQUISITES
- Node.js (v18+)
- npm or yarn

### SETUP
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 07_FILE_STRUCTURE
- `/src/components/`: UI Logic (Windows, Panels)
- `/src/App.tsx`: State Management & Main Layout
- `/src/App.css`: Brutalist Styling Engine
- `/src/main.tsx`: Entry Point
- `/index.html`: Metadata & Font Loading

---

**[SYSTEM_STATUS: STABLE]**
**[VERSION: 2.0.0]**
