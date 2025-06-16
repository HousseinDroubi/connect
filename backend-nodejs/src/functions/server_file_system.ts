import path from "path";
import { moveFileInterface } from "../interfaces/functions.interface";
import fs_promises from "fs/promises";

const checkFileExistence = async (path: string): Promise<boolean> => {
  try {
    await fs_promises.access(path);
    return true;
  } catch (error) {
    return false;
  }
};

const createFolder = async (folder_path: string) => {
  if (!(await checkFileExistence(folder_path))) {
    await fs_promises.mkdir(folder_path);
  }
};

const createMainFolders = () => {
  const main_folders = ["temp", "public", "conversations"];

  main_folders.forEach((folder_name: string) => {
    const folder_path = path.join(__dirname, `../${folder_name}`);
    createFolder(folder_path);
  });
};

const moveFile = async ({
  file_source,
  file_destination,
}: moveFileInterface) => {
  await fs_promises.rename(file_source, file_destination);
};

export { createFolder, createMainFolders, moveFile };
