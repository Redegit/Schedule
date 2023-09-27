import { Lesson } from "../../classes/Lesson";
import { LessonCard } from "../LessonCard/LessonCard";
import { useState, useEffect } from 'react'

import './Table.scss'
import { Button } from "../Button/Button";

export const Table = () => {
    const [data, setData] = useState([]);
    const [weekDates, setWeekDates] = useState([]);
    const [weekShift, setWeekShift] = useState(0);

    const transformData = (data) => {
        let resultData = {}

        data.forEach((item) => {
            const startDate = new Date(item.start_dt).getDate();

            if (resultData[startDate]) {
                resultData[startDate].push(item)
            } else {
                resultData[startDate] = [item];
            }
        });


        return resultData;
    }

    const fetchData = (start_date, end_date) => {
        fetch(`http://127.0.0.1:8000/api/template-lessons/?format=json&start_date=${start_date}&end_date=${end_date}`, {
            method: 'GET'
        }
        ).then(response => {
            response.json()
                .then((data) => {
                    const transformed_data = transformData(data);
                    setData(transformed_data)
                })
        })
    };

    useEffect(() => {
        let current_date = new Date();
        let dayOW = current_date.getDay();

        let weekDates_tmp = [];
        for (let i = 1; i < 8; i++) {
            let tmp_date = new Date(current_date);
            let new_date = new Date(tmp_date.setDate(tmp_date.getDate() + i - dayOW + weekShift * 7 - 7));
            weekDates_tmp.push(new_date);
        }
        fetchData(weekDates_tmp[0].toISOString().slice(0, 10), weekDates_tmp[weekDates_tmp.length - 1].toISOString().slice(0, 10))
        setWeekDates(weekDates_tmp);
    }, [])

    const formatDate = (date) => {
        return `${date.getDate()}`
    }

    const compareDates = (date1, date2) => {
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
            <div className="head">
            </div>
            <div className="table_body">
                {weekDates && weekDates.map((day, index) =>
                    <div key={index} className="column border">
                        <div className={`date ${compareDates(day, new Date()) ? 'date--current border' : ''}`}>{formatDate(day)}</div>
                        <div className="column--content">
                            {data[formatDate(day)] && data[formatDate(day)].map((les, index) =>
                                <LessonCard key={index} lesson={new Lesson(les)} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
