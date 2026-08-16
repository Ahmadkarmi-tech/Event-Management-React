import { useRef, useState } from "react";
import { useNavigate } from "react-router";

function Header({ label , showClear , showNew, showBar, createDropList, events, setEvents , setFilteredArray }){
    const navigate = useNavigate();
    const pastCheckBox = useRef(null);
    const todayCheckBox = useRef(null);
    const futureCheckBox = useRef(null);
    const [isFliterButtonClicked,setIsFliterButtonClicked ] = useState(false);
    let selectedEvents = [];
    const handelFilter = () => {
        if(!isFliterButtonClicked){
            setIsFliterButtonClicked(true);
        }else{
            setIsFliterButtonClicked(false);
        }
    };


    const naivgateHandler = () => {
        navigate("/form");
    };

    const handelClear = () => {
        if(events){
            if (confirm("Are you sure that you want to clear all the event?") == true) {
                localStorage.clear();
                setEvents([])
            } 
        }
    }

    const handelFilterClear = () => {
        pastCheckBox.current.checked = false;
        todayCheckBox.current.checked = false;
        futureCheckBox.current.checked = false;
        selectedEvents = [];
        setFilteredArray(selectedEvents);
    }


    const applayFilter = () => {
        const selectedEvents = [];
        if(pastCheckBox.current.checked){
            selectedEvents.push(...Filter("past"));
        }
        if(todayCheckBox.current.checked){
            selectedEvents.push(...Filter("today"));
        }
        if(futureCheckBox.current.checked){
            selectedEvents.push(...Filter("future"));
        }
        if(!pastCheckBox.current.checked && !todayCheckBox.current.checked && !futureCheckBox.current.checked){
            return;
        }
        if(selectedEvents.length == 0){
            selectedEvents.push("Nothing");
        }
        setFilteredArray(selectedEvents);
    };


    function Filter(Time){
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let pastArray;
        let todayArray;
        let futureArray;
        if(Time === "past"){
            pastArray = events.filter(someEvent => new Date(someEvent.date).setHours(0, 0, 0, 0) < today.getTime());
            return pastArray;
        }
        else if(Time === "today"){
            todayArray = events.filter(someEvent => new Date(someEvent.date).setHours(0, 0, 0, 0) === today.getTime());
            return todayArray;
        }
        else if(Time === "future"){
            futureArray = events.filter(someEvent => new Date(someEvent.date).setHours(0, 0, 0, 0) > today.getTime());
            return futureArray;
        }
    }

    return(
        <div className="header">
            <div className="cont">
                <img src="./Images/calendar.png" alt="Company Logo" className="logo" />
                <h1 className="eve-title">{label}</h1>
                {showClear ? <button className="Clear-LocalStorge" id="Clear-LocalStorge" onClick={handelClear}>Clear</button> : null}
                {showNew ? <button className="add-eve" id="add-event" onClick={naivgateHandler}>+New</button> : null} 
                {showBar ? <button className="filterBtn" id="filterBtn" onClick={handelFilter}><img src="./Images/bar.png" /></button> : null}
                {createDropList ? 
                <div className={`dropList ${isFliterButtonClicked ? "show" : ""}`}>
                    <h3>Events filter</h3>
                    <div>
                        <label htmlFor="past">Past</label>
                        <input type="checkbox" ref={pastCheckBox} name="past" id="past" />
                    </div>
                    <div>
                        <label htmlFor="today">Today</label>
                        <input type="checkbox" ref={todayCheckBox} name="today" id="today" />
                    </div>
                    <div>
                        <label htmlFor="future">Future</label>
                        <input type="checkbox" ref={futureCheckBox} name="future" id="future" />
                    </div>
                    <div>
                        <button id="confirmFilter" onClick={applayFilter}>Filter</button>
                        <button id="clearFilter" onClick={handelFilterClear}>Clear</button>
                    </div>
                </div>
                : null}
            </div>
        </div>
    )
}
export default Header;