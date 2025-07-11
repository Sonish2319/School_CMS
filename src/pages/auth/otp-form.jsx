import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "@/components/form/form";
import { useApiRequest } from "@/utils/helper";

export default function OtpForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const { id } = router.query;
  const isEditMode = !!id;
  isEditMode;

  const {
    sendRequest,
    loading: submitLoading,
    error: submitError,
  } = useApiRequest();

  // Handle form submission (create or update)
  const handleSubmit = async (formData) => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode
      ? `verify-otp-password/${id}/`
      : `verify-otp-password/`;

    try {
      // Use the sendRequest function from the hook to send the request
      await sendRequest(url, method, formData);

      // Redirect after successful submission
      router.push("/admin/gender/list");
    } catch (err) {
      setError(submitError || "Failed to save gender.");
    }
  };

  const fields = [
    {
      label: "OTP Code (6 digits)",
      name: "mobile",
      type: "text",
      initialValue: "",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-6">
        Verify Email Address
      </h2>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-green-100 w-80 mb-5 p-5">
          One time password (OTP) code has been sent to your email address.
          Please write the code in the box below and click to verify. <br/> If you
          didn't get email, please check your spam box. Please keep patience as
          it may take upto 2 minutes before you receive email.
        </div>
        <div className="bg-blue-100 w-80 p-5">
          Please note that we send only one SMS a day. If you want to get the
          OTP in your sms, please send SMS to 34001 from your registered mobile
          with the following message: <br />TSCL PWD
        </div>
      </div>
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </div>
  );
}
