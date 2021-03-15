// let firebase = require('./firebase')

// exports.handler = async function(event) {

//     let db = firebase.firestore()
    
//     let fetched_notes = [] 
  
//     console.log(event)

//     let body = JSON.parse(event.body)
//     let userId = body.userId

//   let getNotes = await db.collection('notes').where('userId', '==', userId).orderBy('created', 'desc').get()
//   let notes = getNotes.docs
  
//   for (let i=0; i<notes.length; i++) {
//       let noteId = notes[i].id
//       let noteData = notes[i].data()
//       let userId = noteData.userId
//       let username = noteData.username
//       let reference = noteData.reference
//       let noteContent = noteData.note
//       let created = noteData.created
      
//       fetched_notes.push({
//           userId: userId,
//           noteId: noteId,
//           username: username,
//           reference: reference,
//           noteContent: noteContent,
//           created: created
//       })
//   }
  
//   return {
//     statusCode: 200,
//     body: JSON.stringify(fetched_prayers)
//   }
// }