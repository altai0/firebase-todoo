$(document).ready(function(){
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
    var current_user = "";
    firebase.auth().onAuthStateChanged(function(user) {

        if(user){
            current_user = user.uid;
            $("#user-text").text(user.email);
            $("#logout").click(function(){
                firebase.auth().signOut()
                    .then(function(){
                        window.location.href = 'index.html';
                    }).catch(function(error){
                        alert(error.message);
                    })
            })
            $(".sendFirebase").click(function(){
                var description = $("#desc").val();
                firebase.database().ref().child("users").child(current_user).child("todos").push(
                    {
                        description : description,
                        completed : false
                    }
                );
                $("#desc").val('');

                
            })
            var todoRef = firebase.database().ref().child("users/"+current_user).child("todos");
                todoRef.on("value", function(snapshot){
                    var parent = $(".todoList").children("tbody");
                    parent.html('');

                    snapshot.forEach(function(item){
                        var key = item.key;
                        var description_elem = "<td>"+ item.val().description +"</td>";
                        var completed = item.val().completed == true ? "checked" : "";
                        var completed_elem = "<td><input  data-key='"+ key +"' type='checkbox' class='switchery-plugin' " + completed +"/></td>";
                        var removeBtn_elem = "<td><button data-key='"+ key +"' class='btn btn-danger btn-block removeBtn'>Sil</button></td>";

                        parent.append("<tr>"+ description_elem + completed_elem + removeBtn_elem + "</tr>");
                        
                    })
                    $(".switchery-plugin").each(function(){
                        new Switchery(this);
                    })
                   
                }) 
                $("body").on("click", ".removeBtn", function(){
                   var $key = $(this).data("key");
                   firebase.database().ref("users/"+current_user).child("todos").child($key).remove();
                })
                $("body").on("change", ".switchery-plugin", function(){
                    var $completed = $(this).prop("checked");
                    var $key = $(this).data("key");
                    firebase.database().ref("users/"+current_user).child("todos").child($key).child("completed").set($completed);
                })
        }else {
            window.location.href = 'index.html';
        }
    })

})