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
      <button class="text-purple-400 underline pray-humbly mx-2"><img src="Prayer-Red.png"></button>
      `
  //^^ need to add pretty formatting to buttons

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

      document.querySelector('.bible-notes').innerHTML = `
        <button class="text-blue-500 underline bible-notes-link text-left">Bible Notes</button>
      `
      //^ need to be more nicely formatted to fit in with header

      document.querySelector('.bible-notes-link').addEventListener('click', function(event) {
        document.location.href = 'bible_notes.html'
      })  

      document.querySelector('form').addEventListener('submit', async function(event){
  
        event.preventDefault()

        let verseRequested = document.querySelector('#passage-lookup').value
        console.log(verseRequested)

        let API_KEY = '17ce03c143dcb65dabd67475d0d56161c08e42e5'
        let API_URL = `https://api.esv.org/v3/passage/text/?q=${verseRequested}`
        let headers = {
          Authorization: `Token ${API_KEY}`
        }
        let response = await fetch(API_URL, {
          headers: headers
        })
        
        let verseOutput = await response.json()
        console.log(verseOutput)
        
        for (let i=0; i<verseOutput.passages.length;i++) {
          document.querySelector('.passage').insertAdjacentHTML('beforeend', `
            <div class="font-bold text-xl">${verseOutput.passage_meta[i].canonical}</div>
            <div class="">${verseOutput.passages[i]}</div>
          `)
        }
      })
    

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

  