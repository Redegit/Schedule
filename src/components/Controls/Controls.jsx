import ModuleChoicer from "./ModuleChoicer/ModuleChoicer";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import "./Controls.scss"
import WeekSelector from "./WeekSelector/WeekSelector";
const Controls = ({ chosenModules, setChosenModules, weekShift, setWeekShift, weekDates }) => {
    return (
        <div className="controls">
            <ThemeSwitcher />
            <WeekSelector {...{ weekShift, setWeekShift, weekDates }} />
            <ModuleChoicer chosenModules={chosenModules} setChosenModules={setChosenModules} />
        </div>
    );
}

export default Controls;