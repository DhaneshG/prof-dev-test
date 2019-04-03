import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyAg_DITodHCELnmoTRoIKbNT46K_1mCb6U",
    authDomain: "fun-food-friends-b9ffc.firebaseapp.com",
    databaseURL: "https://fun-food-friends-b9ffc.firebaseio.com",
    projectId: "fun-food-friends-b9ffc",
    storageBucket: "fun-food-friends-b9ffc.appspot.com",
    messagingSenderId: "175757249898"
  };
firebase.initializeApp(config);
export default firebase;
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();