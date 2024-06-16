import React from "react";
import { useState, useEffect } from "react";

import "../styles/Form.css";

function Form({ onSubmit, readyCrop }) {
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

    useEffect(() => {
        if (readyCrop.length > 0) {
            if (readyCrop === "rice") {
                setData({
                    f1: "90",
                    f2: "42",
                    f3: "43",
                    f4: "20.8",
                    f5: "82.0",
                    f6: "6.5",
                    f7: "202.9",
                });
            } else if (readyCrop === "banana") {
                setData({
                    f1: "91",
                    f2: "94",
                    f3: "46",
                    f4: "29.3",
                    f5: "76.2",
                    f6: "6.1",
                    f7: "92.8",
                });
            } else if (readyCrop === "apple") {
                setData({
                    f1: "24",
                    f2: "128",
                    f3: "192",
                    f4: "22.7",
                    f5: "90.6",
                    f6: "5.5",
                    f7: "110.4",
                });
            }
        }
    }, [readyCrop]);

    return (
        <div className="form-container">
            <h1>Enter your field data</h1>

            <form onSubmit={handleSubmit} className="data-form">
                <label className="data-label">
                    % of Nitrogen<br></br>
                    <input
                        type="text"
                        value={data.f1}
                        name="f1"
                        onChange={handleChange}
                        className="data-input"
                    ></input>
                </label>
                <label className="data-label">
                    % of Phosphorus<br></br>
                    <input
                        type="text"
                        value={data.f2}
                        name="f2"
                        onChange={handleChange}
                        className="data-input"
                    ></input>
                </label>
                <label className="data-label">
                    % of of Potassium<br></br>
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
