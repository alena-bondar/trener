import {FormDataLogin} from "../types/FormDataLogin";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase-config";

import axios from "axios";

export const login = (data: FormDataLogin) => {

    signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            userCredential.user.getIdToken()
                .then((result) => {
                axios.post('trainers/login',{
                    token: result,
                }).then(() => {
                    axios.get('trainers/trainer')
                })
            })
        })
        .catch((error) => {
            error.code;
            error.message;
        });

}
