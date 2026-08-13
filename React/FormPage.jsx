import Nav from "./Nav";
import Header from "./Header";
import { useRef,useState } from "react";
import { Link } from "react-router";
const data = [];
let ID = 1;
function FormPage(){

    const submitButton = useRef(null);


    const [formData , setFormData] = useState({
        id: ID,
        name:"",
        description:"",
        date:""
    })


    const handelChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:value
        }));
    };


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
        console.log("Form submitted:", data);
    };


    function isTitleExist(){
        if(data.some(someEvent => someEvent.name.toUpperCase() === formData.name.trim().toUpperCase())){
            return true;
        }else{
            return false;
        }
    }


    function changArray(operation){
        if(operation === "Add"){
            ID++;
            data.push(formData);
            localStorage.setItem("eventsData", JSON.stringify(data));
            alert("The event have been added successfully!");
        }
        else if(operation === "Update"){
            listOfEvents[+ID - 1] = new Event(ID,title,descriptionVlaue,dateValue);
            formButon.textContent = "Add";
            localStorage.setItem("eventsData", JSON.stringify(listOfEvents));
            alert("The event have been updated successfully!");
        }
        else if (operation === "Delete"){
            console.log(ID);
            listOfEvents.splice((+ID - 1), 1);
            localStorage.setItem("eventsData", JSON.stringify(listOfEvents));
            alert("The event have been deleted successfully!");
        }
        setFormData({ id: ID ,name: "" , description:"" , date: ""});
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
                            <button id="delete-btn">Delete</button>
                            <button type="submit" id="save-add-btn" disabled={!isFormComplete} ref={submitButton}>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>       
    )
}
export default FormPage;