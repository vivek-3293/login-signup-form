import React, { useEffect, useState } from "react";
import { post } from "../../services/Api";
import { toast } from "react-toastify";
import { AllOverDueHistory } from "../../services/UrlService";

const OverdueHistory = () => {
  const [overdueHistory, setOverdueHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchOverdueHistory = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await post(AllOverDueHistory(), {
        page,
        limit: 15,
        search: "",
      });

      setOverdueHistory((prev) => {
        const newDueHistory = (response.history || []).filter(
          (newItem) => !prev.some((item) => item._id === newItem._id)
        );
        return [...prev, ...newDueHistory];
      });

      if (response.history.length < 15) {
        setHasMore(false);
      }
    } catch (error) {
      
      toast.error(error.response?.data?.message );
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
    ) {
      if (hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    fetchOverdueHistory();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);



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
      )} {loading && <p className="text-center">loading...</p>}
      {!hasMore  && <p className="text-center mt-4"><b>All Overdue History Are Loaded.</b></p>}
    </div>
  );
};

export default OverdueHistory;
