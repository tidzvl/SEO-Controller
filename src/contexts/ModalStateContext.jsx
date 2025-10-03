import React, { createContext, useContext, useState } from 'react';

const ModalStateContext = createContext();

export const useModalState = () => {
  const context = useContext(ModalStateContext);
  if (!context) {
    throw new Error('useModalState must be used within ModalStateProvider');
  }
  return context;
};

export const ModalStateProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [nodeData, setNodeData] = useState(null);

  const openModal = (nodeId, data) => {
    setSelectedNodeId(nodeId);
    setNodeData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedNodeId(null);
    setNodeData(null);
  };

  return (
    <ModalStateContext.Provider 
      value={{ 
        isOpen, 
        selectedNodeId, 
        nodeData,
        openModal, 
        closeModal 
      }}
    >
      {children}
    </ModalStateContext.Provider>
  );
};
