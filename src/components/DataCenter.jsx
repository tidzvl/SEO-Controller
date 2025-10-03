import React, { useState, useEffect } from 'react';
import './DataCenter.css';

function DataCenter() {
  const [workflows, setWorkflows] = useState([]);
  const [expandedWorkflows, setExpandedWorkflows] = useState({});
  const [expandedNodes, setExpandedNodes] = useState({});

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = () => {
    const savedWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    setWorkflows(savedWorkflows);
  };

  const toggleWorkflow = (workflowId) => {
    setExpandedWorkflows(prev => ({
      ...prev,
      [workflowId]: !prev[workflowId]
    }));
  };

  const toggleNode = (workflowId, nodeId) => {
    const compositeKey = `${workflowId}:${nodeId}`;
    setExpandedNodes(prev => ({
      ...prev,
      [compositeKey]: !prev[compositeKey]
    }));
  };

  const handleInputChange = (workflowId, nodeId, field, value) => {
    console.log('Input changed:', { workflowId, nodeId, field, value });
  };

  const renderNodeInputs = (node, workflowId) => {
    const config = node.data?.config || {};
    const values = config.values || {};

    return (
      <div className="node-input-section">
        <h4>Input Data</h4>
        {node.data?.fields && node.data.fields.length > 0 ? (
          node.data.fields.map((field, index) => (
            <div key={index} className="input-field">
              <label>{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  placeholder={field.placeholder || ''}
                  defaultValue={values[field.name] || ''}
                  onChange={(e) => handleInputChange(workflowId, node.id, field.name, e.target.value)}
                />
              ) : field.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  defaultChecked={values[field.name] || false}
                  onChange={(e) => handleInputChange(workflowId, node.id, field.name, e.target.checked)}
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  placeholder={field.placeholder || ''}
                  defaultValue={values[field.name] || ''}
                  onChange={(e) => handleInputChange(workflowId, node.id, field.name, e.target.value)}
                />
              )}
            </div>
          ))
        ) : (
          <p className="no-data">Không có input fields</p>
        )}
      </div>
    );
  };

  const renderNodeOutputs = (node, workflowId) => {
    return (
      <div className="node-output-section">
        <h4>Output Data</h4>
        <div className="output-preview">
          <pre>
{`{
  "status": "pending",
  "message": "Chưa có dữ liệu output",
  "note": "Output sẽ hiển thị sau khi chạy workflow"
}`}
          </pre>
        </div>
      </div>
    );
  };

  if (workflows.length === 0) {
    return (
      <div className="data-center-container">
        <div className="data-center-header">
          <h2>Data Center</h2>
          <p className="subtitle">Quản lý dữ liệu của các workflows và nodes</p>
        </div>
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>Chưa có workflow nào</h3>
          <p>Tạo và lưu workflow để quản lý dữ liệu tại đây</p>
        </div>
      </div>
    );
  }

  return (
    <div className="data-center-container">
      <div className="data-center-header">
        <h2>Data Center</h2>
        <p className="subtitle">Quản lý dữ liệu của {workflows.length} workflow(s)</p>
      </div>

      <div className="workflows-list">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="workflow-accordion">
            <div 
              className="workflow-accordion-header"
              onClick={() => toggleWorkflow(workflow.id)}
            >
              <div className="workflow-info">
                <span className="workflow-icon">
                  {expandedWorkflows[workflow.id] ? '📂' : '📁'}
                </span>
                <div>
                  <h3>{workflow.name}</h3>
                  <span className="workflow-meta">
                    {workflow.nodes?.length || 0} nodes • {workflow.edges?.length || 0} connections
                  </span>
                </div>
              </div>
              <span className="toggle-icon">
                {expandedWorkflows[workflow.id] ? '▼' : '▶'}
              </span>
            </div>

            {expandedWorkflows[workflow.id] && (
              <div className="workflow-accordion-content">
                {workflow.nodes && workflow.nodes.length > 0 ? (
                  workflow.nodes.map((node) => {
                    const compositeKey = `${workflow.id}:${node.id}`;
                    return (
                      <div key={node.id} className="node-accordion">
                        <div 
                          className="node-accordion-header"
                          onClick={() => toggleNode(workflow.id, node.id)}
                        >
                          <div className="node-info">
                            <span 
                              className="node-color-indicator" 
                              style={{ backgroundColor: node.data?.color || '#999' }}
                            />
                            <span className="node-name">
                              {node.data?.config?.displayName || node.data?.label || 'Unnamed Node'}
                            </span>
                            <span className="node-type-badge">
                              {node.data?.category === 'input' ? 'Input Node' : 'Platform Node'}
                            </span>
                          </div>
                          <span className="toggle-icon-small">
                            {expandedNodes[compositeKey] ? '▼' : '▶'}
                          </span>
                        </div>

                        {expandedNodes[compositeKey] && (
                          <div className="node-accordion-content">
                            <div className="node-data-columns">
                              <div className="column-left">
                                {renderNodeInputs(node, workflow.id)}
                              </div>
                              <div className="column-right">
                                {renderNodeOutputs(node, workflow.id)}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="no-nodes">
                    <p>Workflow này chưa có node nào</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataCenter;
