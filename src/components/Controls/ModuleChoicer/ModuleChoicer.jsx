import Select from "react-select";
import { modules } from "../../../classes/Lesson";
import { useEffect, useState } from "react";
import "./ModuleChoicer.scss"

const ModuleChoicer = ({ chosenModules, setChosenModules }) => {
    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: 'var(--bg-dark)', borderColor: "var(--border-color)", cursor: "pointer", height: "3.5rem", borderRadius: "1rem", overflow: "hidden" }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? 'undefined'
                    : isSelected
                        ? data.color
                        : isFocused
                            ? "var(--bg-neutral)"
                            : "var(--bg-dark)",
                color: isDisabled
                    ? 'var(--font-gray)'
                    : isSelected
                        ? "var(--font-light)"
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'pointer',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : "var(--bg-neutral)"
                        : 'undefined',
                },
            };
        },
        input: (styles) => ({ ...styles }),
        placeholder: (styles) => ({ ...styles }),
        valueContainer: (styles) => ({ ...styles, overflow: "auto", height: "100%" }),
        singleValue: (styles, { data }) => ({ ...styles }),
        menu: (styles) => ({ ...styles, backgroundColor: "var(--bg-dark)" }),
        multiValue: (styles) => ({ ...styles, backgroundColor: "var(--bg-neutral)" }),
        multiValueLabel: (styles) => ({ ...styles, color: "var(--font-light)" })
    };

    useEffect(() => {
        localStorage.setItem('chosenModules', JSON.stringify(chosenModules));
    }, [chosenModules]);

    return (
        <div className="module-choicer">
            <Select
                options={modules.map(module => { return { label: module.name, value: module.name } })}
                isMulti={true}
                styles={colourStyles}
                defaultValue={chosenModules.map(module => { return { label: module, value: module } })}
                onChange={(selected) => setChosenModules(() => selected.map(module => module.value))}
                closeMenuOnSelect={false}
                placeholder={"Выберите модули..."}
            />
        </div>
    );
}

export default ModuleChoicer;