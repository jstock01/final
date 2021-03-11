let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {

    if (user) {
      // Signed in
      console.log('signed in')

      document.querySelector('.sign-in-or-sign-out').innerHTML = `
        <div class="flex items-center">
        <button class="text-pink-500 underline sign-out">Sign Out</button>
        </div>
      `
      //^ needs to be more nicely formatted to fit in with header
  
      document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'index.html'
      })
  
      document.querySelector('.navigation-buttons').innerHTML = `
        <button class="text-blue-500 underline pray-humbly">Pray Humbly</button>
      `
      //^ need to add picture and be more nicely formatted to fit in with header

      document.querySelector('.pray-humbly').addEventListener('click', function(event) {
        document.location.href = 'prayer.html'
      })

      //need to add button to return to bible_home

    } else {
      // Signed out
      console.log('signed out')
  
      // Initializes FirebaseUI Auth
      let ui = new firebaseui.auth.AuthUI(firebase.auth())
  
      // FirebaseUI configuration
      let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: 'index.html'
      }
  
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }
  })
  