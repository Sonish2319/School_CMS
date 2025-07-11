import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useApiRequest } from "@/utils/helper";

export default function ForgetPassword() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const { id } = router.query;
  const isEditMode = !!id;
  (isEditMode)

  const { sendRequest, loading: submitLoading, error: submitError } = useApiRequest();

// Handle form submission (create or update)
  const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode ? `reset-otp-password/${id}/` : `reset-otp-password/`;

    try {
      // Use the sendRequest function from the hook to send the request
      await sendRequest(url, method, formData);

      // Redirect after successful submission
      router.push("/auth/otp-form");
    } catch (err) {
      setError(submitError || "Failed to save gender.");
    }
  };

  const fields = [
    { label: "Mobile Number", name: "mobile", type: "text", initialValue: "" }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-6">
        {isEditMode ? "Edit Forgot Password" : "Add Forgot Password"}
      </h2>
        <Form fields={fields} onSubmit={handleSubmit} initialValues={initialValues}
        />
    </div>
  );
}
