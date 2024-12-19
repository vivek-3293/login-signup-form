import React from "react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { post } from "../services/Api";
import { userAddBook } from "../services/UrlService";

const AddBook = () => {
  const { auth } = useAuth();
  const [bookDetails, setBookDetails] = useState({
    title: "",
    authors: "",
    ISBN: "",
    category: "",
    publicationYear: "",
    totalCopies: "",
    shelfNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.token) {
      toast.error("Please Login First!");
      return;
    }

    console.log("Submitting Book Details:", bookDetails);
    try {
      const response = await post(userAddBook(), bookDetails, true);
      console.log("Response from API:", response);
      toast.success("Book Added Successfully");
      console.log(response);
    } catch (error) {
      console.error("Error while adding book:", error.response?.data?.message);
      toast.error(error.response?.data?.message || "Book already exist");
    }
  };

  return (
    <div className="container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Title</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={handleChange}
                  value={bookDetails.title}
                  placeholder="Enter book title"
                />
              </td>
            </tr>
            <tr>
              <th>Authors</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="authors"
                  onChange={handleChange}
                  value={bookDetails.authors}
                  placeholder="Enter author's name"
                />
              </td>
            </tr>
            <tr>
              <th>ISBN</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="ISBN"
                  onChange={handleChange}
                  value={bookDetails.ISBN}
                  placeholder="Enter ISBN"
                />
              </td>
            </tr>
            <tr>
              <th>Category</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  onChange={handleChange}
                  value={bookDetails.category}
                  placeholder="Enter category"
                />
              </td>
            </tr>
            <tr>
              <th>Publication Year</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="publicationYear"
                  onChange={handleChange}
                  value={bookDetails.publicationYear}
                  placeholder="Enter publication year"
                />
              </td>
            </tr>
            <tr>
              <th>Total Copies</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="totalCopies"
                  onChange={handleChange}
                  value={bookDetails.totalCopies}
                  placeholder="Enter total copies"
                />
              </td>
            </tr>
            <tr>
              <th>Shelf Number</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="shelfNumber"
                  onChange={handleChange}
                  value={bookDetails.shelfNumber}
                  placeholder="Enter shelf number"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
