import fileService from "../services/fileService.js";
import config from "config";
import fs from "fs";
import UserModel from "../models/User.js";
import FileModel from "../models/File.js";

class fileController {
    async createDir(req, res) {
        try {
            const { name, type, parent } = req.body;
            const file = new FileModel({
                name,
                type,
                parent,
                user: req.user.id,
            });
            const parentFile = await FileModel.findOne({ _id: parent });
            if (!parentFile) {
                file.path = name;
                await fileService.createDir(file);
            } else {
                file.path = `${parentFile.path}\\${file.name}`;
                await fileService.createDir(file);
                parentFile.childs.push(file._id);
                await parentFile.save();
            }
            await file.save();
            return res.json(file);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    }

    async getFiles(req, res) {
        try {
            const files = await FileModel.find({
                user: req.user.id,
                parent: req.query.parent,
            });
            return res.json(files);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Файл не найден" });
        }
    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file;

            const parent = await FileModel.findOne({
                user: req.user.id,
                _id: req.body.parent,
            });
            const user = await UserModel.findOne({ _id: req.user.id });

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({ message: "На диске нет места" });
            }

            user.usedSpace = user.usedSpace + file.size;

            let path;
            if (parent) {
                path = `${config.get("FILE_PATH")}\\${user._id}\\${parent.path}\\${file.name}`;
            } else {
                path = `${config.get("FILE_PATH")}\\${user._id}\\${file.name}`;
            }

            if (fs.existsSync(path)) {
                return res.status(400).json({ message: "Файл уже существует" });
            }
            
            file.mv(path);

            const type = file.name.split(".").pop();
            const dbFile = new FileModel({
                name: file.name,
                type,
                size: file.size,
                path: parent?.path,
                parent: parent?._id,
                user: user._id,
            });

            await dbFile.save();
            await user.save();

            res.json(dbFile);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Upload error" });
        }
    }
}

export default new fileController();
