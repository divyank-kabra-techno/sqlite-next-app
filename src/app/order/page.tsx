"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getAllCategories } from "@/database/categories";
import { getUnitsByPattern } from "@/database/units";
import toast from "react-hot-toast";
import ItemDetail from "./Component/ItemDetail";
import {
  selectedCategoryProps,
  selectedPatternProps,
  unitProps,
} from "../models/order.model";
import CustomerForm from "./Component/CustomerForm";
import { IconPlus } from "@tabler/icons-react";
import CategoryList from "./Component/CategoryList";
import OrderItemModel from "./Component/OrderItemModel";
import CategoryPatternsList from "./Component/CategoryPatternsList";

interface orderFormProps{
  customer_id:null|number,
  booking_date:Date|string,
  delivery_date:Date|string,
  status:string,
  orderItems:any
}
export default function OrderModule() {
  const { register, handleSubmit, setValue,getValues, watch } = useForm <orderFormProps> ({
    defaultValues: {
      customer_id: null,
      booking_date: "",
      delivery_date: "",
      status: "Pending",
      orderItems: [],
    },
  });

  const [categories, setCategories] = useState([]);
  const [patterns, setPatterns] = useState([]);
  
  // const [selectedPattern, setSelectedPattern] =
  //   useState<selectedPatternProps | null>(null);
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
    // setSelectedPattern(null);
    // setSelectedUnits([]);
    // const data = await getPatternsByCategory(category.id);
    // console.log("category click data", data);
    // setPatterns(data);
  };

  const handlePatternClick = async (pattern) => {
    console.log("pattern click", pattern);
    setSelectedPattern(pattern);
    const data = await getUnitsByPattern(pattern.id);

    setSelectedUnits(data.map((unit) => ({ ...unit.unit, quantity: "" })));
  };

  const handleUnitQuantityChange = (index, value) => {
    const updatedUnits = [...selectedUnits];
    updatedUnits[index].quantity = value ? Number(value) : "";
    console.log("index", index, value, updatedUnits);
    setSelectedUnits(updatedUnits);
    // console.log("indexupdatedUnits");
  };

  useEffect(() => {
    console.log("====Units====", selectedUnits);
  }, [selectedUnits]);

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
      pattern_id: selectedPattern.id,
      pattern_name: selectedPattern.name,
      pattern_price: selectedPattern.amount,
      units: filteredUnits,
    };

    console.log("newOrderItem", newOrderItem, selectedPattern);

    setValue("orderItems", [...orderItems, newOrderItem]);
    setIsModalOpen(false);
    setSelectedCategory(null);
    setSelectedPattern(null);
    setSelectedUnits([]);
  };
  const handleOrderSubmit = async (data: OrderProps) => {
    console.log("data=----=--==-", data);
    // if (data.orderItems.length === 0) {
    //   Toast("Please add at least one item to the order.");
    //   alert("Please add at least one item to the order.");
    //   return;
    // }
    // await addOrder(data);
    // alert("Order saved successfully!");
  };
  const handleCustomerId = (id:number) => {
    setValue('customer_id',id);
  }
  const handleCloseModel = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-4">
      <div className="lg:w-3/4 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">New Order</h2>
          <CustomerForm handleCustomerId={(id:number)=>handleCustomerId(id)}/>
        <form onSubmit={handleSubmit(handleOrderSubmit)} className="space-y-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex bg-green-500 text-white px-4 py-1 rounded-md shadow-md"
          >
            <IconPlus/>
            Add Item
          </button>
          <ItemDetail orderItems={orderItems}/>
          <button type="submit" className="bg-gray-500 p-2">
            Submit
          </button>
          {/* Add Order Item Model  */}
          {isModalOpen && (
            <OrderItemModel onCloseModel={handleCloseModel}/>
          )}
        </form>
      </div>
    </div>
  );
}
