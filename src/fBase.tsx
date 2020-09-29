import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
// };
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI-CRKVoMRj5xPaFukt9FPudICN1_g6hE",
  authDomain: "maiway-stg.firebaseapp.com",
  databaseURL: "https://maiway-stg.firebaseio.com",
  projectId: "maiway-stg",
  storageBucket: "maiway-stg.appspot.com",
  messagingSenderId: "924199805118",
  appId: "1:924199805118:web:fecec2bfea83f81341feef",
  measurementId: "G-4GDV229ZWE",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authSvc = firebase.auth();
export const dbSvc = firebase.firestore();
export const storageSvc = firebase.storage();
