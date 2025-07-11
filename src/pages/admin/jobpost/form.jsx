import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useApiRequest } from "@/utils/helper";
import { useFetchDataGroup } from "@/store/hooks/useFetchDataGroup";

export default function GenderForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const [jobType, setJobType] = useState([]);
  const [fiscalYear, setFiscalYear] = useState([]);
  const { id } = router.query;
  const isEditMode = !!id;

  const { data, errors, loading } = useFetchDataGroup(
    [
      isEditMode ? `job-setup/${id}/` : null,
      "job-type",
      "fiscal-year"
    ]
  );

  const {
    sendRequest,
    loading: submitLoading,
    error: submitError,
  } = useApiRequest();

  useEffect(() => {
    if (data && data[0]) {
      const filterData = data[0];
      setInitialValues({
        code: filterData.code || "",
        title: filterData.title || "",
        title_np: filterData.title_np || "",
        seq: filterData.seq || 0,
      });
    }

    if (data && data[1] && data[1].results) {
      const jobTypes = data[1].results.map((jobType) => ({
        value: jobType.id,
        label: jobType.title_np,
      }));
      setJobType(jobTypes);
    }

    if (data && data[2] && data[2].results) {
      const fiscalYears = data[2].results.map((fiscalYear) => ({
        value: fiscalYear.id,
        label: fiscalYear.fiscal_year_name_np,
      }));
      setFiscalYear(fiscalYears);
    }
  }, [data]);

  useEffect(() => {
    if (errors) {
      setError("Failed to fetch job info.");
    }
  }, [errors]);

  // Handle form submission (create or update)
  const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `job-setup/${id}/` : `job-setup/`;

    try {
      // Use the sendRequest function from the hook to send the request
      await sendRequest(url, method, formData);

      // Redirect after successful submission
      router.push("/admin/jobpost/list");
    } catch (err) {
      setError(submitError || "Failed to save job.");
    }
  };

  const fields = [
    {
      label: "Select job post type",
      name: "type_id",
      type: "option",
      options: jobType,
    },
    { label: "Select fiscal year", name: "title", type: "text", initialValue: "" },
    { label: "Title", name: "details", type: "text", initialValue: "" },
    // {
    //   label: "Title",
    //   name: "fiscal",
    //   type: "option",
    //   options: fiscalYear,
    // },
    {
      label: "Details",
      name: "last_submission_date_bs",
      type: "text",
      initialValue: "",
    },
    {
      label: "Last Submission Date (BS)",
      name: "last_submission_date_bs",
      type: "text",
      initialValue: "",
    },
    {
      label: "Double Charge Last Submission Date (BS)",
      name: "double_charge_last_submission_date_bs",
      type: "text",
      initialValue: "",
    }
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-row items-center justify-between bg-white shadow-md rounded-lg p-3 sm:p-6">
        <h2 className="list-title font font-light text-[#EBEEF6]">
          {isEditMode ? "Edit Base" : "Add Base"}
        </h2>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#5B73E8] text-white text-[14px] rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Form
          fields={fields}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        />
      )}
    </div>
  );
}
