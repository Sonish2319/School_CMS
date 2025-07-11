import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSearchContext } from "@/context/SearchContext";
import Table from "@/components/form/table.js";
import getColumns from "../../../config/columnjobpost.js";
import AddButton from "@/components/add/addButton.jsx";
import FilterButton from "@/components/filter/Filter.jsx";
import { useFetchData, deleteItem } from "../../../store/hooks/useFetchData.js";
import { getAddPath, handleEditPath } from "@/utils/helper.js";
import { useTranslations } from "next-intl";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import Pagination from "@/components/common/PaginatedList";



export default function List() {
  const router = useRouter();
  const t = useTranslations();
  const testModule = "job-setup";

    const [page, setPage] = useState(1);
    const pageSize = 10;

  const { searchQuery } = useSearchContext();

  const {
    data,
    error,
    loading,
    refetch,
  } = useFetchData(`${testModule}?search=${searchQuery}`, { method: "GET" });

  // Handlers
  const handleJob = (id) => {
    router.push(`/admin/jobpost/level?id=${id}`);
  };

  const handleApplication = (id) => {
    router.push(`/admin/application/list?job_post=${id}`);
  };

  const handleResult = (id) => {
    router.push(`/admin/result/list?job_post=${id}`);
  };

  const columns = getColumns({
    handleJob,
    handleApplication,
    handleResult,
    showModal: (record) => console.log(`Showing Modal for: ${record.id}`),
  });

  // ADD
  const addPath = getAddPath(router, testModule);

  // DELETE
  const handleDelete = (id) => {
    deleteItem(`${testModule}/${id}/`, refetch);
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between bg-white shadow-md rounded-lg px-3 sm:px-6">
        <h1 className="list-title font-light">BASE LIST</h1>
        <AddButton path={addPath} />
      </div>

      <div className="flex flex-col bg-white shadow-md rounded-lg px-6">
        <div>
          <FilterButton/>
        </div>

        <Table
          columns={columns.job_posts}
          data={data?.results || []}
          loading={loading}
          error={error}
          onEdit={(id) => handleEditPath(router, "jobpost", id)}
          onDelete={handleDelete}
        />
      </div>
      {/* Reusable Pagination */}
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
