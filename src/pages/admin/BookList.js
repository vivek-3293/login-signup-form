import React, { useEffect, useContext, useState } from "react";
import { post } from "../../services/Api";
import { userBooksList } from "../../services/UrlService";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CardComponent from "../../components/communComponents/CardComponent";
import DeleteModal from "../../components/communComponents/DeleteModal";
import useDeleteBook from "../../components/communComponents/useDeleteBook";
import { toast } from "react-toastify";

const BooksList = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const isAdmin = auth?.role?.role === "admin";
  const [books, setBooks] = useState([]);

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

  useEffect(() => {
    const fetchBooks = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await post(userBooksList(), {
          page,
          limit: 15,
          search: "",
        });
        
        if (response.books) {
          setBooks((prevBooks) => {
            const newBooks = response.books.filter(
              (newBook) => !prevBooks.some((book) => book._id === newBook._id)
            );
            return [...prevBooks, ...newBooks];
          });
        
          if (response.books.length < 15) setHasMore(false);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setHasMore(false); 
        } else {
          toast.error(error.response?.message);
        }
      } finally {
        setLoading(false);
      }
    };
    

    fetchBooks();
  }, [page]);

  const handleAddBook = () => {
    navigate("/admin");
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
    ) {
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1); 
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

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
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
       {!hasMore  && <p className="text-center mt-4"><b>All Books Are Loaded.</b></p>}
      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={(e) => handleDelete(e, setBooks, selectedBook)}
        book={selectedBook}
      />
    </div>
  );
};

export default BooksList;
