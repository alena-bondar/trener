import './App.css';
import GoogleLogin from "react-google-login";
import axios from "axios";

function LoginGoogle() {

    axios.get('trainers/trainer')
        .then((response) => {
            console.log(response.data);
        })
        .catch((response) => {
            console.log(response.data);
        })

    const handleLogin =  (googleData) => {
        axios.post("/trainers/google-login", {tokenId: googleData.tokenId})
            .then((response) => {
                axios.get("/trainers/trainer", )
                    .then((response) => {
                        console.log(response)
                })
            })
    }

    return (
            <div>
                <GoogleLogin
                    clientId="955395800759-ceatlo7hsrc752kgml9npr3o5cvfd9dg.apps.googleusercontent.com"
                    buttonText="Log in with Google"
                    onSuccess={handleLogin}
                    onFailure={handleLogin}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        );
    }

    export default LoginGoogle;
