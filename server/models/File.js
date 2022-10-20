import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        accessLink: { type: String },
        size: { type: Number, default: 0 },
        path: { type: String, default: "" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        parent: { type: mongoose.Schema.Types.ObjectId, ref: "File" },
        childs: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("File", FileSchema);
