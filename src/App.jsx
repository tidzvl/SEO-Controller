import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import WorkflowCanvas from './components/WorkflowCanvas'
import { useSidebar } from './contexts/SidebarContext'

function AppContent() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="app">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
          <WorkflowCanvas />
        </main>
      </div>
    </div>
  )
}

export default AppContent
