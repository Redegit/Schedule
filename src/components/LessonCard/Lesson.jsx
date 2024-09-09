import { useState } from "react";
import { LessonPopUp } from "../LessonPopUp/LessonPopUp";

// FIXME не обновляются стили карточек при добавления модулей (остается класс other-module). При убирании все работает 
const Lesson = ({ lesson }) => {
  const [editorOpened, setEditorOpened] = useState(false);
  const [onCLickMousePos, setOnclickMousePos] = useState({ x: 0, y: 0 });

  const toggleEditor = (event) => {
    const x = event?.pageX;
    const y = event?.pageY;
    setOnclickMousePos({ x: x, y: y });
    setEditorOpened(!editorOpened);
  };

  const getLessonType = () => {
    switch (lesson.type) {
      case "Практические (семинарские) занятия":
        return "sem";
      case "Лекции":
        return "lec";
      case "Экзамен":
        return "exam";
      case "Экзамены":
        return "exam";
      case "Повторная промежуточная аттестация (экзамен)":
        return "exam";
      case "Зачет":
        return "test";
      case "Семинар+зачет":
        return "test";
      case "Повторная промежуточная аттестация (зачет)":
        return "test";
      case "Военная подготовка":
        return "mil";
      default:
        return "";
    }
  };

  return (
    <>
      <div
        onClick={(event) => toggleEditor(event)}
        className={`lesson ${getLessonType()} ${
          lesson.fromOtherModule ? "other-module" : ""
        }`}
      >
        <div className="title">{lesson.name}</div>
        <div className="classroom">{lesson.classroom}</div>
        <div className="teacher">{lesson.teacher}</div>
      </div>
      {editorOpened && (
        <LessonPopUp
          lesson={lesson}
          hideFunc={toggleEditor}
          mousePos={onCLickMousePos}
        />
      )}
    </>
  );
};

export default Lesson;
