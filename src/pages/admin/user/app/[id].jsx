import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFetchData } from "../../../../store/hooks/useFetchData";
import { useApiRequest } from "@/utils/helper";
import Form from "../../../../components/form/form"; // adjust path if needed
import { toast } from "react-toastify";

export default function UserEdit() {
  const router = useRouter();
  const { id } = router.query;
  const { sendRequest } = useApiRequest();

  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState("");

  const { data: userData, loading, error: fetchError } = useFetchData(id ? `users/${id}/` : null);

  // When data loads, set initialValues for the form
  useEffect(() => {
    if (userData) {
      setInitialValues({
        username: userData.name || "",
        email: userData.email || "",
        password: "",
        is_active: userData.is_active || false,
        is_superuser: userData.is_superuser || false,
        is_staff: userData.is_staff || false,
        groups: userData.groups || [],
        permissions: userData.permissions || [],
      });
    }
  }, [userData]);

  useEffect(() => {
    if (fetchError) setError(fetchError);
  }, [fetchError]);

  const fields = [
    { label: "Username", name: "username", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    // { label: "Active User", name: "is_active", type: "checkbox" },
    // { label: "Superuser", name: "is_superuser", type: "checkbox" },
    // { label: "Staff Member", name: "is_staff", type: "checkbox" },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Leave blank to keep current password",
    },
    // Assuming groups and permissions can be selected by multi-select or custom UI
    // {
    //   label: "Groups",
    //   name: "groups",
    //   type: "custom",
    //   render: ({ value, onChange }) => (
    //     <GroupsSelect value={value} onChange={onChange} />
    //   ),
    // },
    // {
    //   label: "Permissions",
    //   name: "permissions",
    //   type: "custom",
    //   render: ({ value, onChange }) => (
    //     <PermissionsSelect value={value} onChange={onChange} />
    //   ),
    // },
  ];

  // Dummy placeholders for groups/permissions selectors — replace with your actual UI components
  function GroupsSelect({ value, onChange }) {
    // value is array of group objects [{id, name}, ...]
    // You need to implement your multi-select UI or use a library
    // For now, simple textarea JSON editor as placeholder:
    return (
      <textarea
        rows={4}
        className="w-full p-2 border border-gray-300 rounded"
        value={JSON.stringify(value, null, 2)}
        onChange={(e) => {
          try {
            const parsed = JSON.parse(e.target.value);
            if (Array.isArray(parsed)) onChange(parsed);
          } catch {
            // ignore invalid json
          }
        }}
      />
    );
  }

  function PermissionsSelect({ value, onChange }) {
    // Same as groups select placeholder
    return (
      <textarea
        rows={4}
        className="w-full p-2 border border-gray-300 rounded"
        value={JSON.stringify(value, null, 2)}
        onChange={(e) => {
          try {
            const parsed = JSON.parse(e.target.value);
            if (Array.isArray(parsed)) onChange(parsed);
          } catch {
            // ignore invalid json
          }
        }}
      />
    );
  }

  const handleSubmit = async (formData) => {
    setError("");

    // Prepare payload for API
    try {
      const updateData = {
        name: formData.username,
        email: formData.email,
        is_active: formData.is_active,
        is_superuser: formData.is_superuser,
        is_staff: formData.is_staff,
        // Extract only the IDs for groups and permissions
        groups: (formData.groups || []).map((g) => g.id),
        permissions: (formData.permissions || []).map((p) => p.id),
        // Only send password if it's not empty
        ...(formData.password ? { password: formData.password } : {}),
      };

      await sendRequest(`users/${id}/`, "PUT", updateData);
      toast.success("User updated successfully");
      router.push("/admin/user/list");
    } catch (err) {
      setError(err.message || "Failed to update user.");
    }
  };

  if (loading || !initialValues) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl mb-4">Edit User</h1>
      <Form fields={fields} onSubmit={handleSubmit} initialValues={initialValues} />
    </div>
  );
}
