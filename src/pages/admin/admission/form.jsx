import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useApiRequest } from "@/utils/helper";
import { useFetchData } from "../../../store/hooks/useFetchData";

export default function AdmissionForm({ isPopup = false, onClose, id, isAdding, refetch }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const isEditMode = !!id;

  const {
    sendRequest,
    loading: submitLoading,
    error: submitError,
  } = useApiRequest();

  const { data, error: fetchError, loading } = useFetchData(
    isEditMode ? `admissions/${id}/` : null
  );

  useEffect(() => {
    if (data) {
      let programs = {};
      try {
        programs = typeof data.programsOffered === "string"
          ? JSON.parse(data.programsOffered)
          : data.programsOffered || {};
      } catch {
        programs = {};
      }

      setInitialValues({
        title: data.title || "",
        shortSubtext: data.shortSubtext || "",
        description: data.description || "",
        startDate: data.startDate || "",
        endDate: data.endDate || "",
        image: data.image || "",
        icons: data.icons || "",
        programsOffered: {
          grades: programs.grades || [],
          mediums: programs.mediums || [],
          curriculum: programs.curriculum || "",
          special: programs.special || [],
        },
        curriculum: data.curriculum || "",
        languageMediums: data.languageMediums || "",
        specialPrograms: data.specialPrograms || "",
        eligibilityCriteria: data.eligibilityCriteria || "",
        importantNotices: data.importantNotices || "",
        admissionOpenDate: data.admissionOpenDate || "",
        entranceTestDate: data.entranceTestDate || "",
        orientationDay: data.orientationDay || "",
        status: data.status ? "active" : "inactive",
      });
    }
  }, [data]);

  const formatDateString = (date) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  };

  const handleSubmit = async (formData) => {
    const url = isEditMode ? `admissions/${id}` : "admissions";
    const method = isEditMode ? "PUT" : "POST";

    if (formData instanceof FormData) {
      // Remove old status and append new integer status
      formData.delete("status");
      const statusStr = initialValues?.status || "inactive";
      const statusInt = statusStr === "active" ? 1 : 0;
      formData.append("status", statusInt);

      // Ensure programsOffered is stringified correctly if present as object
      if (formData.has("programsOffered")) {
        // Read current value, parse if needed, then re-append as stringified JSON
        const programsValue = formData.get("programsOffered");
        try {
          const parsedPrograms = typeof programsValue === "string" ? JSON.parse(programsValue) : programsValue;
          formData.delete("programsOffered");
          formData.append("programsOffered", JSON.stringify(parsedPrograms));
        } catch {
          // fallback: keep as is
        }
      }

      // Debug log
      for (let [key, value] of formData.entries()) {
        console.log("FormData field:", key, value);
      }

      try {
        await sendRequest(url, method, formData);
        refetch?.();
        onClose?.();
      } catch (err) {
        setError(submitError || "Failed to save admission.");
      }
    } else {
      // Plain object (no files)
      const payload = new FormData();

      payload.append("title", formData.title || "");
      payload.append("shortSubtext", formData.shortSubtext || "");
      payload.append("description", formData.description || "");
      payload.append("startDate", formatDateString(formData.startDate));
      payload.append("endDate", formatDateString(formData.endDate));
      payload.append("curriculum", formData.curriculum || "");
      payload.append("languageMediums", formData.languageMediums || "");
      payload.append("specialPrograms", formData.specialPrograms || "");
      payload.append("eligibilityCriteria", formData.eligibilityCriteria || "");
      payload.append("importantNotices", formData.importantNotices || "");
      payload.append("admissionOpenDate", formatDateString(formData.admissionOpenDate));
      payload.append("entranceTestDate", formatDateString(formData.entranceTestDate));
      payload.append("orientationDay", formatDateString(formData.orientationDay));
      payload.append("status", formData.status === "active" || formData.status === 1 ? 1 : 0);

      payload.append(
        "programsOffered",
        JSON.stringify(formData.programsOffered || { grades: [], mediums: [], curriculum: "", special: [] })
      );

      // Append files only if File instances
      if (formData.image instanceof File) {
        payload.append("image", formData.image);
      }

      if (formData.icons instanceof File) {
        payload.append("icons", formData.icons);
      }

      // Debug log
      for (let [key, value] of payload.entries()) {
        console.log("FormData field:", key, value);
      }

      try {
        await sendRequest(url, method, payload);
        refetch?.();
        onClose?.();
      } catch (err) {
        setError(submitError || "Failed to save admission.");
      }
    }
  };
  

  const fields = [
    { label: "Title", name: "title", type: "text" },
    { label: "Short Subtext", name: "shortSubtext", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
    { label: "Start Date", name: "startDate", type: "date" },
    { label: "End Date", name: "endDate", type: "date" },
    { label: "Image", name: "image", type: "file" },
    { label: "Icons", name: "icons", type: "text" },

    {
      label: "Grades Offered",
      name: "programsOffered.grades",
      type: "tags",
      placeholder: "e.g. Nursery, 1, 2, etc.",
    },
    {
      label: "Mediums",
      name: "programsOffered.mediums",
      type: "tags",
      placeholder: "e.g. English, Nepali",
    },
    {
      label: "Curriculum",
      name: "programsOffered.curriculum",
      type: "text",
    },
    {
      label: "Special Programs (internal)",
      name: "programsOffered.special",
      type: "tags",
      placeholder: "e.g. Robotics, Olympiad",
    },

    { label: "Curriculum (flat)", name: "curriculum", type: "text" },
    { label: "Language Mediums", name: "languageMediums", type: "text" },
    { label: "Special Programs", name: "specialPrograms", type: "text" },
    { label: "Eligibility Criteria", name: "eligibilityCriteria", type: "textarea" },
    { label: "Important Notices", name: "importantNotices", type: "textarea" },
    { label: "Admission Open Date", name: "admissionOpenDate", type: "date" },
    { label: "Entrance Test Date", name: "entranceTestDate", type: "date" },
    { label: "Orientation Day", name: "orientationDay", type: "date" },
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

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="list-header p-3 sm:p-6">
        <h2 className="text-[21px] font-light">
          {isEditMode ? "Edit Admission" : "Add Admission"}
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
