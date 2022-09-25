import { useEffect, useState } from "react";
import days from "../pages/data/days.js";
import DayBox from "./DayBox.js";

const Calendar = ({ setMAndY, filterWord, setSelectedDay }) => {
    const [month, setMonth] = useState(null);
    const [array, setArray] = useState([]);

    const handleBack = () => {
        if(month <= 0) return;
        setMonth(month - 1);
        setMAndY(days[month - 1].year + "年" + days[month - 1].month + "月");
        createArr(month - 1);
    }

    const handleForward = () => {
        if(month >= 35) return;
        setMonth(month + 1);
        setMAndY(days[month + 1].year + "年" + days[month + 1].month + "月");
        createArr(month + 1);
    }

    const createArr = (nMonth) => {
        let arr = [];
        let begin = days[nMonth].prevEnd - days[nMonth].start + 1;
        for(let i = begin; i <= days[nMonth - 1].prevEnd; i++){
            arr.push({day: i, type:"prev", year: days[nMonth - 1].year, month: days[nMonth - 1].month, id: arr.length});
        }
        for(let i = 1; i <= days[nMonth].day; i++){
            arr.push({day: i, type:"curr", year: days[nMonth].year, month: days[nMonth].month, id: arr.length});
        }
        let n = 1;
        while(arr.length % 7 != 0){
            arr.push({day: n, type: "next", year: days[nMonth + 1].year, month: days[nMonth + 1].month, id: arr.length});
            n++;
        }
        setArray(arr);
    }


    useEffect(() => {
        let date = new Date();
        let thisMonth = date.getMonth() + 1;
        let thisYear = date.getFullYear();

        let index = days.indexOf(days.filter(day => day.year == thisYear && day.month == thisMonth)[0]);
        setMonth(index);
        setMAndY(thisYear + "年" + thisMonth + "月");
        createArr(index);
    },[])

    return (
        <div className="">
            {month != null &&
                <div className="calendar">
                    <i onClick={handleBack} className="fa-solid fa-chevron-left"></i>
                    <div className="box">
                        {array.map(obj =>
                            <DayBox key={obj.id} dayObj={obj} filterWord={filterWord} setSelectedDay={setSelectedDay} />
                        )}
                    </div>
                    <i onClick={handleForward} className="fa-solid fa-chevron-right"></i>
                </div>
            }
        </div>
    );
}
 
export default Calendar;