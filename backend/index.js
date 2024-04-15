const express = require("express");
const cors = require("cors");

const predict = require("./src/predict");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/predict", async (req, res) => {
    console.log("Request:", req.body.datastr);

    const prediction = await predict.predict(req.body.datastr);

    res.send(prediction);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
