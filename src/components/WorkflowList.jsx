import React, { useState, useEffect } from 'react';
import './WorkflowList.css';
import Swal from 'sweetalert2';

function WorkflowList({ onLoadWorkflow }) {
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = () => {
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    setWorkflows(savedWorkflows);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc muốn xóa workflow này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    });

    if (!result.isConfirmed) return;
    
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    const filteredWorkflows = savedWorkflows.filter(w => w.id !== id);
    localStorage.setItem('workflows', JSON.stringify(filteredWorkflows));
    loadWorkflows();

    Swal.fire({
      icon: 'success',
      title: 'Đã xóa!',
      text: 'Workflow đã được xóa thành công',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleLoad = (workflow) => {
    if (onLoadWorkflow) {
      onLoadWorkflow(workflow);
    }
  };

  const handleRun = (workflow) => {
    Swal.fire({
      icon: 'info',
      title: 'Chức năng đang phát triển',
      html: `Đang chạy workflow <strong>"${workflow.name}"</strong>...<br><br>Chức năng này sẽ được phát triển sau!`,
      confirmButtonText: 'OK'
    });
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
