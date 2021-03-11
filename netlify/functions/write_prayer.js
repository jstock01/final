let firebase = require('./firebase')

exports.handler = async function(event) {

    let db = firebase.firestore()

    let body = JSON.parse(event.body)
    console.log(body)

    let userId = body.userId
    let username = body.username
    let title = body.title
    let description = body.description
    let completed = body.completed
    let created = firebase.firestore.FieldValue.serverTimestamp()

    let new_prayer = {
        userId: userId,
        username: username,
        title: title,
        description: description,
        completed: completed,
        created: created
    }

    let docRef = await db.collection('prayers').add(new_prayer)
    new_prayer.prayerId = docRef.id 

  return {
    statusCode: 200,
    body: JSON.stringify(new_prayer)
  }
}