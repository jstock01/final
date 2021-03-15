let firebase = require('./firebase')

exports.handler = async function(event) {

    let db = firebase.firestore()

    let body = JSON.parse(event.body)
    console.log(body)


    let userId = body.userId
    let username = body.username
    let reference = body.reference
    let note = body.note
    let created = firebase.firestore.FieldValue.serverTimestamp()

    let new_note = {
        userId: userId,
        username: username,
        reference: reference,
        note: note,
        created: created    
    }

    let docRef = await db.collection('notes').add(new_note)
    new_note.noteId = docRef.id 

  return {
    statusCode: 200,
    body: JSON.stringify(new_note)
  }
}