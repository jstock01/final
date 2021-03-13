let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {

    if (user) {
      // Signed in
      console.log('signed in')

      document.querySelector('.sign-in-or-sign-out').innerHTML = `
        <button class="text-green-400 underline sign-out">Sign Out</button>
      `
      //^ needs to be more nicely formatted to fit in with header
  
      document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'index.html'
      })
  
        document.querySelector('.navigation-buttons').innerHTML = `
        <button class="text-red-400 underline abide-daily mx-2">Abide Daily</button>
        <button class="text-purple-400 underline pray-humbly mx-2">Pray Humbly</button>
        `
    //^^ need to add pictures and pretty formatting to buttons

      document.querySelector('.abide-daily').addEventListener('click',function(event) {
        document.location.href = 'bible_home.html'
      })

      document.querySelector('.pray-humbly').addEventListener('click',function(event) {
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
  