import axios from "axios";

// Create the Axios instance
const api = axios.create({
  baseURL: "http://localhost:5050/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

// Function to get the CSRF token from cookies
// const getCsrfTokenFromCookies = () => {
//   const name = "XSRF-TOKEN=";
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// };

const fetchCsrfToken = () => {
  const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
  return token ? token.split('=')[1] : null;
};

// Add an interceptor to include the CSRF token from cookies in the request headers
// api.interceptors.request.use(
//   (config) => {
//     try {
//       // Get the CSRF token from cookies
//       const token = getCsrfTokenFromCookies();
//       console.log("Fetched CSRF Token from cookies:", token);

//       // Include the token in the request headers
//       if (token) {
//         config.headers["X-CSRF-TOKEN"] = token;
//         console.log("Request Headers with CSRF Token:", config.headers);
//       } else {
//         console.warn("CSRF token not found in cookies.");
//       }
//     } catch (error) {
//       console.error("Failed to include CSRF token in request headers", error);
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
api.interceptors.request.use(
  (config) => {
    const token = fetchCsrfToken();
    if (token) {
      console.log('Sending CSRF Token:', token); // Log the CSRF token
      config.headers["X-CSRF-TOKEN"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;
