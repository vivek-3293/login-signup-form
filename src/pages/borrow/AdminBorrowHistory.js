import React, { useCallback, useEffect, useState } from "react";
import { post } from "../../services/api";
import { toast } from "react-toastify";
import { AllBorrowHistory } from "../../services/urlService";

const AdminBorrowHistory = () => {
  const [borrowAllHistory, setBorrowAllHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 15;

  const fetchAllBorrowHistory = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await post(AllBorrowHistory(), {
        page,
        limit,
        search: "",
      });

      if (!response.history || response.history.length === 0) {
        setHasMore(false);
        toast.error(response?.message);
        return;
      }
      const sortedHistory = (response.history || []).sort(
        (a, b) => new Date(b.dueDate) - new Date(a.dueDate)
      );

      setBorrowAllHistory((prev) => {
        const newHistory = sortedHistory.filter(
          (newItem) => !prev.some((item) => item._id === newItem._id)
        );
        return [...prev, ...newHistory];
      });

      if (response.history.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      toast.error(error.response?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBorrowHistory();
  }, [page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    }
  }, [hasMore, loading]);

  useEffect(() => {
    let timeout;
    const debouncedHandleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 200);
    };

    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="container mt-5">
      <h2>All Members' Borrowing History</h2>
      {borrowAllHistory.length > 0 ? (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Member Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Book Title</th>
              <th>ISBN</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Fine</th>
            </tr>
          </thead>
          <tbody>
            {borrowAllHistory.map((item, index) => (
              <tr key={`${item._id}-${index}`}>
                <td>{index + 1}</td>
                <td>{item.user?.name || "N/A"}</td>
                <td>{item.user?.email || "N/A"}</td>
                <td>{item.user?.phone || "N/A"}</td>
                <td>{item.user?.address || "N/A"}</td>
                <td>{item.book?.title || "N/A"}</td>
                <td>{item.book?.ISBN || "N/A"}</td>
                <td>
                  {new Date(item.borrowDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>
                  {new Date(item.dueDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>
                  {item.returnDate
                    ? new Date(item.returnDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "Not Returned"}
                </td>
                <td>{item.status}</td>
                <td>₹{item.fine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No borrow history found.</p>
      )}
      {loading && <p className="text-center">loading...</p>}
    </div>
  );
};

export default AdminBorrowHistory;
