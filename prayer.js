let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {
  
    if (user) {
      console.log('signed in')

      db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email
      })
  
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
      `
      //^^ need to add picture and be more nicely formatted to fit in with header

      document.querySelector('.abide-daily').addEventListener('click', function(event) {
        document.location.href = 'bible_home.html'
      })
  
      document.querySelector('.new-prayer-request').innerHTML = `
        <button class="text-blue-500 font-bold text-2xl new-prayer-request-button">New Prayer +</button>
        </div>
      `
      //^ add formatting, border, plus sign icon?, etc.

    //   document.querySelector('.new-prayer-request-button').addEventListener('click', function(event){
    //       document.querySelector('.new-prayer-form').innerHTML = `
    //       <form class="w-full mt-8">
    //       <input type="text" id="title" name="title" placeholder="Prayer title" class="my-2 p-2 w-64 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500">
    //       <input type="text" id="description" name="description" placeholder="Prayer request description" class="my-2 p-2 w-64 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500">
    //       <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl" id="submit-button">Submit</button>
    //       </form>
    //       `
    //   })

      document.querySelector('.new-prayer-request-button').addEventListener('click', function(event){
          document.querySelector('#form').classList.remove("hidden")
      })

      document.querySelector('form').addEventListener('submit', async function(event) {
        
        event.preventDefault()
        
        let username = user.displayName
        let title = document.querySelector('#title').value
        let description = document.querySelector('#description').value
        let completed = "false"
        let docRef = await db.collection('prayers').add({ 
          userId: user.uid,
          username: username, 
          title: title,
          description: description,
          completed: completed, 
          created: firebase.firestore.FieldValue.serverTimestamp()
        })

        document.querySelector('#form').classList.add("hidden")

        // let postId = docRef.id // the newly created document's ID
        // renderPost(postId, postUsername, postImageUrl, postNumberOfLikes)
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
  