const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

const output = fs.createWriteStream(
  path.join(__dirname, "project-dist", "bundle.css")
);

const getFiles = async () => {
  try {
    const items = await fsPromises.readdir(path.join(__dirname, "styles"), {
      withFileTypes: true,
    });
    files = items.filter((item) => item.isFile() && path.extname(item.name) === '.css');
    files.forEach(file => {
     const stream = fs.createReadStream(path.join(__dirname, "styles", file.name), 'utf-8');
      stream.on("data", (partData) => output.write(partData));
    });
  } catch (err) {
    console.error(err);
  }
};

getFiles();