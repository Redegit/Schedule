// ОТ КОМПОНЕНТА ОТКАЗАЛСЯ
import { useEffect, useState } from "react";
import "./LessonPopUp.scss";
import { useRef } from "react";

export const LessonPopUp = ({ lesson, hideFunc, mousePos }) => {
  const popupWindowRef = useRef(null);
  const [containerBackIsSolid, setContainerBackIsSolid] = useState(false);
  const [xShift, setXShift] = useState(0);
  const [yShift, setYShift] = useState(0);
  const [xCenter, setXCenter] = useState(0);
  const [yCenter, setYCenter] = useState(0);
  const [windowCentered, setWindowCentered] = useState(false);

  useEffect(() => {
    const handleEscapeDown = (event) => {
      if (event.code === "Escape") {
        hideFunc();
      }
    };
    document.addEventListener("keydown", handleEscapeDown);

    return () => {
      document.removeEventListener("keydown", handleEscapeDown);
    };
  }, []);

  useEffect(() => {
    if (popupWindowRef?.current) {
      setContainerBackIsSolid(true);

      const elWidth = popupWindowRef.current.offsetWidth;
      const elHeight = popupWindowRef.current.offsetHeight;

      setXShift(mousePos?.x - elWidth / 2);
      setYShift(mousePos?.y - elHeight / 2);

      let x_center = window.innerWidth / 2;
      let y_center = window.innerHeight / 2;

      setXCenter(x_center - elWidth / 2);
      setYCenter(y_center - elHeight / 2);

      setWindowCentered(true);
    }
  }, [popupWindowRef]);

  return (
    <span
      open={true}
      className={`lesson-popup-container ${
        containerBackIsSolid ? "blackout" : ""
      }`}
    >
      <div
        className="popup-hide-area"
        onClick={() => {
          hideFunc();
        }}
      ></div>

      <div
        ref={popupWindowRef}
        style={{
          "--starting-x": `${xShift}px`,
          "--starting-y": `${yShift}px`,
          "--center-x": `${xCenter}px`,
          "--center-y": `${yCenter}px`,
        }}
        className={`popup-window border ${
          windowCentered ? "popup-window-show" : ""
        }`}
      >
        <button
          className="close"
          onClick={() => {
            hideFunc();
          }}
        >
          {"x"}
        </button>
        <div className="head">
          <div className="name">{lesson.name}</div>
          <div className="time">{`${lesson.startTime} - ${lesson.endTime}`}</div>
          <div className="place">
            <div className="classroom">{lesson.classroom}</div>
            <div className="building">{lesson.building}</div>
          </div>
        </div>
        <div className="data">
          <Record label={"Тип"} value={lesson.type} />
          <Record label={"Преподаватель"} value={lesson.teacher} />
          <Record label={"Email"} value={lesson.teacherEmail} />
          <Record label={"Поток"} value={lesson.stream} />
          <Record label={"Замены"} value={lesson.replaces} />
          <Record label={"Модуль"} value={lesson.getModule()} />
          <Record label={"Группа"} value={lesson.group} />
        </div>
      </div>
    </span>
  );
};

const Record = ({ label, value }) => {
  return value ? (
    <div className="row">
      <span>{label + ":"}</span>
      <span>{value}</span>
    </div>
  ) : (
    <></>
  );
};
