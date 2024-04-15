const { exec } = require("child_process");
const fs = require("fs");
const util = require("util");

const blueprint = `@relation Crop_recommendation
@attribute n REAL
@attribute p REAL
@attribute k REAL
@attribute temperature REAL
@attribute humidity REAL
@attribute ph REAL
@attribute rainfall REAL
@attribute label {apple,banana,blackgram,chickpea,coconut,coffee,cotton,grapes,jute,kidneybeans,lentil,maize,mango,mothbeans,mungbean,muskmelon,orange,papaya,pigeonpeas,pomegranate,rice,watermelon}

@data\n`;

const execp = util.promisify(exec);

async function predict(data) {
    await fs.promises.writeFile(
        "userin.arff",
        blueprint + data + ",?",
        "utf-8"
    );

    const test = `java --add-opens java.base/java.lang=ALL-UNNAMED -cp ".;weka.jar" predictor test userin.arff`;

    try {
        const { stderr, err } = await execp(test);
        const predictionFile = await fs.promises.readFile(
            "predictions.txt",
            "utf-8"
        );
        const prediction = predictionFile.trim().split("\n");

        var obj = [];

        for (var i = 0; i < prediction.length; i++) {
            obj.push({
                key: prediction[i].split(":")[0],
                value: parseFloat(
                    prediction[i].split(":")[1].slice(0, -1)
                ).toFixed(2),
            });
        }
        console.log("Prediction succesful");

        return obj;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { predict };
