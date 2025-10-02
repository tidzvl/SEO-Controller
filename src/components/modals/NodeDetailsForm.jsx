import React from 'react';

const NodeDetailsForm = ({ inputLinks, requirementLinks, formData, onChange }) => {
  const handleFieldChange = (fieldId, value) => {
    onChange(fieldId, value);
  };

  return (
    <div className="node-details-form">
      {inputLinks.length > 0 && (
        <div className="form-section">
          <h4>Inputs</h4>
          {inputLinks.map((link, index) => (
            <div key={`input-${index}`} className="form-group">
              <label>{link.label}</label>
              <input
                type="text"
                value={formData[`input_${index}`] ?? ''}
                onChange={(e) => handleFieldChange(`input_${index}`, e.target.value)}
                placeholder={`Configure ${link.label}`}
                className="form-input"
              />
            </div>
          ))}
        </div>
      )}

      {requirementLinks.length > 0 && (
        <div className="form-section">
          <h4>Requirements</h4>
          {requirementLinks.map((link, index) => (
            <div key={`req-${index}`} className="form-group">
              <label>{link.label}</label>
              <input
                type="text"
                value={formData[`requirement_${index}`] ?? ''}
                onChange={(e) => handleFieldChange(`requirement_${index}`, e.target.value)}
                placeholder={`Enter ${link.label}`}
                className="form-input"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NodeDetailsForm;
