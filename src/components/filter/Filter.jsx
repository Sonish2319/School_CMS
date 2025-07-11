import { useState } from "react";
import { useSearchContext } from "@/context/SearchContext";
import { FunnelIcon } from "@heroicons/react/24/outline";

export default function Filter({ filters = [], module }) {
  const { setSearchQuery } = useSearchContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [formData, setFormData] = useState({});
  const [dateRanges, setDateRanges] = useState({});

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleApply = () => {
    let queryParts = [];
  
    // Add simple and grouped filter values
    for (const [key, value] of Object.entries(formData)) {
      if (value && value.trim() !== "") {
        // Handle values like "level=1" → extract key and value
        if (value.includes("=")) {
          const [actualKey, actualValue] = value.split("=");
          queryParts.push(`${actualKey}=${actualValue}`);
        } else {
          queryParts.push(`${key}=${value.trim()}`);
        }
      }
    }
  
    // Handle grouped date filters (like applied_date → start & end)
    for (const [groupKey, range] of Object.entries(dateRanges)) {
      if (range.start) queryParts.push(`${groupKey}_start=${range.start}`);
      if (range.end) queryParts.push(`${groupKey}_end=${range.end}`);
    }
  
    const query = queryParts.join("&");
    setSearchQuery(module, query);
    setIsOpen(false);
  };
  

  const handleReset = () => {
    setSelectedFilter(null);
    setFormData({});
    setDateRanges({});
    setSearchQuery(module, "");
    setIsOpen(false);
  };

  const handleFilterSelectChange = (e) => {
    const filterName = e.target.value;
    const filter = filters.find((f) => f.name === filterName);
    setSelectedFilter(filter);
    if (filter?.type === "date") {
      setDateRanges((prev) => ({ ...prev, [filter.name]: { start: "", end: "" } }));
    } else {
      setFormData((prev) => ({ ...prev, [filter?.name]: "" }));
    }
  };

  const renderFilterField = (filter) => {
    if (filter.type === "group" && filter.children) {
      return (
        <div className="ml-2">
          <p className="text-sm font-semibold mb-1">{filter.label}</p>
          {filter.children.map((child) => {
            if (child.type === "date") {
              return (
                <div key={child.name} className="mb-3">
                  <label className="block text-sm font-medium mb-1">{child.label}</label>
                  <input
                    type="date"
                    value={dateRanges[filter.name]?.[child.name] || ""}
                    onChange={(e) =>
                      setDateRanges({
                        ...dateRanges,
                        [filter.name]: {
                          ...(dateRanges[filter.name] || {}),
                          [child.name]: e.target.value,
                        },
                      })
                    }
                    className="w-full border px-2 py-1 rounded"
                  />
                </div>
              );
            }
    
            if (child.type === "select" || child.type === "text") {
              return (
                <div key={child.name} className="mb-3">
                  <label className="block text-sm font-medium mb-1">{child.label}</label>
                  {renderFilterField(child)}
                </div>
              );
            }
    
            return null;
          })}
        </div>
      );
    }
    

    if (filter.type === "text") {
      return (
        <input
          type="text"
          name={filter.name}
          className="w-full border px-2 py-1 rounded"
          placeholder={`Enter ${filter.label}`}
          value={formData[filter.name] || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              [filter.name]: e.target.value,
            })
          }
        />
      );
    }

    if (filter.type === "select") {
      return (
        <select
          name={filter.name}
          className="w-full border px-2 py-1 rounded"
          value={formData[filter.name] || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              [filter.name]: e.target.value,
            })
          }
        >
          <option value="">-- {filter.label} --</option>
          {filter.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (filter.type === "date") {
      return (
        <div className="flex flex-col gap-2">
          <input
            type="date"
            value={dateRanges[filter.name]?.start || ""}
            onChange={(e) =>
              setDateRanges({
                ...dateRanges,
                [filter.name]: {
                  ...(dateRanges[filter.name] || {}),
                  start: e.target.value,
                },
              })
            }
            className="border px-2 py-1 rounded"
          />
          <input
            type="date"
            value={dateRanges[filter.name]?.end || ""}
            onChange={(e) =>
              setDateRanges({
                ...dateRanges,
                [filter.name]: {
                  ...(dateRanges[filter.name] || {}),
                  end: e.target.value,
                },
              })
            }
            className="border px-2 py-1 rounded"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center px-4 py-2 bg-[#5B73E8] text-white text-[14px] rounded-[2px] hover:bg-[] transition mt-5 mb-5"
      >
        <FunnelIcon className="h-5 w-5 mr-2" />
        Filter
      </button>

      {isOpen && (
        <div className="origin-top-left absolute mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 p-4 max-h-[500px] overflow-y-auto">
          <label className="block text-sm font-medium mb-1">Filter Field</label>
          <select
            value={selectedFilter?.name || ""}
            onChange={handleFilterSelectChange}
            className="mb-3 w-full border px-2 py-1 rounded"
          >
            <option value="">-- Select Filter --</option>
            {filters.map((f) => (
              <option key={f.name} value={f.name}>
                {f.label}
              </option>
            ))}
          </select>

          {selectedFilter && (
            <div className="mb-3">{renderFilterField(selectedFilter)}</div>
          )}

          <div className="flex justify-between">
            <button
              onClick={handleReset}
              className="text-red-600 text-sm underline"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
