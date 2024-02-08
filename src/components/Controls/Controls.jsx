import ModuleChoicer from "./ModuleChoicer/ModuleChoicer";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import "./Controls.scss"
import WeekSelector from "./WeekSelector/WeekSelector";
import Calendar from "./Calendar/Calendar";
const Controls = ({ chosenModules, setChosenModules, setWeekShift, weekDates }) => {
    return (
        <div className="controls">
            <WeekSelector {...{ setWeekShift, weekDates }} />
            {/* <Calendar /> */}
            <ModuleChoicer chosenModules={chosenModules} setChosenModules={setChosenModules} />
            <ThemeSwitcher />
        </div>
    );
}

export default Controls;