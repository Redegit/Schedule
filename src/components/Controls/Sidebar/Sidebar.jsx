import Hamburger from "hamburger-react";
import { useState } from "react";
import "./Sidebar.scss";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import ModuleChoicer from "../ModuleChoicer/ModuleChoicer";

const Sidebar = ({
  chosenModules,
  setChosenModules,
  includeOtherModules,
  setIncludeOtherModules,
}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="sidebar" aria-expanded={isOpen}>
      <Hamburger toggled={isOpen} toggle={setOpen} size={25} />

      {isOpen && (
        <>
          <div className="sidebar-body border" aria-hidden={!isOpen}>
            <ModuleChoicer
              {...{
                chosenModules,
                setChosenModules,
                includeOtherModules,
                setIncludeOtherModules,
              }}
            />
            <ThemeSwitcher />
          </div>
          <div
            className="background"
            onClick={() => setOpen(false)}
            aria-hidden={!isOpen}
          ></div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
