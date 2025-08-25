import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useFetchData } from "@/store/hooks/useFetchData";
import { useApiRequest } from "@/utils/helper";

export default function LeadershipForm({ mode = "add" }) {
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = !!id;

  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState("");

  const { data, error: fetchError, loading } = useFetchData(
    isEditMode ? `admission/director/${id}` : null
  );

  const { sendRequest, loading: submitLoading, error: submitError } = useApiRequest();

  useEffect(() => {
    if (isEditMode && data) {
      setInitialValues({
        title: data.title || "",
        director_name: data.director_name || "",
        content: data.content || "",
        director_image: data.director_image || null,
      });
    }
  }, [data, isEditMode]);

  useEffect(() => {
    if (fetchError) {
      setError("Failed to fetch leadership data.");
    }
  }, [fetchError]);

  const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode
      ? `admission/director/${id}`
      : `admission/director`;

    if (formData instanceof FormData) {
      for (let [key, value] of formData.entries()) {
        console.log("FormData field:", key, value);
      }

      try {
        await sendRequest(url, method, formData, true);
        router.push("/admin/admission/director/list");
      } catch (err) {
        setError(submitError || "Failed to save leadership data.");
      }
    } else {
      const payload = new FormData();
      payload.append("title", formData.title || "");
      payload.append("director_name", formData.director_name || "");
      payload.append("content", formData.content || "");
      payload.append("director_image", formData.director_image || "");
      if (formData.director_image instanceof File) {
        payload.append("director_image", formData.director_image);
      }

      try {
        await sendRequest(url, method, payload, true);
        router.push("/admin/admission/director/list");
      } catch (err) {
        setError(submitError || "Failed to save leadership data.");
      }
    }
  };

  const formFields = [
    { label: "Title", name: "title", type: "text" },
    { label: "Director Name", name: "director_name", type: "text" },
    { label: "Content", name: "content", type: "textarea" },
    { label: "Image", name: "director_image", type: "file" },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 bg-gradient-to-r from-green-500 to-green-700 px-4 py-4 rounded-2xl">
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-white">
          {isEditMode ? "Edit Leadership Team Member" : "Add Leadership Team Member"}
        </h2>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {loading && isEditMode ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="table-container border border-gray-300">
          <div className="py-6 border-b border-gray-300">
            <div className="flex gap-[10px] px-3 sm:px-6">
              <div className="w-2 h-8 bg-[#28b463] rounded-full"></div>
              <p className="text-[20px] font-medium text-gray-700">Leadership Form</p>
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
