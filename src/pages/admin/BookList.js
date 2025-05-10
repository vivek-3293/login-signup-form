import React, { useEffect, useContext, useState, useCallback } from "react";
import { post } from "../../services/api";
import { userBooksList } from "../../services/urlService";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CardComponent from "../../components/communComponents/CardComponent";
import DeleteModal from "../../components/communComponents/DeleteModal";
import useDeleteBook from "../../components/communComponents/useDeleteBook";
import { toast } from "react-toastify";
import ExportAndDownloadBooks from "../../components/communComponents/ExportAndDownloadBooks";
import ImportBooks from "../../components/communComponents/ImportBooks";
import { FaArrowUp } from "react-icons/fa";

const BooksList = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const isAdmin = auth?.role?.role === "admin";
  const [books, setBooks] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const {
    showDeleteModal,
    selectedBook,
    handleDelete,
    handleShowDeleteModal,
    handleCloseDeleteModal,
  } = useDeleteBook();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 15;

  const fetchBooks = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await post(userBooksList(), {
        page,
        limit,
        search: "",
      });

      if (response.books) {
        setBooks((prevBooks) => {
          const newBooks = response.books.filter(
            (newBook) => !prevBooks.some((book) => book._id === newBook._id)
          );
          return [...prevBooks, ...newBooks];
        });

        if (response.books.length < limit) {
          setHasMore(false);
        }
      }
    } catch (error) {
      toast.error(error.response?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const handleAddBook = () => {
    navigate("/admin");
  };

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }

    setShowScrollToTop(window.scrollY > 300);
  }, [hasMore, loading]);

  useEffect(() => {
    let timeout;
    const handleScrollWithBookList = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 200);
    };
    window.addEventListener("scroll", handleScrollWithBookList);
    return () => {
      setTimeout(timeout);
      window.removeEventListener("scroll", handleScrollWithBookList);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Books List</h1>
      <div className="d-flex justify-content-between my-3">
        {isAdmin && (
          <>
            <div>
              <Button
                variant="success"
                className="p-2 rounded-pill"
                onClick={handleAddBook}
              >
                Add Book
              </Button>
            </div>

            <div className="d-flex">
              <ImportBooks fetchBooks={fetchBooks} />
              <ExportAndDownloadBooks />
            </div>
          </>
        )}
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {books.length > 0 ? (
          books.map((book, index) => (
            <Col key={`${book._id}-${index}`}>
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
      {loading && (
        <div className="text-center mt-2">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={(e) => handleDelete(e, setBooks, selectedBook)}
        book={selectedBook}
      />

      {showScrollToTop && (
        <FaArrowUp
          onClick={scrollToTop}
          variant="primary"
          className="scroll-to-top"
        />
      )}
    </div>
  );
};

export default BooksList;
