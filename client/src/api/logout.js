import axios from "axios";

export const logout = () => {
    axios.post('trainers/logout')

}