import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyATktmY2Lwh7GSf0dnYS1yGnChvx3h7rXM",
    authDomain: "book-santa-app-29048.firebaseapp.com",
    projectId: "book-santa-app-29048",
    storageBucket: "book-santa-app-29048.appspot.com",
    messagingSenderId: "800904112831",
    appId: "1:800904112831:web:51e371b815dee46640b40a",
    measurementId: "G-1P3GFMLZS1"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
     firebase.initializeApp(firebaseConfig);
      }
  

  export default firebase.firestore();
