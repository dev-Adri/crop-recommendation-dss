function filter(data) {
    const row = JSON.parse("[" + data + "]");

    // Updated to remove the last element from PROCESS, MIN, and MAX arrays
    const PROCESS = [true, true, true, true, true, true, true];
    const MIN = [
        0.0, 5.0, 5.0, 8.825674745, 14.25803981, 3.504752314, 20.21126747,
    ];
    const MAX = [
        140.0, 145.0, 205.0, 43.67549305, 99.98187601, 9.93509073, 298.5601175,
    ];
    const SCALE = 1.0;
    const TRANSLATION = 0.0;
    const result = new Array(row.length);

    // Adjust the loop to process elements only within the updated bounds of the arrays
    for (let n = 0; n < PROCESS.length; n++) {
        // Adjusted to PROCESS.length to avoid out-of-bounds access
        if (PROCESS[n] && row[n] !== null && row[n] !== undefined) {
            if (isNaN(MIN[n]) || MIN[n] === MAX[n]) {
                result[n] = 0; // Set to 0 if no range is defined or min and max are the same
            } else {
                result[n] =
                    ((row[n] - MIN[n]) / (MAX[n] - MIN[n])) * SCALE +
                    TRANSLATION;
            }
        } else {
            result[n] = row[n]; // Copy unprocessed values directly
        }
    }

    // Ensure the result array matches the length of the input row, removing last element handling
    return result.toString(); // Adjust result length to match the PROCESS array
}

module.exports = { filter };
