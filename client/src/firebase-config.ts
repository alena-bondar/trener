import firebase from "firebase/compat";

firebase.initializeApp({
    apiKey: 'AIzaSyDSQUGhDuaABxxcI3R6zM3446U1HDCGZM8',
    authDomain: 'trainer-auth.firebaseapp.com',
    projectId: 'trainer-auth',
    storageBucket: 'trainer-auth.appspot.com',
    messagingSenderId: '750632702600',
    appId: '1: 750632702600: web: e0b90acae99d5791e2053d',
    measurementId: 'G-8F31QY4F0Q',
});

export const auth: any = firebase.auth();