"use client";

import { useEffect, useState } from "react";
import {
  addUnitType,
  deleteUnitType,
  getAllUnitTypes,
} from "../../db/unitTypes";
import { useForm } from "react-hook-form";

export default function Page() {
  const [unitTypes, setUnitTypes] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { register, handleSubmit, reset, setError, setValue } = useForm({
    defaultValues: { name: "", status: "Active" },
  });

  useEffect(() => {
    loadUnitTypes();
  }, []);

  const loadUnitTypes = async () => {
    const data = await getAllUnitTypes();
    setUnitTypes(data);
  };

  const onSubmit = async (data: any) => {
    const unitExists = unitTypes.some(
      (unit) => unit.name.toLowerCase() === data.name.toLowerCase()
    );

    if (unitExists && !editingId) {
      setError("name", { type: "manual", message: "Unit name must be unique" });
      return;
    }
    await addUnitType(data);
    reset();
    loadUnitTypes();
  };

  const handleEdit = (unit: any) => {
    setValue("name", unit.name);
    setValue("status", unit.status);
    setEditingId(unit.id);
  };
  const handleDelete = async (id: number) => {
    await deleteUnitType(id);
    loadUnitTypes();
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
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {unitTypes.length > 0 ? (
                unitTypes.map((unit) => (
                  <tr key={unit.id} className="border-t">
                    <td className="p-2">{unit.id}</td>
                    <td className="p-2">{unit.name}</td>
                    <td className="p-2">{unit.status}</td>
                    <td>
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
                  <td colSpan={4} className="p-2 text-center">
                    No units found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="lg:w-1/3 w-full bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Add Unit</h2>
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
              <label>Status</label>
              <select {...register("status")} className="border p-2 w-full">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Save Unit Type
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
