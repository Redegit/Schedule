import React, { useEffect, useRef, useState } from "react";
import "./WeekSelector.scss";
import Calendar from "../Calendar/Calendar";

const WeekSelector = ({ setWeekShift, weekDates }) => {
  const [calendarOpened, setCalendarOpened] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarOpened(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="arrows border">
        <Arrow
          className="arrow left"
          onClick={() => {
            setWeekShift((weekShift) => weekShift - 1);
          }}
        />
        <Arrow
          className="arrow right"
          onClick={() => {
            setWeekShift((weekShift) => weekShift + 1);
          }}
        />
      </div>

      <div className="week-selector border">
        {weekDates && weekDates[0] && (
          <div
            className="dates"
            onClick={() => setCalendarOpened((val) => !val)}
          >
            {`${capitalize(
              weekDates[0].toLocaleString("ru", { month: "long" })
            )} ${weekDates[0].getDate()}-${weekDates[6].getDate()}`}
            <CalendarIcon />
          </div>
        )}
        {calendarOpened && (
          <div className="calendar-container" ref={calendarRef}>
            <Calendar setWeekShift={setWeekShift} weekDates={weekDates} />
          </div>
        )}
      </div>
    </>
  );
};

export default WeekSelector;

export const capitalize = (string) => {
  return string?.charAt(0).toUpperCase() + string.slice(1);
};

const Arrow = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path
          fill="var(--bg-light)"
          d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
        />
      </svg>
    </div>
  );
};

const CalendarIcon = () => {
  return (
    <svg
      className="calendar-icon"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 9 4 L 9 5 L 5 5 L 5 27 L 27 27 L 27 5 L 23 5 L 23 4 L 21 4 L 21 5 L 11 5 L 11 4 Z M 7 7 L 9 7 L 9 8 L 11 8 L 11 7 L 21 7 L 21 8 L 23 8 L 23 7 L 25 7 L 25 9 L 7 9 Z M 7 11 L 25 11 L 25 25 L 7 25 Z M 13 13 L 13 15 L 15 15 L 15 13 Z M 17 13 L 17 15 L 19 15 L 19 13 Z M 21 13 L 21 15 L 23 15 L 23 13 Z M 9 17 L 9 19 L 11 19 L 11 17 Z M 13 17 L 13 19 L 15 19 L 15 17 Z M 17 17 L 17 19 L 19 19 L 19 17 Z M 21 17 L 21 19 L 23 19 L 23 17 Z M 9 21 L 9 23 L 11 23 L 11 21 Z M 13 21 L 13 23 L 15 23 L 15 21 Z M 17 21 L 17 23 L 19 23 L 19 21 Z" />
    </svg>
  );
};
