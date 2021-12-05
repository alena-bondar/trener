import './App.css';
import GoogleLogin from "react-google-login";
import axios from "axios";

function LoginGoogle(props) {

    const handleLogin =  (googleData) => {
        axios.post("/trainers/google-login", {tokenId: googleData.tokenId})
            .then((response) => {
                axios.get("/trainers/trainer").then(() => {
                    props.setLoggedIn(true);
                })
            })
    }

    return (
            <div>
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Log in with Google"
                    onSuccess={handleLogin}
                    onFailure={handleLogin}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        );
    }

    export default LoginGoogle;
