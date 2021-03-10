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
        <button class="text-blue-500 underline pray-humbly">Pray Humbly</button>
      `
      //^ need to add picture and be more nicely formatted to fit in with header

      document.querySelector('.pray-humbly').addEventListener('click', function(event) {
        document.location.href = 'prayer.html'
      })

    //BELOW: 3 different failed attempts at Bible API
    
    // let passage = "John 3:16"
    // let key = "17ce03c143dcb65dabd67475d0d56161c08e42e5"
    // let url = `http://www.esvapi.org/v2/rest/passageQuery?key=${key}&passage=${passage}&include-headings=false&include-footnotes=false&include-audio-link=false&include-short-copyright=false&output-format=plain-text`
    // let url = 'http://www.esvapi.org/v2/rest/passageQuery?key=17ce03c143dcb65dabd67475d0d56161c08e42e5&passage=43011035&include-headings=false&include-footnotes=false&include-audio-link=false&include-short-copyright=false&output-format=plain-text'
    // let response = await fetch(url)
    // let verseOutput = await response.json()
    // console.log(verseOutput)
    
      // let API_KEY = '17ce03c143dcb65dabd67475d0d56161c08e42e5'
      // let API_URL = 'https://api.esv.org/v3/passage/text/'
      // let params = {
      //   q: 'John+11:35'
      // }
      // let headers = {
      //   Authorization: `Token ${API_KEY}`
      // }
      // let response = await fetch(API_URL, {
      //   params: params,
      //   headers: headers
      // })
      // let verseOutput = await response.json()
      // console.log(verseOutput)  
      
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

  