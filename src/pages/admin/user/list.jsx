import { useRouter } from "next/router";
import { useState } from "react";
import { useSearchContext } from "@/context/SearchContext";
import Table from "@/components/form/table.js";
import getColumns from "../../../config/column.js";
import AddButton from "@/components/add/addButton.jsx";
import { useFetchData, deleteItem } from "../../../store/hooks/useFetchData.js";
import { getAddPath } from "@/utils/helper.js";
import { useTranslations } from "next-intl";
import FilterButton from "@/components/filter/Filter.jsx";
import Pagination from "@/components/common/PaginatedList";

export default function List() {
  const router = useRouter();
  const t = useTranslations();
  const columns = getColumns();

  const testModule = "user";

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { searchQuery } = useSearchContext();

  const {
    data,
    error,
    loading,
    refetch,
  } = useFetchData(`users`, {
    method: "GET"
  });

  const paginatedData = data?.slice((page - 1) * pageSize, page * pageSize) || [];

  const addPath = getAddPath(router, testModule);

  console.log('Current pathname:', router.pathname);
console.log('Add button path:', addPath);


  const handleDelete = (id) => {
    deleteItem(`users/${id}/`, refetch);
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col sm:flex-row gap-[12px] sm:gap-0 items-start sm:items-center sm:justify-between bg-white rounded-lg p-3 sm:p-6">
        <div>
          <h1 className="list-title font-light">{`${t('Users')}`}</h1>
          <p className="text-[12px] text-[#99A6AD]" >Access rights</p>
        </div>

        <div>
        <AddButton onClick={() => router.push(addPath)} />
        </div>
      </div>

      <div className="table-container p-3 sm:p-6">
        <Table
          columns={columns.user}
          data={paginatedData}
          loading={loading}
          error={error}
          onEdit={(id) => router.push(`/admin/user/app/${id}`)}
          onDelete={handleDelete}
        />
      </div>

      <Pagination
        currentPage={page}
        pageSize={pageSize}
        totalCount={data?.length || 0}
        currentCount={paginatedData.length}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
