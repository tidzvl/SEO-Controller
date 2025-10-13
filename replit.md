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

#### UI Libraries (Cần cài đặt)
Các thư viện hiện đại để xem xét:
- **shadcn/ui** - Component library dựa trên Radix UI + Tailwind
- **Radix UI** - Headless UI components
- **Lucide React** hoặc **Heroicons** - Icon system
- **Sonner** hoặc **React Hot Toast** - Toast notifications
- **Framer Motion** - Animations

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
- **next-i18next** - i18n for Next.js
- **react-i18next** - React integration

#### State Management (if needed)
- **Zustand** - Lightweight state management
- **Jotai** - Atomic state management

---

## Cấu trúc dự án hiện tại (Current Structure)

```
/
├── pages/
│   ├── _app.tsx
│   ├── index.tsx
│   └── api/
├── styles/
│   ├── globals.css
│   └── Home.module.css
├── public/
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Roadmap

### Phase 1: Setup & Infrastructure
- [ ] Chọn và cài đặt UI component library
- [ ] Setup theme system (dark/light mode)
- [ ] Setup i18n (English & Vietnamese)
- [ ] Cấu hình Tailwind với custom theme

### Phase 2: Core UI Components
- [ ] Layout components (Header, Sidebar, Toolbar)
- [ ] Theme switcher
- [ ] Language switcher
- [ ] Icon system
- [ ] Alert/Toast notifications

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

## Notes
- Đang chờ mô tả chi tiết về giao diện từ người dùng
- Ưu tiên sử dụng các thư viện có community lớn và được maintain tốt
- Code phải clean, dễ bảo trì và mở rộng
