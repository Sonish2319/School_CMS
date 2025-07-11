// pages/notice/list.jsx

import { useState } from "react";
import { useRouter } from "next/router";
import { useSearchContext } from "@/context/SearchContext";
import Table from "@/components/form/table";
import getColumns from "@/config/column";
import AddButton from "@/components/add/addButton";
import { useFetchData, deleteItem } from "@/store/hooks/useFetchData";
import FilterButton from "@/components/filter/Filter";
import Modal from "@/components/common/Modal";
import NoticeForm from "./form";
const NEXT_PUBLIC_MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;


export default function NoticeList() {
  const router = useRouter();
  const { searchQuery } = useSearchContext();
  const [editId, setEditId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [preview, setPreview] = useState({ open: false, filePath: "", row: null });

  const closeModal = () => {
    setEditId(null);
    setIsAdding(false);
  };

  const handleEdit = (id) => setEditId(id);
  const handleDelete = (id) => deleteItem(`notices/${id}`, refetch);

  const { data, error, loading, refetch } = useFetchData(
    `notices?search=${searchQuery || ""}`,
    { method: "GET" }
  );

  const columns = getColumns((filePath, row) => {
    const extension = filePath.split('.').pop().toLowerCase();
    const fullUrl = `${NEXT_PUBLIC_MEDIA_URL}${filePath}`;
    const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(extension);
  
    setPreview({
      open: true,
      filePath: fullUrl,
      row,
      isImage,
    });
  });
  

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center sm:justify-between bg-white rounded-lg p-3 sm:p-6">
        <div>
          <h1 className="list-title font-light">NOTICE LIST</h1>
          <p className="text-xs text-[#99A6AD]">Access rights</p>
        </div>
        <AddButton onClick={() => setIsAdding(true)} />
      </div>

      <div className="table-container p-3 sm:p-6">
        <FilterButton />
        <Table
          columns={columns.notice}
          data={Array.isArray(data) ? data : []}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal isOpen={!!editId || isAdding} onClose={closeModal}>
        <NoticeFormWrapper
          id={editId}
          isAdding={isAdding}
          onClose={closeModal}
          refetch={refetch}
        />
      </Modal>

      <Modal isOpen={preview.open} onClose={() => setPreview({ open: false })}>
  {preview.filePath ? (
    preview.isImage ? (
      <img
        src={preview.filePath}
        alt="Attachment"
        className="max-h-[75vh] max-w-full object-contain"
      />
    ) : (
      <a
        href={preview.filePath}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Open file in new tab
      </a>
    )
  ) : (
    <p className="text-center">No preview available</p>
  )}
</Modal>

    </div>
  );
}

const NoticeFormWrapper = ({ id, isAdding, onClose, refetch }) => (
  <NoticeForm
    isPopup={true}
    id={id}
    isAdding={isAdding}
    onClose={onClose}
    refetch={refetch}
  />
);
