import React from "react";
import { useDispatch } from "react-redux";
import fileLogo from "../../../../assets/svg/file.svg";
import dirLogo from "../../../../assets/svg/folder.svg";
import { setCurrentDir } from "../../../../reducers/fileReducer";
import "./File.css";

const File = ({ file }) => {
    const dispatch = useDispatch();

    function openDirHandler() {
        dispatch(setCurrentDir(file._id));
    }

    return (
        <div onClick={() => openDirHandler()} className="file">
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