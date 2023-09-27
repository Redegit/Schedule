import React, { useEffect } from "react";
import './LessonCard.scss'
import { useState } from "react";
import { LessonEditor } from "../LessonEditor/LessonEditor";

export const LessonCard = ({ lesson }) => {
  const [editorOpened, setEditorOpened] = useState(false);
  const [onCLickMousePos, setOnclickMousePos] = useState({ x: 0, y: 0 })

  const toggleEditor = (event) => {
    const x = event?.pageX
    const y = event?.pageY
    setOnclickMousePos({ x: x, y: y })
    setEditorOpened(!editorOpened)
  }

  // useEffect(() => {
  //   console.log(lesson);
  // }, [lesson]);

  const getLessonType = () => {
    switch (lesson.type) {
      case "Семинар": return "sem";
      case "Лекция": return "lec";
      case "Экзамен": return "exam";
      case "Зачет": return "test";
      default: return ""
    }
  }

  return (
    <div className={`lesson-card`}>
      <div className="time-container">
        <div className="time">{`${lesson.getStartTime()} - ${lesson.getEndTime()}`}</div>
      </div>

      <div onClick={(event) => toggleEditor(event)} className={`card-content ${getLessonType()}`}>
        <div className="title">{lesson.name}</div>
        <div className="classroom">{lesson.classroom}</div>
        <div className="teacher">{lesson.teacher}</div>
      </div>
      {editorOpened && <LessonEditor lesson={lesson} hideFunc={toggleEditor} mousePos={onCLickMousePos} />}
    </div>
  );
};
