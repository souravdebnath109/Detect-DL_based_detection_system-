// Components/DownloadReport.jsx
import React from "react";
import "./DownloadReport.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DownloadReport = ({ predictionId }) => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleDownload = async () => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to download the report.");
      return;
    }

    if (!predictionId) {
      toast.error("No prediction available. Please make a prediction first.");
      return;
    }

    toast.info("Preparing your report...");

    try {
      const response = await fetch(`http://localhost:8000/api/reports/download-report/${predictionId}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `tumor_report_${predictionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download report. Please try again.");
    }
  };

  return (
    <button 
      className="resume-button" 
      onClick={handleDownload} 
      disabled={!isLoggedIn || !predictionId}
      title={!isLoggedIn ? "Please login to download" : !predictionId ? "Make a prediction first" : "Download report"}
    >
      Download Report ⏷
    </button>
  );
};

export default DownloadReport;
