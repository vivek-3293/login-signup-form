import React, { useEffect, useState, useContext } from "react";
import { get, post } from "../../services/Api";
import { toast } from "react-toastify";
import {
  borrowHistory,
  extendBorrowing,
  returnBook,
} from "../../services/UrlService";
import { AuthContext } from "../../context/AuthContext";

const BorrowHistory = () => {
  const [borrowAllHistory, setBorrowAllHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);

  const fetchBorrowHistory = async () => {
    try {
      const response = await get(borrowHistory());

      const sortedHistory = (response.history || []).sort((a, b) => {
        return new Date(b.dueDate) - new Date(a.dueDate);
      });

      setBorrowAllHistory(sortedHistory);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message);
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowHistory();
  }, []);

  const handleReturnBook = async (borrowId) => {
    try {
      const response = await post(returnBook(), { borrowId });

      toast.success(response.message);
      await fetchBorrowHistory();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleExtendBorrowing = async (borrowId) => {
    try {
      const response = await post(extendBorrowing(), { borrowId });

      toast.success(response.message);

      await fetchBorrowHistory();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  if (error) return <p className="text-danger">{error}</p>;
  if (loading) return <p className="text-center mt-3">Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Borrow History</h2>
      {borrowAllHistory.length > 0 ? (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Book Title</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Fine</th>
              {auth?.role?.role === "member" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {borrowAllHistory.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.bookId?.title || "N/A"}</td>
                <td>
                  {new Date(item.borrowDate).toLocaleDateString("en-GI", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>
                  {new Date(item.dueDate).toLocaleDateString("en-GI", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>
                  {item.returnDate
                    ? new Date(item.returnDate).toLocaleDateString("en-GI", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "Not Returned"}
                </td>
                <td>{item.status}</td>
                <td>${item.fine}</td>

                {auth?.role?.role === "member" && (
                  <td>
                    {item.status !== "returned" && (
                      <>
                        <button
                          className="btn btn-danger btn-sm me-1"
                          onClick={() => handleReturnBook(item._id)}
                        >
                          Return Book
                        </button>

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleExtendBorrowing(item._id)}
                        >
                          Extend Period
                        </button>
                      </>
                    )}
                  </td>
                )}
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
