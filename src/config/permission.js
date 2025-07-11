export const getModulePermissions = (module) => {
  try {
    const permissions = JSON.parse(localStorage.getItem("permissions")) || [];

    // Filter permissions for the specified module
    const modulePermissions = permissions.filter((perm) =>
      perm.codename.includes(module)
    );

    // Check for specific actions
    return {
      canAdd: modulePermissions.some(
        (perm) => perm.codename === `add_${module}`
      ),
      canChange: modulePermissions.some(
        (perm) => perm.codename === `change_${module}`
      ),
      canDelete: modulePermissions.some(
        (perm) => perm.codename === `delete_${module}`
      ),
      canView: modulePermissions.some(
        (perm) => perm.codename === `view_${module}`
      ),
    };
  } catch (error) {
    console.error("Error fetching module permissions:", error);
    return {
      canAdd: false,
      canChange: false,
      canDelete: false,
      canView: false,
    };
  }
};

export const getModuleViewPermission = (module) => {
  try {
    const permissions = JSON.parse(localStorage.getItem("permissions")) || [];
    
    return permissions.some((perm) => perm.codename === `view_${module}`);
  } catch (error) {
    console.error("Error fetching view permission:", error);
    return false;
  }
};
