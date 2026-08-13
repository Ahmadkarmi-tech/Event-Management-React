import { useState } from "react";
import { useNavigate } from "react-router";

function Header({ label , showClear , showNew, showBar, createDropList }){
    const navigate = useNavigate();
    const [isFliterButtonClicked,setIsFliterButtonClicked ] = useState(false);


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


    return(
        <div className="header">
            <div className="cont">
                <img src="./Images/calendar.png" alt="Company Logo" className="logo" />
                <h1 className="eve-title">{label}</h1>
                {showClear ? <button className="Clear-LocalStorge" id="Clear-LocalStorge">Clear</button> : null}
                {showNew ? <button className="add-eve" id="add-event" onClick={naivgateHandler}>+New</button> : null} 
                {showBar ? <button className="filterBtn" id="filterBtn" onClick={handelFilter}><img src="./Images/bar.png" /></button> : null}
                {createDropList ? 
                <div className={`dropList ${isFliterButtonClicked ? "show" : ""}`}>
                    <h3>Events filter</h3>
                    <div>
                        <label htmlFor="past">Past</label>
                        <input type="checkbox" name="past" id="past" />
                    </div>
                    <div>
                        <label htmlFor="today">Today</label>
                        <input type="checkbox" name="today" id="today" />
                    </div>
                    <div>
                        <label htmlFor="future">Future</label>
                        <input type="checkbox" name="future" id="future" />
                    </div>
                    <div>
                        <button id="confirmFilter">Filter</button>
                        <button id="clearFilter">Clear</button>
                    </div>
                </div>
                : null}
            </div>
        </div>
    )
}
export default Header;