const fsPromises = require("fs/promises");
const path = require("path");
const fs = require("fs");

const getFiles = async () => {
  try {
    const items = await fsPromises.readdir(
      path.join(__dirname, "secret-folder"),
      { withFileTypes: true }
    );
    files = items
      .filter((item) => item.isFile())
      .forEach((item) => {
        fs.stat(
          path.join(__dirname, "secret-folder", item.name),
          (err, stats) => {
            console.log(
              `${path.parse(item.name).name} - ${path.extname(item.name)} - ${
                stats.size
              }kb`
            );
          }
        );
      });
  } catch (err) {
    console.error(err);
  }
};
getFiles();
