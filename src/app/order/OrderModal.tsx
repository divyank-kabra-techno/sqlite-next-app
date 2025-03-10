import CategoryList from "./Component/CategoryList";
import PatternList from "./PatternList";
import UnitSelection from "./UnitSelection";
import ModalFooter from "./ModalFooter";

export default function OrderModal({}) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-3/4 h-[600px] rounded-xl shadow-lg p-4 flex flex-col">
        {/* Modal Content Wrapper */}
        <div className="flex flex-grow overflow-hidden">
          <CategoryList />
        </div>
      </div>
    </div>
  );
}
