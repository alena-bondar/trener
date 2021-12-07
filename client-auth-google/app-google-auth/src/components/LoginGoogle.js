import '../App.css';
import GoogleLogin from "react-google-login";
import handleLogin from '../api/login'

function LoginGoogle(props) {

    function onSuccess(googleData) {
        handleLogin(googleData, () => {
            props.setLoggedIn(true);
        })
    }

    return (
            <div>
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Log in with Google"
                    onSuccess={onSuccess}
                    // onFailure={handleLogin}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        );
    }

    export default LoginGoogle;
