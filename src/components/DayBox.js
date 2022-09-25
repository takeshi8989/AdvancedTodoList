import { useEffect, useState } from "react";
import tasks from "../pages/data/tasks";
import DayTask from "./DayTask";

const DayBox = ({dayObj, filterWord, setSelectedDay}) => {
    const [taskArr, setTaskArr] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isToday, setIsToday] = useState(false);

    const getDateString = (obj) => {
        let year = obj.year;
        let month = obj.month >= 10 ? obj.month : "0" + obj.month;
        let day = obj.day >= 10 ? obj.day : "0" + obj.day;
        return year + "-" + month + "-" + day;
    }

    const isValidTask = (task) => {
        if(filterWord == "無") return true;
        else if(filterWord == "優先度5"){
            return task.priority >= 5;
        }
        else if(filterWord == "優先度3以上"){
            return task.priority >= 3;
        }
        else {
            return task.category == filterWord;
        }
    }

    const displayTasks = (dayObj) =>{
        setSelectedDay(getDateString(dayObj));
    }

    useEffect(() =>{
        let todaysTasks = tasks.filter(task => getDateString(task) == getDateString(dayObj));
        setTaskArr(todaysTasks.filter(task => isValidTask(task)));
        setIsToday(false);

        let date = new Date();
        let dateObj = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()}
        if(getDateString(dateObj) == getDateString(dayObj)){
            setIsToday(true);
        }

        fetch("https://holidays-jp.github.io/api/v1/date.json")
            .then(res => res.json())
            .then(data => {
                if(data[getDateString(dayObj)] != undefined){
                    setHolidays(data[getDateString(dayObj)]);
                }
                setIsLoading(false);
            })
    },[dayObj, filterWord])

    return (
        <div className={`day-box-${dayObj.type}`} onClick={() => displayTasks(dayObj)}>
            {!isToday && dayObj.type !== "curr" && <span>{dayObj.day}</span>}
            {!isToday && dayObj.type == "curr" && <span className={`color-${dayObj.id % 7}`}>{dayObj.day}</span>}
            {isToday  && <span className="today">{dayObj.day}</span>}

            {holidays.length > 0 && <span className="holiday"> {holidays}</span>}

            {!isLoading && taskArr.length <= 3 && 
                taskArr.map(task => <DayTask task={task} key={task.id} />
            )}

            {!isLoading && taskArr.length > 3 &&
                <div>
                    <DayTask task={taskArr[0]} />
                    <DayTask task={taskArr[1]} />
                    <div className="more-task">他 {taskArr.length - 2} 件</div>
                </div>
            }
        </div>
    );
}
 
export default DayBox;