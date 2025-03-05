export default function CategoryList({ categories, selectedCategory, handleCategoryClick }) {
    return (
      <div className="w-1/5 p-4 px-2 border-r overflow-y-auto">
        <h2 className="text-lg font-bold mb-2">Select Category</h2>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-md text-left ${
                selectedCategory?.id === category.id ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    );
  }
  