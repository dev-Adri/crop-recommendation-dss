import React from "react";
import axios from "axios";

import Form from "./components/Form";
import FileForm from "./components/Fileform";

import "./styles/App.css";

function App() {
    function handleSubmit(data) {
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
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <div className="page-container">
            <Form onSubmit={handleSubmit} />
            <FileForm />
            <h1 className="or">OR</h1>
        </div>
    );
}

export default App;