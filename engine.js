$(document).ready(function () {
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD12buq5_DkBh-f72MlHjMhf0BRm3YVx78",
    authDomain: "simple-form-d5845.firebaseapp.com",
    databaseURL: "https://simple-form-d5845.firebaseio.com",
    projectId: "simple-form-d5845",
    storageBucket: "simple-form-d5845.appspot.com",
    messagingSenderId: "556432062799",
    appId: "1:556432062799:web:213d877116402bb4ebad3a"
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