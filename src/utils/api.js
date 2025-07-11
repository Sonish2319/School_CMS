// utils/api.js
import { fetchLocalStorage } from "./helper";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchAPI(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const BEARER_TOKEN = fetchLocalStorage('access');

  // Initialize headers
  const headers = {
    Authorization: `Bearer ${BEARER_TOKEN}`
  };

  // Determine if we're sending FormData
  const isFormData = options.body instanceof FormData;

  // Prepare the request config
  const config = {
    method: options.method || "GET",
    headers: {
      ...headers,
      // Only set Content-Type for non-FormData requests
      ...(!isFormData && { 'Content-Type': 'application/json' })
    },
    // Don't stringify FormData, stringify everything else
    body: isFormData ? options.body : (options.body ? JSON.stringify(options.body) : undefined)
  };

  // For debugging - log the request details
  if (process.env.NODE_ENV === 'development') {
    console.log('API Request:', {
      url,
      method: config.method,
      headers: config.headers,
      body: isFormData ? '[FormData]' : config.body
    });

    if (isFormData) {
      console.log('FormData contents:');
      for (let [key, value] of options.body.entries()) {
        console.log(key, value);
      }
    }
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { detail: await response.text() };
      }
      throw new Error(errorData.detail || `API request failed with status ${response.status}`);
    }

    // Handle empty responses (like for DELETE requests)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}