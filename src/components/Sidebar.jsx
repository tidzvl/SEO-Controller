import React from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import { nodesConfig, inputNodes } from '../config/nodesConfig';
import './Sidebar.css';

const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();

  const handleDragStart = (event, nodeConfig) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({
      type: nodeConfig.id,
      label: nodeConfig.name,
      icon: nodeConfig.id,
      color: nodeConfig.theme_color,
      shape: nodeConfig.shape,
      links: nodeConfig.links,
      category: nodeConfig.category,
      fields: nodeConfig.fields
    }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button 
          className="collapse-toggle"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isCollapsed ? (
              <polyline points="9 18 15 12 9 6" />
            ) : (
              <polyline points="15 18 9 12 15 6" />
            )}
          </svg>
        </button>
      </div>

      <div className="sidebar-content">
        {!isCollapsed && (
          <div className="sidebar-section">
            <div className="sidebar-title">
              <h3>Input Nodes</h3>
              <p>Dữ liệu đầu vào</p>
            </div>
            <div className="node-grid">
              {inputNodes.map((nodeConfig) => {
                const IconComponent = nodeConfig.icon;
                return (
                  <div
                    key={nodeConfig.id}
                    className="node-item node-item-small"
                    draggable
                    onDragStart={(e) => handleDragStart(e, nodeConfig)}
                    title={nodeConfig.name}
                  >
                    <div className="node-icon" style={{ color: nodeConfig.theme_color }}>
                      <IconComponent size={24} />
                    </div>
                    <span className="node-label">{nodeConfig.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="sidebar-section">
          {!isCollapsed && (
            <div className="sidebar-title">
              <h3>Platform Nodes</h3>
              <p>Kéo thả vào canvas</p>
            </div>
          )}

          <div className={`node-grid ${isCollapsed ? 'collapsed' : ''}`}>
            {nodesConfig.map((nodeConfig) => {
              const IconComponent = nodeConfig.icon;
              return (
                <div
                  key={nodeConfig.id}
                  className="node-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, nodeConfig)}
                  title={nodeConfig.name}
                >
                  <div className="node-icon" style={{ color: nodeConfig.theme_color }}>
                    <IconComponent size={isCollapsed ? 24 : 32} />
                  </div>
                  {!isCollapsed && <span className="node-label">{nodeConfig.name}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
