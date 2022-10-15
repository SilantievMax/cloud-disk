import fs from "fs";
import { resolve } from "path";
import FileModel from "../models/File.js";
import config from "config";

class FileService {
    createDir(file) {
        const filePath = `${config.get("FILE_PATH")}\\${file.user}\\${
            file.path
        }`;
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                    return resolve({ message: "Файл создан" });
                } else {
                    return reject({ message: "Файл уже существует" });
                }
            } catch (err) {
                return reject({ message: "File error" });
            }
        }));
    }
}

export default new FileService();
