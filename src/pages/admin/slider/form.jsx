import React, { useEffect, useState } from "react";
import Form from "@/components/form/form";
import { useApiRequest } from "@/utils/helper";
import { useFetchData } from "@/store/hooks/useFetchData";

export default function SliderForm({ id, isAdding, onClose, refetch }) {
  const [initialValues, setInitialValues] = useState(null);
  const isEditMode = !!id;

  const { sendRequest, error: submitError } = useApiRequest();
  const { data } = useFetchData(isEditMode ? `sliders/${id}` : null);

  useEffect(() => {
    if (data) {
      setInitialValues({
        title: data.title || "",
        images: [], // array to handle multiple uploads
        status: data.status ? "active" : "inactive",
      });
    }
  }, [data]);

  const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `sliders/${id}` : "sliders";

    const form = new FormData();

    // Handle regular fields
    form.append("title", formData.title || "");
    form.append("status", formData.status === "active" ? true : false);

    // Handle multiple image files
    const files = formData.images;
    if (Array.isArray(files)) {
      files.forEach((file) => {
        form.append("images", file); // your backend must support "images" array
      });
    } else if (files instanceof File) {
      form.append("images", files);
    }

    try {
      await sendRequest(url, method, form);
      refetch?.();
      onClose?.();
    } catch (err) {
      console.error("Failed to submit slider:", submitError || err.message);
    }
  };

  const fields = [
    { label: "Title", name: "title", type: "text" },
    { label: "Images", name: "images", type: "file", multiple: true },
    {
      label: "Status",
      name: "status",
      type: "option",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">{isEditMode ? "Edit Slider" : "Add Slider"}</h2>
      <Form fields={fields} onSubmit={handleSubmit} initialValues={initialValues} />
    </div>
  );
}
