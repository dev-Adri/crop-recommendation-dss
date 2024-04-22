import React, { useState } from "react";
import axios from "axios";

import Form from "./components/Form";
import FileForm from "./components/Fileform";
import PredOutput from "./components/PredOutput";

import "./styles/App.css";

function App() {
    const [visibility, setVisibility] = useState(false);
    const [output, setOutput] = useState("");

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

    return (
        <div className="page-container">
            <Form onSubmit={handleSubmit} />
            <PredOutput visibility={visibility} output={output} />
            {/* <FileForm />
            <h1 className="or">OR</h1> */}
        </div>
    );
}

export default App;
