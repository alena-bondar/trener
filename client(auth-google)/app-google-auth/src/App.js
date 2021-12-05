import './App.css';
import LoginGoogle from "./LoginGoogle";
import Logout from "./Logout";
import {useState} from "react";
import axios from "axios";

function App() {
   axios.get('trainers/trainer')
        .then((response) => {
        if(response.data !== '') {
            setIsLoggedIn(true);
        }
    })

    const [isLoggedIn, setIsLoggedIn] = useState(false);

 return (
            <div className="App">
                {isLoggedIn ? <Logout setLoggedIn={setIsLoggedIn} /> : <LoginGoogle setLoggedIn={setIsLoggedIn} />}
            </div>
        );
    }

    export default App;
