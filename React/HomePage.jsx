import Nav from "./Nav";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState } from "react";
function HomePage({ events, setEvents, eventData, setEventData }) {
    const navigate = useNavigate();
    let isEmptyData = events.length === 0;
    let chosenArray = []
    const [filteredArray , setFilteredArray] = useState([]);
    const naivgateHandler = () => {
        navigate("/form");
    };

    const handleCardClick = (event) => {
        const newEventData = {
            id: event.id,
            name: event.name,
            description: event.description,
            date: event.date
        };
        setEventData(newEventData);
        navigate("/form");
    };


    if(filteredArray.length > 0){
        chosenArray = filteredArray;
    }
    else{
        chosenArray = events;
    }
    if(chosenArray[0] === "Nothing"){
        isEmptyData = true;
    }


    return (
        <div className="Event-Management">
            <div className="container">

                <Header
                    label="Event"
                    showClear={true}
                    showBar={true}
                    showNew={true}
                    createDropList={true}
                    events = {events}
                    setEvents={setEvents}
                    setFilteredArray = {setFilteredArray}
                />

                <Nav />

                <div className="contents">

                    <div className={`Empty-List ${isEmptyData ? "show" : ""}`}>
                        <h1>
                            Your list is empty, try to add a new event
                            using the +New button above
                        </h1>

                        <img src="https://media.tenor.com/pkAWEgwDxmQAAAAj/tantrum-throwing-a-tanturm.gif" />
                    </div>

                    <div className="grid-container">
                        {!isEmptyData && (
                            <ul className="grid">
                                {chosenArray.map(event => {

                                    const todayDate = new Date();
                                    const eventDate = new Date(event.date);

                                    todayDate.setHours(0, 0, 0, 0);
                                    eventDate.setHours(0, 0, 0, 0);

                                    const status =
                                        eventDate < todayDate
                                            ? "past"
                                            : eventDate > todayDate
                                            ? "future"
                                            : "today";

                                    return (
                                        <li
                                            key={event.id}
                                            className={`card ${status}`}
                                            onClick={() => handleCardClick(event)}
                                        >
                                            <h3>{event.name}</h3>
                                            <p>{event.date}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default HomePage;
