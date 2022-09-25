import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Calendar from "../components/Calendar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import tasks from "./data/tasks";
import categories from "./data/categories";

const Home = () => {
    const [isTyping, setIsTyping] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    const [filterWord, setFilterWord] = useState('無');
    const [mAndY, setMAndY] = useState("");
    const [selectedDay, setSelectedDay] = useState("");
    const history = useHistory();

    const handleSearch = (e) =>{
        setSearchWord(e.target.value);
    }

    const selectFilter = (e) => {
        if(e.target.value != "フィルター"){
            setFilterWord(e.target.value);
        }
    }

    const getDateString = (obj) => {
        let year = obj.year;
        let month = obj.month >= 10 ? obj.month : "0" + obj.month;
        let day = obj.day >= 10 ? obj.day : "0" + obj.day;
        return year + "-" + month + "-" + day;
    }

    const createNewTask = () => {
        history.push("/task")
    }

    useEffect(() => {
        let today = new Date();
        let todayObj = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()}
        setSelectedDay(getDateString(todayObj));
    },[tasks])

    return (
        <div className="homee">
            <div className="home">
                <div className="home-top">
                    <div className="home-month"><p>{mAndY}</p></div>
                    <div className="home-action">
                        {isTyping && 
                            <input type="text" placeholder="検索" // value={searchWord}
                                onChange={(e) => handleSearch(e)}
                            />
                        }
                        <i onClick={() => setIsTyping(!isTyping)} className="fa-solid fa-magnifying-glass fa-xl"></i>
                        <i onClick={() => createNewTask()} className="fa-regular fa-pen-to-square fa-xl"></i>
                        <i onClick={() => setIsFiltering(!isFiltering)} className="fa-solid fa-filter fa-xl"></i>
                        {isFiltering && 
                            <select onChange={(e) => selectFilter(e)}>
                                <option value="フィルター">{filterWord}</option>
                                {filterWord != "無" && <option value="無">無</option>}
                                {filterWord != "優先度5" && <option value="優先度5">優先度5</option>}
                                {filterWord != "優先度3以上" && <option value="優先度3以上">優先度3以上</option>}

                                {categories.filter(c => filterWord != c).map(cate =>
                                    <option value={cate} key={cate}>{cate}</option>
                                )}
                            </select>
                        }
                        {!isFiltering && 
                            <span>フィルター: {filterWord}</span>
                        }     
                    </div>
                </div>
                <Calendar setMAndY={setMAndY} filterWord={filterWord} setSelectedDay={setSelectedDay} />
                {searchWord != "" && <p>{searchWord} でタスク検索</p>}
                <div className="task-cards">
                    {searchWord != "" && tasks.filter(task => task.title.toLowerCase().indexOf(searchWord.toLowerCase()) != -1).map(task => 
                        <Link to={{ pathname: "/detail", state: {task: task}}}>
                            <TaskCard task={task} key={task.id} />
                        </Link>
                    )}
                </div>
                
                {searchWord != "" && tasks.filter(task => task.title.toLowerCase().indexOf(searchWord.toLowerCase()) != -1).length == 0 && 
                    <p>該当なし</p>
                }
            </div>
            <Sidebar selectedDay={selectedDay} />
        </div>
    );
}
 
export default Home;