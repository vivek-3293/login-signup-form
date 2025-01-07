import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { post, get, put } from "../../services/Api";
import {
  getBookById,
  updateBook,
  userAddBook,
} from "../../services/UrlService";
import { useNavigate, useParams } from "react-router-dom";

const AddBook = () => {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({
    title: "",
    authors: "",
    ISBN: "",
    category: "",
    publicationYear: "",
    totalCopies: "",
    shelfNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormChanged, setIsFormChanged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchBookDetails = async () => {
        try {
          const response = await get(getBookById(id));

          const book = response.book || response.Book;

          if (book) {
            setBookDetails({
              title: book.title || "",
              authors: Array.isArray(book.authors)
                ? book.authors.join(", ")
                : book.authors || "",
              ISBN: book.ISBN || "",
              category: book.category || "",
              publicationYear: book.publicationYear?.toString() || "",
              totalCopies: book.totalCopies?.toString() || "",
              shelfNumber: book.shelfNumber || "",
            });
          } else {
            toast.error("Book details not found or invalid response format!");
          }
        } catch (error) {
          toast.error("Failed to fetch book details. Please try again.");
        }
      };

      fetchBookDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
    setIsFormChanged(true);

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!bookDetails.title.trim()) newErrors.title = "Title is required.";
    if (!bookDetails.authors.trim())
      newErrors.authors = "Authors are required.";
    if (!bookDetails.ISBN.trim()) {
      newErrors.ISBN = "ISBN is required.";
    } else if (!/^\d+(-\d+)*$/.test(bookDetails.ISBN)) {
      newErrors.ISBN = "ISBN must contain only numbers and dashes ('-').";
    } else if (
      new Set(bookDetails.ISBN.split("-")).size !==
      bookDetails.ISBN.split("-").length
    ) {
      newErrors.ISBN = "ISBN must not have duplicate numbers.";
    }

    if (!bookDetails.category.trim())
      newErrors.category = "Category is required.";
    if (!bookDetails.publicationYear.trim()) {
      newErrors.publicationYear = "Publication year is required.";
    } else if (!/^\d{4}$/.test(bookDetails.publicationYear)) {
      newErrors.publicationYear = "Publication year must be 4 digits.";
    }
    if (!bookDetails.totalCopies.trim())
      newErrors.totalCopies = "Total copies are required.";
    if (!bookDetails.shelfNumber.trim())
      newErrors.shelfNumber = "Shelf number is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }

    try {
      if (id) {
        const response = await put(updateBook(id), bookDetails);
        toast.success(response?.message, "Book updated successfully.");
      } else {
        const response = await post(userAddBook(), bookDetails);
        toast.success(response?.message, "Book added successfully.");
      }

      setBookDetails({
        title: "",
        authors: "",
        ISBN: "",
        category: "",
        publicationYear: "",
        totalCopies: "",
        shelfNumber: "",
      });
      setIsFormChanged(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container my-5">
      <h2>{id ? "Update Book" : "Add a New Book"}</h2>
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered">
          <tbody>
            {Object.keys(bookDetails).map((field) => (
              <tr key={field}>
                <th>{field.charAt(0).toUpperCase() + field.slice(1)}</th>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name={field}
                    onChange={handleChange}
                    value={bookDetails[field] || ""}
                    placeholder={`Enter ${field}`}
                  />
                  {errors[field] && (
                    <span className="text-danger">{errors[field]}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormChanged}
          >
            {id ? "Update Book" : "Add Book"}
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-3"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
