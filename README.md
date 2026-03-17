# AquaDrive Design System

A comprehensive color system and component library for the AquaDrive car wash application, supporting both light and dark themes.

## Pages

| Page | Description |
|------|-------------|
| [index.html](index.html) | Color palette — Primary blues, warm neutrals, semantic status colors, and theme tokens |
| [typography.html](typography.html) | Typography — Type scale, font specimens, and usage guidelines for Syne & DM Mono |
| [components.html](components.html) | Components — Buttons, cards, inputs, badges, alerts, modals, and more |
| [themes.html](themes.html) | Themes — VS Code theme integration, CSS custom properties, and usage instructions |

## Design Tokens

### Colors

**Primary Blue** — `#656EA4` base with a 6-step scale (50–800)

**Warm Neutrals** — Rose-tinted grays from `#F4EDED` (light bg) to `#1C1828` (dark bg)

**Semantic Status**
- Error: `#E66260`
- Warning: `#F9DB6D`
- Success: `#52B788`
- Info: `#656EA4`

### Typography

- **Display / Headings**: [Syne](https://fonts.google.com/specimen/Syne) — 400, 600, 700, 800
- **UI / Monospace**: [DM Mono](https://fonts.google.com/specimen/DM+Mono) — 400, 500

### Themes

| Token | Light | Dark |
|-------|-------|------|
| background | `#F4EDED` | `#1C1828` |
| surface | `#FFFFFF` | `#261F34` |
| border | `#E0D5D5` | `#352C43` |
| text.primary | `#1C1828` | `#F4EDED` |
| text.secondary | `#9A8E8E` | `#9A8E9E` |
| interactive.primary | `#656EA4` | `#8C92BE` |
| interactive.hover | `#4E5688` | `#C4C7DF` |
| interactive.subtle | `#EDEEF5` | `#313666` |

## Quick Start

Open any HTML file in a browser — no build tools required. All pages use Google Fonts CDN and are fully self-contained.

```html
<!-- Use the CSS custom properties in your own project -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;600;700;800&display=swap">

<style>
:root {
    --bg: #f4eded;
    --surface: #ffffff;
    --border: #e0d5d5;
    --text: #1c1828;
    --text-muted: #7a6f7f;
    --primary: #656ea4;
    --primary-hover: #4e5688;
    --primary-subtle: #edeef5;
    --error: #e66260;
    --warning: #f9db6d;
    --success: #52b788;
}
</style>
```

## License

Internal design system for AquaDrive.
