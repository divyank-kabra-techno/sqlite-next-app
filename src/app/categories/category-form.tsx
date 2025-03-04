import { addCategory } from "@/database/categories";
import React from "react";
import { useForm } from "react-hook-form";

interface CategoryFormProps {
  fetchCategories: () => void; // Define the expected prop type
}

export default function CategoryForm({ fetchCategories }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryModel>();

  const onSubmit = async (data: CategoryModel) => {
    await addCategory(data);
    reset();
    fetchCategories();
  };
  return (
    <div className="lg:w-1/3 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Add Category</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <div className="space-y-4">
          {" "}
          {/* Changed to space-y-4 for vertical spacing */}
          <div>
            <input
              {...register("name", { required: "Category Name is required" })}
              placeholder="Category Name"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" // Added styling
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {" "}
                {/* Added mt-1 for margin top */}
                {errors.name.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" // Added styling
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
