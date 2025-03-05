"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useDebounce from "../../utils/useDebounce";
import { getAllCategories } from "@/database/categories";
import { getPatternsByCategory } from "@/database/patterns";
import { getUnitsByPattern } from "@/database/units";
import toast from "react-hot-toast";
import Measurement from "./measurement";

export default function OrderModule() {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      mobile: "",
      customerName: "",
      customerId: "",
      bookingDate: "",
      deliveryDate: "",
      status: "Pending",
      orderItems: [],
    },
  });

  const [categories, setCategories] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orderItems = watch("orderItems");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const handleCategoryClick = async (category: {
    id: number;
    name: string;
  }) => {
    setSelectedCategory(category);
    const data = await getPatternsByCategory(category.id);
    console.log("category click data", data);
    setPatterns(data);
  };

  const handlePatternClick = async (pattern) => {
    console.log("pattern click", pattern);
    setSelectedPattern(pattern);
    const data = await getUnitsByPattern(pattern.id);
    setSelectedUnits(data.map((unit) => ({ ...unit, quantity: "" })));
  };

  const handleUnitQuantityChange = (index, value) => {
    
    const updatedUnits = [...selectedUnits];
    updatedUnits[index].quantity = value ? Number(value) : "";
    console.log('index',index,value,updatedUnits);
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

    setValue("orderItems", [...orderItems, newOrderItem]);
    setIsModalOpen(false);
    setSelectedCategory(null);
    setSelectedPattern(null);
    setSelectedUnits([]);
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-4">
      <div className="lg:w-3/4 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">New Order</h2>
        <form onSubmit={handleSubmit(() => {})} className="space-y-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
          >
            Add Item
          </button>
        </form>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-3/4 h-[600px] rounded-xl shadow-lg p-4 flex flex-col">
            {/* Modal Content Wrapper */}
            <div className="flex flex-grow overflow-hidden">
              {/* Left Sidebar (Category List) */}
              <div className="w-1/5 p-4 px-2 border-r overflow-y-auto">
                <h2 className="text-lg font-bold mb-2">Select Category</h2>
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`px-4 py-2 rounded-md text-left ${
                        selectedCategory?.id === category.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Top (Patterns) and Middle Section (Units) */}
              <div className="w-3/4 flex flex-col">
                {/* Right Top (Pattern List) */}
                {selectedCategory && (
                  <div className="p-4 border-b overflow-x-auto">
                    <h2 className="text-lg font-bold mb-2">Select Pattern</h2>
                    <div className="grid grid-cols-3 gap-2">
                      {patterns.map((pattern) => (
                        <button
                          key={pattern.id}
                          className={`p-2 rounded-md ${
                            selectedPattern?.id === pattern.id
                              ? "bg-gray-900 text-white"
                              : "bg-gray-200"
                          }`}
                          onClick={() => handlePatternClick(pattern)}
                        >
                          {pattern.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Middle Section (Units) */}
                {selectedPattern && (
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
                            onChange={(value) =>
                              handleUnitQuantityChange(index, value)
                            }
                          />
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Section (Buttons) */}
            <div className="flex justify-end gap-2 p-4 border-t">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-4 py-1 rounded-md"
              >
                Close
              </button>
              <button
                onClick={handleSaveSelection}
                className="bg-green-500 text-white px-4 py-1 rounded-md"
              >
                Save & Close
              </button>
              <button
                //onClick={handleSaveAndAddMore}
                onClick={() => {}}
                className="bg-blue-500 text-white px-4 py-1 rounded-md"
              >
                Save & Add More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
