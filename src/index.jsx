import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './ThemeContext'
import { SidebarProvider } from './contexts/SidebarContext'
import { ModalStateProvider } from './contexts/ModalStateContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <SidebarProvider>
        <ModalStateProvider>
          <App />
        </ModalStateProvider>
      </SidebarProvider>
    </ThemeProvider>
  </React.StrictMode>
)
