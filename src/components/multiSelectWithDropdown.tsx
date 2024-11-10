import React from "react";
import { FormElementProps } from "./formFieldComponents";

const MultiSelectDropdown: React.FC<FormElementProps> = ({
  options,
  value: selectedOptions = [],
  onSelectChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="multi-select-dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {selectedOptions.length > 0
          ? `Selected (${selectedOptions.length})`
          : "Select Options"}
      </button>

      {isDropdownOpen && (
        <div className="dropdown-options">
          {options.map((option: any, idx: number) => (
            <label key={idx} className="dropdown-option">
              <input
                type="checkbox"
                value={option.value}
                checked={selectedOptions.includes(option.value)}
                onChange={() => onSelectChange(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}

      <style jsx>{`
        .multi-select-dropdown {
          position: relative;
          display: inline-block;
        }
        .dropdown-toggle {
          padding: 6px;
          font-size: 14px;
          width: 50%;
          border-radius: 5px;
          border: 1px solid #ccc;
          background: white;
          cursor: pointer;
          margin-top: 2px;
        }
        .dropdown-options {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid #ccc;
          width: 200px;
          max-height: 200px;
          overflow-y: auto;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }
        .dropdown-option {
          padding: 10px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default MultiSelectDropdown;
