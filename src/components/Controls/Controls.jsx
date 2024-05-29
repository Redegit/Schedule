import ModuleChoicer from "./ModuleChoicer/ModuleChoicer";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import "./Controls.scss";
import WeekSelector from "./WeekSelector/WeekSelector";
const Controls = ({
  chosenModules,
  setChosenModules,
  setWeekShift,
  weekDates,
  includeOtherModules,
  setIncludeOtherModules,
}) => {
  return (
    <div className="controls">
      <ThemeSwitcher />
      <ModuleChoicer
        chosenModules={chosenModules}
        setChosenModules={setChosenModules}
        includeOtherModules={includeOtherModules}
        setIncludeOtherModules={setIncludeOtherModules}
      />
      <WeekSelector {...{ setWeekShift, weekDates }} />
    </div>
  );
};

export default Controls;
