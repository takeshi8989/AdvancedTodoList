import { useEffect, useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

const TaskDetail = () => {
    const data = useLocation();
    const task = data.state.task;
    const [taskDone, setTaskDone] = useState("");
    const history = useHistory();

    const achiveTask = (task) => {
        task.done = true;
        setTaskDone("完了済み");
    }
    const unAchiveTask = (task) => {
        task.done = false;
        setTaskDone("未完了");
    }

    const deleteTask = (task) => {
        task.deleted = true;
        history.push("/");
    }

    const editTask = (task) => {
        console.log(task.title);
    }

    useEffect(() => {
        task.done ? setTaskDone("完了済み") : setTaskDone("未完了")
    })


    return (
        <div className="task-detail">
            <div className={`detail-box`} style={{borderColor: task.color}}>
                <h3>{task.title}</h3>
                <p>日付: {task.year}年{task.month}月{task.day}日</p>
                <p>時間: {task.time}</p>
                <p>{task.category}, 優先度: {task.priority}</p>
                {task.location != "" && <p>場所: {task.location}</p>}
                {task.location == "" && <p>場所: 指定なし</p>}
                {task.detail != "" && <p>詳細: {task.detail}</p>}
                {task.detail == "" && <p>詳細: なし</p>}
                <p>({taskDone})</p>
                {!task.done && <i onClick={() => achiveTask(task)} className="fa-regular fa-circle-check fa-xl"></i>}
                {task.done && <i onClick={() => unAchiveTask(task)} className="fa-solid fa-rotate-left fa-xl"></i>}
                <Link to={{ pathname: `/edit${task.id}`, state: {task: task}}}><i className="fa-solid fa-pen-to-square fa-xl"></i></Link>
                <i onClick={() => deleteTask(task)} className="fa-solid fa-trash fa-xl"></i>
            </div>
            
        </div>
    );
}
 
export default TaskDetail;