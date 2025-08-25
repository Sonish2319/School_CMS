// aboutus/hero/form.jsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useFetchData } from "@/store/hooks/useFetchData";
import { useApiRequest } from "@/utils/helper";

export default function HeroForm({ mode = "add" }) {
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = !!id;


  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState("");

  const { data, error: fetchError, loading } = useFetchData(
    isEditMode ? `admission/hero/${id}` : null
  );

  const { sendRequest, loading: submitLoading, error: submitError } = useApiRequest();

  useEffect(() => {
    if (isEditMode && data) {
      setInitialValues({
        title: data.title || "",
        subtitle: data.subtitle || "",
        button_text: data.button_text || "",
        button_link: data.button_link || "",
        background_image: data.background_image || "",
      });
    }
  }, [data, isEditMode]);
  

  useEffect(() => {
    if (fetchError) {
      setError("Failed to fetch hero section.");
    }
  }, [fetchError]);

const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `admission/hero/${id}` : `admission/hero`;
  
    if (formData instanceof FormData) {
      // 🔍 Debug: What is actually being submitted?
      for (let [key, value] of formData.entries()) {
        console.log("FormData field:", key, value);
      }
  
      try {
        await sendRequest(url, method, formData, true); // `true` for multipart
        router.push("/admin/admission/hero/list");
      } catch (err) {
        setError(submitError || "Failed to save hero section.");
      }
    } else {
      // fallback (shouldn't happen if `Form` is working correctly)
      console.warn("Expected FormData, got:", formData);
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("subtitle", formData.subtitle);
      payload.append("button_text", formData.button_text);
      payload.append("button_link", formData.button_link);
      if (formData.background_image instanceof File) {
        payload.append("background_image", formData.background_image);
      }
      try {
        await sendRequest(url, method, payload, true);
        router.push("/admin/admission/hero/list");
      } catch (err) {
        setError(submitError || "Failed to save hero section.");
      }
    }
  };
  

  const formFields = [
    { label: "Title", name: "title", type: "text" },
    { label: "Subtitle", name: "subtitle", type: "text" },
    { label: "Button Text", name: "button_text", type: "text" },
    { label: "Button Link", name: "button_link", type: "text" },
    { label: "Image", name: "background_image", type: "file" },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 bg-gradient-to-r from-green-500 to-green-700 px-4 py-4 rounded-2xl">
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-white">{isEditMode ? "Edit Hero Section" : "Add Hero Section"}</h2>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {loading && isEditMode ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="table-container border border-gray-300">
          <div className="py-6 border-b border-gray-300">
            <div className="flex gap-[10px] px-3 sm:px-6 ">
              <div className="w-2 h-8 bg-[#28b463] rounded-full"></div>
              <p className="text-[20px] font-medium text-gray-700">Hero Section</p>
            </div>
          </div>
          <Form
            fields={formFields}
            onSubmit={handleSubmit}
            initialValues={initialValues}
            isFileUpload={true}
          />
        </div>
      )}
    </div>
  );
}
