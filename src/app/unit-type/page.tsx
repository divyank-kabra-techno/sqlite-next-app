"use client";

import { useEffect, useState } from "react";
import {
  addUnit,
  deleteUnit,
  getAllUnits,
} from "../../database/units";
import { useForm } from "react-hook-form";

export default function Page() {
  const [units, setUnits] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { register, handleSubmit, reset, setError, setValue, watch } = useForm({
    defaultValues: { name: "", type: "inputbox", options: "" },
  });

  useEffect(() => {
    loadUnits();
  }, []);

  const loadUnits = async () => {
    const data = await getAllUnits();
    setUnits(data);
  };

  const onSubmit = async (data: any) => {
    const unitExists = units.some(
      (unit) => unit.name.toLowerCase() === data.name.toLowerCase()
    );

    if (unitExists && !editingId) {
      setError("name", { type: "manual", message: "Unit name must be unique" });
      return;
    }

    const payload = {
      ...data,
      options: data.options ? JSON.stringify(data.options.split(",")) : null, // Convert options to JSON
    };

    await addUnit(payload);
    reset();
    loadUnits();
  };

  const handleEdit = (unit: any) => {
    setValue("name", unit.name);
    setValue("type", unit.type);
    setValue("options", unit.options ? JSON.parse(unit.options).join(",") : ""); // Convert JSON to string
    setEditingId(unit.id);
  };

  const handleDelete = async (id: number) => {
    await deleteUnit(id);
    loadUnits();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Unit Management</h1>
      <div className="flex flex-col lg:flex-row h-screen p-4 gap-4">
        <div className="lg:w-2/3 w-full bg-white p-4 rounded-lg overflow-y-auto h-[80vh]">
          <h2 className="text-xl font-bold mb-2">Units</h2>
          <table className="w-full border text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Type</th>
                <th className="p-2">Options</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {units.length > 0 ? (
                units.map((unit) => (
                  <tr key={unit.id} className="border-t">
                    <td className="p-2">{unit.id}</td>
                    <td className="p-2">{unit.name}</td>
                    <td className="p-2">{unit.type}</td>
                    <td className="p-2">
                      {unit.options ? JSON.parse(unit.options).join(", ") : "-"}
                    </td>
                    <td className="p-2">
                      <button
                        className="text-blue-500 mr-2"
                        onClick={() => handleEdit(unit)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(unit.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-2 text-center">
                    No units found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="lg:w-1/3 w-full bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">
            {editingId ? "Edit Unit" : "Add Unit"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label>Unit Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter unit name"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label>Type</label>
              <select {...register("type")} className="border p-2 w-full">
                <option value="inputbox">Input Box</option>
                <option value="checkbox">Checkbox</option>
                <option value="selectbox">Select Box</option>
                <option value="radio">Radio Button</option>
              </select>
            </div>

            {watch("type") === "selectbox" || watch("type") === "radio" ? (
              <div>
                <label>Options (comma-separated)</label>
                <input
                  type="text"
                  {...register("options")}
                  placeholder="e.g., Option1, Option2"
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {editingId ? "Update Unit" : "Save Unit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
