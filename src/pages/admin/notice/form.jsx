// pages/notice/form.jsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useApiRequest } from "@/utils/helper";
import { useFetchData } from "@/store/hooks/useFetchData";

export default function NoticeForm({ isPopup = false, onClose, id, isAdding, refetch }) {
  const router = useRouter();
  const isEditMode = !!id;

  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState("");

  const { sendRequest, loading: submitLoading, error: submitError } = useApiRequest();
  const { data, loading } = useFetchData(isEditMode ? `notices/${id}` : null, { method: "GET" });

  useEffect(() => {
    if (data && isEditMode) {
      setInitialValues({
        title: data.title || "",
        description: data.description || "",
        file: data.file || null,
        status: data.status ? "active" : "inactive",
      });
    } else if (!isEditMode) {
      setInitialValues({
        title: "",
        description: "",
        file: null,
        status: "active",
      });
    }
  }, [data, isEditMode]);

  useEffect(() => {
    if (submitError) {
      setError("Failed to submit notice.");
    }
  }, [submitError]);

  const handleSubmit = async (formData) => {
    console.log("🚀 Submitted formData:", formData);
  
    const url = isEditMode ? `notices/${id}` : "notices";
    const method = isEditMode ? "PUT" : "POST";
  
    // Check if already FormData (from Form component)
    const isFormData = formData instanceof FormData;
  
    const payload = isFormData ? formData : new FormData();
  
    // If not FormData, manually append fields
    if (!isFormData) {
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("status", formData.status === "active");
  
      if (formData.file instanceof File) {
        payload.append("file", formData.file);
      }
    }
  
    // Optional: debug the payload
    for (let pair of payload.entries()) {
      console.log("📦 FormData field:", pair[0], pair[1]);
    }
  
    try {
      await sendRequest(url, method, payload);

  
      if (isPopup) {
        onClose?.();
        refetch?.();
      } else {
        router.push("/admin/notice/list");
      }
    } catch (err) {
      setError("Failed to save notice.");
    }
  };
  

  const fields = [
    { label: "Title (English)", name: "title", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
    {
      label: "Attachment (optional)",
      name: "file",
      type: "file",
      accept: ".pdf,.jpg,.jpeg,.png,.doc,.docx",
    },
    {
      label: "Status",
      name: "status",
      type: "option",
      options: [
        { value: 1, label: "Active" },  // Use 1 for active
      { value: 0, label: "Inactive" } // Use 0 for inactive
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="list-header p-3 sm:p-6">
        <h2 className="text-[21px] font-light">
          {isEditMode ? "Edit Notice" : "Add Notice"}
        </h2>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading && isEditMode ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Form
          fields={fields}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          isPopup={isPopup}
          submitText={isEditMode ? "Update" : "Create"}
          loading={submitLoading}
        />
      )}
    </div>
  );
}
