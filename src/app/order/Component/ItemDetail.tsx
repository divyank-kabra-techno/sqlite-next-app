import React from "react";

interface units {
  id: number;
  name: string;
  quantity: number;
}
interface ItemDetailProps {
  orderItems: {
    pattern_id: number;
    pattern_name: string;
    units: units[];
  }[];
}

export default function ItemDetail({ orderItems }: ItemDetailProps) {
  return (
    <div className="mt-4 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Selected Items</h3>
      <div className="grid grid-2 w-full">
        {orderItems.length > 0 &&
          orderItems.map((item, index) => (
            <div className="rounded border border-blue-200 my-1" key={`item-${index}`}>
              <div
                className="flex bg-blue-50 border border-blue-100 px-2 py-2 leading-[1.5] justify-between"
                key={`selected-uni`}
              >
                <strong className="text-blue-600 font-medium">
                  {item.pattern_name}
                </strong>
                <span>2</span>
              </div>
              <div className="p-2">
                <div className="grid grid-cols-4 gap-2">
                  {item.units.map((unit, index) => (
                    <div
                      className="flex bg-gray-200 px-2 py-0 rounded-md leading-[2] justify-between"
                      key={`selected-unit-${index}`}
                    >
                      <span key={unit.id}>{unit.name}</span>
                      <span key={unit.id}>({unit.quantity})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
