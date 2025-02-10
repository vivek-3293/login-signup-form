import React, { useEffect, useState, useCallback } from "react";
import { post } from "../../services/Api";
import { toast } from "react-toastify";
import { AllOverDueHistory } from "../../services/UrlService";

const OverdueHistory = () => {
  const [overdueHistory, setOverdueHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 15;

  const fetchOverdueHistory = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await post(AllOverDueHistory(), {
        page,
        limit,
        search: "",
      });

      if (!response.history || response.history.length === 0) {
        setHasMore(false);
        toast.error(response?.message);
        return;
      }

      setOverdueHistory((prev) => {
        const newDueHistory = (response.history || []).filter(
          (newItem) => !prev.some((item) => item._id === newItem._id)
        );
        return [...prev, ...newDueHistory];
      });

      if (response.history.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverdueHistory();
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
    const handleScrollWithOverdue = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 200);
    };

    window.addEventListener("scroll", handleScrollWithOverdue);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScrollWithOverdue);
    };
  }, [handleScroll]);

  return (
    <div className="container mt-4">
      <h2>Overdue History (Admin Only)</h2>
      {overdueHistory.length > 0 ? (
        <table className="table table-bordered table-striped mt-3">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Book Title</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Fine</th>
            </tr>
          </thead>
          <tbody>
            {overdueHistory.map((item, index) => (
              <tr key={`${item._id}-${index}`}>
                <td>{index + 1}</td>
                <td>{item.book?.title || "N/A"}</td>
                <td>{item.user?.name || "N/A"}</td>
                <td>{item.user?.email || "N/A"}</td>
                <td>{item.user?.phone || "N/A"}</td>
                <td>
                  {new Date(item.borrowDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>
                  {new Date(item.dueDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>{item.status}</td>
                <td>${item.fine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No overdue history found.</p>
      )}{" "}
      {loading && <p className="text-center">loading...</p>}
    </div>
  );
};

export default OverdueHistory;
