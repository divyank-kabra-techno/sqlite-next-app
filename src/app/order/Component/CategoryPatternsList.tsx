import { category } from "@/app/models/globle.model";
import { selectedPatternProps } from "@/app/models/order.model";
import { getPatternsByCategory } from "@/database/patterns";
import { getUnitsByPattern } from "@/database/units";
import React, { useEffect, useState } from "react";
import Measurement from "../measurement";
import toast from "react-hot-toast";

interface patternProps {
	selectedCategory: category | null;

}
export default function CategoryPatternsList({
	selectedCategory,
}: patternProps) {
	const [patterns, setPatterns] = useState([]);
	const [selectedPattern, setSelectedPattern] =
		useState<selectedPatternProps | null>(null);

	const [selectedUnits, setSelectedUnits] = useState([]);
	useEffect(() => {
		if (selectedCategory) {
			getPatternList(selectedCategory);
			setSelectedPattern(null);
			setSelectedUnits([]);
		}
	}, [selectedCategory]);

	const getPatternList = async (category: category) => {
		const data = await getPatternsByCategory(category.id);
		console.log("category click data", data);

		setPatterns(data);
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
	};

	const saveOrderItem = () => {
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
	}

	return (
		<div className="w-3/4 flex flex-col">
			{/* Right Top (Pattern List) */}
			{selectedCategory && (
				<div className="p-4 border-b overflow-x-auto">
					<h2 className="text-lg font-bold mb-2">Select Pattern</h2>
					<div className="grid grid-cols-3 gap-2">
						{patterns.map((pattern) => (
							<button
								key={pattern.id}
								className={`p-2 rounded-md ${selectedPattern?.id === pattern.id
									? "bg-gray-900 text-white"
									: "bg-gray-200"
									}`}
								onClick={() => handlePatternClick(pattern)}
							>
								{pattern.name}
							</button>
						))}
					</div>
				</div>
			)}
			{/* Middle Section (Units) */}
			{selectedPattern && (
				<div className="flex-grow p-4 overflow-y-auto">
					<h2 className="text-lg font-bold mb-2">Enter Quantity</h2>
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
						{selectedUnits.map((unit: unitProps, index) => {
							console.log("====Unit====", unit);
							return (
								<Measurement
									key={unit?.id}
									unit={unit}
									value={unit?.quantity || ""}
									onChange={(value) => handleUnitQuantityChange(index, value)}
								/>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
