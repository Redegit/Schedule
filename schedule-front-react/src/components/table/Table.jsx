import { LessonCard } from "../LessonCard/LessonCard";
import { useState, useEffect } from 'react'

export const Table = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/template-lessons/?format=json", {
            method: 'GET'
        }
        ).then(response => {
            response.json()
                .then((data) => {
                    console.log(data);
                    setData(data)
                })
        })
    }, []);


    return (
        <div className="table_container">
            <div className="head">

            </div>
            <div className="column">
                <LessonCard />
            </div>

        </div>
    );
}
