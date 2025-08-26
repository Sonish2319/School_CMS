import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useFetchData } from "@/store/hooks/useFetchData";
import { useApiRequest } from "@/utils/helper";

export default function CalendarForm({ mode = "add" }) {
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = !!id;

  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState("");
  const [semesterOptions, setSemesterOptions] = useState([]);

  const { data, error: fetchError, loading } = useFetchData(
    isEditMode ? `event/calender/${id}` : null
  );

  const { data: semestersData } = useFetchData("event/semester"); // Assuming your API returns semesters here
  const { sendRequest, loading: submitLoading, error: submitError } = useApiRequest();

  // Map semester options
  useEffect(() => {
    if (semestersData?.length) {
      const options = semestersData.map((sem) => ({
        label: sem.semester_name,
        value: sem.id,
      }));
      setSemesterOptions(options);
    }
  }, [semestersData]);

  // Set initial form values in edit mode
  useEffect(() => {
    if (isEditMode && data) {
      setInitialValues({
        semesterId: data.semesterId || "",
        date: data.date || "",
        event: data.event || "",
      });
    }
  }, [data, isEditMode]);

  useEffect(() => {
    if (fetchError) {
      setError("Failed to fetch calendar event.");
    }
  }, [fetchError]);

  const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `event/calender/${id}` : `event/calender`;

    try {
      await sendRequest(url, method, formData);
      router.push("/admin/event/calender/list");
    } catch (err) {
      setError(submitError || "Failed to save calendar event.");
    }
  };

  const formFields = [
    {
      name: "semesterId",
      label: "Semester",
      type: "option",
      options: semesterOptions,
    },
    {
      name: "date",
      label: "Date",
      type: "date",
    },
    {
      name: "event",
      label: "Event",
      type: "text",
    },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 bg-gradient-to-r from-green-500 to-green-700 px-4 py-4 rounded-2xl">
        <h2 className="text-[22px] sm:text-[26px] font-semibold text-white">
          {isEditMode ? "Edit Calendar Event" : "Add Calendar Event"}
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
                Calendar Form
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
