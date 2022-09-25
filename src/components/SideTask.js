import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SideTask = ({task, getDateString, change, setChange}) => {
    const [isToday, setIsToday] = useState(false);

    const achiveTask = (task) => {
        task.done = true;
        setChange(change + 1);
    }

    const unAchiveTask = (task) => {
        task.done = false;
        setChange(change - 1);
    }

    const deleteTask = (task) => {
        task.deleted = true;
        setChange(change + 1);
    }
    
    useEffect(() => {
        let today = new Date();
        let todayObj = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()}
        if(getDateString(todayObj) == getDateString(task)){
            setIsToday(true);
        }
    },[change])

    return (
        <div className="side-task-div">
            {!isToday && !task.deleted && 
                
                    <div className={`side-task border-${task.color} done-${task.done}`} key={task.id}>
                        <Link to={{ pathname: "/detail", state: {task: task}}}><p className={`done-${task.done}`}>{task.title}</p></Link>
                        <Link to={{ pathname: "/detail", state: {task: task}}}><p className={`done-${task.done}`}>{task.year}年{task.month}月{task.day}日</p></Link>
                        <Link to={{ pathname: "/detail", state: {task: task}}}><p className={`done-${task.done}`}>優先度: {task.priority}</p></Link>
                        <div className="side-actions">
                            {!task.done && <i onClick={() => achiveTask(task)} className="fa-regular fa-circle-check fa-xl"></i>}
                            {task.done && <i onClick={() => unAchiveTask(task)} className="fa-solid fa-rotate-left fa-xl"></i>}
                            <Link to={{ pathname: `/edit${task.id}`, state: {task: task}}}><i className={`fa-solid fa-pen-to-square fa-xl done-${task.done}`}></i></Link>
                            <i onClick={() => deleteTask(task)} className="fa-solid fa-trash fa-xl"></i>
                        </div>
                    </div>
                
            }
            {isToday && !task.deleted &&
                    <div className={`side-task border-${task.color} side-task-today done-${task.done}`} key={task.id}>
                        <Link to={{ pathname: "/detail", state: {task: task}}}><p className={`done-${task.done}`}>{task.title}</p></Link>
                        <Link to={{ pathname: "/detail", state: {task: task}}}><p className={`done-${task.done}`}>{task.year}年{task.month}月{task.day}日</p></Link>
                        <Link to={{ pathname: "/detail", state: {task: task}}}><p className={`done-${task.done}`}>優先度: {task.priority}</p></Link>
                        <div className="side-actions">
                            {!task.done && <i onClick={() => achiveTask(task)} className="fa-regular fa-circle-check fa-xl"></i>}
                            {task.done && <i onClick={() => unAchiveTask(task)} className="fa-solid fa-rotate-left fa-xl"></i>}
                            <Link to={{ pathname: `/edit${task.id}`, state: {task: task}}}><i className={`fa-solid fa-pen-to-square fa-xl done-${task.done}`}></i></Link>
                            <i onClick={() => deleteTask(task)} className="fa-solid fa-trash fa-xl"></i>
                        </div>
                    </div>
                
            }
        </div>
        
    );
}

export default SideTask;