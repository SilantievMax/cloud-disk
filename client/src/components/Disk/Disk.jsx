import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir, getFiles, uploadFile } from "../../actions/file";
import FileList from "./FileList/FileList";
import "./Disk.css";
import Popup from "./Popup";
import { setCurrentDir, setPopupDisplay } from "../../reducers/fileReducer";
import { useState } from "react";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.files.currentDir);
    const dirStack = useSelector((state) => state.files.dirStack);
    const [dragEnter, setDragEnter] = useState(false);

    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir]);

    function showPopupHandler() {
        dispatch(setPopupDisplay("flex"));
    }

    function backClickHandler() {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    }

    function dragEnterHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(true);
    }

    function dragLeaveHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(false);
    }

    function dropHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        let files = [...e.dataTransfer.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));

        setDragEnter(false);
    }

    return !dragEnter ? (
        <div
            className="disk wrapper"
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
        >
            <div className="disk__btns">
                <button
                    onClick={() => backClickHandler()}
                    className="disk__back"
                >
                    Назад
                </button>
                <button
                    onClick={() => showPopupHandler()}
                    className="disk__create"
                >
                    Создать папку
                </button>
                <div className="disk__upload">
                    <label
                        htmlFor="disk__upload-input"
                        className="disk__upload-label"
                    >
                        Загрузить файл
                    </label>
                    <input
                        multiple={true}
                        type="file"
                        onChange={(event) => fileUploadHandler(event)}
                        id="disk__upload-input"
                        className="disk__upload-input"
                    />
                </div>
            </div>
            <FileList />
            <Popup />
        </div>
    ) : (
        <div className="wrapper">
            <div
                className="drop-area"
                onDrop={dropHandler}
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragEnterHandler}
            >
                Перетащите файл сюда
            </div>
        </div>
    );
};

export default Disk;
