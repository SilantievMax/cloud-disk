import fileService from "../services/fileService.js";
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
            return res.json( files );
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Файл не найден" });
        }
    }
}

export default new fileController();
