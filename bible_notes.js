let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {

    if (user) {
      // Signed in
      console.log('signed in')

      document.querySelector('.sign-in-or-sign-out').innerHTML = `
        <button class="text-red-200 my-2 underline sign-out">Sign Out</button>
      `
      //^ needs to be more nicely formatted to fit in with header
  
      document.querySelector('.sign-out').addEventListener('click', function(event) {
        console.log('sign out clicked')
        firebase.auth().signOut()
        document.location.href = 'index.html'
      })
  
      document.querySelector('.navigation-buttons').innerHTML = `
      <button class="text-purple-400 underline pray-humbly mx-2"><img src="Prayer-Red.png"></button>
      <button class="text-purple-400 underline abide-daily mx-2"><img src="Bible-Red.png"></button>
      `
    
      document.querySelector('.abide-daily').addEventListener('click',function(event) {
        document.location.href = 'bible_home.html'
      })

      document.querySelector('.pray-humbly').addEventListener('click',function(event) {
        document.location.href = 'prayer.html'
      })

      document.querySelector('.home-button').innerHTML = `
      <button class="text-purple-400 underline press-home mx-2 text-xl text-bold"><img src="Home-Red.png"></button>
      `
      //^^ need to add pictures and pretty formatting to buttons

      document.querySelector('.press-home').addEventListener('click',function(event) {
        document.location.href = 'index.html'
      })

      let userId = user.uid
      console.log(userId)

      let querySnapshot = await db.collection('notes').where('userId', '==', userId).orderBy('created', 'desc').get()
      let notes = querySnapshot.docs
      console.log(notes)
      
      for (let i=0; i<notes.length; i++) {
        let noteId = notes[i].id
        let note = notes[i].data()
        let userId = note.userId
        let username = note.username
        let reference = note.reference
        let noteContent = note.note
        let created = note.created
        console.log(`Note #${noteId} made by user #${userId} (${username}), on scripture ${reference}, saying ${noteContent}, created on ${created}`)
        renderNote(userId, noteId, username, reference, noteContent, created)
      }

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

async function renderNote(userId, noteId, username, reference, noteContent, created){
  let date = created.toDate().toDateString()
  document.querySelector(".render-notes").insertAdjacentHTML('beforeend',`
    <div class="note-${noteId} py-2 border-4 border-red-500 bg-red-100 opacity-80 mx-4 px-2 my-4 fill-current text-red-500">
    <div> <span class="font-bold text-xl">${reference}</span>
    </div>

    <div class="-my-2"> <span class="text-xs italic">${date}</span>
    </div>

    <div class="my-2"> <span class="text-md">${noteContent}</span>
    </div>
  `)
}
  