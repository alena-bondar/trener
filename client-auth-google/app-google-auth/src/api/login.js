import axios from "axios";

 function handleLogin (googleData, handler){
    axios.post("/trainers/google-login", {tokenId: googleData.tokenId})
        .then((response) => {
            axios.get("/trainers/trainer").then(() => {
                handler()
            })
        })
}
export default handleLogin;