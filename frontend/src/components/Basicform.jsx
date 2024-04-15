import React, { useState } from "react";
import axios from "axios";

function BasicForm() {
    const [data, setData] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        axios
            .post("http://localhost:3000/predict", { data })
            .then((response) => {
                console.log("Success:", response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="data">Data</label>
                <input
                    type="text"
                    id="data"
                    value={data}
                    onChange={(e) => setData(e.target.value)} // Update state on input change
                />

                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default BasicForm;
