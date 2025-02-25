"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  addDesignPattern,
  deleteDesignPattern,
  getAllDesignPatterns,
  updateDesignPattern,
} from "../../db/designPatterns";
import { getAllUnitTypes } from "../../db/unitTypes";

interface FormValues {
  name: string;
  description: string;
  selectedUnits: { value: string; label: string }[];
}

export default function DesignPatternManagement() {
  const [designPatterns, setDesignPatterns] = useState<any[]>([]);
  const [units, setUnits] = useState<{ value: string; label: string }[]>([]);
  const [editingPattern, setEditingPattern] = useState<any | null>(null);
  const { control, register, handleSubmit, setValue, reset, watch } =
    useForm<FormValues>({
      defaultValues: { name: "", description: "", selectedUnits: [] },
    });
    
  useEffect(() => {
    loadUnits();
    loadDesignPatterns();
  }, []);

  const loadUnits = async () => {
    const data = await getAllUnitTypes(); // Fetch units from IndexedDB
    setUnits(data.map((unit: any) => ({ value: unit.id, label: unit.name })));
  };

  const loadDesignPatterns = async () => {
    const data = await getAllDesignPatterns();
    setDesignPatterns(data);
  };

  const onSubmit = async (data: FormValues) => {
    const selectedUnitIds = data.selectedUnits.map((unit) => unit.value); // Extract unit IDs

    if (editingPattern) {
      // Update existing design pattern
      await updateDesignPattern(editingPattern.id, {
        name: data.name,
        description: data.description,
        units: selectedUnitIds, // Store only unit IDs
      });
    } else {
      // Add new design pattern
      await addDesignPattern({
        name: data.name,
        description: data.description,
        units: selectedUnitIds,
      });
    }

    reset();
    setEditingPattern(null);
    loadDesignPatterns();
  };

  const handleEdit = (pattern: any) => {
    setEditingPattern(pattern);
    setValue("name", pattern.name);
    setValue("description", pattern.description);
    setValue(
      "selectedUnits",
      pattern.units.map(
        (unitId: string) =>
          units.find((unit) => unit.value === unitId) || {
            value: unitId,
            label: unitId,
          }
      )
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen p-4 gap-4">
      {/* Left - Design Pattern Listing (3/4 width) */}
      <div className="lg:w-3/4 w-full bg-gray-100 p-4 rounded-lg overflow-y-auto h-[80vh]">
        <h2 className="text-xl font-bold mb-2">Design Patterns</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Units</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {designPatterns.map((pattern) => (
              <tr key={pattern.id} className="border">
                <td className="border p-2">{pattern.name}</td>
                <td className="border p-2">{pattern.description}</td>
                <td className="border p-2">{pattern.units.length}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(pattern)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteDesignPattern(pattern.id)
                        .then(() => loadDesignPatterns()) // Reload after deletion
                        .catch((error) => console.error(error));
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right - Design Pattern Form (1/4 width) */}
      <div className="lg:w-1/4 w-full bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">
          {editingPattern ? "Edit Design Pattern" : "Add Design Pattern"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-bold">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block font-bold">Description</label>
            <textarea
              {...register("description")}
              className="border p-2 w-full"
            ></textarea>
          </div>

          <div>
            <label className="block font-bold">Units</label>
            <Controller
              name="selectedUnits"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={units}
                  isMulti
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            {editingPattern ? "Update Design Pattern" : "Save Design Pattern"}
          </button>
        </form>
      </div>
    </div>
  );
}
