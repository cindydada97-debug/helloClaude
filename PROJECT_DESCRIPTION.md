# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio website ("菜狗休闲一刻" - Earth Class-E Observer's Site) built with vanilla HTML, CSS, and JavaScript. The site features a modern Bento Grid design showcasing personal information, skills, statistics, and contact information.

## Architecture

**Single-Page Application**: The entire site is contained in `index.html` with embedded styles and scripts.

**Key Components**:
- **Styling**: Embedded CSS with Tailwind CSS via CDN, custom gradient classes, glassmorphism effects
- **Interactivity**: Vanilla JavaScript for animations and Chart.js for data visualizations
- **Layout**: Responsive Bento Grid layout using CSS Grid (4-column on large screens, adaptive on smaller devices)

**External Dependencies** (via CDN):
- Tailwind CSS
- Font Awesome 6.4.0
- Chart.js 4.4.0
- Google Fonts (Inter & Noto Sans SC)

## Development

**Opening the site**: Simply open `index.html` in a browser - no build process required.

**Live preview**: Use any static file server, such as:
```bash
python -m http.server 8000
# or
npx serve .
```

## Code Structure

**HTML sections** (in order):
1. Header with title and badges
2. Bento Grid containing:
   - About Me card (2x2 grid span)
   - Skill Distribution radar chart (2x2 grid span)
   - Four statistics cards (Observations, Projects, Commits, Days)
   - Technology Stack with skill bars (2x1 grid span)
   - Monthly Activity bar chart (2x1 grid span)
   - Interests & Hobbies grid (2x1 grid span)
   - Contact section (2x1 grid span)
3. Footer

**JavaScript functionality**:
- Chart.js radar chart for skills (`skillRadar`)
- Chart.js bar chart for monthly activity (`activityChart`)
- Skill bar animation triggered on page load
- Intersection Observer for scroll-triggered card animations

## Key Design Patterns

**Glassmorphism cards**: `.bento-card` class with backdrop blur and semi-transparent backgrounds

**Gradient system**: Pre-defined gradient classes (`.gradient-blue`, `.gradient-purple`, etc.) for consistent color theming

**Animation system**:
- SVG polyline animations for statistics cards
- CSS transitions for hover effects
- Intersection Observer for scroll-based animations
- Skill progress bars with delayed width transitions

## Customization Points

When modifying content:
- **Statistics**: Update numbers in HTML and corresponding SVG trend lines
- **Skills**: Modify Chart.js data arrays in `skillRadar` and skill bar percentages in `data-width` attributes
- **Personal info**: Update the About Me section grid items
- **Interests**: Modify the four interest cards with FontAwesome icons
- **Contact links**: Update href attributes in the contact section