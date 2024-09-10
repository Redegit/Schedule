import "./Controls.scss";
import WeekSelector from "./WeekSelector/WeekSelector";
import Sidebar from "./Sidebar/Sidebar";
const Controls = ({ setWeekShift, weekDates }) => {
  return (
    <div className="controls">
      <Sidebar />
      {/* 
      <ModuleChoicer
        chosenModules={chosenModules}
        setChosenModules={setChosenModules}
        includeOtherModules={includeOtherModules}
        setIncludeOtherModules={setIncludeOtherModules}
      /> */}
      <WeekSelector {...{ setWeekShift, weekDates }} />
    </div>
  );
};

export default Controls;
