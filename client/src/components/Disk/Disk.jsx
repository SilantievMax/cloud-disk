import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir, getFiles } from "../../actions/file";
import FileList from "./FileList/FileList";
import "./Disk.css";
import Popup from "./Popup";
import { setCurrentDir, setPopupDisplay } from "../../reducers/fileReducer";

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.files.currentDir);
    const dirStack = useSelector((state) => state.files.dirStack)

    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir]);

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'));
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    return (
        <div className="disk wrapper">
            <div className="disk__btns">
                <button onClick={() => backClickHandler()} className="disk__back">Назад</button>
                <button
                    onClick={() => showPopupHandler()}
                    className="disk__create"
                >
                    Создать папку
                </button>
            </div>
            <FileList />
            <Popup />
        </div>
    );
};

export default Disk;
