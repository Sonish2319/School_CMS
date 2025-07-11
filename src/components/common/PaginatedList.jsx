export default function Pagination({
  currentPage,
  pageSize,
  totalCount,
  currentCount,
  onPageChange,
}) {
  const maxPagesToShow = 5;
  const totalPages = Math.ceil(totalCount / pageSize);

  const pages = [];
  const sidePages = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, currentPage - sidePages);
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const from = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(from + currentCount - 1, totalCount);

  return (
    // <div className="flex flex-col gap-2 w-full">
    //   {/* Showing x–y of z */}
    //   <div className="text-sm text-gray-600">
    //     Showing <strong>{from}</strong>–<strong>{to}</strong> of <strong>{totalCount}</strong> results
    //   </div>

    //   {/* Pagination Buttons */}
    //   <div className="flex flex-wrap gap-2">
    //     {currentPage > 1 && (
    //       <button onClick={() => onPageChange(currentPage - 1)} className="px-3 py-1 border rounded bg-white text-black">
    //         Prev
    //       </button>
    //     )}

    //     {startPage > 1 && (
    //       <>
    //         <button onClick={() => onPageChange(1)} className="px-3 py-1 border rounded bg-white text-black">1</button>
    //         {startPage > 2 && <span className="px-2">...</span>}
    //       </>
    //     )}

    //     {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
    //       const page = startPage + i;
    //       return (
    //         <button
    //           key={page}
    //           onClick={() => onPageChange(page)}
    //           className={`px-3 py-1 border rounded ${page === currentPage ? "bg-blue-500 text-white" : "bg-white text-black"}`}
    //         >
    //           {page}
    //         </button>
    //       );
    //     })}

    //     {endPage < totalPages && (
    //       <>
    //         {endPage < totalPages - 1 && <span className="px-2">...</span>}
    //         <button onClick={() => onPageChange(totalPages)} className="px-3 py-1 border rounded bg-white text-black">
    //           {totalPages}
    //         </button>
    //       </>
    //     )}

    //     {currentPage < totalPages && (
    //       <button onClick={() => onPageChange(currentPage + 1)} className="px-3 py-1 border rounded bg-white text-black">
    //         Next
    //       </button>
    //     )}
    //   </div>
    // </div>


    <div className="flex flex-col gap-3 w-full items-center sm:items-start sm:flex-row sm:justify-between mt-4">
      {/* Showing x–y of z */}
      <div className="text-sm text-gray-700">
        Showing <strong>{from}</strong>–<strong>{to}</strong> of <strong>{totalCount}</strong> results
      </div>

      {/* Pagination Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1.5 border rounded-md bg-white text-gray-800 hover:bg-gray-100 transition"
          >
            Prev
          </button>
        )}

        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-1.5 border rounded-md bg-white text-gray-800 hover:bg-gray-100 transition"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
          </>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const page = startPage + i;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1.5 border rounded-md transition ${page === currentPage
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
            >
              {page}
            </button>
          );
        })}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-1.5 border rounded-md bg-white text-gray-800 hover:bg-gray-100 transition"
            >
              {totalPages}
            </button>
          </>
        )}

        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1.5 border rounded-md bg-white text-gray-800 hover:bg-gray-100 transition"
          >
            Next
          </button>
        )}
      </div>
    </div>

  );
}
