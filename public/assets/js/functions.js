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
      email: $('#email').val().trim()
    };
    $.post(currentURL + "/login/new", newUser ,function(err){
      console.log(err);
      if (err){
        alert("That username is taken. Please try another.");
      }
    });
    return false;
  });
});
