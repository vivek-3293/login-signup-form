import React, { useEffect, useState, useContext } from "react";
import { get } from "../services/Api";
import { userBooksList } from "../services/UrlService";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CardComponent from "../components/CardComponent";
import DeleteModal from "../components/DeleteModal";
import useDeleteBook from "../components/useDeleteBook";

const BooksList = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const isAdmin = auth?.role === "admin";

  const {
    books,
    setBooks,
    showDeleteModal,
    selectedBook,
    handleDelete,
    handleShowDeleteModal,
    handleCloseDeleteModal,
  } = useDeleteBook();

  // Fetch the list of books
  useEffect(() => {
    async function fetchBooks() {
      const response = await get(userBooksList());
      if (response.books) {
        setBooks(response.books);
      }
    }
    fetchBooks();
  }, []);

  // Add Book Handle
  const handleAddBook = () => {
    navigate("/admin");
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Books List</h1>
      <div className="d-flex justify-content-end my-3">
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
