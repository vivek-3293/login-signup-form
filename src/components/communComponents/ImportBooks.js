import React, { useState, useRef } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { post } from "../../services/Api";
import { importBooksCsv } from "../../services/UrlService";

const ImportBooks = ({ setBooks, setPage, fetchBooks }) => {
  const fileInputRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [modalType, setModalType] = useState("success");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleCsvUpload = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await post(importBooksCsv(), formData);

      if (response?.code || response?.code === "Validation_Error") {
        setErrors(response.errors);
        setModalType("error");
      } else {
        setSuccessMessage(response?.message);
        setModalType("success");
        setBooks([]);
        setPage(1);
        fetchBooks();
      }
    } catch (error) {
      setErrors([{ error: error.response?.data?.message }]);
      setModalType("error");
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleCsvUpload}
      />

      <Button
        variant="primary"
        className="rounded-pill"
        onClick={handleButtonClick}
      >
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            {" Uploading..."}
          </>
        ) : (
          "Import CSV File"
        )}
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "success" ? "Success" : "CSV Import Errors"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "success" ? (
            <p className="text-success fw-bold">{successMessage}</p>
          ) : (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Row</th>
                  <th>Column</th>
                  <th>Error</th>
                </tr>
              </thead>
              <tbody>
                {errors.map((err, index) => (
                  <tr key={index}>
                    <td>{err?.row || ""}</td>
                    <td>{err?.column || ""}</td>
                    <td>{err?.error || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImportBooks;
