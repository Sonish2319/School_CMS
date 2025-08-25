import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useFetchData } from "@/store/hooks/useFetchData";
import { useApiRequest } from "@/utils/helper";

export default function CTAForm({ mode = "add" }) {
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = !!id;

  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState("");

  const { data, error: fetchError, loading } = useFetchData(
    isEditMode ? `fund/cta/${id}` : null
  );

  const { sendRequest, loading: submitLoading, error: submitError } = useApiRequest();

  useEffect(() => {
    if (isEditMode && data) {
      setInitialValues({
        title: data.title || "",
        sub_text: data.sub_text || "",
        buttonText: data.buttonText || "",
        line1: data.line1 || "",
        line2: data.line2 || "",
        line3: data.line3 || "",
        qrimage: data.qrimage || "",
        icon: data.icon || "",

      });
    }
  }, [data, isEditMode]);

  useEffect(() => {
    if (fetchError) {
      setError("Failed to fetch CTA data.");
    }
  }, [fetchError]);

  const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `fund/cta/${id}` : `fund/cta`;
  
    if (formData instanceof FormData) {
      // 🔍 Debug: What is actually being submitted?
      for (let [key, value] of formData.entries()) {
        console.log("FormData field:", key, value);
      }
  
      try {
        await sendRequest(url, method, formData, true); // `true` for multipart
        router.push("/admin/fund/cta/list");
      } catch (err) {
        setError(submitError || "Failed to save hero section.");
      }
    } else {
      // fallback (shouldn't happen if `Form` is working correctly)
      console.warn("Expected FormData, got:", formData);
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("sub_text", formData.sub_text);
      payload.append("buttonText", formData.buttonText);
      payload.append("line1", formData.line1);
      payload.append("line2", formData.line2);
      payload.append("line3", formData.line3);
      payload.append("icon", formData.icon);
      if (formData.qrimage instanceof File) {
        payload.append("qrimage", formData.qrimage);
      }
      try {
        await sendRequest(url, method, payload, true);
        router.push("/admin/fund/cta/list");
      } catch (err) {
        setError(submitError || "Failed to save hero section.");
      }
    }
  };

  const formFields = [
    { label: "Title", name: "title", type: "text" },
    { label: "Sub Text", name: "sub_text", type: "textarea" },
    { label: "Button Text", name: "buttonText", type: "text" },
    { label: "Line 1", name: "line1", type: "textarea" },
    { label: "Line 2", name: "line2", type: "textarea" },
    { label: "Line 3", name: "line3", type: "textarea" },
    { label: "QR Image", name: "qrimage", type: "file" },
    { label: "Icon", name: "icon", type: "text" },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 bg-gradient-to-r from-green-500 to-green-700 px-4 py-4 rounded-2xl">
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-white">
          {isEditMode ? "Edit CTA" : "Add CTA"}
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
              <p className="text-[20px] font-medium text-gray-700">CTA Form</p>
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
