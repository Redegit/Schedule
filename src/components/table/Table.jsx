import { Lesson, modules } from "../../classes/Lesson";
import { LessonCard } from "../LessonCard/LessonCard";
import { useState, useEffect } from 'react'

import './Table.scss'
import axios from "axios";
import Controls from "../Controls/Controls";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export const Table = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [weekDates, setWeekDates] = useState([]);
    const [weekShift, setWeekShift] = useState(0);
    const [loadingScreen, setLoadingScreen] = useState(true);

    const getSavedModules = () => {
        let selectedItems = JSON.parse(localStorage.getItem('chosenModules'));
        if (selectedItems) {
            return selectedItems
        } else {
            return modules.map(module => module.name)
        }
    }

    const [chosenModules, setChosenModules] = useState(getSavedModules());

    const formatDateString = (date) => {

        let year = `${date.getFullYear()}`
        let month = date.getMonth() + 1
        if (month < 10) month = `0${month}`
        let day = date.getDate()
        if (day < 10) day = `0${day}`
        return `${year}.${month}.${day}`
    }

    useEffect(() => {
        const filterByModules = (data) => {
            return data.map(dow => dow.map(lessonGroup => lessonGroup.filter(lesson => chosenModules.includes(lesson?.getModule()))))
        }

        setFilteredData(() => filterByModules(data))
    }, [data, chosenModules]);

    const transformData = (data) => {
        let newData = [[], [], [], [], [], [], []];

        let prevLesson = { dayOfWeek: 0, lessonNumberStart: 0 }
        for (let les of data) {
            if (les.dayOfWeek === prevLesson.dayOfWeek && les.lessonNumberStart === prevLesson.lessonNumberStart) {
                let nLessons = newData[les.dayOfWeek - 1].length
                newData[les.dayOfWeek - 1][nLessons - 1].push(new Lesson(les))
            } else {
                newData[les.dayOfWeek - 1].push([new Lesson(les)])
            }
            prevLesson = les
        }
        return newData
    }

    const fetchData = async (start_date, end_date) => {
        try {
            start_date = formatDateString(start_date);
            end_date = formatDateString(end_date);

            const response = await axios.get(`http://localhost:3001/api/ruz/`, {
                params: {
                    start: start_date,
                    finish: end_date,
                    lng: 1,
                }
            });

            const data = transformData(response.data?.data);
            setData(data);
            setLoadingScreen(() => false)
        } catch (error) {
            console.log(error.stack);
        }
    };

    useEffect(() => {
        let current_date = new Date();
        let dayOW = current_date.getDay();

        let weekDates_tmp = [];
        for (let i = 1; i < 8; i++) {
            let tmp_date = new Date(current_date);
            let new_date = new Date(tmp_date.setDate(tmp_date.getDate() + i - dayOW + weekShift * 7));
            weekDates_tmp.push(new_date);
        }
        setLoadingScreen(() => true)
        fetchData(weekDates_tmp[0], weekDates_tmp[6])
        setWeekDates(weekDates_tmp);
    }, [weekShift])

    const compareDates = (date1, date2) => {
        date1 = new Date(date1);
        if (date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className="table_container">
            <Controls
                {...{
                    chosenModules,
                    setChosenModules,
                    weekShift,
                    setWeekShift,
                    weekDates
                }}
            />
            {loadingScreen ? <LoadingScreen />
                : <div className="table_body">
                    {weekDates && weekDates.map((day, index) => {
                        return <div key={index} className="column border">
                            <div className={`date ${compareDates(day, new Date()) ? 'date--current border' : ''}`}>{`${day.getDate()}`}</div>
                            <div className="column--content">
                                {filteredData[index] && filteredData[index].map((lessonGroup, index) => {
                                    if (lessonGroup.length > 0) {
                                        return <LessonCard key={index} lessonGroup={lessonGroup} />
                                    }
                                }
                                )}
                            </div>
                        </div>
                    })
                    }
                </div>
            }
        </div>
    );
}
