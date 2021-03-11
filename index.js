let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {
  
  if (user) {
    console.log('signed in')

    document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <div class="flex items-center">
      <button class="text-pink-500 underline sign-out">Sign Out</button>
      </div>
    `
    //^^ needs to be more nicely formatted to fit in with header

    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })

    document.querySelector('.navigation-buttons').innerHTML = `
      <button class="text-blue-500 underline abide-daily">Abide Daily</button>
      <button class="text-blue-500 underline pray-humbly">Pray Humbly</button>
    `
    //^^ need to add pictures and pretty formatting to buttons

    document.querySelector('.abide-daily').addEventListener('click',function(event) {
      document.location.href = 'bible_home.html'
    })

    document.querySelector('.pray-humbly').addEventListener('click',function(event) {
      document.location.href = 'prayer.html'
    })


  } else {
    console.log('signed out')

    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    let authUIConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: 'index.html'
    }

    ui.start('.sign-in-or-sign-out', authUIConfig)
  }
})
