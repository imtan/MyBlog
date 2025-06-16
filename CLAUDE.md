# CLAUDE.md
必ず全ての回答を日本語でおねがいします。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on localhost:5173
- `npm run build` - Build for production to `/dist`
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build locally

## Architecture Overview

This is a Japanese personal blog built with React 19 + Vite, featuring vertical typography optimized for Japanese content.

### Core Architecture
- **Single Page Application** with hash-based routing (`#post/slug`, `#/posts`)
- **Content Management**: Markdown files in `/src/posts/` with frontmatter metadata
- **Styling**: Traditional Japanese typography using "Shippori Mincho" font with vertical reading layout
- **Syntax Highlighting**: highlight.js with Atom One Dark theme

### Key Components
- `App.jsx` - Main router and state management
- `Sidebar.jsx` - Fixed sidebar with navigation
- `ArticleList.jsx` - Blog post listing with excerpts
- `Article.jsx` - Individual article rendering with react-markdown
- `CodeBlock.jsx` - Expandable syntax-highlighted code blocks

### Content System
Posts are managed via `/src/utils/posts.js` which:
- Dynamically imports all `.md` files using `import.meta.glob`
- Parses frontmatter (title, date) using gray-matter
- Provides navigation between posts

### Post Format
```markdown
---
title: "Post Title"
date: "2025-05-07"
---
Markdown content...
```

## Development Notes

- Uses React 19 with modern patterns (no class components)
- All styling via CSS custom properties (no CSS-in-JS)
- Japanese variable names and comments are intentionally used in code examples
- Hash routing handles browser navigation without server configuration
- Build output goes to `/dist` directory
