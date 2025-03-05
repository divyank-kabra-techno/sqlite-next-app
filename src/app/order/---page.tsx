"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getAllCategories } from "@/database/categories";
import { getPatternsByCategory } from "@/database/patterns";
import { getUnitsByPattern } from "@/database/units";
import OrderItemModal from "./OrderItemModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const orderItems = watch("orderItems");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const addOrderItem = (newOrderItem) => {
    setValue("orderItems", [...orderItems, newOrderItem]);
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
        <OrderItemModal
          categories={categories}
          addOrderItem={addOrderItem}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}
