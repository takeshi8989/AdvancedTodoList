const DayTask = ({task}) => {
    return (
        <div className="day-task" style={{backgroundColor: task.color}}>
            <p>{task.title}</p>
        </div>
    );
}
 
export default DayTask;