import { useEffect, useRef, useState } from "react";
import "./ModuleChoicer.scss";
import { modules } from "../../../classes/Lesson";
import IncludeOtherModulesCheckbox from "../IncludeOtherModulesCheckbox/IncludeOtherModulesCheckbox";

const ModuleChoicer = ({
  chosenModules,
  setChosenModules,
  includeOtherModules,
  setIncludeOtherModules,
}) => {
  const handleCheckboxClick = async (e) => {
    const name = e.target.name;
    if (e.target.checked === true) {
      return await setChosenModules((chosenModules) => [
        name,
        ...chosenModules,
      ]);
    } else {
      return await setChosenModules((chosenModules) =>
        chosenModules.filter((module) => module !== name)
      );
    }
  };

  return (
    <div className="module-choicer">
      <h3 className="module-list-title bottom-line">Выбор модулей</h3>
      <div className="module-list">
        {modules &&
          modules.map((module, index) => (
            <label
              htmlFor={`module-choice-checkbox-${index}`}
              className="module-list-item border"
            >
              <input
                className="module-checkbox"
                type="checkbox"
                name={module.name}
                id={`module-choice-checkbox-${index}`}
                checked={chosenModules.includes(module.name)}
                onChange={handleCheckboxClick}
              />
              <span className="module-name">{module.name}</span>
            </label>
          ))}
      </div>
      <div className="line"></div>
      <div className="button-container">
        <IncludeOtherModulesCheckbox
          includeOtherModules={includeOtherModules}
          setIncludeOtherModules={setIncludeOtherModules}
        />
        {/* <button type="button">Применить</button> */}
      </div>
    </div>
  );
};

export default ModuleChoicer;
