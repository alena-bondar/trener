import React from "react";
import {loginGoogle} from "../../../api/login-google";


export const GoogleLogin: React.FC = () => {

    return (
        <div>
            <a onClick={loginGoogle} className="reg__by__netw reg__by__netw--google"/>
        </div>
    )
}