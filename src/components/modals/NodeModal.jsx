import React, { useState, useEffect } from 'react';
import { useModalState } from '../../contexts/ModalStateContext';
import NodeRenameField from './NodeRenameField';
import InputDataForm from './InputDataForm';
import NodeDetailsForm from './NodeDetailsForm';
import './NodeModal.css';

const NodeModal = ({ onSave }) => {
  const { isOpen, nodeData, selectedNodeId, closeModal } = useModalState();
  const [formData, setFormData] = useState({});
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    if (nodeData) {
      setDisplayName(nodeData.config?.displayName || nodeData.label);
      setFormData(nodeData.config?.values || {});
    }
  }, [nodeData]);

  const handleClose = () => {
    closeModal();
    setFormData({});
    setDisplayName('');
  };

  const handleSave = () => {
    onSave(selectedNodeId, {
      displayName,
      values: formData
    });
    handleClose();
  };

  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  if (!isOpen || !nodeData) return null;

  const isInputNode = nodeData.category === 'input';
  const fields = nodeData.fields || [];
  const inputLinks = (nodeData.links || []).filter(link => link.type === 'input');
  const requirementLinks = (nodeData.links || []).filter(link => link.type === 'requirement');

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isInputNode ? 'Configure Input Node' : 'Configure Node'}</h3>
          <button className="modal-close" onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <NodeRenameField 
            value={displayName} 
            onChange={setDisplayName} 
          />

          {isInputNode ? (
            <InputDataForm 
              fields={fields}
              formData={formData}
              onChange={handleFieldChange}
            />
          ) : (
            <NodeDetailsForm
              inputLinks={inputLinks}
              requirementLinks={requirementLinks}
              formData={formData}
              onChange={handleFieldChange}
            />
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeModal;
