import Nav from "./Nav";
import Header from "./Header";
import { useRef,useState, useEffect} from "react";
import { Link } from "react-router";
function FormPage({ events, setEvents, eventData, setEventData }){

    const submitButton = useRef(null);
    const deleteButton = useRef(null);

    const [formData , setFormData] = useState({
        id: 0,
        name:"",
        description:"",
        date:""
    })

    function getTheNextId() {
        if (events.length === 0) {
            return 1;
        }

        return events[events.length - 1].id + 1;
    }
    
    useEffect(() => {
        if (eventData.id != 0) {
            setFormData({
                id: eventData.id,
                name: eventData.name,
                description: eventData.description,
                date: eventData.date
            });
            submitButton.current.textContent = "Save";
        }
    }, [eventData]);


    const handelChange = (e) => {
        const { name, value } = e.target;
        if(name === "name"){
            submitButton.current.textContent = "Add";
            deleteButton.current.className = "delete-btn";
        }
        setFormData((prev) => ({
            ...prev,
            [name]:value
        }));
    };

    const handelDelete = (e) => {
        changArray("Delete");
        deleteButton.current.className = "delete-btn";
    }

    const isFormComplete = formData.name && formData.description && formData.date;


    const handleSubmit = (e) => {
        e.preventDefault();
        if(!isFormComplete){
            alert("Please fill in all fields.");
            return;
        }
    const today = new Date();
    const inputDate = new Date(formData.date);
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    if(inputDate < today){
        alert("you can't put an event in the past!");
        return;
    }
    if(isTitleExist() && submitButton.current.textContent === "Add" ){
        alert("can't add an existing title");
        return;
    }
    if(submitButton.current.textContent === "Save"){
        if (confirm("Are you sure that you want to edit this event?") == true) {
            changArray("Update");
        } 
        return;
    }
        changArray("Add");
    };


    function isTitleExist(){
        if(events.some(someEvent => someEvent.name.toUpperCase() === formData.name.trim().toUpperCase())){
            return true;
        }else{
            return false;
        }
    }


    function changArray(operation){
        if (operation === "Add") {

            const newID = getTheNextId();

            const newEvent = {
                ...formData,
                id: newID
            };

            const updatedEvents = [...events, newEvent];

            setEvents(updatedEvents);

            localStorage.setItem(
                "eventsData",
                JSON.stringify(updatedEvents)
            );

            alert("The event has been added successfully!");
        }

        else if (operation === "Update") {

            const newEvent = {
                ...formData,
                id: eventData.id
            };

            const updatedEvents = events.map(event =>
                event.id === eventData.id
                    ? newEvent
                    : event
            );

            setEvents(updatedEvents);

            localStorage.setItem(
                "eventsData",
                JSON.stringify(updatedEvents)
            );

            alert("The event has been updated successfully!");
        }
            else if (operation === "Delete") {

                const updatedEvents = events.filter(
                    event => event.id !== eventData.id
                );

                setEvents(updatedEvents);

                localStorage.setItem(
                    "eventsData",
                    JSON.stringify(updatedEvents)
                );

                alert("The event has been deleted successfully!");
            }
        submitButton.current.textContent = "Add";
        deleteButton.current.className = "delete-btn";
        setFormData({ id: 0 ,name: "" , description:"" , date: ""});
    }

    
    return(
         <div className="Event-Management">
            <div className="container">
                <Header 
                label={"Create new event"}
                showClear={false}
                showBar={false}
                showNew={false}
                createDropList={false}
                />
                <Nav/>
                <div className="contents">
                    <form className="form-body" onSubmit={handleSubmit}>
                        <div className="Name">
                            <label htmlFor="name">Name:</label>
                        </div>
                        <div className="text">
                            <input type="text" name="name" id="name" value={formData.name} onChange={handelChange} placeholder="Name of the event..." />
                        </div>
                        <div className="desc">
                            <label htmlFor="description">Description:</label>
                        </div>
                        <div className="textar">
                            <textarea id="description" name="description" value={formData.description} onChange={handelChange} placeholder="Enter your description here..."></textarea>
                        </div>
                        <div className="date">
                            <label htmlFor="date">Date:</label>
                        </div>
                        <div className="textda">
                            <input type="date" value={formData.date} onChange={handelChange} name="date" id="date" />
                        </div>
                        <div className="action-btns">
                            <Link id="cancel-btn" to="/">Cancel</Link>
                            <button type = "button" id="delete-btn" ref={deleteButton} onClick={handelDelete} className={`delete-btn ${eventData.id != 0 ? "show" : ""}`}>Delete</button>
                            <button type="submit" id="save-add-btn" disabled={!isFormComplete} ref={submitButton}>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>       
    )
}
export default FormPage;