const fs = require('fs');
const fsPromises = require("fs/promises");
const path = require('path');

fsPromises.mkdir(path.join(__dirname, "files-copy"), { recursive: true });

function callback(err) {
  if (err) throw err;
  console.log("source.txt was copied to destination.txt");
}

const getFiles = async () => {
  try {
    const items = await fsPromises.readdir(path.join(__dirname, "files"));
    items.forEach((item) =>
      fs.copyFile(path.join(__dirname, "files", item), path.join(__dirname, "files-copy", item), callback)
    );
  } catch (err) {
    console.error(err);
  }
};
getFiles();