```markdown
# The Design System: Editorial Engineering & Tonal Depth

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Terminal."** 

We are moving away from the static, boxy layouts of traditional social networks. Instead, we are creating a high-end editorial experience that feels as fluid as a modern IDE and as authoritative as a premium tech publication. This design system breaks the "template" look by utilizing intentional asymmetry—such as offset code snippets and overlapping surface layers—combined with a high-contrast typography scale. We prioritize breathing room over information density, ensuring every interaction feels intentional, premium, and distinctively "developer-first."

---

## 2. Colors & Surface Philosophy
The palette is built on a foundation of deep, layered darks, accented by high-frequency electric tones.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. The UI must feel like a continuous, immersive environment. Boundaries are created exclusively through background color shifts. For example, a `surface-container-low` feed should sit directly on a `surface` background without a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of obsidian glass.
- **Base Layer:** `surface` (#0F1419) – The canvas.
- **Secondary Sections:** `surface-container-low` (#171C21) – Used for the persistent sidebar.
- **Interactive Cards:** `surface-container` (#1B2025) – The primary content containers.
- **Elevated Modals:** `surface-container-highest` (#30353B) – For pop-overs and focus states.

### The "Glass & Gradient" Rule
To avoid a flat "Bootstrap" feel, floating elements (like dropdowns or hover cards) must use **Glassmorphism**. Apply a semi-transparent `surface-variant` with a `backdrop-blur` of 12px-20px. 
*   **Signature Gradients:** For primary CTAs, do not use flat colors. Use a linear gradient transitioning from `primary` (#57F1DB) to `primary-container` (#2DD4BF) at a 135-degree angle to provide visual "soul."

---

## 3. Typography
We use **Inter** for its neutral, high-legibility character, contrasted with **JetBrains Mono** to ground the system in developer culture.

- **Display (display-lg/md):** Use for hero moments and impact stats. These should feel editorial—tight letter-spacing (-0.02em) and Bold 700.
- **Headings (headline-sm to title-lg):** The "Anchors." Use these to break up the feed. Always pair a `headline-sm` with `body-md` in `on-surface-variant` to create a clear information hierarchy.
- **Body (body-lg/md):** Our workhorse. `body-md` (0.875rem) is the standard for social posts to maintain a high-end, sophisticated density.
- **Labels (label-md/sm):** Bold 700, All Caps, with +0.05em letter spacing. Use for category tags and metadata to provide a "functional" utility aesthetic.

---

## 4. Elevation & Depth
In this design system, depth is communicated through light and tone, not structural lines.

- **The Layering Principle:** Place a `surface-container-lowest` (#0A0F14) element inside a `surface-container` card to create an "inset" code block or media area. This creates natural "wells" of content.
- **Ambient Shadows:** For floating elements, use a "Double-Shadow" technique: 
    1. A sharp 2px shadow for definition.
    2. A soft 20px blur at 4% opacity using a tinted `on-surface` color.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, it must be a **Ghost Border**. Use the `outline-variant` token at 15% opacity. Never use 100% opaque borders.
- **Micro-Glows:** For active states (like a "Live" indicator), use the `primary` color with a 4px outer glow to simulate a light-emitting diode.

---

## 5. Components

### Buttons
- **Primary:** Pill-shaped. Gradient fill (`primary` to `primary-container`). Shadow-less at rest; 8px glow on hover.
- **Secondary:** Pill-shaped. `surface-container-high` background with `primary` text. No border.
- **Tertiary:** Text-only in `primary`. Underline appears only on hover.

### Input Fields & Search
Forbid the "box" look. Use `surface-container-low` with a bottom-only `outline-variant` (20% opacity). On focus, the bottom border transitions to 100% `primary` with a soft teal glow.

### Cards & Lists
- **The Divider Rule:** Strictly forbid horizontal rules (`<hr>`). Use a `16` (4rem) spacing gap or a slight shift from `surface-container` to `surface-container-low` to separate items.
- **Media Containers:** Images and videos should always have the `DEFAULT` (1rem) corner radius and a 1px "Ghost Border" to prevent dark media from bleeding into the background.

### The "Code Block" Component
Specifically for this network, code blocks should use `surface-container-lowest` with a "copy" button that only appears on hover. Use **JetBrains Mono** with a slightly increased line-height (1.6) for maximum readability.

---

## 6. Do’s and Don'ts

### Do:
- **Do** use asymmetrical spacing (e.g., more top padding than bottom in a card) to create an editorial feel.
- **Do** use `secondary-fixed-dim` (#D0BCFF) for "Social" actions like likes or follows to distinguish them from "Functional" actions (Teal).
- **Do** allow content to "breath." When in doubt, increase the spacing scale by one increment.

### Don’t:
- **Don't** use pure black (#000000) or pure grey. Every dark tone must be tinted with the charcoal/obsidian base.
- **Don't** use standard "Drop Shadows." If an element needs to pop, use a background color shift or a glassmorphism blur.
- **Don't** use sharp corners. Everything follows the 12px or Pill-shape logic to maintain a modern, approachable feel.
- **Don't** use high-contrast dividers. Let the negative space do the work.