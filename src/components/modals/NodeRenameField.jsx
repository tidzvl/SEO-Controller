import React from 'react';

const NodeRenameField = ({ value, onChange }) => {
  return (
    <div className="form-group">
      <label>Node Name</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter node name"
        className="form-input"
      />
    </div>
  );
};

export default NodeRenameField;
