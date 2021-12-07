import './App.css';
import LoginGoogle from "./components/LoginGoogle";
import Logout from "./components/Logout";
import {useState} from "react";
import axios from "axios";

function App() {
   axios.get('trainers/trainer')
        .then((response) => {
            setIsLoggedIn(true);
    }).catch((err) => {
       console.log(err.message)
   })

    const [isLoggedIn, setIsLoggedIn] = useState(false);

 return (
            <div className="App">
                {isLoggedIn ? <Logout setLoggedIn={setIsLoggedIn} /> : <LoginGoogle setLoggedIn={setIsLoggedIn} />}
            </div>
        );
    }

    export default App;
