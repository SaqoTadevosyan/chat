// const functions = require("firebase-functions");
// var fetch = require("node-fetch");

// const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);

// exports.sendPushNotification = functions.database
//   .ref("/contacts/{id}")
//   .onCreate((event) => {
//     const root = event.ref.root;
   
//     var messages = [];

//     //return the main promise
//     return root
//       .once("value")
//       .then(function (snapshot) {
//         snapshot.forEach(function (childSnapshot) {
//           var expoToken = childSnapshot.val().expoToken;

//           if (expoToken) {
            
//             messages=[{
//               to: expoToken,
             
//               title: "Original Title",
//               body: "And here is the body!",
             
//             }];
//           }
//           fetch("https://exp.host/--/api/v2/push/send", {
//             method: "POST",
//             headers: {
//                 "Accept": 'application/json',
//                 'Accept-encoding': 'gzip, deflate',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(messages),
//           })
//         });
//       })
      
  });
