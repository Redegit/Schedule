import ModuleChoicer from "./ModuleChoicer/ModuleChoicer";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import "./Controls.scss"
import WeekSelector from "./WeekSelector/WeekSelector";
const Controls = ({ chosenModules, setChosenModules, setWeekShift, weekDates }) => {
    return (
        <div className="controls">
            <ThemeSwitcher />
            <ModuleChoicer chosenModules={chosenModules} setChosenModules={setChosenModules} />
            <WeekSelector {...{ setWeekShift, weekDates }} />
        </div>
    );
}

export default Controls;