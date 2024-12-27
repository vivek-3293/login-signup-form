import { useState } from "react";
import { del } from "../services/Api";
import { deleteBook } from "../services/UrlService";
import { toast } from "react-toastify";

const useDeleteBook = (initialBooks) => {
  const [books, setBooks] = useState(initialBooks || []);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleDelete = async () => {
    try {
      await del(deleteBook(selectedBook._id), true);
      toast.success("Book deleted successfully");
      setBooks(books.filter((book) => book._id !== selectedBook._id));
      setShowDeleteModal(false);
      setSelectedBook(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete book");
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
