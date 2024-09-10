import { createContext, useEffect, useState } from "react";
import { modules } from "../classes/Data";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") === "light" ? "light" : "dark"
  );

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
    }
  };

  const getSavedModules = () => {
    let selectedItems = JSON.parse(localStorage.getItem("chosenModules"));
    if (selectedItems) {
      return selectedItems;
    } else {
      return modules.map((module) => module.name);
    }
  };

  const getIncludeOtherModules = () => {
    let savedValue = JSON.parse(localStorage.getItem("includeOtherModules"));
    if (typeof savedValue === "boolean") {
      return savedValue;
    } else {
      return false;
    }
  };

  const [includeOtherModules, setIncludeOtherModules] = useState(
    getIncludeOtherModules()
  );
  const [chosenModules, setChosenModules] = useState(getSavedModules());

  useEffect(() => {
    const root = document.querySelector(":root");
    root.setAttribute("data-theme", `${theme === "dark" ? "dark" : "light"}`);
  }, [theme]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        toggleTheme,
        getSavedModules,
        getIncludeOtherModules,
        includeOtherModules,
        setIncludeOtherModules,
        chosenModules,
        setChosenModules,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
