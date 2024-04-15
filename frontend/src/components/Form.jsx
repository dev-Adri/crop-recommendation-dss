import React from "react";
import { useState } from "react";

import "../styles/Form.css";

function Form({ onSubmit }) {
    const [data, setData] = useState({
        f1: "",
        f2: "",
        f3: "",
        f4: "",
        f5: "",
        f6: "",
        f7: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        onSubmit(data);
    };

    return (
        <div className="form-container">
            <h1>Enter your field data</h1>

            <form onSubmit={handleSubmit} className="data-form">
                <label className="data-label">
                    N<br></br>
                    <input
                        type="text"
                        value={data.f1}
                        name="f1"
                        onChange={handleChange}
                        className="data-input"
                    ></input>
                </label>
                <label className="data-label">
                    P<br></br>
                    <input
                        type="text"
                        value={data.f2}
                        name="f2"
                        onChange={handleChange}
                        className="data-input"
                    ></input>
                </label>
                <label className="data-label">
                    K<br></br>
                    <input
                        type="text"
                        value={data.f3}
                        name="f3"
                        onChange={handleChange}
                        className="data-input"
                    ></input>
                </label>
                <label className="data-label">
                    Temperature<br></br>
                    <input
                        type="text"
                        value={data.f4}
                        name="f4"
                        onChange={handleChange}
                        className="data-input"
                    ></input>
                </label>
                <label className="data-label">
                    Humidity<br></br>
                    <input
                        type="text"
                        value={data.f5}
                        name="f5"
                        onChange={handleChange}
                        className="data-input"
                    ></input>
                </label>
                <label className="data-label">
                    PH<br></br>
                    <input
                        type="text"
                        value={data.f6}
                        name="f6"
                        onChange={handleChange}
                        className="data-input"
                    ></input>
                </label>
                <label className="data-label">
                    Rainfall<br></br>
                    <input
                        type="text"
                        value={data.f7}
                        name="f7"
                        onChange={handleChange}
                        className="data-input"
                    ></input>
                </label>

                <button type="submit" className="data-button">
                    RECOMMEND
                </button>
            </form>
        </div>
    );
}

export default Form;
