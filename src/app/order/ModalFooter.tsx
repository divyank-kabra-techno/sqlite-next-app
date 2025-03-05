export default function ModalFooter({ handleSaveSelection, setIsModalOpen }) {
    return (
      <div className="flex justify-end gap-2 p-4 border-t">
        <button onClick={() => setIsModalOpen(false)} className="bg-red-500 text-white px-4 py-1 rounded-md">Close</button>
        <button onClick={handleSaveSelection} className="bg-green-500 text-white px-4 py-1 rounded-md">Save & Close</button>
      </div>
    );
  }
  