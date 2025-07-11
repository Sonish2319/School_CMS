import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchContext } from "@/context/SearchContext";
import Table from "@/components/form/table.js";
import getColumns from "@/config/column.js";
import AddButton from "@/components/add/addButton.jsx";
import { useFetchData, deleteItem } from "@/store/hooks/useFetchData.js";
import { getAddPath, handleEditPath } from "@/utils/helper.js";
import { useTranslations } from "next-intl";
import Filter from "@/components/filter/Filter";
import filterConfigs from "@/config/filters";
import Pagination from "@/components/common/PaginatedList";
import Modal from "@/components/common/Modal";
import GenderForm from "./form.jsx";


export default function List() {
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

  const moduleName = "categories";
  const filters = filterConfigs[moduleName];
  const { getSearchQuery } = useSearchContext();
  const searchQuery = getSearchQuery(moduleName);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const url = `${moduleName}`;
  const { data, error, loading, refetch } = useFetchData(url, { method: "GET" });

  useEffect(() => {
    setPage(1);
    refetch();
  }, [searchQuery]);

  const addPath = getAddPath(router, moduleName);

  const handleDelete = (id) => {
    deleteItem(`${moduleName}s/${id}/`, refetch);
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="list-header px-3 sm:px-6">
        <h1 className="list-title">BASE LIST</h1>
        <AddButton onClick={() => setIsAdding(true)} />
      </div>

      <div className="table-container px-3 sm:px-6">
        <Filter filters={filters} module={moduleName} />

        <Table
          columns={columns['commodity_category']}
          data={Array.isArray(data) ? data : []}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal isOpen={!!editId || isAdding} onClose={closeModal}>
        <GenderFormWrapper
          id={editId}
          onClose={closeModal}
          isAdding={isAdding}
          refetch={refetch}
        />
      </Modal>

      {/* Reusable Pagination */}
      {/* <Pagination
        currentPage={page}
        pageSize={pageSize}
        totalCount={data?.count || 0}
        currentCount={data?.results?.length || 0}
        onPageChange={(newPage) => setPage(newPage)}
      /> */}
    </div>
  );
}


const GenderFormWrapper = ({ id, onClose, isAdding, refetch }) => {
  return (
    <GenderForm
      isPopup={true}
      onClose={onClose}
      id={id}
      isAdding={isAdding}
      refetch={refetch}
    />
  );
};