import axios from "axios";
import { BASE_URL } from "services/BASE_URL";
import { FormData } from "types/FormData";

function users(data: FormData): void {
  axios
    .post(`${BASE_URL}/trainers`, data)
    .then(() => alert("Тренер добавлений"))
    .catch((error) => alert("Помилка, тренер не добавлений ") + error);
}
export default users;
