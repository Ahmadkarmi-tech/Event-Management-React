import { NavLink } from "react-router-dom";
function Nav(){
    return(
        <nav className="menu">
            <ul>
                <li><NavLink to="/" className={({ isActive }) => isActive ? "disabled" : "button"} id="ListBtn">List</NavLink></li>
                <li><NavLink to="/form" className={({ isActive }) => isActive ? "disabled" : "button"} id="FormBtn">From</NavLink></li>
            </ul>
        </nav>
    )
}
export default Nav;