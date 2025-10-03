# SEO-Controller

## Overview

SEO-Controller is a workflow automation platform for SEO management. It features a visual editor, similar to n8n, allowing users to create automated SEO workflows by dragging and connecting platform-specific nodes (e.g., TikTok, Google, Gmail, Facebook). The platform supports both light and dark themes and is designed for rapid development. The ambition is to provide a comprehensive, user-friendly tool for optimizing SEO processes.

## User Preferences

- Preferred communication style: Simple, everyday language
- Language: Vietnamese (vi)

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **React 18.2.0**
- **Vite 5.0**
- **React Flow 11.x** for the workflow canvas
- **React Icons**
- **JavaScript/JSX**

**Component Structure:**
- Single-page application (SPA) with a two-column layout: a collapsible node palette sidebar (20% width, 80px collapsed) and a workflow canvas.
- Key Components: `Navbar`, `Sidebar`, `WorkflowCanvas`, `CustomNode`, `ThemeContext`, `SidebarContext`, `NodeModal`, `WorkflowList`.

**Styling Approach:**
- CSS custom properties for a dual light/dark theme system, persisted via `localStorage`.
- Theme variables are centralized in `src/App.css`.
- FOUC prevention via an inline script in `index.html`.
- Responsive design with mobile-first considerations and smooth animations.

**State Management:**
- Utilizes React Context API (`ThemeContext`, `SidebarContext`, `ModalStateContext`) for global state.
- React Flow's `useNodesState` and `useEdgesState` hooks manage workflow state.
- Workflow and theme states are persisted in `localStorage`.

### Development Environment

- Vite configured to serve on `0.0.0.0:5000` with Hot Module Reloading.
- TypeScript support is configured but currently uses JSX.

### Design Decisions

- Vite was chosen for speed and development experience over Create React App.
- React Flow was selected for its robust workflow canvas features.
- HTML5 Drag and Drop API is used for node interaction.
- Modular CSS and CSS variable-based theming ensure maintainability and consistency.
- Custom SVG logo and modern UI aesthetics enhance user experience.
- Node palette features a 3-column grid, and nodes have platform-specific colors and customizable shapes (circle, square, rectangle).
- Connection handles (input, output, requirement) are visually distinct.
- Workflow states are saved and loaded from `localStorage`.

### Key Features

**Workflow Editor:**
- **Visual Node-Based Editor**: Drag-and-drop interface for building SEO automation workflows.
- **Platform Nodes**: 16 distinct platform nodes (e.g., TikTok, Google, Facebook) with custom icons and branding.
- **Input Data Nodes**: 5 specialized nodes (Text, Number, JSON, Boolean, List) for data entry with dynamic form fields.
- **JSON-Based Configuration**: Centralized node definitions in `src/config/nodesConfig.js` for easy management and dynamic handle rendering.
- **Custom Node Design**: Nodes have customizable shapes (circle, square, rectangle) and theme colors.
- **Advanced Connection Handles**: Input (square), Output (circle), and Requirement (diamond) handles with validation for connection limits and data type compatibility.
- **Canvas Controls**: Pan, zoom, fit view, snap-to-grid, and a minimap.
- **Interactive Node Configuration**: Double-click any node to open a modal for renaming, configuring input data, or defining requirements. Configuration is stored in `node.data.config`.

**Workflow Management:**
- **Save Workflow**: Users can save the current workflow to `localStorage` with a custom name.
- **Load Workflow**: Existing workflows can be loaded from a dedicated `WorkflowList` component, restoring nodes, edges, and configurations.
- **WorkflowList Component**: Displays saved workflows with options to load or run (future).

**User Interface:**
- **Dual Theme**: Light and dark modes with smooth transitions.
- **Collapsible Sidebar**: Toggles between full palette and icon-only mode.
- **Responsive Design**: Optimized for various screen sizes (mobile, tablet, desktop).

## External Dependencies

### Core Libraries
- **React & ReactDOM (18.2.0)**
- **Vite (5.0.0)**
- **@vitejs/plugin-react (4.2.0)**
- **React Flow (11.x)**
- **React Icons**

### Development Tools
- **TypeScript (5.2.2)** (configured)
- **@types/react & @types/react-dom**

### Browser APIs
- **localStorage**
- **HTML5 Drag and Drop API**
- **CSS Custom Properties**