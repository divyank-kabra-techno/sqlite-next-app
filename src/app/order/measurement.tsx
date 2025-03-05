import React from "react";

interface Unit {
  id: number;
  name: string;
  type: string;
  options?: string | null;
  quantity?: string;
}

interface UnitInputProps {
  unit: Unit;
  value: string;
  onChange: (value: string) => void;
}

const Measurement: React.FC<UnitInputProps> = ({ unit, value, onChange }) => {
    const optionsArray = unit.options ? JSON.parse(unit.options).map((opt: string) => opt.trim()) : [];
    console.log('optionsArray',optionsArray);
    
  return (
    <div className="flex flex-col">
      <label className="text-md font-bold mb-2">{unit.name} </label>
      
      {unit.type === "inputbox" && (
        <input
          type="text"
          className="border p-1 rounded-md text-center"
          value={value}
          placeholder={`Enter ${unit.name}`}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {unit.type === "selectbox" && (
        <select className="border p-2 rounded-md bg-white" value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select {unit.name}</option>
          {optionsArray.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      )}

      {unit.type === "checkbox" && (
        <div className="flex flex-wrap gap-2">
          {optionsArray.map((option, index) => (
            <label key={index} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={value.split(",").includes(option)}
                onChange={(e) => {
                  const newValue = e.target.checked
                    ? [...value.split(","), option].filter(Boolean).join(",")
                    : value.split(",").filter(v => v !== option).join(",");
                  onChange(newValue);
                }}
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {unit.type === "radio" && (
        <div className="flex flex-wrap gap-2">
          {optionsArray.map((option, index) => (
            <label key={index} className="flex items-center gap-1">
              <input
                type="radio"
                name={`radio-${unit.id}`}
                value={option}
                checked={value === option}
                onChange={(e) => onChange(e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Measurement;
