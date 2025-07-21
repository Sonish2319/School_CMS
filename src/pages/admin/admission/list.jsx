// pages/admin/admission/list.jsx

import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSearchContext } from "@/context/SearchContext";
import Table from "@/components/form/table.js";
import getColumns from "../../../config/column.js";
import AddButton from "@/components/add/addButton.jsx";
import { useFetchData, deleteItem } from "../../../store/hooks/useFetchData.js";
import { useTranslations } from "next-intl";
import FilterButton from "@/components/filter/Filter.jsx";
import Pagination from "@/components/common/PaginatedList";
import AdmissionForm from "./form.jsx";
import Modal from "@/components/common/Modal";

export default function AdmissionList() {
  const router = useRouter();
  const t = useTranslations();
  const columns = getColumns();

  const [editId, setEditId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const closeModal = () => {
    setEditId(null);
    setIsAdding(false);
  };

  const handleEdit = (id) => setEditId(id);

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { searchQuery } = useSearchContext();

  const { data, error, loading, refetch } = useFetchData(`admissions?search=${searchQuery}`, { method: "GET" });

  const handleDelete = (id) => {
    deleteItem(`admissions/${id}/`, refetch);
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col sm:flex-row gap-[12px] sm:gap-0 items-start sm:items-center sm:justify-between bg-white rounded-lg p-3 sm:p-6">
        <div>
          <h1 className="list-title font-light">Admission List</h1>
          <p className="text-[12px] text-[#99A6AD]">Manage Admission Posts</p>
        </div>
        <AddButton onClick={() => setIsAdding(true)} />
      </div>

      <div className="table-container p-3 sm:p-6">
        <FilterButton />
        <Table
          columns={columns.admission}
          // data={Array.isArray(data?.results) ? data.results : []}
          data={Array.isArray(data) ? data : []}

          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Optional: Pagination */}
      {/* <Pagination
        currentPage={page}
        pageSize={pageSize}
        totalCount={data?.count || 0}
        currentCount={data?.results?.length || 0}
        onPageChange={(newPage) => setPage(newPage)}
      /> */}

      <Modal isOpen={!!editId || isAdding} onClose={closeModal}>
        <AdmissionForm
          isPopup={true}
          onClose={closeModal}
          id={editId}
          isAdding={isAdding}
          refetch={refetch}
        />
      </Modal>
    </div>
  );
}
