import React, { useState, useEffect } from 'react';
import './WorkflowList.css';

function WorkflowList({ onLoadWorkflow }) {
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = () => {
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    setWorkflows(savedWorkflows);
  };

  const handleDelete = (id) => {
    if (!confirm('Bạn có chắc muốn xóa workflow này?')) return;
    
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    const filteredWorkflows = savedWorkflows.filter(w => w.id !== id);
    localStorage.setItem('workflows', JSON.stringify(filteredWorkflows));
    loadWorkflows();
  };

  const handleLoad = (workflow) => {
    if (onLoadWorkflow) {
      onLoadWorkflow(workflow);
    }
  };

  const handleRun = (workflow) => {
    alert(`Đang chạy workflow "${workflow.name}"...\n\nChức năng này sẽ được phát triển sau!`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN');
  };

  return (
    <div className="workflow-list-container">
      <div className="workflow-list-header">
        <h2>Danh Sách Workflows</h2>
        <p className="workflow-count">{workflows.length} workflow(s)</p>
      </div>

      {workflows.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>Chưa có workflow nào</h3>
          <p>Hãy tạo và lưu workflow đầu tiên của bạn!</p>
        </div>
      ) : (
        <div className="workflow-grid">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="workflow-card">
              <div className="workflow-card-header">
                <h3 className="workflow-name">{workflow.name}</h3>
                <div className="workflow-meta">
                  <span className="workflow-nodes-count">
                    🔗 {workflow.nodes?.length || 0} nodes
                  </span>
                  <span className="workflow-date">
                    📅 {formatDate(workflow.createdAt)}
                  </span>
                </div>
              </div>

              <div className="workflow-card-actions">
                <button 
                  className="workflow-btn workflow-btn-load" 
                  onClick={() => handleLoad(workflow)}
                >
                  📂 Load
                </button>
                <button 
                  className="workflow-btn workflow-btn-run" 
                  onClick={() => handleRun(workflow)}
                >
                  ▶️ Run
                </button>
                <button 
                  className="workflow-btn workflow-btn-delete" 
                  onClick={() => handleDelete(workflow.id)}
                >
                  🗑️ Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkflowList;
