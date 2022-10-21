import React from "react";
import { useDispatch, useSelector } from "react-redux";
import fileLogo from "../../../../assets/svg/file.svg";
import dirLogo from "../../../../assets/svg/folder.svg";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
import "./File.css";

const File = ({ file }) => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.files.currentDir);

    function openDirHandler(file) {
        if (file.type === "dir") {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }

    return (
        <div onClick={() => openDirHandler(file)} className="file">
            <img
                src={file.type === "dir" ? dirLogo : fileLogo}
                alt="file"
                className="file__img"
            />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.createdAt.slice(0, 10)}</div>
            <div className="file__size">{file.size}</div>
        </div>
    );
};

export default File;
