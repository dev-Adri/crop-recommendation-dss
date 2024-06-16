import React from "react";

import "../styles/PredOutput.css";

function PredOutput({ visibility, output }) {
    return (
        <div className="pred-output-container">
            {visibility ? (
                <div>
                    {/* <p> Loading ... </p> */}
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ) : null}
            {output ? (
                <div className="output-text">
                    <h1>
                        Recommended plant:
                        <div className="output-pred">
                            <u>{output}</u>
                        </div>
                    </h1>
                </div>
            ) : null}
        </div>
    );
}

export default PredOutput;
