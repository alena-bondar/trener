import axios from "axios";
import { FormData } from "../types/FormData";
import { BASE_URL } from "../services/BASE_URL";

function createUser(data: FormData): void {
  axios
    .post(`${BASE_URL}/trainers`, data)
    .then(() => alert("Тренер добавлений"))
    .catch((error) => alert("Помилка, тренер не добавлений ") + error);
}

export default createUser;
