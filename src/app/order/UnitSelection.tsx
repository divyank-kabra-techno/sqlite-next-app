import Measurement from "./measurement";

export default function UnitSelection({ selectedUnits, handleUnitQuantityChange }) {
  return (
    <div className="flex-grow p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-2">Enter Quantity</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {selectedUnits.map((unitWrapper, index) => {
          const unit = unitWrapper?.unit;
          return unit ? (
            <Measurement
              key={unit.id}
              unit={unit}
              value={unit.quantity || ""}
              onChange={(value) => handleUnitQuantityChange(index, value)}
            />
          ) : null;
        })}
      </div>
    </div>
  );
}
