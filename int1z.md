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

### Development Environment

**Build Configuration:**
- Vite configured to serve on `0.0.0.0:5000` for Replit compatibility
- Hot Module Reloading enabled for development
- Production builds optimized through Vite's build pipeline
- TypeScript support configured but currently using JSX files

**Design Decisions:**
- Chose Vite over Create React App for faster build times and better development experience
- Chose React Flow for workflow canvas to leverage built-in features (pan, zoom, minimap, node connections, handles)
- HTML5 Drag and Drop API for palette-to-canvas interaction (lightweight, no additional libraries needed)
- Modular CSS approach (component-specific stylesheets) for better maintainability
- Theme system implemented at the CSS variable level for easy customization and consistency
- Theme variables centralized in App.css (not component CSS) for better global access and architecture
- Inline theme initialization script in index.html to prevent FOUC on first load
- Custom SVG logo with animated effects for modern branding
- Tab-like navigation pattern with visual active indicators
- Node palette sidebar with 3-column grid layout for optimal space usage and visual scanning
- Fixed sidebar with smooth width transitions (280px default, 80px collapsed)
- Context-based state sharing for cross-component sidebar state management
- Platform-specific node colors for better visual identification in workflows

## External Dependencies

### Core Libraries
- **React & ReactDOM (18.2.0)** - UI framework
- **Vite (5.0.0)** - Build tool and development server
- **@vitejs/plugin-react (4.2.0)** - Official Vite plugin for React with Fast Refresh
- **React Flow (11.x)** - Node-based workflow editor with drag-and-drop, connections, zoom/pan, minimap, and controls
- **React Icons** - Icon library providing Font Awesome and Simple Icons for platform logos

### Development Tools
- **TypeScript (5.2.2)** - Type checking support (configured but not actively used)
- **@types/react & @types/react-dom** - TypeScript definitions for React

### Browser APIs
- **localStorage** - Theme preference persistence
- **HTML5 Drag and Drop API** - Drag nodes from palette to canvas
- **CSS Custom Properties** - Theming system

## Key Features

### Workflow Editor
- **Visual Node-Based Editor**: Drag-and-drop interface similar to n8n for building SEO automation workflows
- **16 Platform Nodes**: TikTok, Google, Gmail, Facebook, Instagram, YouTube, Twitter, LinkedIn, Pinterest, Telegram, WhatsApp, Discord, Slack, Shopify, WordPress, WooCommerce
- **JSON-Based Configuration**: Centralized node definitions in `src/config/nodesConfig.js` for easy addition/removal of platform nodes
- **Custom Node Design**: 
  - Centered platform icon with node name below
  - Rounded rectangle/square shape with customizable theme colors
  - Multiple connection handles per side with automatic even spacing
- **Advanced Connection Handles**:
  - **Input** (square, left side): Data inputs for nodes
  - **Output** (circle, right side): Data outputs from nodes
  - **Requirement** (diamond, bottom side): Required credentials/parameters (API keys, tokens, etc.)
  - Dynamic handle positioning based on node configuration
  - Hover effects and tooltips showing handle labels
- **Connection Validation**: 
  - Max connection limits enforced per handle (max_connect from config)
  - Data type compatibility checking (data_type array in config)
  - Prevents invalid connections before creation
- **Black Bezier Edges**: Smooth bezier connection lines (#1a1a1a light / #2d2d2d dark) with rounded stroke caps for professional appearance
- **Node Shape Customization**: Three distinct node shapes (circle, square, rectangle) configured per platform for visual variety and identification
- **Canvas Controls**: Pan, zoom, fit view, snap-to-grid for precise workflow design
- **Minimap**: Overview of entire workflow with color-coded nodes
- **3-Column Node Palette**: Easy-to-scan grid layout with platform icons and labels

### Node Configuration Schema
Each node is defined in `src/config/nodesConfig.js` with:
```javascript
{
  id: string,           // Unique identifier
  name: string,         // Display name
  icon: Component,      // React icon component
  theme_color: string,  // Brand color for node and handles
  shape: number,        // Node shape: 0=circle, 1=square, 2=rectangle
  links: [              // Array of connection handles
    {
      type: 'input' | 'output' | 'requirement',
      label: string,        // Handle tooltip label
      max_connect: number,  // Maximum connections (999 = unlimited)
      data_type: string[]   // Supported data types
    }
  ]
}
```

**Node Shape Types:**
- **0 (Circle)**: Circular nodes (140x140px) - used for TikTok, Facebook, Twitter, Telegram, Slack, WooCommerce
- **1 (Square)**: Square nodes (140x140px) - used for Google, Instagram, LinkedIn, WhatsApp, Shopify
- **2 (Rectangle)**: Rectangular nodes (180-220px × 120px) - used for Gmail, YouTube, Pinterest, Discord, WordPress
