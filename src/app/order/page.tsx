"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useDebounce from "../../utils/useDebounce";

import { getUnitsByIds } from "@/database/units";
import toast from "react-hot-toast";
import { getCustomerByMobile } from "@/database/customers";
import { getAllPatterns } from "@/database/patterns";

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

  const [patterns, setPatterns] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mobile = watch("mobile");
  const debouncedMobile = useDebounce(mobile, 500);
  const orderItems = watch("orderItems");

  useEffect(() => {
    if (debouncedMobile) {
      fetchCustomer(debouncedMobile);
    }
  }, [debouncedMobile]);

  const fetchCustomer = async (mobile:string) => {
    const customer = await getCustomerByMobile(mobile);
    console.log('customer',customer);
    setValue("customerName", customer ? customer.name : "");
    setValue("customerId", customer ? customer.id : "");
  };

  const openPatternSelection = async () => {
    const data = await getAllPatterns();
    setPatterns(data);
    setIsModalOpen(true);
  };

  const handlePatternClick = async (pattern) => {
    // const unitDetails = await getUnitsByIds(pattern.units || []);
    // const unitsWithQuantities = unitDetails.map((unit) => ({
    //   ...unit,
    //   quantity: '',
    // }));
    // setSelectedPattern(pattern);
    // setSelectedUnits(unitsWithQuantities);
  };

  const handleUnitQuantityChange = (index, value) => {
    const updatedUnits = [...selectedUnits];
    value = value?Number(value):'';
    updatedUnits[index].quantity = value;
    setSelectedUnits(updatedUnits);
  };

  const handleSaveSelection = (type: string = 'save') => {
    if (!selectedPattern || selectedUnits.length === 0) {
      toast.error("Please select a pattern and enter the values.");
      return;
    }
  
    const filteredUnits = selectedUnits.filter(
      (unit) => unit.quantity && unit.quantity > 0
    );
  
    if (filteredUnits.length === 0) {
      toast.error("Please enter at least one measurement");
      return;
    }
  
    const newOrderItem = {
      patternId: selectedPattern.id,
      patternName: selectedPattern.name,
      units: filteredUnits.map((unit) => ({
        unitId: unit.id,
        unitName: unit.name,
        quantity: unit.quantity,
      })),
    };
  
    setValue("orderItems", [...orderItems, newOrderItem]);
    if (type === 'save') {
      setIsModalOpen(false);
    }
    setSelectedPattern(null);
    setSelectedUnits([]);
  };

  const handleRemoveOrderItem = (index) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems.splice(index, 1);
    setValue("orderItems", updatedOrderItems);
  };

  const handleOrderSubmit = async (data:OrderProps) => {
    console.log('data=----=--==-',data);
    // if (data.orderItems.length === 0) {
    //   Toast("Please add at least one item to the order.");
    //   alert("Please add at least one item to the order.");
    //   return;
    // }
    // await addOrder(data);
    // alert("Order saved successfully!");
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-4">
      {/* Order Form */}
      <div className="lg:w-3/4 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">New Order</h2>
        <form onSubmit={handleSubmit(handleOrderSubmit)} className="space-y-4">
          <div className="flex gap-2">
            <input
              {...register("mobile", { required: "Mobile is required" })}
              placeholder="Enter Mobile No"
              className="border p-2 w-1/2 rounded-md shadow-sm"
            />
            <input
              {...register("customerName")}
              placeholder="Customer Name"
              className="border p-2 w-1/3 rounded-md shadow-sm bg-gray-100"
              readOnly
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
            >
              Add/Update
            </button>
          </div>
          <button
            type="button"
            onClick={openPatternSelection}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
          >
            Add Item
          </button>

          {/* Display selected order items */}
          {orderItems.length > 0 && (
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Selected Items</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">Pattern</th>
                    <th className="border p-2">Units</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item, index) => (
                    <tr key={`selected-item-${index}`} className="text-center">
                      <td className="border p-2 font-medium">
                        {item.patternName}
                      </td>
                      <td className="border p-2">
                        <div className="grid grid-cols-4 gap-2">
                          {item.units.map((unit,index) => (
                            <div className="flex bg-gray-200 px-2 py-0 rounded-md leading-[2] justify-between" key={`selected-unit-${index}`}>
                              <span key={unit.unitId}>{unit.unitName}</span>  
                              <span key={unit.unitId}>({unit.quantity})</span>  
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="border p-2">
                        <button
                          onClick={() => handleRemoveOrderItem(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md shadow-md"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-bold text-gray-700">Booking Date</label>
              <input
                {...register("bookingDate")}
                type="date"
                className="border p-2 w-full rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Delivery Date</label>
              <input
                {...register("deliveryDate")}
                type="date"
                className="border p-2 w-full rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Order Status</label>
              <select
                {...register("status")}
                className="border p-2 w-full rounded-md shadow-sm"
              >
                <option value="Pending">Pending</option>
                <option value="Stitched">Stitched</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
          >
            Save Order
          </button>
        </form>
      </div>

      {/* Pattern Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-2/3 h-[500px] rounded-xl shadow-lg flex flex-col">
            {/* Header - Fixed */}
            <div className="p-4 border-b sticky top-0 bg-white z-10 roundedk">
                <h2 className="text-lg font-bold">Select Pattern</h2>
            </div>
            <div className="p-4 overflow-y-auto flex-1">
                <div className="grid grid-cols-3 gap-2">
                {patterns.map((pattern) => (
                    <button
                    key={pattern.id}
                    className={`p-2 rounded-md cursor-pointer text-center shadow-sm transition-all ${
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

                {selectedPattern && (
                    <div className="mt-4">
                        {/* 4-Column Scrollable Layout */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {selectedUnits.map((unit, index) => (
                                <div key={`unit-box-${unit.id}`} className="flex flex-col">
                                <label className="text-sm font-bold mx-2">{unit?.name}</label>
                                <input
                                    type="text"
                                    className="border p-1 rounded-md shadow-sm text-center w-full" // w-full for full width within grid cell
                                    value={unit?.quantity}
                                    onChange={(e) => handleUnitQuantityChange(index, e.target.value)}
                                />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4 border-t flex justify-end gap-2 sticky bottom-0 bg-white z-10 rounded">
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md shadow-md"
                >
                    Close
                </button>
                <button
                onClick={()=>handleSaveSelection('save')}
                className="bg-green-300 text-green px-4 py-1 rounded-md shadow-md"
                >
                Save & Close
                </button>
                <button
                onClick={()=>handleSaveSelection('save_more')}
                className="bg-gray-300 text-gray px-4 py-1 rounded-md shadow-md"
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
