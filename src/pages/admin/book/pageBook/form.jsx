import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useFetchData } from "@/store/hooks/useFetchData";
import { useApiRequest } from "@/utils/helper";

export default function PageForm({ mode = "add" }) {
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = !!id;

  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState("");
  const [subjects, setSubjects] = useState([]);

  const { data, error: fetchError, loading } = useFetchData(
    isEditMode ? `book/pages/${id}` : null
  );

  // Fetch all subjects for dropdown
  const { data: subjectsData } = useFetchData("book/subjects");

  useEffect(() => {
    if (subjectsData) {
      setSubjects(subjectsData);
    }
  }, [subjectsData]);

  const { sendRequest, loading: submitLoading, error: submitError } = useApiRequest();

  useEffect(() => {
    if (isEditMode && data) {
      setInitialValues({
        pageNo: data.pageNo || "",
        image: data.image || "",
        subjectId: data.subject?.id || "", 
      });
    }
  }, [data, isEditMode]);

  useEffect(() => {
    if (fetchError) setError("Failed to fetch page data.");
  }, [fetchError]);

  const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `book/pages/${id}` : `book/pages`;

    if (formData instanceof FormData) {
      for (let [key, value] of formData.entries()) {
        console.log("FormData field:", key, value);
      }
      try {
        await sendRequest(url, method, formData, true);
        router.push("/admin/book/pageBook/list");
      } catch (err) {
        setError(submitError || "Failed to save page.");
      }
    } else {
      console.warn("Expected FormData, got:", formData);
      const payload = new FormData();
      payload.append("pageNo", formData.pageNo);
      payload.append("subjectId", formData.subjectId);
      if (formData.image instanceof File) {
        payload.append("image", formData.image);
      }
      try {
        await sendRequest(url, method, payload, true);
        router.push("/admin/book/pageBook/list");
      } catch (err) {
        setError(submitError || "Failed to save page.");
      }
    }
  };

  const formFields = [
    { label: "Page Number", name: "pageNo", type: "number" },
    {
      label: "Subject",
      name: "subjectId",
      type: "option",
      options: subjects.map((s) => ({ label: s.name, value: s.id })),
    },
    { label: "Page Image", name: "image", type: "file" },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 bg-gradient-to-r from-green-500 to-green-700 px-4 py-4 rounded-2xl">
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-white">
          {isEditMode ? "Edit Page" : "Add Page"}
        </h2>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {loading && isEditMode ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="table-container border border-gray-300">
          <div className="py-6 border-b border-gray-300">
            <div className="flex gap-[10px] px-3 sm:px-6 ">
              <div className="w-2 h-8 bg-[#28b463] rounded-full"></div>
              <p className="text-[20px] font-medium text-gray-700">Page Form</p>
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
