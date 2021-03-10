const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyBSKcYXEGxgat6cXy1mIax_MtM34OyVJ_A",
  authDomain: "kiei-451-1fdb5.firebaseapp.com",
  projectId: "kiei-451-1fdb5",
  storageBucket: "kiei-451-1fdb5.appspot.com",
  messagingSenderId: "732748202062",
  appId: "1:732748202062:web:e3d3ec94cbafb412eb031f"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase