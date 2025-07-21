import React, { useEffect, useState } from "react";
import Form from "@/components/form/form";
import { useApiRequest } from "@/utils/helper";
import { useRouter } from "next/router";
import { useFetchData } from "../../../store/hooks/useFetchData";

export default function NoticeForm({ isPopup = false, onClose, id, isAdding, refetch }) {
  const [error, setError] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const router = useRouter();
  const isEditMode = !!id;

  const {
    sendRequest,
    loading: submitLoading,
    error: submitError,
  } = useApiRequest();

  const { data, error: fetchError, loading } = useFetchData(
    isEditMode ? `notices/${id}/` : null
  );

  useEffect(() => {
    if (data) {
      setInitialValues({
        title: data.title || "",
        description: data.description || "",
        status: data.status ? "active" : "inactive",
        image: data.file || "",
      });
    }
  }, [data]);

  // const handleSubmit = async (formData) => {

  //   console.log("Form Data:", formData);
  //   const url = isEditMode ? `notices/${id}` : "notices";
  //   const method = isEditMode ? "PUT" : "POST";

  //   const payload = new FormData();
  //   payload.append("title", formData.title || "");
  //   payload.append("description", formData.description || "");
  //   payload.append("status", formData.status === "active" || formData.status === 1 ? "true" : "false");

  //   if (formData.image instanceof File) {
  //     payload.append("file", formData.file);
  //   }

  //   if (payload instanceof FormData) {
  //     for (let [key, value] of payload.entries()) {
  //       console.log("FormData field:", key, value);
  //     }
  //   } else {
  //     console.log(payload);
  //   }
    

  //   try {
  //     await sendRequest(url, method, payload);
  //     refetch?.();
  //     onClose?.();
  //   } catch (err) {
  //     setError(submitError || "Failed to save notice.");
  //   }
  // };

  const handleSubmit = async (formData) => {
    const url = isEditMode ? `notices/${id}` : "notices";
    const method = isEditMode ? "PUT" : "POST";
  
    if (formData instanceof FormData) {
      // formData already FormData, adjust status field
      // Remove old status and append new integer status
      formData.delete("status");
      // Read the old status string from initialValues or fallback
      let statusStr = initialValues?.status || "inactive"; 
      const statusInt = statusStr === "active" ? 1 : 0;
      formData.append("status", statusInt);
  
      // Debug log
      for (let [key, value] of formData.entries()) {
        console.log("FormData field:", key, value);
      }
  
      try {
        await sendRequest(url, method, formData);
        refetch?.();
        onClose?.();
      } catch (err) {
        setError(submitError || "Failed to save notice.");
      }
    } else {
      // formData is plain object - no files present
      const payload = new FormData();
      payload.append("title", formData.title || "");
      payload.append("description", formData.description || "");
      payload.append("status", formData.status === "active" ? 1 : 0);
  
      // No file field in plain object formData, so no file append
  
      // Debug log
      for (let [key, value] of payload.entries()) {
        console.log("FormData field:", key, value);
      }
  
      try {
        await sendRequest(url, method, payload);
        refetch?.();
        onClose?.();
      } catch (err) {
        setError(submitError || "Failed to save notice.");
      }
    }
  };
  

  
  const fields = [
    { label: "Title", name: "title", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
    { label: "File", name: "file", type: "file" },
    {
      label: "Status",
      name: "status",
      type: "option",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
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
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Form
          fields={fields}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          loading={submitLoading}
        />
      )}
    </div>
  );
}
