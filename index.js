let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {
  
  if (user) {
    console.log('signed in')

    document.querySelector('.sign-out').innerHTML = `
      <button class="text-green-400 underline sign-out-button">Sign Out</button>
    `

    document.querySelector('.sign-out-button').addEventListener('click', function(event) {
      console.log('sign out clicked')
      firebase.auth().signOut()
      document.location.href = 'index.html'
    })

    document.querySelector('.navigation-buttons').innerHTML = `
    <div class="flex text-center">
      <div class="w-1/2 flex m-4">
        <div class="mx-auto mx-4">
         <button class="text-red-200 lg:font-bold abide-daily mx-2 text-lg lg:text-xl">Abide Daily</button>
         <p><img class="mx-auto" src="abidedaily.png"></p>
        </div> 
      </div> 
    <div class="w-1/2 flex m-4">
      <div class="mx-auto mx-4">
        <button class="text-purple-200 lg:font-bold italics pray-humbly mx-2 text-lg lg:text-xl">Pray Humbly</button>
        <p><img class="mx-auto" src="prayhumbly.png"></p>
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

    ui.start('.sign-in', authUIConfig)
  }
})
