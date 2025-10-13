# Draw.io-like Diagram Tool

## Overview
This project is a web-based drag-and-drop diagramming tool, similar to draw.io, built with Next.js, TypeScript, and modern UI libraries. Its purpose is to provide users with an intuitive platform to create and customize various types of diagrams and charts. The tool aims for a modern, minimalist user interface with professional iconography and alerts, offering both dark and light themes, and supporting English and Vietnamese languages. The long-term vision is to become a comprehensive solution for data analysis workflows, offering advanced features like workflow execution, data transformation, and collaboration.

## User Preferences
- **Ngôn ngữ giao tiếp:** Tiếng Việt
- **Coding Style:** TypeScript strict mode, component-based architecture
- **UI Approach:** Modern, minimalist, professional

## System Architecture

### UI/UX Decisions
The application features a modern, minimalist design with a balanced and professional aesthetic. It includes a sticky top navigation bar ("INT SOLUTION" brand with gradient, navigation links for Overview, Data Center, Workflow, Analyst, active page indicator with gradient animation) and a simple, professional footer. Key UI components like theme and language switchers are integrated seamlessly. Animations are implemented using Framer Motion for smooth transitions and subtle hover effects.

The core of the application is the "Overview Page" which houses the diagramming canvas and a collapsible sidebar for nodes. The sidebar is responsive and features smooth animations, displaying node items in a grid layout. Node items are square icon cards with tooltips and hover effects, draggable onto the canvas.

### Technical Implementations
The application is built using **Next.js** (Pages Router), **TypeScript**, and styled with **Tailwind CSS**. **Lucide React** and **React Icons** provide a comprehensive icon system, while **Framer Motion** handles animations. **next-themes** is used for theme switching (dark/light mode), and **Radix UI** provides accessible UI components like Tooltip, Collapsible, and Dialog. For internationalization, **next-i18next** and **react-i18next** are integrated, supporting English and Vietnamese. Utility functions for class names are managed by `clsx` and `tailwind-merge`.

### Feature Specifications
The application's core functionality revolves around a **React Flow**-based canvas:
- **Drag & Drop Canvas**: Users can drag and drop nodes from a sidebar onto the canvas.
- **Custom Nodes**: Nodes are configurable with various shapes (square, rectangle, circle) and compact sizing.
- **Handles System**: Input, requirement, and output handles are positioned precisely on node borders with distinct shapes (square, diamond, rectangle respectively), theme-colored, and have transparent labels positioned outside the node.
- **Connections**: Smooth, animated dashed Bezier curves with arrow markers and customizable colors.
- **Canvas Features**: Supports zoom in/out, fit view, locking, background dots pattern, and theme-aware styling. Double-clicking a node opens a configuration modal for display name, input/requirement values, and data persistence.
- **Canvas Control Buttons**: "Run" (execute workflow), "Pause" (placeholder), "Save" (download JSON), and "Clear" (remove all elements).
- **Node Types**: A comprehensive system of 31 nodes categorized into 7 groups: Social Media (5), AI (1), Processing (2), Basic (8 - input-only), Output (2), Charts (6), and Action (6). These nodes support complex data analysis workflows.
- **Workflow Save/Load**: Implemented using `localStorage` for auto-saving drafts every second, auto-restoring drafts, and explicitly saving/loading named workflows through a dedicated management page.

### System Design Choices
The project prioritizes a component-based architecture for maintainability and scalability. Strict TypeScript usage ensures type safety. The UI emphasizes a minimalist and professional look, avoiding excessive animations. The decision to use React Flow provides a powerful foundation for node-based diagrams, with extensive customization for nodes, handles, and connections to meet specific design requirements. Storage for workflows is handled client-side using `localStorage` for quick access and persistence.

## External Dependencies
- **Next.js**: Frontend Framework
- **TypeScript**: Language
- **Tailwind CSS**: Styling framework
- **Lucide React**: Icon system
- **React Icons**: Additional icon library (Font Awesome, Material Design, Tabler Icons)
- **Framer Motion**: Animations
- **next-themes**: Theme management (dark/light mode)
- **Radix UI**: UI components (Tooltip, Collapsible, Dialog)
- **clsx**: Utility for conditionally joining class names
- **tailwind-merge**: Utility for merging Tailwind CSS classes
- **next-i18next**: Internationalization for Next.js
- **react-i18next**: React integration for i18n
- **i18next**: Internationalization framework
- **React Flow (reactflow)**: Node-based diagram library