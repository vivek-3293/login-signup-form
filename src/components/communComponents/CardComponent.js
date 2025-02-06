import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { post } from "../../services/Api";
import { borrowBook } from "../../services/UrlService";
import { toast } from "react-toastify";

const CardComponent = ({ book, isAdmin, auth, onDelete, onUpdate }) => {
  const navigate = useNavigate();

  const handleBorrowBook = async () => {
    if (!auth) {
      toast.warn("Please log in first!");
      navigate("/login");
      return;
    }
    try {
      const response = await post(borrowBook(), { bookId: book._id });
      if (response?.code === "borrow_limit_reached") {
        toast.error(response.message);
      } else {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <Card className="h-100 shadow">
      {/* <div style={{ height: "200px", overflow: "hidden" }}>
        <video
          width="100%"
          height="100%"
          autoPlay
          loop
          muted
          style={{ objectFit: "cover" }}
        >
          <source src={book.video || "/images/vidio-1.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
      <Card.Img
        variant="top"
        src={book.image || "/images/single-book-2.png"}
        alt={book.title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/book/${book._id}`)}
        >
          {book.title.length > 30
            ? `${book.title.substring(0, 30)}...`
            : book.title}
        </Card.Title>
        <Card.Text>
          <b>Author(s):</b> {book.authors.join(", ")} <br />
          <b>ISBN:</b> {book.ISBN} <br />
          <b>Category:</b> {book.category} <br />
          <b>Publication Year:</b> {book.publicationYear} <br />
        </Card.Text>
      </Card.Body>

      <Card.Footer>
        <Button variant="primary" onClick={() => navigate(`/book/${book._id}`)}>
          View
        </Button>
        {isAdmin && (
          <>
            <Button variant="warning" className="mx-1" onClick={onUpdate}>
              Update
            </Button>
            <Button variant="danger" onClick={() => onDelete(book)}>
              Delete
            </Button>
          </>
        )}
        {!isAdmin && (
          <Button variant="success" className="mx-1" onClick={handleBorrowBook}>
            Borrow Book
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default CardComponent;
