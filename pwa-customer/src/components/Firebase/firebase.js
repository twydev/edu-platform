//import firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';

const prodConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

const devConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } 

    this.auth = firebase.auth();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => {
    console.log("Registered New Firebase User!");
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
    

  doSignInWithEmailAndPassword = (email, password) => {
    console.log("Firebase User Logging In!");
    return this.auth.signInWithEmailAndPassword(email, password);
  }
    

  doSignOut = () => {
    console.log("Firebase User Logged Out!")
    this.auth.signOut();
  }

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;