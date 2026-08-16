import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage";
import FormPage from "./FormPage";
import { useState } from "react";

function App() {
    const [events, setEvents] = useState(() => {
        return JSON.parse(localStorage.getItem("eventsData")) || [];
    });
    const [evnetData , setEventData] = useState({
        id: 0,
        name:"",
        description:"",
        date:""
    });
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage 
            events={events}
            setEvents={setEvents}
            eventData = {evnetData}
            setEventData = {setEventData}
             />
        },
        {
            path: "/form",
            element: (
                <FormPage
                    events={events}
                    setEvents={setEvents}
                    eventData = {evnetData}
                    setEventData = {setEventData}
                />
            )
        }
    ]);

    return <RouterProvider router={router} />;
}

export default App;
