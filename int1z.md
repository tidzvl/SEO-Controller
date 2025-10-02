# SEO-Controller

## Overview

SEO-Controller is a modern workflow automation platform for SEO management, built with React, Vite, and React Flow. The application features a visual workflow editor similar to n8n, allowing users to create automated SEO workflows by dragging and connecting platform nodes (TikTok, Google, Gmail, Facebook, etc.). The platform supports both light and dark themes and is optimized for rapid development with Hot Module Reloading.

## User Preferences

- Preferred communication style: Simple, everyday language
- Language: Vietnamese (vi)

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **React 18.2.0** - Core UI library for building component-based interfaces
- **Vite 5.0** - Modern build tool and development server chosen for its speed and excellent developer experience with features like instant HMR
- **React Flow 11.x** - Workflow canvas library for building node-based editors with drag-and-drop, connections, and zoom/pan
- **React Icons** - Comprehensive icon library (Font Awesome, Simple Icons) for platform logos
- **JavaScript/JSX** - Primary development language (TypeScript configuration exists but JSX is currently used)


**Component Structure:**
- Component-based architecture with separate CSS modules for styling
- Single-page application (SPA) pattern with `index.html` as entry point
- Two-column layout: fixed node palette sidebar (20% width, collapsible to 80px) + workflow canvas area
- **Navbar Component** (`src/components/Navbar.jsx`): Modern navigation bar with 4 menu items (Overview, Data Center, Workflow, Analytics), animated active indicators, and theme toggle button
- **Sidebar Component** (`src/components/Sidebar.jsx`): Node palette with 3-column grid displaying 16 draggable platform nodes (TikTok, Google, Gmail, Facebook, Instagram, YouTube, Twitter, LinkedIn, Pinterest, Telegram, WhatsApp, Discord, Slack, Shopify, WordPress, WooCommerce)
- **WorkflowCanvas Component** (`src/components/WorkflowCanvas.jsx`): React Flow-based canvas for creating workflows - supports drag-and-drop from sidebar, node connections, pan/zoom, minimap, and controls
- **CustomNode Component**: Custom React Flow node with platform icon, colored header, and connection handles (input on left, output on right)
- **ThemeContext** (`src/ThemeContext.jsx`): React Context for managing light/dark theme state across the application
- **SidebarContext** (`src/contexts/SidebarContext.jsx`): React Context for managing sidebar collapse/expand state

**Styling Approach:**
- CSS custom properties (CSS variables) for theming - defined in `src/App.css`
- Dual theme system (light/dark mode) with theme persistence via localStorage
- Theme variables centralized in `:root[data-theme]` selectors in App.css for global access
- FOUC (Flash of Unstyled Content) prevention via inline script in index.html that sets theme before React mounts
- Responsive design with mobile-first considerations (@media queries at 768px)
- Smooth animations: logo float, active indicator slide-in, hover transforms, and fade-in effects
- Modern color scheme with indigo accent color (#6366f1 light / #818cf8 dark)

**State Management:**
- **ThemeContext**: Custom React Context for theme management with useTheme hook
- **SidebarContext**: Custom React Context for sidebar collapse state with useSidebar hook
- **React Flow State**: useNodesState and useEdgesState hooks manage workflow nodes and connections
- Theme state persisted in browser localStorage (key: 'theme', values: 'light' or 'dark')
- Theme initialized before React renders via inline script in index.html to prevent FOUC
- Local component state for navbar active item tracking
- Workflow state (nodes and edges) managed locally within WorkflowCanvas component
- Main content margin dynamically adjusts based on sidebar collapse state (20% or 80px)
- Currently using React's built-in state management with Context API and React Flow hooks (no Redux or other libraries)
