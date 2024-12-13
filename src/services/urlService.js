// Api Base Url
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const apiClient = (endPoint) => {
  return `${BASE_URL}${endPoint}`;
};

// ALL API URL

export const userSignup = () => {
  return apiClient("/api/auth/registration/custom-validation");
};

export const userLogin = () => {
  return apiClient("/api/auth/login/custom-validation");
};

export const userLogout = () => {
  return apiClient("/api/auth/logout");
};
export const userLoginFormik = () => {
  return apiClient("/api/auth/login/custom-validation");
};
export const userSignupFormik = () => {
  return apiClient("/api/auth/registration/custom-validation");
};
