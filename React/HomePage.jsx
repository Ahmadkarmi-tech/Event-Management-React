import { Link } from "react-router-dom";
import Nav from "./Nav";
import Header from "./Header";
function HomePage(){
    return(
        <div className="Event-Management">
            <div className="container">
                <Header 
                label={"Event"}
                showClear={true}
                showBar={true}
                showNew={true}
                createDropList={true}
                />
                <Nav />
                <div className="contents">
                    <div className="Empty-List">
                        <h1>Your list is empty , try to add new event using the +New button above</h1>
                        <img src="https://media.tenor.com/pkAWEgwDxmQAAAAj/tantrum-throwing-a-tanturm.gif" />
                    </div>
                    <div className="grid-container">
                        <section className="grid">
                        </section>
                    </div>
                </div>
            </div>
        </div>      
    )
}
export default HomePage;