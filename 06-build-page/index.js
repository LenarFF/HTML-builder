const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

const createIndexHTML = () => {
  fs.readFile(
    path.join(__dirname, "template.html"),
    "utf-8",
    (err, template) => {
      if (err) console.error(err);
      const templateTags = template.match(/{{.+}}/gm);
      templateTags.map((tag) => {
        const tagName = tag.split("{")[2].split("}")[0];
        fs.readFile(
          path.join(__dirname, "components", `${tagName}.html`),
          "utf-8",
          (err, componentData) => {
            if (err) console.error(err);
            template = template.replace(tag, componentData);
            fs.writeFile(
              path.join(__dirname, "project-dist", "index.html"),
              template,
              (err) => {
                if (err) console.error(err);
              }
            );
          }
        );
      });
    }
  );
};

const createStyleCss = async () => {
  const output = fs.createWriteStream(
    path.join(__dirname, "project-dist", "style.css")
  );
  try {
    const items = await fsPromises.readdir(path.join(__dirname, "styles"), {
      withFileTypes: true,
    });
    files = items.filter(
      (item) => item.isFile() && path.extname(item.name) === ".css"
    );
    files.forEach((file) => {
      const stream = fs.createReadStream(
        path.join(__dirname, "styles", file.name),
        "utf-8"
      );
      stream.on("data", (partData) => output.write(partData));
    });
  } catch (err) {
    console.error(err);
  }
};

const copyFiles = async (oldPath, newPath) => {
  try {
    const items = await fsPromises.readdir(oldPath, {
      withFileTypes: true,
    });

    items.forEach(async (item) => {
      if (item.isDirectory()) {
        await fsPromises.mkdir(path.join(newPath, item.name), {
          recursive: true,
        });
        copyFiles(path.join(oldPath, item.name), path.join(newPath, item.name));
      } else {
        fs.copyFile(
          path.join(oldPath, item.name),
          path.join(newPath, item.name),
          (err) => {
            if (err) console.error(err);
          }
        );
      }
    });
  } catch (err) {
    console.error(err);
  }
};

const createDir = async () => {
  await fsPromises.mkdir(path.join(__dirname, "project-dist"), {
    recursive: true,
  });
  await fsPromises.mkdir(path.join(__dirname, "project-dist", "assets"), {
    recursive: true,
  });
  createStyleCss();
  createIndexHTML();
  copyFiles(
    path.join(__dirname, "assets"),
    path.join(__dirname, "project-dist", "assets")
  );
};

createDir();
