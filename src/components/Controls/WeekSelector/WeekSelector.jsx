
import "./WeekSelector.scss"

const WeekSelector = ({ weekShift, setWeekShift, weekDates }) => {

    const capitalize = (string) => {
        return string?.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="week-selector border">
            {weekDates && weekDates[0] && <div className="dates">
                {`${capitalize(weekDates[0].toLocaleString('ru', { month: "long" }))} ${weekDates[0].getDate()}-${weekDates[6].getDate()}`}
            </div>}
            <div className="arrows border">
                <div className="arrow left" onClick={() => { setWeekShift(weekShift => weekShift - 1) }} >{"<"}</div>
                <div className="arrow right" onClick={() => { setWeekShift(weekShift => weekShift + 1) }} >{">"}</div>
            </div>
        </div>
    );
}

export default WeekSelector;