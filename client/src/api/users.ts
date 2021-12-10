import axios from "axios";
import {BASE_URL} from "services/BASE_URL";
import {FormData} from "types/FormData";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

function users(data: FormData): void {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            userCredential.user.getIdToken()
                .then((response) => {
                    axios.post(`${BASE_URL}/trainers`, {
                        phoneNumber: data.phoneNumber,
                        sport: data.sport,
                        price: data.price,
                        age: data.age,
                        lastName: data.lastName,
                        name: data.name,
                        token: response,
                    })
                        .catch((error) => {
                            error.code;
                            error.message;
                        });
                })
            alert("Тренер добавлений")
        })
        .catch((error) => {
            alert("Помилка, тренер не добавлений ") + error;
        })
}

export default users;
