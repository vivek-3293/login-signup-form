import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { searchBooks } from "../../services/UrlService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { get } from "../../services/Api";
import CardComponent from "../../components/communComponents/CardComponent";
import { AuthContext } from "../../context/AuthContext";
import DeleteModal from "../../components/communComponents/DeleteModal";
import useDeleteBook from "../../components/communComponents/useDeleteBook";

const SearchBook = () => {
  const { auth } = useContext(AuthContext);
  const isAdmin = auth?.role === "admin";
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search).get("q");

  const {
    books,
    setBooks,
    showDeleteModal,
    selectedBook,
    handleDelete,
    handleShowDeleteModal,
    handleCloseDeleteModal,
  } = useDeleteBook();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await get(searchBooks(query));
        if (response.searchedBooks) {
          setBooks(response.searchedBooks);
        }
        console.log("api res", response);
        console.log(books);
      } catch (error) {
        setError(error.response?.data?.message);
        toast.error(error.response?.data?.message);
      }
    };
    if (query) {
      fetchBooks();
    }
  }, [query]);

  

  return (
    <div className="container mt-5">
      <h2>Search Results</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="row">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="col-md-4 mb-4">
              <CardComponent
                book={book}
                isAdmin={isAdmin}
                onDelete={handleShowDeleteModal}
                onUpdate={() => navigate(`/update-book/${book._id}`)}
              />
            </div>
          ))
        ) : (
          <p>No Book Found For The Search</p>
        )}
      </div>

      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        book={selectedBook}
      />
    </div>
  );
};

export default SearchBook;
