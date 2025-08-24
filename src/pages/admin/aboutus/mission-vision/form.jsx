import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useFetchData } from "@/store/hooks/useFetchData";
import { useApiRequest } from "@/utils/helper";

export default function MissionVisionForm({ mode = "add" }) {
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = !!id;

  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState("");

  const { data, error: fetchError, loading } = useFetchData(
    isEditMode ? `aboutus/mission-vision/${id}` : null
  );

  const { sendRequest, loading: submitLoading, error: submitError } = useApiRequest();

  useEffect(() => {
    if (isEditMode && data) {
      setInitialValues({
        mission_title: data.mission_title || "",
        mission_description: data.mission_description || "",
        mission_icon: data.mission_icon || "",
        vision_title: data.vision_title || "",
        vision_description: data.vision_description || "",
        vision_icon: data.vision_icon || "",
      });
    }
  }, [data, isEditMode]);

  useEffect(() => {
    if (fetchError) {
      setError("Failed to fetch mission and vision data.");
    }
  }, [fetchError]);

  const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode
      ? `aboutus/mission-vision/${id}`
      : `aboutus/mission-vision`;

    try {
      await sendRequest(url, method, formData);
      router.push("/admin/aboutus/mission-vision/list");
    } catch (err) {
      setError(submitError || "Failed to save mission and vision.");
    }
  };

  const formFields = [
    { label: "Mission Title", name: "mission_title", type: "text" },
    { label: "Mission Description", name: "mission_description", type: "textarea" },
    { label: "Mission Icon (FontAwesome Class)", name: "mission_icon", type: "text" },

    { label: "Vision Title", name: "vision_title", type: "text" },
    { label: "Vision Description", name: "vision_description", type: "textarea" },
    { label: "Vision Icon (FontAwesome Class)", name: "vision_icon", type: "text" },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 bg-gradient-to-r from-green-500 to-green-700 px-4 py-4 rounded-2xl">
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-white">
          {isEditMode ? "Edit Mission & Vision" : "Add Mission & Vision"}
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
              <p className="text-[20px] font-medium text-gray-700">
                Mission & Vision Form
              </p>
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
