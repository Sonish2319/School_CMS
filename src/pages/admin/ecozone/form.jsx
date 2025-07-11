import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useFetchDataGroup } from "@/store/hooks/useFetchDataGroup";
import { useApiRequest } from "@/utils/helper";

export default function GenderForm({ isPopup = false, onClose }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const { id } = router.query;
  const isEditMode = !!id;
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const { data, errors, loading } = useFetchDataGroup(
    [
      isEditMode ? `ecozones/${id}/` : null,
      "ecozones",
    ]
  );

  const {
    sendRequest,
    loading: submitLoading,
    error: submitError,
  } = useApiRequest();

  useEffect(() => {
    const [districtData, provinceData] = data;

    if (data) {

      if (provinceData?.results && Array.isArray(provinceData.results)) {
        const options = provinceData.results.map((type) => ({
          value: type.id,
          label: type.title || `Type ${type.id}`,
        }));
        setDropdownOptions(options);
      } else {
        setDropdownOptions([]);
      }

      setInitialValues({
        code: districtData?.code || "",
        title: districtData?.title || "",
        title_np: districtData?.title_np || "",
        seq: districtData?.seq || 0,
        is_published: data.is_published === true,
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setError("Failed to fetch district institute info.");
    }
  }, [error]);

  // Handle form submission (create or update)
  const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `ecozones/${id}/` : `ecozones/`;

    try {
      // Use the sendRequest function from the hook to send the request
      await sendRequest(url, method, formData);

      // Redirect after successful submission
      router.push("/admin/ecozone/list");
    } catch (err) {
      setError(submitError || "Failed to save district.");
    }
  };

  const fields = [
    {
      label: "Title (English)",
      name: "title",
      type: "text",
      initialValue: "",
    },
    {
      label: "Title (Nepali)",
      name: "title_np",
      type: "text",
      initialValue: "",
    },
    {
      label: "Status",
      name: "status",
      type: "option",
      initialValue: "active",
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
          {isEditMode ? "Edit District" : "Add District"}
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
        />
      )}
    </div>
  );
}
