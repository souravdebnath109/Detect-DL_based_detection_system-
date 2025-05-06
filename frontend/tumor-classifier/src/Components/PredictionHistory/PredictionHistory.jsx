// src/Components/PredictionHistory/PredictionHistory.jsx
import React, { useEffect, useState } from "react";
import "./PredictionHistory.css";

const PredictionHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("accessToken"); // ✅ Get token here
  
      if (!token) {
        console.error("No access token found. Please log in.");
        setLoading(false);
        return;
      }
  
      try {
        const response = await fetch("http://localhost:8000/api/user/history/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Use token here
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setHistory(data);
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch history:", errorData);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchHistory();
  }, []);
  

  return (
    <div className="history-container">
      <h2 className="history-title">🧠 Prediction History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <div className="history-grid">
          {history.map((entry, index) => {
            // Ensure the image path is correct and not null/undefined
            const imageUrl = entry.image.startsWith('http')
              ? entry.image
              : `http://localhost:8000${entry.image}`;

            return (
              <div className="history-card" key={index}>
                {entry.image ? (
                  <img
                    src={imageUrl}
                    alt="Prediction"
                    className="history-image"
                    onError={e => { e.target.onerror = null; e.target.src = '/default-image.png'; }} // fallback image
                  />
                ) : (
                  <div className="history-image-missing">No Image</div>
                )}
                <div className="history-info">
                  <p className="result-label">{entry.result.toUpperCase()}</p>
                  <p className="timestamp">
                    {new Date(entry.predicted_at).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PredictionHistory;
