export default function CategoryPatternSelection({
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedPattern,
    handlePatternClick,
  }) {
    return (
      <div className="flex border-b">
        {selectedCategory && (
          <div className="w-3/4 p-4 overflow-x-auto">
            <h2 className="text-lg font-bold mb-2">Select Pattern</h2>
            <div className="grid grid-cols-3 gap-2">
              {selectedCategory.patterns?.map((pattern) => (
                <button
                  key={pattern.id}
                  className={`p-2 rounded-md ${
                    selectedPattern?.id === pattern.id ? "bg-gray-900 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => handlePatternClick(pattern)}
                >
                  {pattern.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  