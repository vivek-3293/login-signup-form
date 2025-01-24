import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get } from "../../services/Api";
import { toast } from "react-toastify";
import { getBookById } from "../../services/UrlService";

const SingleBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        const response = await get(getBookById(id));

        if (response.book) {
          setBook(response.book);
        }
      } catch (err) {
        setError(err.response?.data?.message);
        toast.error(err.response?.data?.message);
      }
    }
    fetchBookDetails();
  }, [id]);

  if (error) {
    return <div className="container text-center my-5">{error}</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Book Details</h1>
      {book ? (
        <div className="card shadow p-4">
          <h2>{book.title}</h2>
          <p>
            <b>Author(s):</b> {book.authors.join(", ")}
          </p>
          <p>
            <b>ISBN:</b> {book.ISBN}
          </p>
          <p>
            <b>Category:</b> {book.category}
          </p>
          <p>
            <b>Publication Year:</b> {book.publicationYear}
          </p>
          <p>
            <b>Total Copies:</b> {book.totalCopies}
          </p>
          <p>
            <b>Available Copies:</b> {book.availableCopies}
          </p>
          <p>
            <b>Shelf Number:</b> {book.shelfNumber}
          </p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/")}
          >
            Back to Books List
          </button>
        </div>
      ) : (
        <div className="text-center">Book Not Found</div>
      )}
    </div>
  );
};

export default SingleBook;
