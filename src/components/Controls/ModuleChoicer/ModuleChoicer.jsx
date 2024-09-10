import { useEffect } from "react";
import "./ModuleChoicer.scss";
import { modules } from "../../../classes/Data";
import IncludeOtherModulesCheckbox from "../IncludeOtherModulesCheckbox/IncludeOtherModulesCheckbox";
import { useGlobalContext } from "../../../hook/useGlobalContext";

const ModuleChoicer = () => {
  const {
    chosenModules,
    setChosenModules,
    includeOtherModules,
    setIncludeOtherModules,
  } = useGlobalContext();

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

  useEffect(() => {
    localStorage.setItem("chosenModules", JSON.stringify(chosenModules));
  }, [chosenModules]);

  return (
    <div className="module-choicer">
      <h3 className="module-list-title bottom-line">Выбор модулей</h3>
      <div className="module-list">
        {modules &&
          modules.map((module, index) => (
            <label
              htmlFor={`module-choice-checkbox-${index}`}
              key={index}
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
