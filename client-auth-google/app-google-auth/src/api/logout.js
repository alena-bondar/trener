import axios from "axios";

 function logoutGoogle (handler){
    axios.post("/trainers/logout")
        .then(() => {
            handler();
        })
}
export default logoutGoogle;