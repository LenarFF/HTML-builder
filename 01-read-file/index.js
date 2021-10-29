const fs = require("fs");
const path = require("path");

const stream = fs.createReadStream(path.join(__dirname, "text.txt"), "UTF-8");
const stdout = process.stdout;

stream.on("data", (partData) => stdout.write(partData));
