const fs = require("fs");
const path = require("path");

const stdout = process.stdout;
const stdin = process.stdin;

stdout.write("введите текст\n");
const output = fs.createWriteStream(path.join(__dirname, "data.md"));
stdin.on("data", (data) => {
  const text = data.toString();
  if (text.trim() === 'exit') {
    process.exit();
  }  
  output.write(text);  
});
process.on("SIGINT", () => {
  process.exit(); 
});

process.on("exit", () => stdout.write("ну пока"));


