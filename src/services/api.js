import axios from "axios";

const API_URL = "https://v2.api.noroff.dev/holidaze";
const USER_URL = "https://v2.api.noroff.dev";

const getToken = () => localStorage.getItem("authToken");
const getApiKey = () => localStorage.getItem("apiKey");

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  const apiKey = getApiKey();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (apiKey) {
    config.headers["X-Noroff-API-Key"] = apiKey;
  }
  return config;
});

export const apiServices = {
  login: async (loginData) => {
    try {
      const response = await axios.post(`${USER_URL}/auth/login`, loginData, {
        params: { _holidaze: true },
      });
      const userData = response.data.data;
      localStorage.setItem("authToken", userData.accessToken);
      localStorage.setItem("userId", userData.id);
      localStorage.setItem("userName", userData.name);
      localStorage.setItem("venueManager", userData.venueManager);
      axiosInstance.defaults.headers.Authorization = `Bearer ${userData.accessToken}`;
      return userData;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const message = error.response.data.errors
          .map((err) => err.message)
          .join(", ");
        throw new Error(message);
      }
      throw new Error(
        error.message || "An unknown error occurred during login."
      );
    }
  },

  createApiKey: async () => {
    const response = await axiosInstance.post(`${USER_URL}/auth/create-api-key`);
    return response.data;
  },

  register: async (registerData) => {
    try {
      const response = await axiosInstance.post(`${USER_URL}/auth/register`, registerData);
      const { data } = response;
      const userData = data.data;
      if (!userData) {
        throw new Error('Response data is missing');
      }
      if (!userData.email) {
        throw new Error('Email is missing in the response data');
      }
      if (!userData.name) {
        throw new Error('Name is missing in the response data');
      }
      return userData;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const message = error.response.data.errors.map(err => err.message).join(', ');
        throw new Error(message);
      }
      throw new Error(error.message || 'An unknown error occurred during registration.');
    }
  },

  getProfile: async (name, includeBookings, includeVenues) => {
    const params = {
      _bookings: includeBookings,
      _venues: includeVenues
    };
    const response = await axiosInstance.get(`/profiles/${name}`, { params });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error fetching profile data.');
    }
  },

  getVenuesWithBookings: async (name) => {
    const params = { _bookings: true };
    const response = await axiosInstance.get(`/profiles/${name}/venues`, { params });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error fetching venues data.');
    }
  },

  getVenues: async (params) => {
    try {
      const response = await axiosInstance.get("/venues", { params });
      if (response.status !== 200) {
        throw new Error(`Request failed with status code ${response.status}`);
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        return {
          success: false,
          message: `API responded with status: ${error.response.status}`,
        };
      } else {
        return {
          success: false,
          message:
            error.message ||
            "Failed to fetch venues.",
        };
      }
    }
  },

  createVenue: async (venueData) => {
    try {
      const response = await axiosInstance.post("/venues", venueData);
      return { success: true, data: response.data };
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const messages = error.response.data.errors
          .map((err) => err.message)
          .join(", ");
        return { success: false, message: messages };
      } else {
        return {
          success: false,
          message: "An unexpected error occurred. Please try again.",
        };
      }
    }
  },

  getVenue: async (venueId) => {
    const params = { _bookings: true };
    const response = await axiosInstance.get(`/venues/${venueId}`, { params });
    return response.data;
  },

  updateVenue: async (id, data) => {
    const response = await axiosInstance.put(`/venues/${id}`, data);
    return response.data;
  },

  deleteVenue: async (id) => {
    const response = await axiosInstance.delete(`/venues/${id}`);
    return response.data;
  },

  searchVenues: async (query) => {
    const response = await axiosInstance.get("/venues/search", {
      params: { query },
    });
    return response.data;
  },

  getBookings: async () => {
    const response = await axiosInstance.get("/bookings");
    return response.data;
  },

  createBooking: async (bookingData) => {
    try {
      const response = await axiosInstance.post("/bookings", bookingData);
      return { success: true, data: response.data };
    } catch (error) {
      if (error.response) {
        return {
          success: false,
          message: `API responded with status: ${error.response.status}`,
        };
      } else {
        return {
          success: false,
          message:
            error.message ||
            "Failed to create booking.",
        };
      }
    }
  },

  getBooking: async (id) => {
    const response = await axiosInstance.get(`/bookings/${id}`);
    return response.data;
  },

  updateBooking: async (id, data) => {
    const response = await axiosInstance.put(`/bookings/${id}`, data);
    return response.data;
  },

  deleteBooking: async (id) => {
    const response = await axiosInstance.delete(`/bookings/${id}`);
    return response.data;
  },
};
