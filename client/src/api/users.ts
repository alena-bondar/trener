import axios from "axios";
import {BASE_URL} from "services/BASE_URL";
import {FormData} from "types/FormData";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

function users(data: FormData): void {
    const auth = getAuth();
    const geocoder = new google.maps.Geocoder();
    let locationLat: number | null;
    let locationLng: number | null;

    createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            userCredential.user.getIdToken()
                .then((response) => {
                   geocoder.geocode({'address': data.location},
                       function (results){
                           if (results) {
                               locationLat = results[0].geometry.location.lat();
                           }
                           if (results) {
                               locationLng = results[0].geometry.location.lng();
                           }
                       axios.post(`${BASE_URL}/trainers`, {
                           phoneNumber: data.phoneNumber,
                           sport: data.sport,
                           price: data.price,
                           age: data.age,
                           lastName: data.lastName,
                           name: data.name,
                           locationSport: {
                               lat: locationLat,
                               lng: locationLng,
                           },
                           token: response,
                   })
                   .catch((error) => {
                           error.code;
                           error.message;
                       });
                    })
                })
            alert("Тренер добавлений")
        })
        .catch((error) => {
            alert("Помилка, тренер не добавлений ") + error;
        })
}

export default users;
