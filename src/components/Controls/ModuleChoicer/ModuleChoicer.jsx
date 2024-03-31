import Select from "react-select";
import { modules } from "../../../classes/Lesson";
import { useEffect, useRef, useState } from "react";
import "./ModuleChoicer.scss";

const ModuleChoicer = ({ chosenModules, setChosenModules }) => {
  return (
    <>
      <div className="module-choicer">
        <Selector
          chosenModules={chosenModules}
          setChosenModules={setChosenModules}
        />
      </div>

      <MobileChoicer>
        <Selector
          chosenModules={chosenModules}
          setChosenModules={setChosenModules}
        />
      </MobileChoicer>
    </>
  );
};

export default ModuleChoicer;

const MobileChoicer = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  const choicerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (choicerRef.current && !choicerRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={choicerRef}
      className="module-choicer--mobile"
      data-expanded={expanded}
    >
      {expanded && children}
      <button
        className="expand-button border"
        aria-expanded={expanded}
        onClick={() => {
          setExpanded((val) => !val);
        }}
      >
        <svg
          stroke="var(--font-light)"
          fill="none"
          className="hamburger"
          viewBox="-10 -10 120 120"
        >
          <path
            className="line"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70"
          ></path>
        </svg>
      </button>
    </div>
  );
};

const Selector = ({ chosenModules, setChosenModules }) => {
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "var(--bg-dark)",
      borderColor: "var(--border-color)",
      cursor: "pointer",
      height: "3.5rem",
      borderRadius: "1rem",
      overflow: "hidden",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? "undefined"
          : isSelected
          ? data.color
          : isFocused
          ? "var(--bg-neutral)"
          : "var(--bg-dark)",
        color: isDisabled
          ? "var(--font-gray)"
          : isSelected
          ? "var(--font-light)"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "pointer",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : "var(--bg-neutral)"
            : "undefined",
        },
      };
    },
    input: (styles) => ({ ...styles }),
    placeholder: (styles) => ({ ...styles }),
    valueContainer: (styles) => ({
      ...styles,
      overflow: "auto",
      height: "100%",
    }),
    singleValue: (styles, { data }) => ({ ...styles }),
    menu: (styles) => ({ ...styles, backgroundColor: "var(--bg-dark)" }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: "var(--bg-neutral)",
    }),
    multiValueLabel: (styles) => ({ ...styles, color: "var(--font-light)" }),
  };

  useEffect(() => {
    localStorage.setItem("chosenModules", JSON.stringify(chosenModules));
  }, [chosenModules]);

  return (
    <Select
      options={modules.map((module) => {
        return { label: module.name, value: module.name };
      })}
      isMulti={true}
      styles={colourStyles}
      defaultValue={chosenModules.map((module) => {
        return { label: module, value: module };
      })}
      onChange={(selected) =>
        setChosenModules(() => selected.map((module) => module.value))
      }
      closeMenuOnSelect={false}
      placeholder={"Выберите модули..."}
    />
  );
};
