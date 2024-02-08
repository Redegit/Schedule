
import "./WeekSelector.scss"

const WeekSelector = ({ setWeekShift, weekDates }) => {
    return (
        <>
            <div className="arrows border">
                <Arrow className="arrow left" onClick={() => { setWeekShift(weekShift => weekShift - 1) }} />
                <Arrow className="arrow right" onClick={() => { setWeekShift(weekShift => weekShift + 1) }} />
            </div>
            <div className="week-selector border">
                {weekDates && weekDates[0] && <div className="dates">
                    {`${capitalize(weekDates[0].toLocaleString('ru', { month: "long" }))} ${weekDates[0].getDate()}-${weekDates[6].getDate()}`}
                </div>}
            </div>
        </>
    );
}

export default WeekSelector;

export const capitalize = (string) => {
    return string?.charAt(0).toUpperCase() + string.slice(1);
}

const Arrow = ({ className, onClick }) => {
    return (
        <div className={className} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path fill="var(--bg-light)" d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
            </svg>
        </div>
    )
}