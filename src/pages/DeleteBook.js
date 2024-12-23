// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { del } from "../services/Api";
// import { useNavigate, useParams } from "react-router-dom";
// import { deleteBook } from "../services/UrlService";

// const DeleteBook = () => {
//   const [loading, setLoading] = useState(false);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const handleDelete = async () => {
//     setLoading(true);
//     try {
//       const response = await del(`http://localhost:9090/api/books/${id}`, true);
//       console.log('del res', response);
      
//       toast.success(response?.data?.message || "Book deleted successfully");
//       navigate("/");  
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error deleting book");
//       setLoading(false);
//     } 
      
    
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Are you sure you want to delete this book?</h2>
//       <div className="text-center">
//         <button onClick={handleDelete} disabled={loading} className="btn btn-danger">
//           {loading ? "Deleting..." : "Delete Book"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DeleteBook;
