import {auth} from "../firebase-config";
import firebase from "firebase/compat";
import axios from "axios";

export const loginGoogle = () => {

     const provider = new firebase.auth.GoogleAuthProvider();
     auth.signInWithPopup(provider)
         .then((userCredential: any) => {
          userCredential.user.getIdToken()
                 .then((result: string) => {
                     axios.post('trainers/login',{
                         token: result,
                     })
                         .then(() => {
                             axios.get('trainers/trainer')
                         })
                 })
         })
         .catch((error: { code: number; message: string; }) => {
         error.code;
         error.message;
     });
}
