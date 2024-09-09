import Hamburger from "hamburger-react";
import { useState } from "react";
import "./Sidebar.scss";
import { modules } from "../../../classes/Lesson";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

const Sidebar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="sidebar" aria-expanded={isOpen}>
      <Hamburger toggled={isOpen} toggle={setOpen} size={25} />

      {isOpen && (
        <>
          <div className="sidebar-body border" aria-hidden={!isOpen}>
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
                      />
                      <span className="module-name">{module.name}</span>
                    </label>
                  ))}
              </div>
              <button className="apply" type="button"></button>
            </div>

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
