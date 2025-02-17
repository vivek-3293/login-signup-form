// import React, { useState, useRef } from "react";
// import { Button, Modal, Spinner } from "react-bootstrap";
// import { post } from "../../services/api";
// import { importBooksCsv } from "../../services/urlService";

// const ImportBooks = ({ fetchBooks }) => {
//   const fileInputRef = useRef(null);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [modalType, setModalType] = useState("success");
//   const [errors, setErrors] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleCsvUpload = async (e) => {
//     e.preventDefault();

//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);

//     try {
//       const response = await post(importBooksCsv(), formData);

//       if (response?.code || response?.code === "Validation_Error") {
//         setErrors(response.errors);
//         setModalType("error");
//       } else {
//         setSuccessMessage(response?.message);
//         setModalType("success");
//         fetchBooks();
//       } 
//     } catch (error) {
//       setErrors(error.response?.message);
//       setModalType("error");
//     } finally {
//       setLoading(false);
//       setShowModal(true);
//     }
//   };

//   return (
//     <>
//       <input
//         type="file"
//         accept=".csv"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleCsvUpload}
//       />

//       <Button
//         variant="primary"
//         className="rounded-pill"
//         onClick={handleButtonClick}
//       >
//         {loading ? (
//           <>
//             <Spinner
//               as="span"
//               animation="border"
//               size="sm"
//               role="status"
//               aria-hidden="true"
//             />
//             {" Uploading..."}
//           </>
//         ) : (
//           "Import CSV File"
//         )}
//       </Button>

//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {modalType === "success" ? "Success" : "CSV Import Errors"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {modalType === "success" ? (
//             <p className="text-success fw-bold">{successMessage}</p>
//           ) : (
//             <table className="table table-bordered table-striped">
//               <thead>
//                 <tr>
//                   <th>Row</th>
//                   <th>Column</th>
//                   <th>Error</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {errors.map((err, index) => (
//                   <tr key={index}>
//                     <td>{err?.row || ""}</td>
//                     <td>{err?.column || ""}</td>
//                     <td>{err?.error || ""}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default ImportBooks;


import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Spinner, ProgressBar } from "react-bootstrap";
import { post, get } from "../../services/api.js";
import { importBooksCsv, getImportStatus } from "../../services/urlService.js";

const ImportBooks = ({ fetchBooks }) => {
  const fileInputRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [modalType, setModalType] = useState("progress");
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [jobId, setJobId] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (jobId) {
      intervalRef.current = setInterval(async () => {
        await checkImportStatus(jobId);
      }, 3000);
    }

    return () => clearInterval(intervalRef.current);
  }, [jobId]);

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

      if (response?.jobId) {
        setJobId(response.jobId);
        setProgress(0);
        setModalType("progress");
        setShowModal(true);
      } else if (response?.errors) {
        setErrors(response.errors);
        setModalType("error");
        setShowModal(true);
      } else {
        setSuccessMessage(response?.message);
        setModalType("success");
        fetchBooks();
        setShowModal(true);
      }
    } catch (error) {
      setErrors(error.response?.message);
      setModalType("error");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

 const checkImportStatus = async (jobId) => {
    try {
        const statusResponse = await get(getImportStatus(jobId));

        console.log("Progress Response:", statusResponse); 

        if (statusResponse?.job?.progress !== undefined) {
            setProgress(statusResponse.job.progress); 

            if (statusResponse.job.progress >= 100) {
                clearInterval(intervalRef.current); 

                if (statusResponse.job.status === "failed" || statusResponse?.errors?.length) {
                    setErrors(statusResponse.job?.errors);
                    setModalType("error"); 
                    setShowModal(true);
                } else {
                    setSuccessMessage("Import completed successfully.");
                    setModalType("success"); 
                    setShowModal(true);
                }

                fetchBooks(); 
            }
        }
    } catch (error) {
        console.error("Failed to fetch import status", error);
        setErrors([{ error: "Failed to fetch import status" }]);
        setModalType("error");
        setShowModal(true);
        clearInterval(intervalRef.current);
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

      <Button variant="primary" className="rounded-pill" onClick={handleButtonClick}>
        {loading ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            {" Uploading..."}
          </>
        ) : (
          "Import CSV File"
        )}
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "success" ? "Success" : modalType === "error" ? "CSV Import Errors" : "Import Progress"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "progress" ? (
            <>
              <p>Import is in progress...</p>
              <ProgressBar animated now={progress} label={`${progress}%`} />
            </>
          ) : modalType === "success" ? (
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
                    <td>{err?.row || "N/A"}</td>
                    <td>{err?.column || "N/A"}</td>
                    <td>{err?.error || "Unknown error"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImportBooks;