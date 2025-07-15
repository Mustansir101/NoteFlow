const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:7000/"
    : "https://note-app-backend-9ihf.onrender.com";
console.log(process.env.NODE_ENV);
export { BASE_URL };
