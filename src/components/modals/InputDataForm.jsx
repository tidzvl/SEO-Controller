import React from 'react';

const InputDataForm = ({ fields, formData, onChange }) => {
  const handleFieldChange = (fieldId, value) => {
    onChange(fieldId, value);
  };

  return (
    <div className="input-data-form">
      <h4>Input Data</h4>
      {fields.map((field) => (
        <div key={field.id} className="form-group">
          <label>{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              value={formData[field.id] ?? field.default ?? ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className="form-textarea"
              rows={4}
            />
          ) : field.type === 'checkbox' ? (
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData[field.id] ?? field.default ?? false}
                onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                className="form-checkbox"
              />
              <span>Enable</span>
            </label>
          ) : (
            <input
              type={field.type}
              value={formData[field.id] ?? field.default ?? (field.type === 'number' ? 0 : '')}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className="form-input"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default InputDataForm;
