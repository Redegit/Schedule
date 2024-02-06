// ОТ КОМПОНЕНТА ОТКАЗАЛСЯ
import { useEffect, useState } from "react";
import "./LessonEditor.scss"
import { useRef } from "react";
import { Button } from "../Button/Button";
import { Dropdown } from "../Common/Dropdown/Dropdown";


export const LessonEditor = ({ lesson, hideFunc, mousePos }) => {
    const [editable, setEditable] = useState(false);
    const [inputData, setInputData] = useState({});
    const editorWindowRef = useRef(null);
    const [containerBackIsSolid, setContainerBackIsSolid] = useState(false)
    const [xShift, setXShift] = useState(0)
    const [yShift, setYShift] = useState(0)
    const [xCenter, setXCenter] = useState(0)
    const [yCenter, setYCenter] = useState(0)
    const [windowCentered, setWindowCentered] = useState(false)

    const resetInputs = () => {
        document.querySelectorAll('.data input').forEach(input => input.value = input.defaultValue);
    }

    const resetDefault = () => {
        document.querySelectorAll('.data input').forEach(input => input.defaultValue = lesson[input.name]);
    }

    const handleEditButton = () => {
        if (editable) {
            resetInputs()
        }
        setEditable(!editable)
    }

    const handleChange = (e) => {
        console.log(e);
        // setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const handleEscapeDown = (event) => {
            if (event.code === "Escape") {
                hideFunc();
            }
        }
        document.addEventListener("keydown", handleEscapeDown)

        return () => {
            document.removeEventListener("keydown", handleEscapeDown);
        };
    }, []);

    useEffect(() => {
        if (editorWindowRef?.current) {
            setContainerBackIsSolid(true);

            const elWidth = editorWindowRef.current.offsetWidth;
            const elHeight = editorWindowRef.current.offsetHeight;

            setXShift(mousePos?.x - elWidth / 2);
            setYShift(mousePos?.y - elHeight / 2);

            let x_center = window.innerWidth / 2;
            let y_center = window.innerHeight / 2;

            setXCenter(x_center - elWidth / 2);
            setYCenter(y_center - elHeight / 2);

            setWindowCentered(true);
        }
    }, [editorWindowRef]);

    // const handleDrag = (e) => {
    //     e.preventDefault();
    //     // console.log(e);
    //     if (editorWindowRef?.current && e.clientX !== 0 && e.clientY !== 0) {
    //         const elWidth = editorWindowRef.current.offsetWidth;
    //         const elHeight = editorWindowRef.current.offsetHeight;

    //         let dragPosX = e.clientX;
    //         let dragPosY = e.clientY;

    //         setXCenter(dragPosX - elWidth / 2);
    //         setYCenter(dragPosY - elHeight / 2);
    //     }
    // }
    return (
        <div className={`lesson-editor-container ${containerBackIsSolid ? 'lesson-editor-container-filled' : ''}`}>
            <div className="editor-hide-area" onClick={() => { hideFunc() }}></div>

            <div ref={editorWindowRef} style={{
                '--starting-x': `${xShift}px`,
                '--starting-y': `${yShift}px`,
                '--center-x': `${xCenter}px`,
                '--center-y': `${yCenter}px`,
            }} className={`editor-window border ${windowCentered ? 'editor-window-show' : ''}`}>
                <div className="data">
                    <div className="row">
                        <label>{`Название:`}</label>
                        <input title="Название пары" className="input" type="text" name="name" defaultValue={lesson.name} readOnly={!editable} onChange={handleChange} />
                    </div>
                    <div className="row">
                        <label>{`Кабинет:`}</label>
                        <input title="Номер и адрес кабинета" className="input" type="text" name="classroom" defaultValue={lesson.classroom} readOnly={!editable} onChange={handleChange} />
                    </div>
                    <div className="row">
                        <label>{`Преподаватель:`}</label>
                        <input title="Ссылка на преподавателя" className="input" type="text" name="teacher" defaultValue={lesson.teacher} readOnly={!editable} onChange={handleChange} />
                    </div>
                    <div className="row">
                        <label>{`Начало:`}</label>
                        <input title="Время начала пары" className="input" type="time" name="start_dt" defaultValue={lesson.getStartTime()} readOnly={!editable} onChange={handleChange} />
                    </div>
                    <div className="row">
                        <label>{`Окончание:`}</label>
                        <input title="Время конца пары" className="input" type="time" name="end_dt" defaultValue={lesson.getEndTime()} readOnly={!editable} onChange={handleChange} />
                    </div>
                    <div className="row">
                        <label>{`Преподаватель:`}</label>
                        {/* <input title="Ссылка на преподавателя" className="input" type="text" name="teacher" defaultValue={lesson.teacher} readOnly={!editable} onChange={handleChange} /> */}
                        <Dropdown
                            placeHolder='1'
                            options={[
                                { name: '1', value: "1" },
                                { name: '2', value: "2" }
                            ]}
                            handleChoice={handleChange}
                            active={editable}
                        />
                    </div>
                </div>
                <div className="controls">
                    <Button type='button' onClick={() => handleEditButton()}>{editable ? "Отмена" : "Редактировать"}</Button>
                    {editable && <Button type='submit'>Сохранить</Button>}
                </div>
            </div>
        </div>
    );
}
