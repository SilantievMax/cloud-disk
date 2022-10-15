import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createDir } from "../../actions/file";
import { setCurrentDir, setPopupDisplay } from "../../reducers/fileReducer";
import Input from "../../utils/Input/Input";

const Popup = () => {
    const [dirName, setDirName] = useState("");
    const popupDisplay = useSelector((state) => state.files.popupDisplay);
    const dispatch = useDispatch();

    function createHandler() {
        dispatch(createDir(setCurrentDir, dirName));
    }

    return (
        <div className="popup" onClick={() => dispatch(setPopupDisplay('none'))} style={{ display: popupDisplay }}>
            <div onClick={(e => e.stopPropagation())} className="popup__content">
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <button onClick={() => dispatch(setPopupDisplay('none'))} className="popup__close">X</button>
                </div>
                <Input
                    type="text"
                    placeholder="Введите название папки..."
                    value={dirName}
                    setValue={setDirName}
                />
                <button onClick={() => createHandler()} className="popup__create">Создать</button>
            </div>
        </div>
    );
};

export default Popup;
