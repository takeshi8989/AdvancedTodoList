

import { useEffect, useState } from "react";
import days from './data/days';
import categories from "./data/categories";
import tasks from "./data/tasks";
import { useHistory, useLocation } from "react-router-dom";

const Edit = () => {
    const data = useLocation();
    const task = data.state.task;

    const [title, setTitle] = useState(task.title);
    const [years, setYears] = useState(["2021年", "2022年", "2023年"]);
    const [months, setMonths] = useState(["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]);
    const [monthDays, setMonthDays] = useState([]);
    const [hours, setHours] = useState(["1時", "2時", "3時", "4時", "5時", "6時", "7時", "8時", "9時", "10時", "11時", "12時"]);
    const [minutes, setMinutes] = useState([]);
    const [selectYear, setSelectYear] = useState(task.year + "年");
    const [selectMonth, setSelectMonth] = useState(task.month + "月");
    const [selectDay, setSelectDay] = useState(task.day + "日");
    const [selectHour, setSelectHour] = useState("");
    const [selectMin, setSelectMin] = useState("")
    const [amPm, setAmPm] = useState("");
    const [priority, setPriority] = useState(task.priority.toString());
    const [location, setLocation] = useState(task.location);
    const [color, setColor] = useState(task.color);
    const [detail, setDetail] = useState(task.detail);
    const [category, setCategory] = useState(task.category);
    const [newCategory, setNewCategory] = useState("");
    const history = useHistory();
    const [taskDone, setTaskDone] = useState(task.done);

    const getNumOfDays = (year, month) =>{
        let newDays = days.filter(day => parseInt(year) == day.year && parseInt(month) == day.month)[0].day;
        let newArray = [];
        for(let i = 1; i <= newDays; i++){
            newArray.push(i + "日");
        }
        setMonthDays(newArray);
    }

    const addCategory = (e) => {
        e.preventDefault();
        if(newCategory == "") return;
        else if(categories.includes(newCategory)){
            alert("同じ名前のカテゴリーは追加できません");
            setNewCategory("");
        }
        else{
            categories.push(newCategory);
            setNewCategory("");
        }
    }

    const editTask = (e) => {
        e.preventDefault();

        let taskYear = parseInt(selectYear.substring(0, 4));
        let taskMonth = selectMonth.length >= 3 ? 
            parseInt(selectMonth.substring(0, 2)) : parseInt(selectMonth.charAt(0));
        let taskDay = selectDay.length >= 3 ? 
            parseInt(selectDay.substring(0, 2)) : parseInt(selectDay.charAt(0));
        let taskHour;
        if(amPm == "AM"){
            taskHour = selectHour.length >= 3 ? selectHour.substring(0, 2) : "0" + selectHour.charAt(0);
        }
        else{
            taskHour = selectHour.length >= 3 ? (parseInt(selectHour.substring(0, 2)) + 12).toString() : 
                (parseInt(selectHour.substring(0, 1)) + 12).toString();
        }
        let taskMin = selectMin.substring(0, 2);
        let taskPriority = parseInt(priority);

        task.year = taskYear;
        task.month = taskMonth;
        task.day = taskDay;
        task.time = taskHour + ":" + taskMin;
        task.category = category;
        task.priority = taskPriority;
        task.color = color;
        task.location = location;
        task.detail = detail;
        history.push("/");
    }

    const achiveTask = (task) => {
        task.done = true;
        setTaskDone(true);
    }
    const unAchiveTask = (task) => {
        task.done = false;
        setTaskDone(false);
    }

    useEffect(() => {
        let date = new Date();
        getNumOfDays(task.year, task.month);

        let minuteArr = [];
        for(let i = 0; i <= 55; i+= 5){
            if(i < 10) {
                minuteArr.push("0" + i + "分");
            }
            else minuteArr.push(i.toString() + "分");
        }
        setMinutes(minuteArr);

        if(task.time.substring(0, 2).charAt(0) == 0){
            setSelectHour(task.time.substring(1,2) + "時");
            setAmPm("AM")
        }
        else if(parseInt(task.time.substring(0, 2)) < 13){
            setSelectHour(task.time.substring(0, 2) + "時");
            setAmPm("AM");
        }
        else{
            setSelectHour(parseInt(task.time.substring(0, 2)) - 12 + "時");
            setAmPm("PM");
        }
        setSelectMin(task.time.substring(3) + "分");
    },[])

    return (
        <div className="create">
            <p>タスク編集</p>
            <div className={`edit-box ${color}`}>
                <form onSubmit={(e) => editTask(e)}>
                    <input required value={title} onChange={(e) => setTitle(e.target.value)}
                            type="text" placeholder="タイトル" className="input-title" /><br></br>
                    <i className="fa-regular fa-clock fa-xl"></i>


                    <select className="input-year" value={selectYear} onChange={(e) =>{
                        setSelectYear(e.target.value);
                        getNumOfDays(e.target.value, selectMonth);
                    }}>
                        {years.map(year =>
                            <option value={year} key={year}>{year}</option>
                        )}
                    </select>
                    <select className="input-month" value={selectMonth} onChange={(e) =>{
                        setSelectMonth(e.target.value);
                        getNumOfDays(selectYear, e.target.value);
                    }}>
                        {months.map(month => 
                            <option value={month} key={month}>{month}</option>
                        )}
                    </select>
                    <select className="input-day" value={selectDay} onChange={(e) => setSelectDay(e.target.value)}>
                        {monthDays.map(day =>
                            <option value={day} key={day}>{day}</option>
                        )}
                    </select>
                    <select className="input-ampm" value={amPm} onChange={(e) => setAmPm(e.target.value)}>
                        <option value="AM">午前</option>
                        <option value="PM">午後</option>
                    </select>
                    <select className="input-hour" value={selectHour} onChange={(e) => setSelectHour(e.target.value)}>
                        {hours.map(hour =>
                            <option value={hour} key={hour}>{hour}</option>
                        )}
                    </select>
                    <select className="input-min" value={selectMin} onChange={(e) => setSelectMin(e.target.value)}>
                        {minutes.map(min =>
                            <option value={min} key={min}>{min}</option>
                        )}
                    </select>
                    <br></br>
                    <label>カテゴリー</label>
                    <select className="select-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">なし</option>
                            {categories.map(category => 
                                <option value={category} key={category}>{category}</option>
                            )}
                    </select>
                    <input className="input-category" type="text" placeholder="新しいカテゴリー"
                            value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                    <button className="category-btn" onClick={(e) => addCategory(e)}>追加</button>
                    <br />

                    <label>優先度</label>
                    <select className="input-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <br />

                    <label>色</label>
                    <select value={color} onChange={(e) => setColor(e.target.value)} className={`bg-${color}`}>
                        <option value="red" className="bg-red"> </option>
                        <option value="blue" className="bg-blue"> </option>
                        <option value="green" className="bg-green"> </option>
                        <option value="gold" className="bg-gold"> </option>
                    </select>

                    <br />
                    <div className="input-textarea">
                        <label>場所 </label>
                        <textarea value={location} onChange={(e) => setLocation(e.target.value)}></textarea>
                    </div>
                    
                    <br />

                    <div className="input-textarea">
                        <label>詳細</label>
                        <textarea value={detail} onChange={(e) => setDetail(e.target.value)}></textarea>
                    </div>
                    <br />
                    {!taskDone && <p>完了済みにする<i onClick={() => achiveTask(task)} className="fa-regular fa-circle-check fa-xl"></i></p>}
                    {taskDone && <p>完了済みを取り消す<i onClick={() => unAchiveTask(task)} className="fa-solid fa-rotate-left fa-xl"></i></p>}
                    <br />
                    <button className="create-btn">編集</button>
                </form>
                
            </div>
        </div>
    );
}
 
export default Edit;