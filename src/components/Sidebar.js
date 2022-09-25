import { useEffect, useRef, useState } from "react";
import tasks from "../pages/data/tasks";
import SideTask from "./SideTask";

const Sidebar = ({selectedDay, change, setChange}) => {
    const [sideTasks, setSideTasks] = useState([])
    const sidebarRef = useRef(null);

    const sortTasks = (a, b) => {
        if(a.year != b.year) return a.year - b.year;
        else if(a.month != b.month) return a.month - b.month;
        else if(a.day != b.day) return a.day - b.day;
        else if(a.time != b.time) return a.time > b.time ? 1 : -1;
        else return 1;
    }

    const getDateString = (obj) => {
        let year = obj.year;
        let month = obj.month >= 10 ? obj.month : "0" + obj.month;
        let day = obj.day >= 10 ? obj.day : "0" + obj.day;
        return year + "-" + month + "-" + day;
    }

    useEffect(() => {
        let newTasks = tasks.sort((a, b) => sortTasks(a, b));
        setSideTasks(newTasks);
        let firstTask = sideTasks.filter(task => getDateString(task) >= selectedDay)[0];
        let height = sideTasks.indexOf(firstTask) * 85;
        sidebarRef.current.scrollTo(0, height);
    })

    return (
        <div className="sidebar" ref={sidebarRef}>
            <h4>タスク一覧</h4>
            <div className="side-tasks">
                {sideTasks.map(task =>
                    <SideTask key={task.id} task={task} getDateString={getDateString} change={change} setChange={setChange} />
                )}
            </div>
        </div>
    );
}
 
export default Sidebar;