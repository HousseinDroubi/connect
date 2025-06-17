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

const createMainFolders = async () => {
  const main_folders = ["temp", "public", "conversations"];
  for (let index = 0; index < main_folders.length; index++) {
    const folder_path = path.join(__dirname, `../${main_folders[index]}`);
    await createFolder(folder_path);
  }
};

const moveFile = async ({
  file_source,
  file_destination,
}: moveFileInterface) => {
  await fs_promises.rename(file_source, file_destination);
};

const readFile = async (path: string) => {
  return fs_promises.readFile(path, "utf-8");
};

const deleteFile = async (path: string): Promise<void> => {
  await fs_promises.unlink(path);
};

export { createFolder, createMainFolders, moveFile, readFile, deleteFile };
