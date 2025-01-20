// Api Base Url
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const apiClient = (endPoint) => {
  return `${BASE_URL}${endPoint}`;
};

// ALL API URL

export const userRegister = () => {
  return apiClient("/api/auth/register");
};

export const userLogin = () => {
  return apiClient("/api/auth/login");
};

export const userResetPassword = () => {
  return apiClient("/api/auth/reset-password");
};


// ========= Books API ==========
export const userLogout = () => {
  return apiClient("/api/auth/logout");
};
export const userAddBook = () => {
  return apiClient("/api/books");
};

export const userBooksList = () => {
  return apiClient('/api/books/list');
};

export const getBookById = (id) => {
  return apiClient(`/api/books/${id}`);
};

export const updateBook = (id) => {
  return apiClient(`/api/books/${id}`);
};

export const deleteBook = (id) => {
  return apiClient(`/api/books/${id}`);
};

export const searchBooks = (query) => {
  return apiClient(`/api/books/search?q=${query}`);
};

// =========== Member API ============

export const addMember = () => {
  return apiClient('/api/members');
};

export const updateMember = (id) => {
  return apiClient(`/api/members/${id}`);
};

export const getAllMembers = () => {
  return apiClient("/api/members/list");
};

export const getMemberById = (memberId) => {
  return apiClient(`/api/members/${memberId}`);
};

export const adminToggle = () => {
  return apiClient('/api/members/toggle-admin');
};

// =========== Borrow API ============

export const borrowBook = () => {
  return apiClient('/api/books/borrow')
}

export const borrowHistory = () => {
  return apiClient('/api/books/borrowed')
}
export const returnBook= () => {
  return apiClient('/api/books/return')
}
export const extendBorrowing  = () => {
  return apiClient('/api/books/extend')
}

export const AllBorrowHistory = () => {
  return apiClient("/api/members/history")
}

export const AllOverDueHistory = () => {
  return apiClient('/api/books/overdue');
};






// export const userLoginFormik = () => {
//   return apiClient("/api/auth/login/custom-validation");
// };
// export const userSignupFormik = () => {
//   return apiClient("/api/auth/registration/custom-validation");
// };
