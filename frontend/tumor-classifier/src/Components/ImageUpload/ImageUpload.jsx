// Components/Upload/ImageUpload.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ImageUpload.css"; // Import CSS for styling

const ImageUpload = ({ onImageChange, onSubmit }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    await onSubmit(); // call parent function
    navigate("/result"); // go to result page
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Upload Brain MRI Image</h2>
        <p>Select a brain MRI scan image to detect tumor using AI.</p>
        <input type="file" accept="image/*" onChange={onImageChange} className="file-input" />
        <button onClick={handleClick} className="predict-button">Predict</button>
      </div>
    </div>
  );
};

export default ImageUpload;
