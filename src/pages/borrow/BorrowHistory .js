import React, { useEffect, useState } from "react";
import { get } from "../../services/Api";
import { toast } from "react-toastify";

const BorrowHistory = () => {
  const [borrowHistory, setBorrowHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorrowHistory = async () => {
      try {
        const response = await get(borrowHistory());
        setBorrowHistory(response.data.history);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to fetch borrow history"
        );
        toast.error(error.response?.data?.message);
        setLoading(false);
      }
    };
    fetchBorrowHistory();
  });

  if (error) return <p className="text-danger">{error}</p>

  return (
    <div className="container mt-4">
      <h2>Borrow History</h2>
      {borrowHistory.length > 0 ? (
        <table className="table table-bordered table-striped mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Book Title</th>
              <th>Borrowed By</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Fine</th>
            </tr>
          </thead>
          <tbody>
            {borrowHistory.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.bookId.title}</td>
                <td>{item.userId.name}</td>
                <td>{item.userId.email}</td>
                <td>{item.userId.phone}</td>
                <td>{new Date(item.borrowDate).toLocaleDateString()}</td>
                <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                <td>
                  {item.returnDate
                    ? new Date(item.returnDate).toLocaleDateString()
                    : "Not Returned"}
                </td>
                <td>{item.status}</td>
                <td>{item.fine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No borrow history found.</p>
      )}
    </div>
  );
};

export default BorrowHistory;
