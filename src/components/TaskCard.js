const TaskCard = ({task}) => {
    return (
        <div className={`task-card border-${task.color}`}>
            <p className="card-title"><strong>{task.title}</strong></p>
            <p>{task.year}年{task.month}月{task.day}日</p>
            <p>優先度: {task.priority}</p>
            <p>カテゴリー: {task.category}</p>
        </div>
    );
}
 
export default TaskCard;