import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useApiRequest } from "@/utils/helper";
import { useFetchData } from "@/store/hooks/useFetchData";

export default function GalleryPhotoForm({ mode = "add" }) {
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = !!id;

  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);

  const { data, error: fetchError, loading } = useFetchData(
    isEditMode ? `gallery/photos/${id}` : null
  );

  const { data: categoriesData } = useFetchData("gallery/category"); // Adjust endpoint if needed
  const { sendRequest, loading: submitLoading, error: submitError } = useApiRequest();

  // Map category options for dropdown
  useEffect(() => {
    if (categoriesData?.length) {
      const options = categoriesData.map((cat) => ({
        label: cat.title,
        value: String(cat.id), // ✅ Force value to string
      }));
      console.log("Mapped category options:", options); // ✅ Check that it's not empty
      setCategoryOptions(options);
    }
  }, [categoriesData]);
  

  // Set initial form values in edit mode
  useEffect(() => {
    if (isEditMode && data) {
      setInitialValues({
        feature_title: data.feature_title || "",
        sub_text: data.sub_text || "",
        description: data.description || "",
        categoryImageId: data.categoryImageId || "",
        photos: null, // do not preload files
      });
    }
  }, [data, isEditMode]);

  useEffect(() => {
    if (fetchError) {
      setError("Failed to fetch gallery photo.");
    }
  }, [fetchError]);

  const handleSubmit = async (formData) => {
    console.log("Submitted Form Data:", formData);
console.log("Submitted categoryImageId:", formData.categoryImageId);
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `gallery/photos/${id}` : `gallery/photos`;

    const payload = new FormData();
    payload.append("feature_title", formData.feature_title || "");
    payload.append("sub_text", formData.sub_text || "");
    payload.append("description", formData.description || "");
    console.log("Raw categoryImageId:", formData.categoryImageId);
    const categoryId = parseInt(formData.categoryImageId, 10);
    if (!categoryId || isNaN(categoryId)) {
      setError("Please select a valid category.");
      return;
    }
    console.log("Selected Category ID:", categoryId);
    payload.append("categoryImageId", categoryId);
    
    let filesArray = [];

    const selectedFiles = formData.photos;
    
    if (selectedFiles instanceof FileList) {
      filesArray = Array.from(selectedFiles);
    } else if (selectedFiles instanceof File) {
      filesArray = [selectedFiles];
    } else if (Array.isArray(selectedFiles)) {
      filesArray = selectedFiles;
    }
    
    if (filesArray.length === 0 && !isEditMode) {
      setError("Please upload at least one image.");
      return;
    }
    
    filesArray.forEach((file) => {
      payload.append("photos", file);
    });

    try {
      await sendRequest(url, method, payload, true);
      router.push("/admin/gallery/photos/list");
    } catch (err) {
      setError(submitError || "Failed to save gallery photo.");
    }
  };

  const formFields = [
    {
      label: "Feature Title",
      name: "feature_title",
      type: "text",
    },
    {
      label: "Sub Text",
      name: "sub_text",
      type: "text",
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
    },
    {
      label: "Category",
      name: "categoryImageId",
      type: "option",
      options: categoryOptions,
    },
    {
      label: "Upload Photos",
      name: "photos",
      type: "file",
      multiple: true,
      note: "You can upload multiple image files.",
    },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-4 rounded-2xl">
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-white">
          {isEditMode ? "Edit Gallery Photo" : "Add Gallery Photo"}
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
              <p className="text-[20px] font-medium text-gray-700">Gallery Photo Form</p>
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
