// aboutus/hero/list.jsx
import { useRouter } from "next/router";
import { useState } from "react";
import Table from "@/components/form/table";
import AddButton from "@/components/add/addButton";
import { useFetchData, deleteItem } from "@/store/hooks/useFetchData";
import { getAddPath, handleEditPath } from "@/utils/helper";
import Pagination from "@/components/common/PaginatedList";
import getColumns from "@/config/column";


export default function HeroList() {
  const router = useRouter();
  const moduleName = "event/hero";
  const columns = getColumns();

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data,
    error,
    loading,
    refetch,
  } = useFetchData(`${moduleName}?page=${page}&page_size=${pageSize}`, {
    method: "GET",
  });

  const addPath = getAddPath(router, moduleName);

  const handleDelete = (id) => {
    deleteItem(`${moduleName}/${id}`, refetch);
  };
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 bg-gradient-to-r from-green-500 to-green-700 px-4 py-4 rounded-2xl">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-semibold text-white">Hero Sections</h1>
          <p className="text-white/90 text-sm sm:text-base">Manage hero content for About Us page</p>
        </div>
        <div>
          <AddButton onClick={() => router.push(addPath)} />
        </div>
      </div>

      <div className="table-container border border-gray-300">
        <div className="py-6 border-b border-gray-300">
          <div className="flex gap-[10px] px-3 sm:px-6 ">
            <div className="w-2 h-8 bg-[#28b463] rounded-full"></div>
            <p className="text-[20px] font-medium text-gray-700">Hero Section List</p>
          </div>
        </div>
        <Table
          columns={columns.eventHero}
        //   data={Array.isArray(data?.results) ? data.results : []}
        data={Array.isArray(data) ? data : []}
          loading={loading}
          error={error}
          onEdit={(id) => handleEditPath(router, moduleName, id)}
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
