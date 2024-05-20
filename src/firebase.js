import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

var firebaseConfig = {
  apiKey: "AIzaSyA9i1XUXLZGWaYAMEWFeOp4pAx-ILQJzIA",
  authDomain: "guardian-cloud-7673c.firebaseapp.com",
  databaseURL: "https://guardian-cloud-7673c-default-rtdb.firebaseio.com",
  projectId: "guardian-cloud-7673c",
  storageBucket: "guardian-cloud-7673c.appspot.com",
  messagingSenderId: "1040060321645",
  appId: "1:1040060321645:web:87bbbb05ec1b2c74601464"
};

const fireDb = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(fireDb);
export default fireDb.database().ref();