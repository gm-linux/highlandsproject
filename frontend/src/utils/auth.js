// utils/auth.js

// Store JWT token in localStorage
export const setToken = (token) => {
    localStorage.setItem("jwt", token);
};

// Get JWT token
export const getToken = () => {
    return localStorage.getItem("jwt");
};

// Remove JWT token (logout)
export const logout = () => {
    localStorage.removeItem("jwt");
};
