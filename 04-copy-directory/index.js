const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

const getFiles = async () => {
  try {
    const oldItmes = await fsPromises.readdir(
      path.join(__dirname, "files-copy")
    );
    await oldItmes.forEach((oldItem) =>
      fs.unlink(path.join(__dirname, "files-copy", oldItem), (err) => {
        if (err) console.error(err);
      })
    );
    const items = await fsPromises.readdir(path.join(__dirname, "files"));
    items.forEach((item) =>
      fs.copyFile(
        path.join(__dirname, "files", item),
        path.join(__dirname, "files-copy", item),
        (err) => {
          if (err) console.error(err);
        }
      )
    );
  } catch (err) {
    console.error(err);
  }
};

const makeDir = () => {
  fsPromises.mkdir(path.join(__dirname, "files-copy"), { recursive: true });
};

const init = async () => {
  await makeDir();
  getFiles();
};

init();
