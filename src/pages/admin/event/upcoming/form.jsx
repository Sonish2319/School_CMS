// event/upcoming/form.jsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useFetchData } from "@/store/hooks/useFetchData";
import { useApiRequest } from "@/utils/helper";

export default function UpcomingEventForm({ mode = "add" }) {
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = !!id;

  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState("");

  const { data, error: fetchError, loading } = useFetchData(
    isEditMode ? `event/upcoming/${id}` : null
  );

  const { sendRequest, loading: submitLoading, error: submitError } = useApiRequest();

  useEffect(() => {
    if (isEditMode && data) {
      setInitialValues({
        title: data.title || "",
        date: data.date ? data.date.split("T")[0] : "",
        time: data.time || "",
        location: data.location || "",
        image: data.image || "",
        description: data.description || "",
        category: data.category || "",
        openRegistration: data.openRegistration || false,
        button_text: data.button_text || "",
        icon: data.icon || "",
      });
    }
  }, [data, isEditMode]);

  useEffect(() => {
    if (fetchError) {
      setError("Failed to fetch upcoming event.");
    }
  }, [fetchError]);

  const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `event/upcoming/${id}` : `event/upcoming`;

    if (formData instanceof FormData) {
      try {
        await sendRequest(url, method, formData, true);
        router.push("/admin/event/upcoming/list");
      } catch (err) {
        setError(submitError || "Failed to save upcoming event.");
      }
    } else {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File || typeof value === "string" || typeof value === "boolean") {
          payload.append(key, value);
        }
      });
      try {
        await sendRequest(url, method, payload, true);
        router.push("/admin/event/upcoming/list");
      } catch (err) {
        setError(submitError || "Failed to save upcoming event.");
      }
    }
  };

  const formFields = [
    { label: "Title", name: "title", type: "text" },
    { label: "Date", name: "date", type: "date" },
    { label: "Time", name: "time", type: "text" },
    { label: "Location", name: "location", type: "text" },
    { label: "Image", name: "image", type: "file" },
    { label: "Description", name: "description", type: "textarea" },
    {
      label: "Category",
      name: "category",
      type: "option",
      options: [
        { label: "Academic", value: "Academic" },
        { label: "Admissions", value: "Admissions" },
        { label: "Arts", value: "Arts" },
        { label: "Athletics", value: "Athletics" },
        { label: "Community", value: "Community" },
        { label: "Campus Events", value: "CampusEvents" },
        { label: "Sports", value: "Sports" },
      ],
    },
    {
      label: "Open Registration",
      name: "openRegistration",
      type: "switch",
    },
    { label: "Button Text", name: "button_text", type: "text" },
    { label: "Icon", name: "icon", type: "text" },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-4 rounded-2xl">
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-white">
          {isEditMode ? "Edit Upcoming Event" : "Add Upcoming Event"}
        </h2>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {loading && isEditMode ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="table-container border border-gray-300">
          <div className="py-6 border-b border-gray-300">
            <div className="flex gap-[10px] px-3 sm:px-6">
              <div className="w-2 h-8 bg-[#2980b9] rounded-full"></div>
              <p className="text-[20px] font-medium text-gray-700">Upcoming Event</p>
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
