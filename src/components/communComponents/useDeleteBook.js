import { useState } from "react";
import { del } from "../../services/api";
import { deleteBook } from "../../services/urlService";
import { toast } from "react-toastify";

const useDeleteBook = () => {
  const [books, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleDelete = async (e, setBooks, selectedBook) => {
    e.preventDefault();
    try {
      const response = await del(deleteBook(selectedBook._id));
      toast.success(response?.message);
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== selectedBook._id)
      );
      setShowDeleteModal(false);
      setSelectedBook(null);
    } catch (error) {
      toast.error(error.response?.data?.message);
      setShowDeleteModal(false);
    }
  };

  const handleShowDeleteModal = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedBook(null);
  };

  return {
    books,
    setBooks,
    showDeleteModal,
    selectedBook,
    handleDelete,
    handleShowDeleteModal,
    handleCloseDeleteModal,
  };
};

export default useDeleteBook;
