import React, { useEffect, useState, useMemo } from "react";
import Form from "@/components/form/form";
import { useApiRequest } from "@/utils/helper";
import { useRouter } from "next/router";
import { useFetchData } from "../../../store/hooks/useFetchData";

export default function GalleryForm({ isPopup = false, onClose, id, isAdding, refetch }) {
  const [error, setError] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const router = useRouter();
  const isEditMode = !!id;

  const { sendRequest, loading: submitLoading, error: submitError } = useApiRequest();
  const { data, error: fetchError, loading } = useFetchData(isEditMode ? `gallery/${id}/` : null);

  const [formType, setFormType] = useState("photo");
  const [formMode, setFormMode] = useState("single");

  useEffect(() => {
    if (data) {
      const currentType = data.type || "photo";
      const currentMode = data.mode || "single";
      setFormType(currentType);
      setFormMode(currentMode);

      const initialFileValue =
        currentType === "photo"
          ? null // Do not preload files in file input
          : Array.isArray(data.files)
          ? data.files.join(", ")
          : "";

      setInitialValues({
        title: data.title || "",
        description: data.description || "",
        status: data.status ? "active" : "inactive",
        type: currentType,
        mode: currentMode,
        files: initialFileValue,
      });
    }
  }, [data]);

  const handleSubmit = async (formData) => {
    setError(""); // Clear error before new submission

    const url = isEditMode ? `gallery/${id}` : `gallery/${formData.type}`;
    const method = isEditMode ? "PUT" : "POST";

    const payload = new FormData();
    payload.append("title", formData.title || "");
    payload.append("description", formData.description || "");
    payload.append("status", formData.status === "active" ? 1 : 0);
    payload.append("type", formData.type);
    payload.append("mode", formData.mode);

    const isPhoto = formData.type === "photo";
    const selectedFiles = formData.files;

    if (isPhoto) {
      if (selectedFiles && selectedFiles.length) {
        for (let i = 0; i < selectedFiles.length; i++) {
          payload.append("files", selectedFiles[i]);
        }
      } else if (!isEditMode) {
        setError("Please upload at least one image.");
        return;
      }
    } else {
      const urlList = (selectedFiles || "")
        .split(",")
        .map((url) => url.trim())
        .filter((url) => !!url);

      if (urlList.length === 0 && !isEditMode) {
        setError(`Please enter at least one ${formData.type} URL.`);
        return;
      }

      payload.append("files", JSON.stringify(urlList));
    }

    try {
      await sendRequest(url, method, payload);
      refetch?.();
      onClose?.();
    } catch (err) {
      setError(submitError || "Failed to save gallery item.");
    }
  };

  const fields = useMemo(() => {
    const fileOrUrlField =
      formType === "photo"
        ? {
            label: formMode === "album" ? "Upload Files" : "Upload File",
            name: "files",
            type: "file",
            multiple: formMode === "album",
            note: formMode === "album"
              ? "Upload multiple images"
              : "Upload a single image",
          }
        : {
            label: `Enter ${formType} URL(s)`,
            name: "files",
            type: "text",
            note: "Enter one or more URLs separated by commas",
          };

    return [
      { label: "Title", name: "title", type: "text" },
      { label: "Description", name: "description", type: "textarea" },
      {
        label: "Type",
        name: "type",
        type: "option",
        options: [
          { value: "photo", label: "Photo" },
          { value: "video", label: "Video" },
          { value: "audio", label: "Audio" },
        ],
        onChange: (val) => {
          setFormType(val);
          // reset mode to single if not photo
          if (val !== "photo") setFormMode("single");
        },
      },
      {
        label: "Mode",
        name: "mode",
        type: "option",
        options: [
          { value: "single", label: "Single" },
          { value: "album", label: "Album" },
        ],
        onChange: (val) => setFormMode(val),
        show: formType === "photo",
      },
      fileOrUrlField,
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
  }, [formType, formMode]);

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="list-header p-3 sm:p-6">
        <h2 className="text-[21px] font-light">
          {isEditMode ? "Edit Gallery Item" : "Add Gallery Item"}
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
