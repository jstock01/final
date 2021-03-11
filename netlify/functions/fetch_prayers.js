let firebase = require('./firebase')

exports.handler = async function(event) {

    let db = firebase.firestore()
    
    let fetched_prayers = [] 
  
    console.log(event)

    let body = JSON.parse(event.body)
    let userId = body.userId

  let getPrayers = await db.collection('prayers').where('userId', '==', userId).orderBy('created', 'desc').get()
  let prayers = getPrayers.docs
  
  for (let i=0; i<prayers.length; i++) {
      let prayerId = prayers[i].id
      let prayerData = prayers[i].data()
      let userId = prayerData.userId
      let username = prayerData.username
      let title = prayerData.title
      let description = prayerData.description
      let completed = prayerData.completed
      let created = prayerData.created
      
      fetched_prayers.push({
          userId: userId,
          prayerId: prayerId,
          username: username,
          title: title,
          description: description,
          completed: completed,
          created: created
      })
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(fetched_prayers)
  }
}