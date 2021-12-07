import '../App.css';
import logoutGoogle from "../api/logout";

function Logout(props) {

    function handleLogout() {
        logoutGoogle(() => {
            props.setLoggedIn(false);
        })
    }

    return (
            <div>
                <button className="logoutButton" onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    export default Logout;
