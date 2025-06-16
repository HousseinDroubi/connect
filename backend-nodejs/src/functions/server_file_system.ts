import fs from "fs";
import path from "path";
import { moveFileInterface } from "../interfaces/functions.interface";

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

const moveFile = ({ file_source, file_destination }: moveFileInterface) => {};

export { createFolder, createMainFolders };
