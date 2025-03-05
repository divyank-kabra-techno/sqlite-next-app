import CategoryList from "./CategoryList";
import PatternList from "./PatternList";
import UnitSelection from "./UnitSelection";
import ModalFooter from "./ModalFooter";

export default function OrderModal({
  categories,
  patterns,
  selectedCategory,
  selectedPattern,
  selectedUnits,
  handleCategoryClick,
  handlePatternClick,
  handleUnitQuantityChange,
  handleSaveSelection,
  setIsModalOpen,
}) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-3/4 h-[600px] rounded-xl shadow-lg p-4 flex flex-col">
        <div className="flex flex-grow overflow-hidden">
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />
          <div className="w-3/4 flex flex-col">
            {selectedCategory && (
              <PatternList
                patterns={patterns}
                selectedPattern={selectedPattern}
                handlePatternClick={handlePatternClick}
              />
            )}
            {selectedPattern && (
              <UnitSelection
                selectedUnits={selectedUnits}
                handleUnitQuantityChange={handleUnitQuantityChange}
              />
            )}
          </div>
        </div>
        <ModalFooter
          handleSaveSelection={handleSaveSelection}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  );
}
