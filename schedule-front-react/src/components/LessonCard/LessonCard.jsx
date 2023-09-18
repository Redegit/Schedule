import React from "react";

export const LessonCard = ({ lesson }) => {
  return (
    <div className="lesson-card">
      <div className="time-container">
        <div className="time start"></div>
        <div className="time end"></div>
      </div>
      <div className="title">{lesson.name}</div>
      <div className="classroom">{lesson.classroom}</div>
      <div className="teacher">{lesson.teacher}</div>
    </div>
  );
};
