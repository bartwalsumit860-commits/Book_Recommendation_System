const API_BASE_URL =
  (
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.MODE === "production"
      ? "https://book-recommendation-system-2-gwyo.onrender.com"
      : "http://127.0.0.1:8000")
  ).replace(/\/$/, "");

export default API_BASE_URL;
