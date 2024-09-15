import { useEffect, useState } from "react";
import "./Sidebar.scss";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import ModuleChoicer from "../ModuleChoicer/ModuleChoicer";
import SidebarToggle from "../SidebarToggle/SidebarToggle";

const Sidebar = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen((open) => !open);
  };

  useEffect(() => {
    const handleEscapeDown = (event) => {
      if (event.code === "Escape" && isOpen) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeDown);

    return () => {
      document.removeEventListener("keydown", handleEscapeDown);
    };
  }, [isOpen]);

  return (
    <div className="sidebar" aria-expanded={isOpen}>
      <SidebarToggle toggled={isOpen} toggle={toggleSidebar} />

      {isOpen && (
        <>
          <div className="sidebar-body border" aria-hidden={!isOpen}>
            <ModuleChoicer />
            <ThemeSwitcher className={"border"} />
          </div>
          <div
            className="blackout"
            onClick={() => setOpen(false)}
            aria-hidden={!isOpen}
          ></div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
