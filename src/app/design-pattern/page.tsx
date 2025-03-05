"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  getAllPatterns,
  addPattern,
  updatePattern,
  deletePattern,
} from "@/database/patterns";
import { getAllUnits } from "@/database/units";
import { getAllCategories } from "@/database/categories";

interface FormValues {
  category_id: string;
  name: string;
  amount: number;
  selectedUnits: { value: number; label: string }[];
}

interface Pattern {
  id: number;
  name: string;
  amount: number;
  category?: { name: string };
  units: { unit: { id: number; name: string } }[]; // ✅ Fixed structure
}

export default function DesignPatternManagement() {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [units, setUnits] = useState<{ value: number; label: string }[]>([]);
  const [categories, setCategories] = useState<{ value: number; label: string }[]>([]);
  const [editingPattern, setEditingPattern] = useState<Pattern | null>(null);

  const { control, register, handleSubmit, setValue, reset } = useForm<FormValues>({
    defaultValues: {
      category_id: "",
      name: "",
      amount: 0,
      selectedUnits: [],
    },
  });

  useEffect(() => {
    loadUnits();
    loadPatterns();
    loadCategories();
  }, []);

  const loadUnits = async () => {
    const data = await getAllUnits();
    setUnits(data.map((unit: any) => ({ value: unit.id, label: unit.name })));
  };

  const loadPatterns = async () => {
    try {
      const data = await getAllPatterns();
      setPatterns(data);
    } catch (error) {
      console.error("Error loading patterns:", error);
    }
  };

  const loadCategories = async () => {
    const data = await getAllCategories();
    setCategories(data.map((cat: any) => ({ value: cat.id, label: cat.name })));
  };

  const onSubmit = async (data: FormValues) => {
    const selectedUnitIds = data.selectedUnits.map((unit) => unit.value);
    const categoryId = Number(data.category_id);

    if (editingPattern) {
      await updatePattern(editingPattern.id, {
        category_id: categoryId,
        name: data.name,
        amount: data.amount,
        units: selectedUnitIds, // ✅ Ensures correct structure
      });
    } else {
      await addPattern({
        category_id: categoryId,
        name: data.name,
        amount: data.amount,
        units: selectedUnitIds,
      });
    }

    reset();
    setEditingPattern(null);
    loadPatterns();
  };

  const handleEdit = (pattern: Pattern) => {
    setEditingPattern(pattern);
    console.log('pattern',pattern);
    setValue("category_id", pattern.category?.id || "");
    setValue("name", pattern.name);
    setValue("amount", pattern.amount);
    setValue(
      "selectedUnits",
      pattern.units.map((unitObj) => ({
        value: unitObj.unit.id, // ✅ Ensures correct mapping
        label: unitObj.unit.name,
      }))
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen p-4 gap-4">
      {/* Left - Pattern Listing */}
      <div className="lg:w-3/4 w-full bg-white p-4 rounded-lg overflow-y-auto h-[80vh]">
        <h2 className="text-xl font-bold mb-2">Design Patterns</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Category</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Units</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patterns.length > 0 ? (
              patterns.map((pattern) => (
                <tr key={pattern.id} className="border">
                  <td className="border p-2">{pattern.category?.name}</td>
                  <td className="border p-2">{pattern.name}</td>
                  <td className="border p-2">{pattern.amount}</td>
                  <td className="border p-2">
                    <small className="text-xs">
                      {pattern.units.map((u) => u.unit.name).join(", ")}
                    </small>
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(pattern)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deletePattern(pattern.id)
                          .then(() => loadPatterns())
                          .catch(console.error);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="p-2 text-center">
                  No Pattern found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Right - Pattern Form */}
      <div className="lg:w-1/4 w-full bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">
          {editingPattern ? "Edit Design Pattern" : "Add Design Pattern"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-bold">Category</label>
            <select {...register("category_id")} className="border p-2 w-full">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold">Name</label>
            <input {...register("name")} className="border p-2 w-full" />
          </div>

          <div>
            <label className="block font-bold">Amount</label>
            <input type="number" {...register("amount")} className="border p-2 w-full" />
          </div>

          <div>
            <label className="block font-bold">Units</label>
            <Controller
              name="selectedUnits"
              control={control}
              render={({ field }) => <Select {...field} options={units} isMulti />}
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            {editingPattern ? "Update Pattern" : "Save Pattern"}
          </button>
        </form>
      </div>
    </div>
  );
}
