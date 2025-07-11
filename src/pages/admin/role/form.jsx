import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFetchDataGroup } from "@/store/hooks/useFetchDataGroup";

export default function RoleForm() {
  const router = useRouter();
  const { id } = router.query;

  const [groupedPermissions, setGroupedPermissions] = useState({});
  const [roleName, setRoleName] = useState("");
  const [rolePermissions, setRolePermissions] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { data, errors, loading } = useFetchDataGroup([
    "permissions",
    "groups-with-permissions",
  ]);

  useEffect(() => {
    if (data) {
      const permissionsData = data[0];
      if (Array.isArray(permissionsData)) {
        const grouped = permissionsData.reduce((acc, permission) => {
          const [action, module] = permission.codename.split("_");
          if (!acc[module]) acc[module] = {};
          acc[module][action] = permission.id;
          return acc;
        }, {});
        setGroupedPermissions(grouped);
      }

      const rolesData = data[1];
      if (Array.isArray(rolesData)) {
        const currentRole = rolesData.find((role) => role.id === Number(id));
        if (currentRole) {
          setRoleName(currentRole.name || "");
          setRolePermissions(currentRole.permissions || []);
        }
      }
    }
  }, [data, id]);

  const handleCheckboxChange = (module, action, checked) => {
    const codename = `${action}_${module}`;
    setRolePermissions((prev) => {
      if (checked) {
        return [...prev, { codename }];
      }
      return prev.filter((perm) => perm.codename !== codename);
    });
  };

  const isPermissionChecked = (module, action) => {
    const codename = `${action}_${module}`;
    return rolePermissions.some((perm) => perm.codename === codename);
  };

  const handleSubmit = async () => {
    const permissionCodenames = rolePermissions.map((perm) => perm.codename);
    const groupName = roleName;

    const requestBody = {
      group_name: groupName,
      permission_codenames: permissionCodenames,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8800/api/assign-permissions-to-group/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to assign permissions.");
      }

      setSuccessMessage("Permissions assigned successfully.");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Role Permissions
      </h2>
      {successMessage && (
        <p className="text-green-600 mb-4 bg-green-100 p-2 rounded">
          {successMessage}
        </p>
      )}
      <table className="w-full border-collapse border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Module</th>
            <th className="border border-gray-300 px-4 py-2">Create</th>
            <th className="border border-gray-300 px-4 py-2">Edit</th>
            <th className="border border-gray-300 px-4 py-2">View</th>
            <th className="border border-gray-300 px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedPermissions).map(([module, actions]) => (
            <tr key={module} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-gray-700">
                {module}
              </td>
              {["create", "edit", "view", "delete"].map((action) => (
                <td
                  key={action}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  <input
                    type="checkbox"
                    checked={isPermissionChecked(module, action)}
                    onChange={(e) =>
                      handleCheckboxChange(module, action, e.target.checked)
                    }
                    className="h-4 w-4 text-blue-600 focus:ring focus:ring-blue-300 rounded"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Submit
      </button>
    </div>
  );
}
