import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Form from "../../../components/form/form"; // adjust path if needed
import { useApiRequest } from "@/utils/helper";
import { useFetchData } from "@/store/hooks/useFetchData";

export default function UserForm() {
  const router = useRouter();
  const { id } = router.query;
  const isEditMode = !!id;

  const [initialValues, setInitialValues] = useState({});
  const [error, setError] = useState("");

  // Fetch user data with your custom hook
  const {
    data: userData,
    error: fetchError,
    loading: loadingUser,
  } = useFetchData(isEditMode ? `auth/register/${id}` : null);

  const { sendRequest } = useApiRequest();

  useEffect(() => {
    if (userData) {
      setInitialValues({
        username: userData.username || "",
        email: userData.email || "",
        mobile: userData.mobile || "",
        password1: "",
        password2: "",
      });
    }
  }, [userData]);

  useEffect(() => {
    if (fetchError) setError(fetchError);
  }, [fetchError]);

  const fields = [
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    // { label: "Mobile", name: "mobile", type: "tel" },
    {
      label: "Password",
      name: "password1",
      type: "password",
      required: !isEditMode,
    },
    {
      label: "Confirm Password",
      name: "password2",
      type: "password",
      required: !isEditMode,
    },
  ];

  const handleSubmit = async (formData) => {
    setError("");
  
    if (formData.password1 !== formData.password2) {
      setError("Passwords do not match");
      return;
    }
  
    // Map form fields to backend expected names
    const payload = {
      name: formData.username,  // map username -> name
      email: formData.email,
      password: formData.password1,  // use password1 as password
    };
  
    try {
      const method = isEditMode ? "PUT" : "POST";
      const url = isEditMode ? `auth/register/${id}` : "auth/register";
  
      await sendRequest(url, method, payload);
      router.push("/admin/user/list");
    } catch (err) {
      setError(err.message || "Failed to save user.");
    }
  };
  

  if (loadingUser && isEditMode && !initialValues.username) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4">{isEditMode ? "Edit User" : "Add User"}</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <Form
        fields={fields}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      />
    </div>
  );
}
