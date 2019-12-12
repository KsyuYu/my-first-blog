var comments = (function()
{
  var pageSize = 5;
  var lastLoaded = null;

  // Your web app's Firebase configuration
  var firebaseConfig = {
  apiKey: "AIzaSyD4pK729pUEphXuuKkqjzBRSyE75thumt0",
  authDomain: "lviv-web.firebaseapp.com",
  databaseURL: "https://lviv-web.firebaseio.com",
  projectId: "lviv-web",
  storageBucket: "lviv-web.appspot.com",
  messagingSenderId: "624821574846",
  appId: "1:624821574846:web:44ed1938a5a75e6d67d2ef",
  measurementId: "G-KBT1197SYE"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var db = firebase.firestore();
  var commentsRef = db.collection("comments");

  function LoadComments()
  {
    var comments = [];
    var ref = commentsRef
    .orderBy("timestamp", "desc")
    if ( lastLoaded )
    {
      ref = ref.startAfter( lastLoaded )
    }
    ref.limit( pageSize ).get()
    .then( function (querySnapshot) {
      lastLoaded = querySnapshot.docs[querySnapshot.docs.length-1];
      console.log( querySnapshot.docs );
      querySnapshot.forEach( function(doc) {
          var docData = doc.data();
          comments.push( `<div class="comment">
              <div>Name: ${docData.name}</div>
              <div>Email: ${docData.email}</div>
              <div>Rating: ${docData.rating}</div>
              <div>Date: ${new Date(docData.timestamp)}</div>
              <div>${docData.comment}</div>
          </div>` );
      } );
      $("#commentsWrapper").append(comments.join("<hr />") + "<hr />");
    })
  }
  $("#commentsWrapper").html("");
  LoadComments();

  $("#loadmore").click( function() {
    LoadComments();
  } )

  $("#submit").click( function() {

    var rating = $(".rating-area input:checked").length == 0 ? 0 : $(".rating-area input:checked")[0].value;    
    var message;
    message = $( rating > 3 ? "#block2 textarea" : "#block1 textarea" )[0].value;

    commentsRef.add( {
      name: $("#name" )[0].value,
      email: $("#email" )[0].value,
      comment: message,
      rating: rating,
      timestamp: (new Date()).valueOf()
    }).then( function() {
      if ( rating > 0 )
      {
        $(".rating-area input:checked")[0].checked = false;
        $( "#block1 textarea" )[0].value = "";
        $( "#block2 textarea" )[0].value = "";
        $("#name" )[0].value = "";
        $("#email" )[0].value = "";
      }
      $("#commentsWrapper").html("");
      lastLoaded = null;
      LoadComments()
     } );
  } );

})()