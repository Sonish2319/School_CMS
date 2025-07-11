import { useRouter } from "next/router";
import { useState } from "react";
import { useSearchContext } from "@/context/SearchContext";
import Table from "@/components/form/table.js";
import getColumns from "../../../config/column.js";
import AddButton from "@/components/add/addButton.jsx";
import { useFetchData, deleteItem } from "../../../store/hooks/useFetchData.js";
import { getAddPath, getAddPathRole, handleEditPath } from "@/utils/helper.js";
import { useTranslations } from "next-intl";
import FilterButton from "@/components/filter/Filter.jsx";
import Pagination from "@/components/common/PaginatedList";

export default function List() {
  const router = useRouter();
  const t = useTranslations();
  const columns = getColumns();

  const testModule = "role";

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { searchQuery } = useSearchContext();

  const {
    data,
    error,
    loading,
    refetch,
  } = useFetchData(`groups?search=${searchQuery}`, { method: "GET" });

  // ADD
  const addPath = getAddPathRole(router, testModule);

  // DELETE
  const handleDelete = (id) => {
    deleteItem(`education-grade/${id}/`, refetch);
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="list-header px-3 sm:px-6">
        <h1 className="list-title">{`${testModule.toUpperCase()} LIST`}</h1>
        <AddButton path={addPath} className="flex items-center">
          <i className="fas fa-plus mr-2"></i>
          Add
        </AddButton>
      </div>

      <div className="table-container p-3 sm:p-6">
        <Table
          columns={columns.role}
          data={data || []}
          loading={loading}
          error={error}
          onEdit={(id) => handleEditPath(router, "role", id)}
          onDelete={handleDelete}
        />
      </div>
      <Pagination
                    currentPage={page}
                    pageSize={pageSize}
                    totalCount={data?.count || 0}
                    currentCount={data?.results?.length || 0}
                    onPageChange={(newPage) => setPage(newPage)}
                  />
    </div>
  );
}
