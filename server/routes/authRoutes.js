import { Router } from "express";
import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import { check, validationResult } from "express-validator";
import authMiddleware from "../middleware/auth.middleware.js";

const router = new Router();

router.post(
    "/registration",
    [
        check("email", "Не верный Email").isEmail(),
        check(
            "password",
            "Пароль должен содержать от 3 до 16 символов"
        ).isLength({ min: 3, max: 16 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: "Ошибка при регистрации", errors });
            }

            const { email, password } = req.body;

            const candidate = await UserModel.findOne({ email });

            if (candidate) {
                return res.status(400).json({
                    message: `${email} - такой пользователь уже существует`,
                });
            }

            const hashPassword = await bcrypt.hash(password, 8);
            const user = new UserModel({ email, password: hashPassword });
            await user.save();
            return res.json({ message: "Пользователь создан!" });
        } catch (err) {
            console.log(err);
            res.send({ message: "Server error" });
        }
    }
);

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        const isPassValid = bcrypt.compareSync(password, user.password);
        if (!isPassValid) {
            return res.status(400).json({ message: "Пароль не верный" });
        }

        const token = jwt.sign({ id: user.id }, config.get("SECRET_KEY"), {
            expiresIn: "1h",
        });
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar,
            },
        });
    } catch (err) {
        console.log(err);
        res.send({ message: "Server error" });
    }
});

router.get("/auth", authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findOne({_id: req.user.id})
        const token = jwt.sign({ id: user.id }, config.get("SECRET_KEY"), {
            expiresIn: "1h",
        });
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar,
            },
        });
    } catch (err) {
        console.log(err);
        res.send({ message: "Server error" });
    }
});

export default router;
