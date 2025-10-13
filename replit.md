# Draw.io-like Diagram Tool

## Tổng quan dự án (Project Overview)
Ứng dụng web kéo thả để tạo sơ đồ (diagram), tương tự như draw.io, được xây dựng với Next.js, TypeScript và các thư viện UI hiện đại.

**Ngày bắt đầu:** 13/10/2025

---

## Yêu cầu kỹ thuật (Technical Requirements)

### 1. Core Features
- ✅ **Drag & Drop Canvas**: Giao diện kéo thả các phần tử trên canvas
- ✅ **Chart/Diagram Support**: Dễ dàng dựng và tùy chỉnh các loại biểu đồ/sơ đồ
- ✅ **Modern UI**: Giao diện hiện đại, tối giản (minimalist)
- ✅ **Professional Icons & Alerts**: Icon và thông báo chuyên nghiệp

### 2. Theme System
- ✅ **Dark Mode**: Theme tối
- ✅ **Light Mode**: Theme sáng
- ✅ Theme switcher với animation mượt mà

### 3. Internationalization (i18n)
- ✅ **English** (Tiếng Anh)
- ✅ **Vietnamese** (Tiếng Việt)
- Language switcher dễ sử dụng

### 4. Technology Stack

#### Frontend Framework
- **Next.js** (App Router hoặc Pages Router)
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling ✅ (đã cài)

#### UI Libraries
- ✅ **Lucide React** - Icon system (đã cài)
- ✅ **Framer Motion** - Animations (đã cài)
- ✅ **next-themes** - Theme system (đã cài)
- **Sonner** hoặc **React Hot Toast** - Toast notifications (sẽ cài khi cần)

#### Canvas & Diagram Libraries
Các thư viện kéo thả canvas:
- **React Flow** - Powerful node-based diagrams
- **Konva.js** (react-konva) - Canvas drawing
- **Fabric.js** - Object manipulation on canvas
- **Excalidraw** - Hand-drawn style diagrams

#### Chart Libraries
- **Recharts** - React charts
- **Chart.js** with react-chartjs-2
- **D3.js** - Custom visualizations

#### i18n Libraries
- ✅ **next-i18next** - i18n for Next.js (đã cài)
- ✅ **react-i18next + i18next** - Translation framework (đã cài)

#### State Management (if needed)
- **Zustand** - Lightweight state management
- **Jotai** - Atomic state management

---

## Cấu trúc dự án hiện tại (Current Structure)

```
/
├── components/
│   ├── Navbar.tsx           # Navbar component
│   ├── Footer.tsx           # Footer component
│   ├── NodesSidebar.tsx     # Collapsible sidebar cho nodes
│   ├── NodeItem.tsx         # Node item với tooltip
│   ├── CustomNode.tsx       # React Flow custom node với handles
│   ├── FlowCanvas.tsx       # React Flow canvas wrapper
│   ├── NodeConfigModal.tsx  # Modal config node (double-click)
│   ├── CanvasControls.tsx   # Control buttons (Run/Pause/Save/Clear)
│   └── ThemeProvider.tsx    # Theme provider wrapper
├── config/
│   └── nodes.config.ts      # Node configurations (13 nodes)
├── lib/
│   └── utils.ts             # Utility functions (cn)
├── pages/
│   ├── _app.tsx            # App wrapper với providers
│   ├── index.tsx           # Home page
│   ├── overview.tsx        # Overview page với canvas
│   ├── data-center.tsx     # Data Center page
│   ├── workflow.tsx        # Workflow page
│   └── analyst.tsx         # Analyst page
├── public/
│   └── locales/            # i18n translation files
│       ├── en/
│       │   └── common.json
│       └── vi/
│           └── common.json
├── styles/
│   ├── globals.css         # Global styles + Tailwind
│   └── reactflow-custom.css # Custom React Flow styling
├── next.config.ts          # Next.js config + i18n
├── next-i18next.config.js  # i18n configuration
├── tailwind.config.js      # Tailwind v3 config
├── postcss.config.mjs      # PostCSS config
└── tsconfig.json           # TypeScript config
```

---

## Canvas & Diagram System ✅

### React Flow Integration
- ✅ **React Flow (reactflow)** - Node-based diagram library
- ✅ **Custom Nodes** - Hình dạng theo config (square/rectangle/circle)
  - Compact sizing: w-20/h-20 (square), w-28/h-16 (rectangle), w-20/h-20 (circle)
  - Reduced padding (p-2) cho giao diện gọn gàng
- ✅ **Handles System**:
  - Positioned EXACTLY on node borders (không nằm bên trong)
  - Input handles (left) - hình VUÔNG 10x10px, màu theo theme_color
  - Requirement handles (bottom) - hình THOI 10x10px (rotated 45°), màu theo theme_color
  - Output handles (right) - hình CHỮ NHẬT 14x6px (dài hơn), màu theo theme_color
  - Labels nằm BÊN NGOÀI node (không có background, trong suốt)
  - Spacing: label cách handle 8px (input/output), 12px (requirement)
- ✅ **Connections**:
  - Bezier curves (mềm mại, tự nhiên)
  - Animated dashed lines
  - Arrow markers ở cuối
  - Màu sắc tùy chỉnh
- ✅ **Canvas Features**:
  - Drag & drop nodes từ sidebar
  - Double-click để config node (modal)
  - Zoom in/out, fit view, lock
  - Background dots pattern theo theme
  - Theme-aware styling
- ✅ **Control Buttons**:
  - Run (xanh lá) - Chạy workflow
  - Pause (vàng) - Tạm dừng
  - Save (xanh dương) - Download JSON
  - Clear (đỏ) - Xóa tất cả nodes

### Node Types (31 nodes, organized by groups)

**Social Media (5 nodes):**
- TikTok, YouTube, Facebook, Instagram, Twitter

**AI (1 node):**
- OpenAI - AI text generation

**Processing (2 nodes):**
- Data Processor - Transform data
- Storage - Lưu trữ dữ liệu

**Basic (8 nodes - input only, no input handles):**
- String, Integer, Array, JSON, Text Area
- URL, Category, CSV

**Output (2 nodes):**
- Extract CSV - Export to CSV file
- Extract PDF - Export to PDF file

**Charts (6 nodes):**
- Bar Chart, Line Chart, Doughnut, Pie Chart, Area Chart, Scatter Plot

**Action (6 nodes):**
- Comparer - So sánh 2 giá trị
- Alert - Gửi cảnh báo
- Save To DB - Lưu vào database
- Trending Tracker - Theo dõi xu hướng
- Condition - Điều kiện if/else (2 outputs: True/False)
- Filter - Lọc dữ liệu theo điều kiện

---

## Công nghệ đã cài đặt (Installed Technologies)

### ✅ Core Stack
- **Next.js 15.2.3** - Pages Router
- **TypeScript 5.8.2** - Type safety
- **Tailwind CSS 3.4.18** - Utility-first styling
- **PostCSS + Autoprefixer** - CSS processing

### ✅ UI & Styling
- **Lucide React** - Icon system (ChevronLeft, ChevronRight, ChevronDown)
- **React Icons** - Additional icon library:
  - Font Awesome: FaTiktok, FaChartBar, FaFilter, etc.
  - Material Design: MdTextFields, MdTrendingUp, etc.
  - Tabler Icons: TbChartDonut
- **Framer Motion** - Smooth animations
- **next-themes** - Theme switching (dark/light)
- **Radix UI** - Tooltip, Collapsible, Dialog components
- **clsx + tailwind-merge** - Class name utilities

### ✅ Internationalization
- **next-i18next** - i18n for Next.js
- **react-i18next + i18next** - Translation framework

### ✅ Canvas & Diagrams
- **React Flow (reactflow)** - Node-based diagram library với drag & drop

---

## Roadmap

### Phase 1: Setup & Infrastructure ✅ COMPLETED
- ✅ Cài đặt UI libraries (Lucide icons, Framer Motion)
- ✅ Setup theme system (dark/light mode với next-themes)
- ✅ Setup i18n (English & Vietnamese với next-i18next)
- ✅ Cấu hình Tailwind v3 với custom theme colors

### Phase 2: Core UI Components ✅ COMPLETED
- ✅ Navbar component (modern, minimalist, balanced)
- ✅ Footer component (simple, professional)
- ✅ Theme switcher (sun/moon toggle)
- ✅ Language switcher (EN/VI dropdown)
- ✅ Icon system (Lucide React)
- ✅ Layout với ThemeProvider và i18n

### Phase 3: Overview Page & Nodes ✅ COMPLETED
- ✅ Collapsible Sidebar - responsive, thu gọn được
- ✅ Nodes config system (id, name, icon, theme_color, shape, links)
- ✅ NodeItem component - icon hình vuông với tooltip
- ✅ Canvas area placeholder
- ✅ Drag & drop preparation (node data structure)

### Phase 4: Canvas Implementation ✅ COMPLETED
- ✅ Chọn React Flow library - powerful node-based diagrams
- ✅ Drag & drop functionality từ sidebar vào canvas
- ✅ Custom Node component với shapes theo config
- ✅ Handles system (input/requirement/output) với labels
- ✅ Smooth connections với animated bezier curves
- ✅ Canvas controls (zoom, fit view, lock)
- ✅ Theme-aware styling (dark/light mode)

### Phase 4.1: Canvas Visual Refinements ✅ COMPLETED (13/10/2025)
- ✅ Thu nhỏ node borders - giảm padding xuống p-2
- ✅ Đặt handles CHÍNH XÁC trên viền node (absolute positioning)
- ✅ Custom handle shapes:
  - Input: hình VUÔNG (12x12px)
  - Output: hình CHỮ NHẬT (16x8px - dài hơn)
  - Requirement: hình THOI (12x12px rotated 45°)
- ✅ Thay đổi connection lines thành Bezier curves (mềm mại hơn)

### Phase 4.2: Overview Enhancements ✅ COMPLETED (13/10/2025)
- ✅ Xóa background của handle labels (trong suốt, gọn gàng hơn)
- ✅ Thu nhỏ node size (w-20/h-20 square, w-28/h-16 rectangle)
- ✅ Thêm 5 node input mới: String, Integer, Array, JSON, Text Area
- ✅ Node config modal (double-click):
  - Chỉnh display name
  - Config input values
  - Config requirement values
  - Persist data vào node state
- ✅ Canvas control buttons:
  - Run - Execute workflow (log data)
  - Pause - Pause execution (placeholder)
  - Save - Download diagram JSON
  - Clear - Remove all nodes/edges (confirm)
- ✅ UI refinements:
  - Spacing giữa label và handle (8px input/output, 16px requirement)
  - Handle icons nhỏ hơn (10x10px square/diamond, 14x6px rectangle)
  - Label transform: -150% cho input/output, 150% cho requirement (tránh overlap)

### Phase 4.3: Node System Expansion ✅ COMPLETED (13/10/2025)
- ✅ **Critical bug fix**: Label không đè lên handle (zIndex + pointer-events-none)
- ✅ **Node grouping system**: Thêm field 'group' vào NodeConfig
- ✅ **Tổ chức nodes theo nhóm** (31 nodes total):
  - Social Media: 5 nodes
  - AI: 1 node  
  - Processing: 2 nodes
  - Basic: 8 nodes (input only, không có input handles)
  - Output: 2 nodes (Extract CSV, Extract PDF)
  - Charts: 6 nodes (Bar, Line, Doughnut, Pie, Area, Scatter)
  - Action: 6 nodes (Comparer, Alert, Save To DB, Trending Tracker, Condition, Filter)
- ✅ **Collapsible sidebar groups**: Mỗi nhóm có thể expand/collapse độc lập
- ✅ **18 nodes mới** cho data analyst workflow

### Phase 5: Diagram Features (Next)
- [ ] Workflow execution engine
- [ ] Data transformation logic
- [ ] Export to multiple formats
- [ ] Load saved diagrams

---

## User Preferences
- **Ngôn ngữ giao tiếp:** Tiếng Việt
- **Coding Style:** TypeScript strict mode, component-based architecture
- **UI Approach:** Modern, minimalist, professional

---

## UI/UX Specifications

### 🚫 Excluded Features (Skip)
- Landing page - sẽ làm sau
- Login/Register pages - sẽ làm sau

### 📐 Layout Components

#### 1. Navbar (Top Navigation) ✅ COMPLETED
**Vị trí**: Top, sticky navbar với backdrop blur

**Bên trái**:
- ✅ Logo/Brand: **"INT SOLUTION"** (gradient blue to violet)
- ✅ Navigation Menu (4 mục nằm ngang):
  1. **Overview** (Tổng quan)
  2. **Data Center** (Trung tâm dữ liệu)
  3. **Workflow** (Quy trình)
  4. **Analyst** (Phân tích)
- ✅ Active indicator với gradient animation

**Bên phải**:
- ✅ Theme Switcher (Sun/Moon icon toggle)
- ✅ Language Switcher (EN/VI dropdown với Globe icon)
- ✅ User Avatar (gradient background với User icon)

**Animation**: ✅ Đã implement
- Smooth transitions với Framer Motion
- Hover effects tinh tế
- Active page indicator với spring animation
- Language dropdown với fade animation

#### 2. Footer ✅ COMPLETED
**Vị trí**: Bottom, border-top với backdrop blur

**Nội dung**:
- ✅ Copyright text (© 2025 INT SOLUTION. All rights reserved.)
- ✅ Footer links (Privacy, Terms, Contact)
- ✅ Styling: Minimalist, consistent với theme system

#### 3. Overview Page - Nodes Sidebar ✅ COMPLETED
**Layout**: Full height flex layout với Navbar, Sidebar, Canvas, Footer

**Nodes Sidebar**:
- ✅ Collapsible/Expandable (ChevronLeft/Right icons)
- ✅ Responsive width (280px expanded, 48px collapsed)
- ✅ Smooth animation với Framer Motion
- ✅ Grid layout 4 columns cho nodes

**Node Items**:
- ✅ Square icon cards (12x12 với 6x6 icon)
- ✅ Tooltip hiển thị tên node (Radix UI Tooltip)
- ✅ Draggable với node data
- ✅ Hover effects với theme_color
- ✅ Border color theo theme_color của node

**Nodes Config Structure**:
```typescript
{
  id: string
  name: string
  group: string  // NEW: 'Social Media' | 'AI' | 'Processing' | 'Basic' | 'Output' | 'Charts' | 'Action'
  icon: IconType
  theme_color: string
  shape: 0 | 1 | 2  // 0=square, 1=rectangle, 2=circle
  links: [
    {
      type: 'input' | 'requirement' | 'output'
      label: string
      max_connect: number
      data_type: string[]
    }
  ]
}
```

**31 Nodes organized in 7 groups**:
- Social Media: TikTok, YouTube, Facebook, Instagram, Twitter
- AI: OpenAI
- Processing: Data Processor, Storage
- Basic: String, Integer, Array, JSON, Text Area, URL, Category, CSV
- Output: Extract CSV, Extract PDF
- Charts: Bar, Line, Doughnut, Pie, Area, Scatter
- Action: Comparer, Alert, Save To DB, Trending Tracker, Condition, Filter

---

## Notes
- Skip landing page và authentication pages (làm sau)
- Ưu tiên sử dụng các thư viện có community lớn và được maintain tốt
- Code phải clean, dễ bảo trì và mở rộng
- Animation vừa đủ, không overdo
