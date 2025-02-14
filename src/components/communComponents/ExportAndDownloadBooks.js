import { Button } from "react-bootstrap";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { exportBooksCsv, exportDownloadFile } from "../../services/UrlService";
import { post } from "../../services/Api";
import { toast } from "react-toastify";

const ExportAndDownloadBooks = () => {
  const { auth } = useContext(AuthContext);
  const isAdmin = auth?.role?.role === "admin";
  const [exporting, setExporting] = useState(false);

  const handleExportAndDownload = async () => {
    setExporting(true);
    try {
      const response = await post(exportBooksCsv());

      if (response?.jobId) {
        toast.success(response?.message);

        // Download Api Call
        const fileUrl = exportDownloadFile(response.jobId);

        const fileResponse = await fetch(fileUrl);

        const blob = await fileResponse.blob();

        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = "exported_books.csv";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.response?.message);
    } finally {
      setExporting(false);
    }
  };

  return (
    isAdmin && (
      <div>
        <Button
          variant="warning"
          onClick={handleExportAndDownload}
          disabled={exporting}
          className="mt-1 ms-2 p-2 rounded-pill"
        >
          {exporting ? "Exporting..." : "Export & Download Books"}
        </Button>
      </div>
    )
  );
};

export default ExportAndDownloadBooks;
