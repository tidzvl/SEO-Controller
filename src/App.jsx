import { useState, useRef } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import WorkflowCanvas from './components/WorkflowCanvas'
import WorkflowList from './components/WorkflowList'
import { useSidebar } from './contexts/SidebarContext'

function AppContent() {
  const { isCollapsed } = useSidebar();
  const [activeTab, setActiveTab] = useState('Overview');
  const workflowCanvasRef = useRef(null);

  const handleLoadWorkflow = (workflow) => {
    setActiveTab('Overview');
    
    setTimeout(() => {
      if (workflowCanvasRef.current) {
        workflowCanvasRef.current.loadWorkflow(workflow);
      }
    }, 100);
  };

  return (
    <div className="app">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="app-body">
        <Sidebar />
        <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div style={{ display: activeTab === 'Overview' ? 'block' : 'none', height: '100%' }}>
            <WorkflowCanvas ref={workflowCanvasRef} />
          </div>
          <div style={{ display: activeTab === 'Workflow' ? 'block' : 'none', height: '100%' }}>
            <WorkflowList onLoadWorkflow={handleLoadWorkflow} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AppContent
