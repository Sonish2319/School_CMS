import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useFetchData } from "@/store/hooks/useFetchData";
import { useApiRequest } from "@/utils/helper";

export default function AddRoleForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const { id } = router.query;
  const isEditMode = !!id;

  const { data, error: fetchError, loading } = useFetchData(
    isEditMode ? `groups/${id}/` : null
  );

  const {
    sendRequest,
    loading: submitLoading,
    error: submitError,
  } = useApiRequest();

  useEffect(() => {
    if (data) {
      setInitialValues({
        name: data.name || "",
      });
    }
  }, [data]);

  useEffect(() => {
    if (fetchError) {
      setError("Failed to fetch role info.");
    }
  }, [fetchError]);

  // Handle form submission (create or update)
  const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `create-group/${id}/` : `create-group/`;

    try {
      // Use the sendRequest function from the hook to send the request
      await sendRequest(url, method, formData);

      // Redirect after successful submission
      router.push("/admin/role/list");
    } catch (err) {
      setError(submitError || "Failed to save role.");
    }
  };

  const fields = [
    { label: "Name", name: "name", type: "text", initialValue: "" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-6">
        {isEditMode ? "Edit Role" : "Add Role"}
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Form
          fields={fields}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        />
      )}
    </div>
  );
}
