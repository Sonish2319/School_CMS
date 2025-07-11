import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useFetchData } from "@/store/hooks/useFetchData";
import { useApiRequest } from "@/utils/helper";

export default function GenderForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const { id } = router.query;
  const isEditMode = !!id;
  console.warn('asda');
  (isEditMode)

  const { data, error: fetchError, loading } = useFetchData(
    isEditMode ? `categories/${id}/` : null
  );

  const { sendRequest, loading: submitLoading, error: submitError } = useApiRequest();

  useEffect(() => {
    if (data) {
      setInitialValues({
        code: data.code || "",
        title: data.title || "",
        title_np: data.title_np || "",
        seq: data.seq || 0,
        genderType: data.genderType || ""
      });
    }
  }, [data]);

  useEffect(() => {
    if (fetchError) {
      setError("Failed to fetch gender info.");
    }
  }, [fetchError]);

  // Handle form submission (create or update)
  const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `categories/${id}/` : `categories/`;

    try {
      // Use the sendRequest function from the hook to send the request
      await sendRequest(url, method, formData);

      // Redirect after successful submission
      router.push("/admin/commodity_category/list");
    } catch (err) {
      setError(submitError || "Failed to save gender.");
    }
  };

  const fields = [
    {
      label: "Title (English)",
      name: "title_en",
      type: "text",
      initialValue: "",
    },
    {
      label: "Title (Nepali)",
      name: "title_np",
      type: "text",
      initialValue: "",
    },
    {
      label: "Status",
      name: "status",
      type: "option",
      initialValue: "active",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  ];
  

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="list-header p-3 sm:p-6">
        <h2 className="list-title">
          {isEditMode ? "Edit Base" : "Add Base"}
        </h2>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Form fields={fields} onSubmit={handleSubmit} initialValues={initialValues}
        />
      )}
    </div>
  );
}
