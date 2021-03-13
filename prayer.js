let db = firebase.firestore()

firebase.auth().onAuthStateChanged(async function(user) {
  
    if (user) {
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
        <button class="text-red-400 underline abide-daily">Abide Daily</button>
      `
      //^ need to add picture and make more nicely formatted to fit in with header

      document.querySelector('.abide-daily').addEventListener('click', function(event) {
        document.location.href = 'bible_home.html'
      })
  
      document.querySelector('.new-prayer-request').innerHTML = `
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold text-3xl px-4 py-2 rounded-xl new-prayer-request-button">New Prayer +</button>
        </div>
      `
      //^ add formatting, border, plus sign icon?, etc.

      document.querySelector('.new-prayer-request-button').addEventListener('click', function(event){
          document.querySelector('#form').classList.remove("hidden")
      })

      let userId = user.uid
      console.log(userId)
      let response = await fetch('/.netlify/functions/fetch_prayers', {
        method: 'POST',
        body: JSON.stringify({
          userId: userId
        })
      })

      let prayers = await response.json()
      console.log(prayers)       
      for (let i=0; i<prayers.length; i++) {
        let prayer = prayers[i]
        renderPrayer(prayer.userId, prayer.prayerId, prayer.username, prayer.title, prayer.description, prayer.completed, prayer.created)
      }

      document.querySelector('form').addEventListener('submit', async function(event) {
        
        event.preventDefault()
        
        let userId = user.uid
        let username = user.displayName
        let title = document.querySelector('#title').value
        let description = document.querySelector('#description').value
        let completed = "false"
        let response2 = await fetch('/.netlify/functions/write_prayer', {
          method: 'POST',
          body: JSON.stringify({
            userId: userId,
            username: username,
            title: title,
            description: description,
            completed: completed
          })
        })

        document.querySelector('#form').classList.add("hidden")
        let new_prayer = await response2.json()
        console.log(new_prayer)
        renderNewPrayer(new_prayer.userId, new_prayer.prayerId, new_prayer.username, new_prayer.title, new_prayer.description, new_prayer.completed, new_prayer.created)
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

//the two functions below are IDENTICAL, EXCEPT one writes prayers "before end", the other "after begin"
//BOTH need the date (which is funneled in as "created") to be fixed. it's coming in from firebase as a number for seconds and nanoseconds; previously the "toDate" thing 
//I commented worked but it stopped and IDK why. It's currently rendering as [object Object] 

async function renderPrayer(userId, prayerId, username, title, description, completed, created) {
      //let date = created.toDate().toDateString()
      document.querySelector('.render-prayers').insertAdjacentHTML('beforeend', `
          <div class="prayer-${prayerId} md:mt-16 mt-8 space-y-8">
              <div class="md:mx-0 mx-4">
                  <span class="font-bold text-xl">${title}</span>
              </div>
  
              <div>
                  <span class="text-m black">Prayer request submitted ${created}</span>
              </div>
  
              <div>
                  <span class="text-m black">${description}</span>
              </div>
  
              <div class="text-3xl md:mx-0 mx-4">
                  <button class="completed-button">✅</button>
                  <button class="edit-button">✏</button>
                  <button class="delete-button">✖</button>
              </div>
          </div>
      `)
  
      document.querySelector(`.prayer-${prayerId} .completed-button`).addEventListener('click', async function(event) {
          event.preventDefault()
          console.log(`prayer ${prayerId} completed!`)
          
          await db.collection('prayers').doc(prayerId).set({
              userId: userId,
              username: username, 
              title: title,
              description: description,
              completed: "true", 
              created: created
          })    
      })
      
      document.querySelector(`.prayer-${prayerId} .delete-button`).addEventListener('click', async function(event) {
          event.preventDefault()
          await db.collection('prayers').doc(prayerId).delete()
          document.querySelector(`.prayer-${prayerId}`).classList.add("hidden")
          console.log(`prayer ${prayerId} deleted`)
  
      })
      
      document.querySelector(`.prayer-${prayerId} .edit-button`).addEventListener('click', async function(event) {
          event.preventDefault()
          document.querySelector(`.prayer-${prayerId}`).innerHTML = `
          <div>
              <form class="w-full mt-8 edit-prayer-${prayerId}">
                  <div class="md:mx-0 mx-4">
                  <span class="font-bold text-xl">Title:</span>
                  </div>
                  <input type="text" id="edit-title" name="edit-title" placeholder="${title}" class="my-2 p-2 w-64 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500">
                  <div class="md:mx-0 mx-4">
                  <span class="font-bold text-xl">Description:</span>
                  </div>                
                  <input type="text" id="edit-description" name="edit-description" placeholder="${description}" class="my-2 p-2 w-64 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500">
                  <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl submit-edit-${prayerId}">Edit</button>
              </form>
          </div>
          `
  
          document.querySelector(`.edit-prayer-${prayerId}`).addEventListener('submit', async function(event) {
          
              event.preventDefault()
              
              let editedTitle = document.querySelector('#edit-title').value
              let editedDescription = document.querySelector('#edit-description').value
              let docRef = await db.collection('prayers').doc(prayerId).set({ 
                  userId: userId,
                  username: username, 
                  title: editedTitle,
                  description: editedDescription,
                  completed: completed, 
                  created: created,
                  edited: firebase.firestore.FieldValue.serverTimestamp()
              })
  
              document.querySelector(`.edit-prayer-${prayerId}`).classList.add("hidden")
              
              document.querySelector(`.prayer-${prayerId}`).insertAdjacentHTML('beforeend', `
              <div class="prayer-${prayerId} md:mt-16 mt-8 space-y-8">
                  <div class="md:mx-0 mx-4">
                      <span class="font-bold text-xl">${editedTitle}</span>
                  </div>
  
                  <div>
                      <span class="text-m black">Prayer request submitted ${created}</span>
                  </div>
  
                  <div>
                      <span class="text-m black">${editedDescription}</span>
                  </div>
  
                  <div class="text-3xl md:mx-0 mx-4">
                      <button class="completed-button">✅</button>
                      <button class="edit-button">✏</button>
                      <button class="delete-button">✖</button>
                  </div>
              </div>
              `)
          })
      }) 
      
  }

async function renderNewPrayer(userId, prayerId, username, title, description, completed, created) {
//    let date = created.toDate().toDateString()
    document.querySelector('.render-prayers').insertAdjacentHTML('afterbegin', `
        <div class="prayer-${prayerId} md:mt-16 mt-8 space-y-8">
            <div class="md:mx-0 mx-4">
                <span class="font-bold text-xl">${title}</span>
            </div>

            <div>
                <span class="text-m black">Prayer request submitted ${created}</span>
            </div>

            <div>
                <span class="text-m black">${description}</span>
            </div>

            <div class="text-3xl md:mx-0 mx-4">
                <button class="completed-button">✅</button>
                <button class="edit-button">✏</button>
                <button class="delete-button">✖</button>
            </div>
        </div>
    `)

    document.querySelector(`.prayer-${prayerId} .completed-button`).addEventListener('click', async function(event) {
        event.preventDefault()
        console.log(`prayer ${prayerId} completed!`)
        
        await db.collection('prayers').doc(prayerId).set({
            userId: userId,
            username: username, 
            title: title,
            description: description,
            completed: "true", 
            created: created
        })    
    })
    
    document.querySelector(`.prayer-${prayerId} .delete-button`).addEventListener('click', async function(event) {
        event.preventDefault()
        await db.collection('prayers').doc(prayerId).delete()
        document.querySelector(`.prayer-${prayerId}`).classList.add("hidden")
        console.log(`prayer ${prayerId} deleted`)

    })
    
    document.querySelector(`.prayer-${prayerId} .edit-button`).addEventListener('click', async function(event) {
        event.preventDefault()
        document.querySelector(`.prayer-${prayerId}`).innerHTML = `
        <div>
            <form class="w-full mt-8 edit-prayer-${prayerId}">
                <div class="md:mx-0 mx-4">
                <span class="font-bold text-xl">Title:</span>
                </div>
                <input type="text" id="edit-title" name="edit-title" placeholder="${title}" class="my-2 p-2 w-64 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500">
                <div class="md:mx-0 mx-4">
                <span class="font-bold text-xl">Description:</span>
                </div>                
                <input type="text" id="edit-description" name="edit-description" placeholder="${description}" class="my-2 p-2 w-64 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500">
                <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl submit-edit-${prayerId}">Edit</button>
            </form>
        </div>
        `

        document.querySelector(`.edit-prayer-${prayerId}`).addEventListener('submit', async function(event) {
        
            event.preventDefault()
            
            let editedTitle = document.querySelector('#edit-title').value
            let editedDescription = document.querySelector('#edit-description').value
            let docRef = await db.collection('prayers').doc(prayerId).set({ 
                userId: userId,
                username: username, 
                title: editedTitle,
                description: editedDescription,
                completed: completed, 
                created: created,
                edited: firebase.firestore.FieldValue.serverTimestamp()
            })

            document.querySelector(`.edit-prayer-${prayerId}`).classList.add("hidden")
            
            document.querySelector(`.prayer-${prayerId}`).insertAdjacentHTML('beforeend', `
            <div class="prayer-${prayerId} md:mt-16 mt-8 space-y-8">
                <div class="md:mx-0 mx-4">
                    <span class="font-bold text-xl">${editedTitle}</span>
                </div>

                <div>
                    <span class="text-m black">Prayer request submitted ${created}</span>
                </div>

                <div>
                    <span class="text-m black">${editedDescription}</span>
                </div>

                <div class="text-3xl md:mx-0 mx-4">
                    <button class="completed-button">✅</button>
                    <button class="edit-button">✏</button>
                    <button class="delete-button">✖</button>
                </div>
            </div>
            `)
        })
    }) 
    
}
  
  