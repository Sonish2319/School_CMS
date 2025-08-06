import { useState } from "react";
import { useRouter } from "next/router";
import Table from "@/components/form/table";
import AddButton from "@/components/add/addButton";
import { useFetchData, deleteItem } from "@/store/hooks/useFetchData";
import Modal from "@/components/common/Modal";
import AboutForm from "./form"; // Change to your About form
import getColumns from "@/config/column";

const NEXT_PUBLIC_MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

export default function AboutList() {
  const router = useRouter();
  const [editId, setEditId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [preview, setPreview] = useState({ open: false, filePath: "", row: null });

  const { data, loading, error, refetch } = useFetchData("aboutus");

  const closeModal = () => {
    setEditId(null);
    setIsAdding(false);
  };

  const handleEdit = (id) => setEditId(id);
  const handleDelete = (id) => deleteItem(`aboutus/${id}`, refetch);

  const columns = getColumns((filePath, row) => {
    const fullUrl = `${NEXT_PUBLIC_MEDIA_URL}${filePath}`;
    setPreview({
      open: true,
      filePath: fullUrl,
      row,
      isImage: true,
    });
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center bg-white p-4 rounded shadow">
        <h1 className="text-xl font-light">About Us List</h1>
        <AddButton onClick={() => setIsAdding(true)} />
      </div>

      <div className="p-4 bg-white rounded shadow">
        <Table
          columns={columns.about} // uses "about" from getColumns
          data={Array.isArray(data) ? data : []}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal isOpen={!!editId || isAdding} onClose={closeModal}>
        <AboutForm
          id={editId}
          isAdding={isAdding}
          onClose={closeModal}
          refetch={refetch}
        />
      </Modal>

      <Modal isOpen={preview.open} onClose={() => setPreview({ open: false })}>
        {preview.filePath ? (
          <img
            src={preview.filePath}
            alt="Preview"
            className="max-h-[75vh] max-w-full object-contain"
          />
        ) : (
          <p>No preview available</p>
        )}
      </Modal>
    </div>
  );
}
