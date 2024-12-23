import React, { useEffect, useState } from "react";
import { del, get } from "../services/Api";
import { deleteBook, userBooksList } from "../services/UrlService";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();


  // Books List Get
  useEffect(() => {
    async function fetchBooks() {
      const response = await get(userBooksList());
      if (response.allBooks) {
        setBooks(response.allBooks);
      }
    }
    fetchBooks();
  }, []);

  // Close delete confirmation modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedBook(null);
  };

  // Open delete confirmation modal on delete button click
  const handleShowDeleteModal = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };


  // Books Update
  const handleUpdate = (bookId) => {
    navigate(`/update-book/${bookId}`);
  };

  // Books Delete
  const handleDelete = async () => {
    try {
      const response = await del(deleteBook(selectedBook._id), true);
      if (response.message) {
        toast.success(response?.data?.message);
        setBooks(books.filter((book) => book._id !== selectedBook._id)); 
        handleCloseDeleteModal()
      } 
    } catch (error) {
      toast.error(error.message);
      handleCloseDeleteModal()
    }
  };

  return (
    <div className="container mt-5">
      <h1>Books List</h1>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Authors</th>
            <th>ISBN</th>
            <th>Category</th>
            <th>PublicationYear</th>
            <th>TotalCopies</th>
            <th>ShelfNumber</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.authors.join(", ")}</td>
                <td>{book.ISBN}</td>
                <td>{book.category}</td>
                <td>{book.publicationYear}</td>
                <td>{book.totalCopies}</td>
                <td>{book.shelfNumber}</td>
                <td>
                  <button
                    className="btn btn-warning my-1 mx-1"
                    onClick={() => handleUpdate(book._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger my-1 mx-1"
                    onClick={() => handleShowDeleteModal(book)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No books found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal  */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete "{selectedBook?.title || 'this book'}"?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BooksList;
