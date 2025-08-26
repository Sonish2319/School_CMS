import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useFetchData } from "@/store/hooks/useFetchData";
import { useApiRequest } from "@/utils/helper";

export default function CategoryImageForm({ mode = "add" }) {
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = !!id;

  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState("");

  const { data, error: fetchError, loading } = useFetchData(
    isEditMode ? `gallery/category/${id}` : null
  );

  const { sendRequest, loading: submitLoading, error: submitError } = useApiRequest();

  useEffect(() => {
    if (isEditMode && data) {
      setInitialValues({
        title: data.title || "",
        isFeatured: data.isFeatured || false,
      });
    }
  }, [data, isEditMode]);

  useEffect(() => {
    if (fetchError) {
      setError("Failed to fetch category image.");
    }
  }, [fetchError]);

  const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `gallery/category/${id}` : `gallery/category`;

    try {
      await sendRequest(url, method, formData);
      router.push("/admin/gallery/category/list");
    } catch (err) {
      setError(submitError || "Failed to save category image.");
    }
  };

  const formFields = [
    { label: "Title", name: "title", type: "text" },
    {
      label: "Featured",
      name: "isFeatured",
      type: "switch",
    },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 bg-gradient-to-r from-purple-500 to-purple-700 px-4 py-4 rounded-2xl">
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-white">
          {isEditMode ? "Edit Category Image" : "Add Category Image"}
        </h2>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {loading && isEditMode ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="table-container border border-gray-300">
          <div className="py-6 border-b border-gray-300">
            <div className="flex gap-[10px] px-3 sm:px-6">
              <div className="w-2 h-8 bg-[#8e44ad] rounded-full"></div>
              <p className="text-[20px] font-medium text-gray-700">Category Image Form</p>
            </div>
          </div>
          <Form
            fields={formFields}
            onSubmit={handleSubmit}
            initialValues={initialValues}
          />
        </div>
      )}
    </div>
  );
}
