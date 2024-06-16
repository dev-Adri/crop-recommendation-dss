import React, { useState } from "react";
import axios from "axios";

import Form from "./components/Form";
import PredOutput from "./components/PredOutput";

import "./styles/App.css";

function App() {
    const [visibility, setVisibility] = useState(false);
    const [output, setOutput] = useState("");
    const [readyCrop, setReadyCrop] = useState("");

    function handleSubmit(data) {
        setVisibility(true);
        setOutput("");
        const datastr = Object.entries(data).reduce(
            (acc, [_, value], index, arr) => {
                if (index === arr.length - 1) return acc + value;
                return acc + value + ",";
            },
            ""
        );

        axios
            .post("http://localhost:3000/predict", { datastr })
            .then((response) => {
                console.log("Success:", response.data);
                setVisibility(false);
                setOutput(response.data[0].key);
            })
            .catch((error) => {
                console.error("Error:", error);
                setVisibility(false);
            });
        // setVisibility(false);
    }

    function onCropClick(e) {
        setReadyCrop(e.target.name);
    }

    return (
        <div className="page-container">
            <button name="rice" className="rice" onClick={onCropClick}>
                RICE
            </button>
            <button name="banana" className="banana" onClick={onCropClick}>
                BANANA
            </button>
            <button name="apple" className="apple" onClick={onCropClick}>
                APPLE
            </button>
            <Form onSubmit={handleSubmit} readyCrop={readyCrop} />
            <PredOutput visibility={visibility} output={output} />
            {/* <FileForm />
            <h1 className="or">OR</h1> */}
        </div>
    );
}

export default App;
