import fs from "fs";
import path from "path";

const createFolder = (folder_path: string) => {
  if (!fs.existsSync(folder_path)) {
    fs.mkdirSync(folder_path);
  }
};

const createMainFolders = () => {
  const main_folders = ["temp", "public", "conversations"];

  main_folders.forEach((folder_name: string) => {
    const folder_path = path.join(__dirname, `../${folder_name}`);
    createFolder(folder_path);
  });
};

export { createFolder, createMainFolders };
