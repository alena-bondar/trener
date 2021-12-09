import {auth} from "../firebase-config";
import firebase from "firebase/compat";

export const loginGoogle = async () => {

     const provider = new firebase.auth.GoogleAuthProvider();
     const user = await auth.signInWithPopup(provider);
     console.log(user.additionalUserInfo?.profile)

}
