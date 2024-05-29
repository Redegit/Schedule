import { useEffect } from "react";
import "./IncludeOtherModulesCheckbox.scss";

const IncludeOtherModulesCheckbox = ({
  includeOtherModules,
  setIncludeOtherModules,
}) => {
  const handleCheckboxChange = (e) => {
    setIncludeOtherModules((value) => !value);
  };

  useEffect(() => {
    localStorage.setItem(
      "includeOtherModules",
      JSON.stringify(includeOtherModules)
    );
  }, [includeOtherModules]);

  return (
    <label className="include-other-modules border">
      <input
        onChange={handleCheckboxChange}
        type="checkbox"
        name="includeOtherModules"
        id="includeOtherModules"
        checked={includeOtherModules}
      />
      <span htmlFor="includeOtherModules">Показывать чужие</span>
    </label>
  );
};

export default IncludeOtherModulesCheckbox;
