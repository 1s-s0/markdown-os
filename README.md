# BRUTALIST_MD // DOCUMENTATION_V1.0

```text
██████╗ ██████╗ ██╗   ██╗████████╗ █████╗ ██╗     ██╗███████╗████████╗   ███╗   ███╗██████╗ 
██╔══██╗██╔══██╗██║   ██║╚══██╔══╝██╔══██╗██║     ██║██╔════╝╚══██╔══╝   ████╗ ████║██╔══██╗
██████╔╝██████╔╝██║   ██║   ██║   ███████║██║     ██║███████╗   ██║      ██╔████╔██║██║  ██║
██╔══██╗██╔══██╗██║   ██║   ██║   ██╔══██║██║     ██║╚════██║   ██║      ██║╚██╔╝██║██║  ██║
██████╔╝██║  ██║╚██████╔╝   ██║   ██║  ██║███████╗██║███████║   ██║      ██║ ╚═╝ ██║██████╔╝
╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝╚══════╝   ╚═╝      ╚═╝     ╚═╝╚═════╝ 
```

## // 00_MANIFESTO
**WE REJECT THE SOFT.**
We reject the rounded corner. We reject the drop shadow. We reject the gradient.

**BRUTALIST_MD** is a high-performance, aesthetically bold Markdown editor built with React, TypeScript, and Vite. It embraces a **Raw, Functional, and Brutalist** design philosophy. It provides a "Digital Lab" environment for writers and developers who value speed, high contrast, and manual control over their workspace.

---

## // 01_SYSTEM_ARCHITECTURE

### [CORE_STACK]
> **REACT 18 + TYPESCRIPT** :: The engine. Strictly typed. Component-based architecture.
> **VITE** :: The ignition. Instant HMR (Hot Module Replacement). Zero-lag dev environment.
> **MARKED** :: The translator. High-speed synchronous Markdown parsing.
> **DOMPURIFY** :: The shield. Sanitizes HTML output against XSS vectors.
> **LUCIDE-REACT** :: The iconography. Sharp. Stroke-based. No fill.
> **VANILLA CSS** :: The skin. Raw CSS variables for real-time theme injection.

---

## // 02_ENGINEERING_LOGIC

### [DATA_FLOW_PIPELINE]
The application follows a strict unidirectional data flow to ensure stability:
1.  **INPUT_BUFFER** :: A controlled `<textarea>` captures raw keystrokes. Every event updates the global `text` state.
2.  **TRANSFORM_NODE** :: A `useMemo` hook monitors the `text` state. When it changes, it triggers `marked.parse()`.
3.  **SANITIZATION_GATE** :: `DOMPurify` strips malicious code from the parsed HTML.
4.  **RENDER_TARGET** :: The resulting safe HTML string is injected into the preview container via `dangerouslySetInnerHTML`.

### [WINDOW_MANAGER] (`BrutalWindow.tsx`)
Unlike standard modal dialogs, BRUTALIST_MD uses a custom-built windowing engine to simulate a desktop OS environment within the browser:
- **ABSOLUTE_COORDINATES** :: Windows float freely in a separate coordinate space.
- **Z-INDEX_STACKING** :: Clicking a window brings it to the foreground (`activeWindow` state).
- **GLOBAL_EVENT_LISTENERS** :: Drag logic uses `mousemove` and `mouseup` on the `document` level to prevent "drag-lag" and ensure smooth movement even when the cursor exits the window bounds.

---

## // 03_OPERATIONAL_MODES

### [VIEW_STATES]
| MODE | DESCRIPTION |
| :--- | :--- |
| **WRITE** | Editor only. Distraction-free. Pure input. |
| **SPLIT** | The Lab. 50% Input / 50% Output. |
| **PREVIEW** | Render only. Read mode. Hides UI clutter. |

### [SYSTEM_CONFIG]
- **ACCENT_INJECTION** :: Users can change the system's primary accent color (Neon Pink, Green, Cyan). This updates the `--accent` CSS variable at the `:root` level.
- **DYNAMIC_TYPOGRAPHY** :: Real-time font size scaling and font family switching (Space Mono, Fira Code, etc.).
- **PERSISTENCE_LAYER** :: All content and settings are synced to `localStorage`.
  - Browser crash? **Data survives.**
  - Tab closed? **Data survives.**

### [EXPORT_ENGINE]
- **RAW_EXPORT** :: Downloads the current buffer as a `.md` file.
- **HTML_EXPORT** :: Generates a standalone `.html` file containing the rendered output.

---

## // 04_VISUAL_LANGUAGE

### [THE_FOUR_PILLARS]
1.  **HIGH_CONTRAST** :: Deep blacks (#000000) and pure whites (#FFFFFF). No greys.
2.  **BOLD_BORDERS** :: 2px solid borders on every interactive element. No ambiguity.
3.  **ZERO_RADIUS** :: Curves are weakness. Edges are strength. Everything is sharp.
4.  **MONOSPACE_FIRST** :: Code is text. Text is code. Monospace fonts are used for all UI elements to emphasize the "machine-like" nature of the tool.

---

## // 05_DIRECTORY_MAP

```text
/src
├── /components  :: [UI_LOGIC] Windows, Panels, Controls
├── App.tsx      :: [CORE_LOGIC] State & Layout
├── App.css      :: [STYLE_ENGINE] CSS Variables & Brutalist Rules
├── main.tsx     :: [ENTRY_POINT] React DOM Root
└── /assets      :: [STATIC_RESOURCES]
```

---

## // 06_INSTALLATION_SEQUENCE

### [PREREQUISITES]
- Node.js (v18+)
- npm or yarn

### [INIT_PROTOCOL]
```bash
# INJECT_DEPENDENCIES
npm install

# INITIALIZE_DEV_SERVER
npm run dev

# COMPILE_PRODUCTION_BUILD
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
