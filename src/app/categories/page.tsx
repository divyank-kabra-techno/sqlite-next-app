"use client";

import React, { useEffect, useState } from "react";
import { getCategories } from "@/database/categories";
import CategoryForm from "./category-form";

const Categories = () => {
    const [categories, setCategory] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        const storedCategory = await getCategories();
        setCategory(storedCategory);
    }

    return (
        <div className="p-6">
            <div className="flex flex-col lg:flex-row h-screen/2 p-4 gap-4">
                <div className="lg:w-2/3 w-full bg-white p-4 rounded-lg h-[80vh]">
                    <h2 className="text-xl font-bold mb-2">Categories</h2>
                    <div className="border rounded-md overflow-hidden">
                        <table className="w-full border-collapse text-left">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-2">ID</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2 text-center">Actions</th>
                                </tr>
                            </thead>
                        </table>
                        <div className="max-h-[60vh] overflow-y-auto">
                            <table className="w-full border-collapse text-left">
                                <tbody>
                                    {categories.length > 0 ? (
                                        categories.map((category, index) => (
                                            <tr key={`category-${category.id}`} className="border-t">
                                                <td className="p-2">{index + 1}</td>
                                                <td className="p-2">{category.name}</td>
                                                <td className="p-2">
                                                    <div className="text-center">
                                                        <button
                                                            onClick={() => console.log(category.id)}
                                                            className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => console.log(category.id)}
                                                            className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="p-2 text-center">
                                                No Categories found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <CategoryForm fetchCategories={fetchCategories} />
            </div>
        </div>
    );
};

export default Categories;
