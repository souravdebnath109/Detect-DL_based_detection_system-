import React from "react";
import "./PredictionResult.css";
import tumorImage from "../../assets/tumor.png";
import happyImage from "../../assets/happiness.png";
import DownloadReport from "../DownloadReport/DownloadReport";

const PredictionResult = ({ result, predictionId }) => {
  const isNoTumor = result?.toLowerCase() === "notumor";

  return (
    <div className="result-container">
      <div className="result-card">
        <h2 className="result-title">🧠 Tumor Detection Result</h2>
        <img src={tumorImage} alt="Tumor Detection" className="result-image" />
        <p className={`result-text ${result ? "success" : "neutral"}`}>
          {result ? result : "No prediction made yet."}
        </p>

        {/* Model Accuracy Line */}
        <p className="accuracy-text">✅ Testing Accuracy of Model 2 is <strong>97.7%</strong></p>
        <DownloadReport predictionId={predictionId} />
        {/* Conditional Congrats Message */}
        {isNoTumor && (
          <div className="congrats-section">
            <p className="congrats-text">🎉 Congratulations! No tumor detected.</p>
            <img src={happyImage} alt="Happy" className="happy-image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionResult;
