import React from "react";
import {logout} from "../../../api/logout";

export const TrenerLogout: React.FC = () => {
    return (
        <button onClick={logout}>Logout</button>
    )
}