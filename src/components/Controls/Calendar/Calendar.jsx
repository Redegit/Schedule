import {
  DateCalendar,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled } from "@mui/material/styles";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import "./Calendar.scss";

import "dayjs/locale/ru";

dayjs.extend(isBetweenPlugin);
dayjs.locale("ru");

const Calendar = ({ setWeekShift, weekDates }) => {
  const [hoveredDay, setHoveredDay] = React.useState(null);
  const [value, setValue] = React.useState(dayjs(weekDates[0]));

  const handleWeekChange = (value) => {
    setValue(value);

    function getMonday(date) {
      date = new Date(date);
      let day = date.getDay();
      let diff = date.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(new Date(date.setDate(diff)).setHours(0, 0, 0, 0));
    }

    var today = new Date();
    var mondayOfCurrentWeek = getMonday(today);

    var mondayOfSelectedWeek = getMonday(value);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    let weekDiff =
      (mondayOfSelectedWeek - mondayOfCurrentWeek) / millisecondsPerDay / 7;
    setWeekShift((val) => weekDiff);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} localeText={"ruRU"}>
      <DateCalendar
        className="calendar border"
        value={value}
        onChange={handleWeekChange}
        showDaysOutsideCurrentMonth
        // displayWeekNumber
        slots={{ day: Day }}
        slotProps={{
          day: (ownerState) => ({
            selectedDay: value,
            hoveredDay,
            onPointerEnter: () => setHoveredDay(ownerState.day),
            onPointerLeave: () => setHoveredDay(null),
          }),
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendar;

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
})(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary[theme.palette.mode],
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary[theme.palette.mode],
    },
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

const isInSameWeek = (dayA, dayB) => {
  if (dayB == null) {
    return false;
  }

  return dayA.isSame(dayB, "week");
};

function Day(props) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}
