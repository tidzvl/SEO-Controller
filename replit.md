# Overview

This is a web-based drag-and-drop diagramming tool similar to draw.io, built with Next.js and TypeScript. The application enables users to create visual workflows by connecting nodes on a canvas, with support for various node types including social media integrations, AI services, data processing, and visualization components. Users can configure nodes, execute workflows, and save/load their work.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: Next.js (Pages Router) with TypeScript strict mode
- Component-based architecture for maintainability and scalability
- Pages organized by route: `/` (home), `/overview` (main canvas), `/workflow` (management), `/data-center`, `/analyst`
- Custom components for modular UI: `CustomNode`, `NodesSidebar`, `FlowCanvas`, `Navbar`, `Footer`

**UI/UX Design**:
- Modern, minimalist design with professional aesthetic
- Sticky navigation bar with gradient brand logo
- Collapsible sidebar with smooth Framer Motion animations
- Responsive layout with theme support (light/dark modes via next-themes)
- Modal dialogs for node configuration, workflow saving, and renaming using Radix UI

**Styling**: Tailwind CSS with custom theme system
- HSL-based color variables for consistent theming
- Custom utility classes via clsx and tailwind-merge
- Component-specific styles in `reactflow-custom.css`

## Core Diagramming System

**Canvas Implementation**: React Flow library
- Drag-and-drop interface for adding nodes from sidebar to canvas
- Custom node types with configurable shapes (square, rectangle, circle)
- Three handle types with distinct visual styles:
  - Input handles: square shapes on left border
  - Requirement handles: diamond shapes on top border  
  - Output handles: rectangle shapes on right border
- Bezier curve connections with dashed animations and arrow markers
- Canvas controls: zoom, fit view, background dots pattern, theme-aware styling

**Node System**: 32+ node types across 7 categories
- Social Media (5): TikTok, YouTube, Facebook, Instagram, Twitter
- AI (1): OpenAI integration
- Processing (2): Data transformation nodes
- Basic (9): Input-only nodes (String, Number, etc.)
- Output (2): Display results
- Charts (6): Visualization nodes
- Action (6): Workflow actions

Each node defined in `config/nodes.config.ts` with:
- Icon from react-icons library
- Theme color for visual identity
- Shape preference (0=square, 1=rectangle, 2=circle)
- Link definitions (inputs, requirements, outputs with data types)

**Social Media Functions**: Dynamic configuration system
- Platform-specific functions defined in `config/social-media-functions.config.ts`
- Function selection in node configuration modal
- Custom fields per function (text, textarea, select, number types)
- Input/output requirements per function

## Workflow Management

**Execution Engine** (`lib/execution-engine.ts`):
- Topological sort for dependency resolution
- Node execution state tracking (idle, running, success, error)
- Data flow between connected nodes via edges
- Input validation and requirement checking
- Debug logging for execution tracing

**Persistence** (`lib/storage.ts`):
- LocalStorage-based data persistence
- Auto-save draft every second during editing
- Named workflow save/load with metadata (id, name, timestamps)
- CRUD operations: create, read, update, delete, duplicate workflows
- Export workflows as JSON files

**Workflow Features**:
- Canvas control buttons: Run, Pause, Save, Clear
- Double-click nodes to open configuration modal
- Real-time connection validation
- Search and filter saved workflows
- Rename and duplicate existing workflows

## Internationalization

**i18n Setup**: next-i18next and i18next
- Supported locales: English (en), Vietnamese (vi)
- Translation files in `public/locales/{locale}/common.json`
- Language switcher in navbar
- Route-based locale switching with Next.js i18n routing

## State Management

**Local State**: React hooks (useState, useEffect, useCallback, useMemo)
- Node and edge states via React Flow hooks (useNodesState, useEdgesState)
- Modal visibility states
- Form inputs and selections
- Draft auto-save with useEffect timers

**Data Flow**:
- Props drilling for component communication
- Callback functions for event handling
- Context-free architecture (no React Context used)

## Design Patterns

**Component Composition**: Small, focused components
- Separation of concerns (UI vs logic)
- Reusable UI primitives (modals, tooltips, collapsibles)
- Custom node rendering with dynamic icon loading

**Configuration-Driven**: External config files
- Node definitions in centralized config
- Social media functions in separate config
- Type-safe configurations with TypeScript interfaces

**Migration Support**: Backward compatibility
- Legacy node data migration on load
- Ensures Social Media nodes have required fields

# External Dependencies

## Core Framework
- **Next.js** (^15.2.3): React framework for production with Pages Router
- **React** (^19.0.0): UI library
- **React DOM** (^19.0.0): React renderer
- **TypeScript** (^5.8.2): Type-safe JavaScript

## Styling & UI
- **Tailwind CSS** (^3.4.18): Utility-first CSS framework
- **PostCSS** (^8.5.6): CSS transformation
- **Autoprefixer** (^10.4.21): CSS vendor prefixing
- **class-variance-authority** (^0.7.1): Variant-based styling
- **clsx** (^2.1.1): Conditional class names
- **tailwind-merge** (^3.3.1): Merge Tailwind classes intelligently

## UI Components
- **Radix UI**: Headless component library
  - @radix-ui/react-collapsible (^1.1.12): Collapsible panels
  - @radix-ui/react-dialog (^1.1.15): Modal dialogs
  - @radix-ui/react-tooltip (^1.2.8): Tooltips
- **Framer Motion** (^12.23.24): Animation library
- **next-themes** (^0.4.6): Theme management (dark/light mode)

## Icons
- **Lucide React** (^0.545.0): Icon system (primary)
- **React Icons** (^5.5.0): Icon libraries (Font Awesome, Material Design, Tabler)

## Diagramming
- **React Flow** (reactflow ^11.11.4): Node-based diagram library for canvas, nodes, edges, handles, and controls

## Internationalization
- **next-i18next** (^15.4.2): Next.js i18n integration
- **react-i18next** (^16.0.0): React i18n hooks
- **i18next** (^25.6.0): i18n framework core

## Development Tools
- **ESLint** (^9.23.0): Linting
- **eslint-config-next** (^15.2.3): Next.js ESLint configuration
- **TypeScript Types**: @types/node, @types/react, @types/react-dom

## Storage
- **Browser LocalStorage**: Client-side persistence for workflows and drafts (no external database)