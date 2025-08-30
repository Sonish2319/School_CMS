import { useState } from "react";
// import { useTranslations, useLocale } from "next-intl";
import { createPortal } from "react-dom";

export default function Table({
  columns,
  data,
  loading,
  error,
  onEdit,
  onDelete,
  permissions = {},
  customActions = []
}) {
  const [actionRowId, setActionRowId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  // const t = useTranslations();
  // const locale = useLocale();

  const handleActionClick = (id, event) => {
    setActionRowId(actionRowId === id ? null : id);
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
  };

  const getCellValue = (row, column) => {
    const key = column.dataIndex || column.key;
  
    if (key.includes(".")) {
      return key.split(".").reduce((acc, part) => acc?.[part], row);
    }
  
    return row?.[key];
  };
  

  const Dropdown = ({ row }) =>
    createPortal(
      <div
        style={{
          position: "absolute",
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          zIndex: 9999,
        }}
        className="bg-white border border-gray-100 shadow-lg rounded-md w-28"
      >
        {onEdit && (
          <button
            className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 w-full text-left"
            onClick={() => onEdit(row.id)}
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 w-full text-left"
            onClick={() => onDelete(row.id)}
          >
            Delete
          </button>
        )}
        {customActions.map((action, idx) => (
          <button
            key={idx}
            className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 w-full text-left"
            onClick={() => action.onClick(row)}
          >
            {action.label}
          </button>
        ))}
      </div>,
      document.body
    );

  return (
    <div className="overflow-x-auto">
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {!loading && (
        <table className="w-full table-fixed border-collapse rounded-lg shadow-md">
          <thead>
            <tr className="text-gray-400 text-left border-b">
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={`py-3 px-5 text-[12px] font-medium border-b border-gray-300 ${
                    index === 0 ? "w-[190px]" : "w-[120px]"
                  }`}
                >
                  {column.title}
                </th>
              ))}
              {(onEdit || onDelete || customActions.length > 0) && (
                <th className="py-3 px-5 text-sm font-medium border-b border-gray-300 w-[100px]">
                  {("actions")}
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {data?.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-white"
                  } border-b border-gray-100`}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={column.key}
                      className={`py-3 px-5 text-[14px] text-[#212529] text-left ${
                        colIndex === 0 ? "w-[190px]" : "w-[120px]"
                      }`}
                    >
                      {/* {column.render
                        ? column.render(
                          row[
                          locale === "np" && column.key === "title"
                            ? "title_np"
                            : column.key
                          ],
                          row
                        )
                        : row[
                        locale === "np" && column.key === "title"
                          ? "title_np"
                          : column.key
                        ]} */}
                        {column.render
  ? column.render(getCellValue(row, column), row)
  : getCellValue(row, column)}


                    </td>
                  ))}
                  {(onEdit || onDelete || customActions.length > 0) && (
                    <td className="py-3 px-5 text-gray-700 relative w-[100px]">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={(event) => handleActionClick(row.id, event)}
                      >
                        &#x22EE;
                      </button>
                      {actionRowId === row.id && <Dropdown row={row} />}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (onEdit || onDelete || customActions.length > 0 ? 1 : 0)
                  }
                  className="text-center py-4 text-gray-500"
                >
                  No results found ...
                </td>
              </tr>
            )}
          </tbody>
        </table>

      )}
    </div>
  );
}
