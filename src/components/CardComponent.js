import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ book, isAdmin, onDelete, onUpdate }) => {
  const navigate = useNavigate();

  return (
    <Card className="h-100 shadow">
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
          <b>Total Copies:</b> {book.totalCopies} <br />
          <b>Shelf Number:</b> {book.shelfNumber}
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
      </Card.Footer>
    </Card>
  );
};

export default CardComponent;
