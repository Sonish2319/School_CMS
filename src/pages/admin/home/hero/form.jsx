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
    isEditMode ? `home/hero/${id}` : null
  );

  const { sendRequest, loading: submitLoading, error: submitError } = useApiRequest();

  useEffect(() => {
    if (isEditMode && data) {
      setInitialValues({
        feature_title: data.feature_title || "",
        feature_icon: data.feature_icon || "",
        feature_description: data.feature_description || "",
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
    const url = isEditMode
      ? `home/hero/${id}`
      : `home/hero`;

    try {
      await sendRequest(url, method, formData);
      router.push("/admin/home/hero/list");
    } catch (err) {
      setError(submitError || "Failed to save timeline entry.");
    }
  };
  

  const formFields = [
    {
      name: "feature_title",
      label: "Feature Title",
      type: "text",
    },
    {
      name: "feature_icon",
      label: "Feature Icon",
      type: "text",
    },
    {
      name: "feature_description",
      label: "Feature Description",
      type: "textarea",
    },
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
