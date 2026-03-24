# Project Description

This is a design system showcase web page.
It contains thorough details on implementations, colors, guidelines, components and ports for this color scheme.

## Colors

### Neutrals

| Name     | Color Hex | Description            |
|----------|-----------|------------------------|
| Warm 50  | #F4EDED   | App background (light) |
| Warm 100 | #E8DEDE   | Card surface (light)   |
| Warm 200 | #E0D5D5   | Borders, dividers      |
| Warm 500 | #9A8E8E   | Secondary / muted text |
| Warm 800 | #3D3240   | Primary text (light)   |
| Warm 850 | #352C43   | Dark elevated surface  |
| Warm 900 | #261F34   | Dark card surface      |
| Warm 950 | #1C1828   | App background (dark)  |

### Blue

| Name     | Color Hex | Description            |
|----------|-----------|------------------------|
| Blue 50  | #EDEEF5   | Tinted backgrounds     |
| Blue 200 | #C4C7DF   | Subtle borders         |
| Blue 400 | #8C92BE   | Hover states           |
| Blue 500 | #656EA4   | Primary brand and CTAs |
| Blue 600 | #4E5688   | Active / pressed       |
| Blue 800 | #313666   | Dark mode tint surface |

### Purple

| Name       | Color Hex | Description               |
|------------|-----------|---------------------------|
| Purple 50  | #F3EDF7   | Tinted backgrounds        |
| Purple 200 | #D4C4DE   | Subtle borders            |
| Purple 400 | #B08EC5   | Hover states              |
| Purple 500 | #8E6AA0   | Secondary accent and Tags |
| Purple 600 | #6F4F82   | Active / pressed          |
| Purple 800 | #432E54   | Dark mode tint surface    |

### Cyan

| Name      | Color Hex | Description            |
|-----------|-----------|------------------------|
| Cyan 50   | #E8F6F4   | Tinted backgrounds     |
| Cyan 200  | #B5E2DC   | Subtle borders         |
| Cyan 400  | #6EC5BA   | Hover states           |
| Cyan 500  | #3AAFA0   | Highlight accent · Links |
| Cyan 600  | #2D8A7E   | Active / pressed       |
| Cyan 800  | #1A524C   | Dark mode tint surface |

### Rosé

| Name      | Color Hex | Description                  |
|-----------|-----------|------------------------------|
| Rosé 50   | #FCF0F3   | Tinted backgrounds           |
| Rosé 200  | #F0C4D0   | Subtle borders               |
| Rosé 400  | #E295AC   | Hover states                 |
| Rosé 500  | #D4738C   | Warm accent · Promotions     |
| Rosé 600  | #B85A73   | Active / pressed             |
| Rosé 800  | #6E2F40   | Dark mode tint surface       |

### Red

| Name      | Color Hex | Description          |
|-----------|-----------|----------------------|
| Red Main  | #E66260   | Failed payments, alerts |
| Red Soft  | #F3A8A7   | Soft background      |
| Red Tint  | #FCEAEA   | Tinted background    |

### Yellow

| Name         | Color Hex | Description          |
|--------------|-----------|----------------------|
| Yellow Main  | #F9DB6D   | Pending, in-progress |
| Yellow Soft  | #FCEEA8   | Soft background      |
| Yellow Tint  | #FEF9E6   | Tinted background    |

### Green

| Name        | Color Hex | Description          |
|-------------|-----------|----------------------|
| Green Main  | #52B788   | Completed, paid      |
| Green Soft  | #95D4B3   | Soft background      |
| Green Tint  | #EAF7EF   | Tinted background    |

## Pages

### Index

An introduction to the theme and design system. Includes all the colors for both variations (light and dark). The page should have a theme picker, with dark and light variations, as well as accent color selection (blue, purple, cyan and rosé). Display both variations, dark and light, in the showcase.

### Typography

A page explaining the typography usage, font variations, sizes, colors and effects.
Includes copyable code blocks for each example, with HTML and CSS tabs.
Main font for body is Monaspace Argon, and for headings, Monaspace Krypton (both already included in the /fonts folder).
It uses local fonts, no CDNs.

Typography elements displayed in the page:

- Headings
- Subtitles
- Lists
    - Unordered
    - Ordered
    - List groups
- Paragraphs
- Highlights
- Strikethrough
- Italics
- Bold
- Links (border-bottom: 0.2ch with accent color, 0.5rem margin)
- Abbreviation
- Blockquotes
- Inline code
- Code blocks
    - With and without filenames
    - Line numbers
    - Diff versions

### Elements

A page showcasing all the elements in HTML/CSS, to be used by others. Includes copyable code blocks for each element, with HTML, CSS and JS (only when strictly required) tabs.

This page should contain cards to other html pages, containing the actual elements and code blocks for each. Each element group will have it's own page in a elements/ folder.

#### Forms

* Forms
* Inputs
* Textarea
* Toggle
* Checkbox
* Select
* Field Highlight and Labeling
* Form Groups

#### Buttons & Actions

* Buttons
* Keyboard Shortcuts
* Spinners

#### Data Display

* Table
* List Items
* Timeline
* Pagination

#### Feedback & Status

* Alerts
* Notifications
* Toast
* Progress Bars
* Skeletons
* Badges

#### Labels & Taxonomy

* Tags
* Chips
* Tooltips
* Breadcrumbs

#### Overlays

* Modals
* Popovers
* Dropdown

#### Identity & Media

* Avatars
* Cards

#### Navigation

* Navbar
* Tabs & Navigation
* Tab Groups (Horizontal)
* Tab Groups (Vertical)

#### Layout & Dividers

* Horizontal Rules (Neutral)
* Horizontal Rules (Accent Color)
* Horizontal Rules (With Text)
* Accordions

### Ports

A page showcasing all the ports of the theme. For now, we only have the CSS port.
It shows the ports as cards, with a small preview.
Each port will have it's own page in a ports/ folder.

#### CSS

A page to download the full CSS file to be used in projects with this design system.

Customization options for the CSS file being downloaded:

- Variations
    - Light only
    - Dark only
    - Light and dark
- Accent color
    - Blue
    - Purple
    - Cyan
    - Rosé
    - All (for theme selection)
- Minified
    - Yes
    - No

## Guidelines

The HTML code should be clean, use native tags when they exist instead of divs or other generic elements. Should use best practices for accessibility.

The CSS code should be clean, use reusable variable names, with descriptive names. Make it available to all the pages, instead of including it as CSS in the header. Use an assets folder for images, CSS files, etc.

Every page must contain links to the other top-level pages, a breadcrumb, and favicon.
