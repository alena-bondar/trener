import './App.css';
import axios from "axios";

function Logout(props) {

    const logout =  () => {
       axios.post("/trainers/logout")
           .then(() => {
               props.setLoggedIn(false);
           })
    }
    return (
            <div>
                <button className="logoutButton" onClick={logout}>Logout</button>
            </div>
        );
    }

    export default Logout;
