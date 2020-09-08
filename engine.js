$(document).ready(function () {
// Your web app's Firebase configuration
  var firebaseConfig = {
    //YOUR FIREBASE CONFIG 
  };
// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const form = document.querySelector(".signup-form");
form.addEventListener('submit', e => {
    e.preventDefault();
    var email = form.email.value;
    var pass  = form.pass.value;
    
    firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(function () {

          firebase.auth().signInWithEmailAndPassword(email,pass)
          .then(function() {
            window.location.href = 'todoo.html';
          })

        }).catch(function(error){
            alert(error.message);
        })
    
});
const loginForm = document.querySelector(".login-form");
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  var logEmail = loginForm.logemail.value;
  var logPass = loginForm.logpass.value;

  firebase.auth().signInWithEmailAndPassword(logEmail,logPass)
    .then(function() {
      window.location.href = 'todoo.html';
    }).catch(function(error){
      alert(error.message);
    })
});



});
