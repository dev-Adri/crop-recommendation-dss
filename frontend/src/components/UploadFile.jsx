import React from "react";
import "../styles/UploadFile.css";

/**
 * Renders a file upload component that allows the user to select a dataset file and upload it.
 * The component displays a form with a file input and a submit button.
 * When the user selects a file and clicks the submit button, the file is uploaded.
 */
function UploadFile() {
    return (
        <div className="file-upload-container">
            <form>
                <label>
                    Select your dataset<br></br>
                    <input type="file" />
                </label>
                <button type="submit" className="upload-file-submit">
                    UPLOAD
                </button>
            </form>
        </div>
    );
}

export default UploadFile;
