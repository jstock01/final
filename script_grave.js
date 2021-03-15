// BELOW: from when I tried using a netlify function to fetch_notes, in the bible_notes.js
      // let response = await fetch('/.netlify/functions/fetch_notes', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     userId: userId
      //   })
      // })

      // let notes = await response.json()
      // console.log(notes) 
 
 //BELOW: from fetch_prayers.js. two different ways of trying to get the userId required as condition for the pull
    //let queryStringUserId = event.queryStringParameters.userId
    //let currentUserId = firebase.auth().currentUser.uid
 
 //BELOW: 4 different failed attempts at Bible API (on bible_home)

      //1
      // let url = `https://getbible.net/json?scrip=Acts%203:17-4;2:1`
      // let response = await fetch(url)
      // let verseOutput = await response.json()
      // console.log(verseOutput)

    //2  
    // let passage = "John 3:16"
    // let key = "17ce03c143dcb65dabd67475d0d56161c08e42e5"
    // let url = `http://www.esvapi.org/v2/rest/passageQuery?key=${key}&passage=${passage}&include-headings=false&include-footnotes=false&include-audio-link=false&include-short-copyright=false&output-format=plain-text`
    // let url = 'http://www.esvapi.org/v2/rest/passageQuery?key=17ce03c143dcb65dabd67475d0d56161c08e42e5&passage=43011035&include-headings=false&include-footnotes=false&include-audio-link=false&include-short-copyright=false&output-format=plain-text'
    // let response = await fetch(url)
    // let verseOutput = await response.json()
    // console.log(verseOutput)

    //4  
    //   jQuery.ajax({
    //     url:'http://getbible.net/json',
    //     dataType: 'jsonp',
    //     data: 'p=John1&v=kjv',
    //     jsonp: 'getbible',
    //     success:function(json){
    //         // set text direction
    //         if (json.direction == 'RTL'){
    //           var direction = 'rtl';
    //         } else {
    //           var direction = 'ltr'; 
    //         }
    //         // check response type
    //         if (json.type == 'verse'){
    //             var output = '';
    //               jQuery.each(json.book, function(index, value) {
    //                   output += '<center><b>'+value.book_name+' '+value.chapter_nr+'</b></center><br/><p class="'+direction+'">';
    //                     jQuery.each(value.chapter, function(index, value) {
    //                         output += '  <small class="ltr">' +value.verse_nr+ '</small>  ';
    //                         output += value.verse;
    //                         output += '<br/>';
    //                     });
    //                     output += '</p>';
    //               });
    //             jQuery('#scripture').html(output);  // <---- this is the div id we update
    //         } else if (json.type == 'chapter'){
    //             var output = '<center><b>'+json.book_name+' '+json.chapter_nr+'</b></center><br/><p class="'+direction+'">';
    //             jQuery.each(json.chapter, function(index, value) {
    //                 output += '  <small class="ltr">' +value.verse_nr+ '</small>  ';
    //                 output += value.verse;
    //                 output += '<br/>';
    //             });
    //             output += '</p>';
    //             jQuery('#scripture').html(output);  // <---- this is the div id we update
    //         } else if (json.type == 'book'){
    //             var output = '';
    //             jQuery.each(json.book, function(index, value) {
    //                 output += '<center><b>'+json.book_name+' '+value.chapter_nr+'</b></center><br/><p class="'+direction+'">';
    //                 jQuery.each(value.chapter, function(index, value) {
    //                     output += '  <small class="ltr">' +value.verse_nr+ '</small>  ';
    //                     output += value.verse;
    //                     output += '<br/>';
    //                 });
    //             output += '</p>';
    //         });
    //         if(addTo){
    //           jQuery('#scripture').html(output);  // <---- this is the div id we update
    //         }
    //       }
    //     },
    //     error:function(){
    //         jQuery('#scripture').html('<h2>No scripture was returned, please try again!</h2>'); // <---- this is the div id we update
    //      },
    // });


//BELOW: from prayer.js
    
        //Previous code to pull prayers from firebase; now lambda function
        // let currentUserId = firebase.auth().currentUser.uid
        // let getPrayers = await db.collection('prayers').where('userId', '==', currentUserId).orderBy('created', "desc").get()
        // let prayers = getPrayers.docs
        // for (let i=0; i<prayers.length; i++) {
        //     let prayerId = prayers[i].id
        //     let prayerData = prayers[i].data()
        //     let userId = prayerData.userId
        //     let username = prayerData.username
        //     let title = prayerData.title
        //     let description = prayerData.description
        //     let completed = prayerData.completed
        //     let created = prayerData.created
        //     renderPrayer(userId, prayerId, username, title, description, completed, created)
        // }