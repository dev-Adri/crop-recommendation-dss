import React from "react";

import UploadFile from "./UploadFile";

import "../styles/FileForm.css";

function PredOutput() {
    return (
        <div className="file-form-container">
            <h1 className="file-h1"> Upload your dataset </h1>
            <UploadFile className="upload-file" />
        </div>
    );
}

export default PredOutput;
