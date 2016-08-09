$(document).ready(function(){
  $('.modal-trigger').leanModal(
    {
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: 0.5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 300 // Transition out duration// Ending top style attribute
      }
  );
  $(".button-collapse").sideNav();
  var currentURL = window.location.origin;
  $('#signUp').on('click', function(){
    var newUser = {
      firstName: $('#first_name').val().trim(),
      lastName: $('#last_name').val().trim(),
      username: $('#username').val().trim(),
      password: $('#password').val().trim(),
      reenterpassword: $('#reenterpassword').val().trim(),
      email: $('#email').val().trim()
    };
    if(newUser.password === newUser.reenterpassword){ //added this
    $.post(currentURL + "/login/new", newUser ,function(err){
      console.log(err);
      if (err == "alert"){
        alert("That username is taken. Please try another.");
      }
      else {
        window.location.reload();
      }
    });
  }
  else {
    alert("Please make sure you password matches.");
  } //added this 
    return false;
  });

 $('#signInSubmit').on('click', function(){
    function collectInfo(){
      var userInfo = {
        username: $('#username').val().trim(),
        password: $('#password').val().trim()
      };
      var currentURL = window.location.origin;
      $.post(currentURL + '/mylist/:username', userInfo, function(data){
        console.log(data);
      });
      return false;
    }
    formValidate();
  }); //closes out submit button on click 


}); //closes out document.ready 





