const fs = require('fs');
const fsPromises = require("fs/promises");
const path = require('path');

fsPromises.mkdir(path.join(__dirname, "files-copy"), { recursive: true });


const getFiles = async () => {
  try {
    const items = await fsPromises.readdir(path.join(__dirname, "files"));
    items.forEach((item) =>
      fs.copyFile(path.join(__dirname, "files", item), path.join(__dirname, "files-copy", item), (err) => {
        if (err) console.error(err)
      })
    );
  } catch (err) {
    console.error(err);
  }
};
getFiles();