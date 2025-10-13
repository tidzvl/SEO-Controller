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
│   ├── Navbar.tsx          # Navbar component
│   └── ThemeProvider.tsx   # Theme provider wrapper
├── lib/
│   └── utils.ts            # Utility functions (cn)
├── pages/
│   ├── _app.tsx           # App wrapper với providers
│   ├── index.tsx          # Home page
│   ├── overview.tsx       # Overview page
│   ├── data-center.tsx    # Data Center page
│   ├── workflow.tsx       # Workflow page
│   └── analyst.tsx        # Analyst page
├── public/
│   └── locales/           # i18n translation files
│       ├── en/
│       │   └── common.json
│       └── vi/
│           └── common.json
├── styles/
│   └── globals.css        # Global styles + Tailwind
├── next.config.ts         # Next.js config + i18n
├── next-i18next.config.js # i18n configuration
├── tailwind.config.js     # Tailwind v3 config
├── postcss.config.mjs     # PostCSS config
└── tsconfig.json          # TypeScript config
```

---

## Công nghệ đã cài đặt (Installed Technologies)

### ✅ Core Stack
- **Next.js 15.2.3** - Pages Router
- **TypeScript 5.8.2** - Type safety
- **Tailwind CSS 3.4.18** - Utility-first styling
- **PostCSS + Autoprefixer** - CSS processing

### ✅ UI & Styling
- **Lucide React** - Icon system
- **Framer Motion** - Smooth animations
- **next-themes** - Theme switching (dark/light)
- **clsx + tailwind-merge** - Class name utilities

### ✅ Internationalization
- **next-i18next** - i18n for Next.js
- **react-i18next + i18next** - Translation framework

---

## Roadmap

### Phase 1: Setup & Infrastructure ✅ COMPLETED
- ✅ Cài đặt UI libraries (Lucide icons, Framer Motion)
- ✅ Setup theme system (dark/light mode với next-themes)
- ✅ Setup i18n (English & Vietnamese với next-i18next)
- ✅ Cấu hình Tailwind v3 với custom theme colors

### Phase 2: Core UI Components ✅ COMPLETED
- ✅ Navbar component (modern, minimalist, balanced)
- ✅ Theme switcher (sun/moon toggle)
- ✅ Language switcher (EN/VI dropdown)
- ✅ Icon system (Lucide React)
- ✅ Layout với ThemeProvider và i18n

### Phase 3: Canvas Implementation
- [ ] Chọn và integrate canvas library
- [ ] Drag & drop functionality
- [ ] Element selection & manipulation
- [ ] Canvas toolbar

### Phase 4: Diagram Features
- [ ] Chart/diagram types
- [ ] Properties panel
- [ ] Export functionality

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

---

## Notes
- Skip landing page và authentication pages (làm sau)
- Ưu tiên sử dụng các thư viện có community lớn và được maintain tốt
- Code phải clean, dễ bảo trì và mở rộng
- Animation vừa đủ, không overdo
