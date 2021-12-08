import axios from "axios";
import { BASE_URL } from "services/BASE_URL";
import { FormData } from "types/FormData";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function users(data: FormData): void {
  const auth = getAuth();
  axios
      .post(`${BASE_URL}/trainers`, data)
      .then(() => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
              console.log(userCredential.user)
            })
            .catch((error) => {
              console.log(error.code);
              console.log(error.message);
              // ..
            });
        alert("Тренер добавлений")
      })
      .catch((error) => {
        alert("Помилка, тренер не добавлений ") + error
      })
}
export default users;
