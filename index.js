let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {
  
  if (user) {
    console.log('signed in')

    document.querySelector('.sign-in-or-sign-out').innerHTML = `
      <button class="text-green-400 underline sign-out">Sign Out</button>
    `
    //^^ needs to be more nicely formatted to fit in with header

    document.querySelector('.sign-out').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })

    document.querySelector('.navigation-buttons').innerHTML = `
    <div class="flex text-center">
      <div class="w-1/2 flex m-4">
        <div class="border-4 mx-4">
         <button class="text-red-400 underline abide-daily mx-2">Abide Daily</button>
         <p><img src="abidedaily.png"></p>
        </div> 
      </div> 
    <div class="w-1/2 flex m-4">
      <div class="border-4 mx-4">
        <button class="text-purple-400 underline pray-humbly mx-2">Pray Humbly</button>
        <p><img src="prayhumbly.png"></p>
        </div>
      </div> 
    </div>  
        `
    //^^ need to add pretty formatting to buttons

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
