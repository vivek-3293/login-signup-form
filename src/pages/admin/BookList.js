import React, { useEffect, useContext, useState } from "react";
import { get } from "../../services/Api";
import { userBooksList } from "../../services/UrlService";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CardComponent from "../../components/communComponents/CardComponent";
import DeleteModal from "../../components/communComponents/DeleteModal";
import useDeleteBook from "../../components/communComponents/useDeleteBook";

const BooksList = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const isAdmin = auth?.role?.role === "admin";
  const [searchTerm, setSearchTerm] = useState("");

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
    async function fetchBooks() {
      const response = await get(userBooksList());
      if (response.books) {
        setBooks(response.books);
      }
    }
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
    } else {
      navigate("/");
    }
  };

  const handleAddBook = () => {
    navigate("/admin");
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Books List</h1>
      <div className="d-flex justify-content-end my-3">
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control w-100"
            type="search"
            placeholder="Search Books"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-success mx-2" type="submit">
            Search
          </button>
        </form>
        {isAdmin && (
          <Button variant="success" onClick={handleAddBook}>
            Add Book
          </Button>
        )}
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {books.length > 0 ? (
          books.map((book) => (
            <Col key={book._id}>
              <CardComponent
                book={book}
                isAdmin={isAdmin}
                auth={auth}
                onDelete={handleShowDeleteModal}
                onUpdate={() => navigate(`/update-book/${book._id}`)}
              />
            </Col>
          ))
        ) : (
          <div className="text-center w-100">
            <p>No books found</p>
          </div>
        )}
      </Row>
      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        book={selectedBook}
      />
    </div>
  );
};

export default BooksList;
