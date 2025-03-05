export default function PatternList({ patterns, selectedPattern, handlePatternClick }) {
    return (
      <div className="p-4 border-b overflow-x-auto">
        <h2 className="text-lg font-bold mb-2">Select Pattern</h2>
        <div className="grid grid-cols-3 gap-2">
          {patterns.map((pattern) => (
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
    );
  }
  