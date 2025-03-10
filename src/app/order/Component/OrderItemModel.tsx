import React, { useImperativeHandle, useState } from 'react'
import CategoryList from './CategoryList'
import CategoryPatternsList from './CategoryPatternsList'
import { selectedCategoryProps } from '@/app/models/order.model';

interface orderItemModelProps {
    onCloseModel : () => void,
}
export default function OrderItemModel({onCloseModel}:orderItemModelProps) {
    
    const [selectedCategory, setSelectedCategory] =
        useState<selectedCategoryProps | null>(null);


    const handleCategoryClick = async (category: {
        id: number;
        name: string;
    }) => {
        setSelectedCategory(category);
    };


    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-3/4 h-[600px] rounded-xl shadow-lg p-4 flex flex-col">
                {/* Modal Content Wrapper */}
                <div className="flex flex-grow overflow-hidden">
                    {/* Left Sidebar (Category List) */}
                    <CategoryList handleCategoryClick={handleCategoryClick} />

                    {/* Right Top (Patterns) and Middle Section (Units) */}
                    <CategoryPatternsList selectedCategory={selectedCategory} />
                </div>
                {/* Bottom Section (Buttons) */}
                <div className="flex justify-end gap-2 p-4 border-t">
                    <button
                        onClick={() => onCloseModel()}
                        className="bg-red-500 text-white px-4 py-1 rounded-md"
                    >
                        Close
                    </button>
                    <button
                        onClick={()=>{}}
                        className="bg-green-500 text-white px-4 py-1 rounded-md"
                    >
                        Save & Close
                    </button>
                    <button
                        //onClick={handleSaveAndAddMore}
                        onClick={() => { }}
                        className="bg-blue-500 text-white px-4 py-1 rounded-md"
                    >
                        Save & Add More
                    </button>
                </div>
            </div>
        </div>
    )
}
