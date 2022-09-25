import { useEffect, useState } from "react";
import days from './data/days';
import categories from "./data/categories";
import tasks from "./data/tasks";
import { useHistory } from "react-router-dom";

const Create = ({currentId, setCurrentId}) => {
    const [title, setTitle] = useState("");
    const [years, setYears] = useState(["2021年", "2022年", "2023年"]);
    const [months, setMonths] = useState(["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]);
    const [monthDays, setMonthDays] = useState([]);
    const [hours, setHours] = useState(["1時", "2時", "3時", "4時", "5時", "6時", "7時", "8時", "9時", "10時", "11時", "12時"]);
    const [minutes, setMinutes] = useState([]);
    const [selectYear, setSelectYear] = useState(new Date().getFullYear() + "年");
    const [selectMonth, setSelectMonth] = useState((new Date().getMonth() + 1) + "月");
    const [selectDay, setSelectDay] = useState(new Date().getDate() + "日");
    const [selectHour, setSelectHour] = useState("1時");
    const [selectMin, setSelectMin] = useState("00分")
    const [amPm, setAmPm] = useState("AM");
    const [priority, setPriority] = useState("5");
    const [location, setLocation] = useState("");
    const [color, setColor] = useState("red");
    const [detail, setDetail] = useState("");
    const [category, setCategory] = useState("なし");
    const [newCategory, setNewCategory] = useState("");
    const history = useHistory();

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

    const createNewTask = (e) => {
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

        let newTask = {
            title: title,
            year: taskYear,
            month: taskMonth,
            day: taskDay,
            time: taskHour + ":" + taskMin,
            category: category,
            priority: taskPriority,
            color: color,
            location: location,
            detail: detail,
            done: false,
            deleted: false,
            id: currentId
        }
        
        tasks.push(newTask);
        setCurrentId(currentId + 1);
        history.push("/");
    }

    useEffect(() => {
        let date = new Date();
        getNumOfDays(date.getFullYear(), date.getMonth() + 1);

        let minuteArr = [];
        for(let i = 0; i <= 55; i+= 5){
            if(i < 10) {
                minuteArr.push("0" + i + "分");
            }
            else minuteArr.push(i.toString() + "分");
        }
        setMinutes(minuteArr);
    },[])

    return (
        <div className="create">
            <p>タスク作成</p>
            <div className={`create-box ${color}`}>
                <form onSubmit={(e) => createNewTask(e)}>
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
                        <textarea onChange={(e) => setLocation(e.target.value)}></textarea>
                    </div>
                    
                    <br />

                    <div className="input-textarea">
                        <label>詳細</label>
                        <textarea onChange={(e) => setDetail(e.target.value)}></textarea>
                    </div>

                    
                    <br />
                    <button className="create-btn" >新規作成</button>
                </form>
                
            </div>
        </div>
    );
}
 
export default Create;