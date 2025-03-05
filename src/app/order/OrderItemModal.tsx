import { useState } from "react";
import CategoryPatternSelection from "./CategoryPatternSelection";
import { getUnitsByPattern } from "@/database/units";
import toast from "react-hot-toast";

export default function OrderItemModal({ categories, addOrderItem, setIsModalOpen }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [selectedUnits, setSelectedUnits] = useState([]);

  const handlePatternClick = async (pattern) => {
    setSelectedPattern(pattern);
    const data = await getUnitsByPattern(pattern.id);
    setSelectedUnits(data.map((unit) => ({ ...unit, quantity: "" })));
  };

  const handleUnitQuantityChange = (index, value) => {
    const updatedUnits = [...selectedUnits];
    updatedUnits[index].quantity = value ? Number(value) : "";
    setSelectedUnits(updatedUnits);
  };

  const handleSaveSelection = () => {
    if (!selectedPattern || selectedUnits.length === 0) {
      toast.error("Please select a pattern and enter quantities.");
      return;
    }

    const filteredUnits = selectedUnits.filter((unit) => unit.quantity > 0);
    if (filteredUnits.length === 0) {
      toast.error("Enter at least one measurement.");
      return;
    }

    const newOrderItem = {
      patternId: selectedPattern.id,
      patternName: selectedPattern.name,
      units: filteredUnits,
    };

    addOrderItem(newOrderItem);
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-3/4 h-[600px] rounded-xl shadow-lg p-4 flex flex-col">
        <CategoryPatternSelection
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPattern={selectedPattern}
          handlePatternClick={handlePatternClick}
        />

        {selectedPattern && (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Enter Quantity</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {selectedUnits.map((unit, index) => (
                <div key={unit.id} className="flex flex-col">
                  <span>{unit.name}</span>
                  <input
                    type="number"
                    value={unit.quantity}
                    onChange={(e) => handleUnitQuantityChange(index, e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 p-4 border-t">
          <button onClick={() => setIsModalOpen(false)} className="bg-red-500 text-white px-4 py-1 rounded-md">Close</button>
          <button onClick={handleSaveSelection} className="bg-green-500 text-white px-4 py-1 rounded-md">Save & Close</button>
        </div>
      </div>
    </div>
  );
}
