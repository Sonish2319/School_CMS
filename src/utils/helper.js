import { toast } from 'react-toastify';
import { useRouter } from "next/router";
import { useState } from 'react';


export const fetchLocalStorage = ($value) => {
    return localStorage.getItem($value);
};

export const showToast = (type, message) => {
    if(type === "warn")
        toast.warning(message);
};

export const getAddPath = (router, variable) => {
  let addButtonPath = '';

  // If the current route is a list, create the path for the add form
  if (router.pathname.includes('/list')) {
    addButtonPath = router.pathname.replace('/list', '/form');
  }

  // Optionally, add a query parameter to the URL (e.g., ?variable=gender)
  if (variable) {
    addButtonPath += `?variable=${variable}`;
  }

  return addButtonPath;  // Return the generated add path
};

export const getAddPathRole = (router, variable) => {
  let addButtonPath = '';
  if (router.pathname.includes('/list')) {
    addButtonPath = router.pathname.replace('/list', '/addform');
  }
  if (variable) {
    addButtonPath += `?variable=${variable}`;
  }
  return addButtonPath;
};

export const handleEditPath = (router, variable, id) => {
  // Navigate to the edit page for the given variable (e.g., "gender", "user")
  router.push(`/admin/${variable}/form?id=${id}`);
};

export function useApiRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = async (url, method, body) => {
    setLoading(true);
    setError("");

    try {
      // Determine if we're sending FormData
      const isFormData = body instanceof FormData;
      
      // Prepare headers
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      };

      // Only set Content-Type for non-FormData requests
      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      // Prepare the request config
      const config = {
        method,
        headers,
        body: isFormData ? body : (body ? JSON.stringify(body) : undefined)
      };

      // For debugging - log the request details
      if (process.env.NODE_ENV === 'development') {
        console.log('API Request:', {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
          method,
          headers: config.headers,
          body: isFormData ? '[FormData]' : config.body
        });

        if (isFormData) {
          console.log('FormData contents:');
          for (let [key, value] of body.entries()) {
            console.log(key, value);
          }
        }
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, config);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          errorData = { message: await response.text() };
        }
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }

      // Handle empty responses (like for DELETE requests)
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return null;
      }

      const successMessage = method === "PUT" 
        ? "Successfully updated record." 
        : "Successfully created record.";
      toast.success(successMessage);

      return await response.json();
    } catch (err) {
      console.error('API request failed:', err);
      setError(err.message);
      toast.error(err.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, error };
}