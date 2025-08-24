import React, { useEffect, useState } from "react";
import Form from "@/components/form/form";
import { useApiRequest } from "@/utils/helper";
import { useFetchData } from "@/store/hooks/useFetchData";

export default function AboutForm({ id, isAdding, onClose, refetch }) {
  const [initialValues, setInitialValues] = useState(null);
  const isEditMode = !!id;

  const { sendRequest, error: submitError } = useApiRequest();
  const { data } = useFetchData(isEditMode ? `aboutus/${id}` : null);

  useEffect(() => {
    if (data) {
      setInitialValues({
        title: data.title || "",
        description: data.description || "",
        image: [], // for new uploads only
        status: data.status ? "active" : "inactive",
      });
    } else if (!isEditMode) {
      setInitialValues({
        title: "",
        description: "",
        image: [],
        status: "active",
      });
    }
  }, [data, isEditMode]);

  const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `aboutus/${id}` : "aboutus";

    const form = new FormData();

    form.append("title", formData.title || "");
    form.append("description", formData.description || "");
    form.append("status", formData.status === "active");

    const files = formData.image;
    if (Array.isArray(files)) {
      files.forEach((file) => {
        form.append("image", file); // backend expects array field "images"
      });
    } else if (files instanceof File) {
      form.append("image", files);
    }

    try {
      await sendRequest(url, method, form);
      refetch?.();
      onClose?.();
    } catch (err) {
      console.error("Failed to submit About Us:", submitError || err.message);
    }
  };

  const fields = [
    { label: "Title", name: "title", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
    { label: "Images", name: "image", type: "file", multiple: true },
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

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">{isEditMode ? "Edit About Us" : "Add About Us"}</h2>
      <Form fields={fields} onSubmit={handleSubmit} initialValues={initialValues} />
    </div>
  );
}
