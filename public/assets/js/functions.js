$('.modal-trigger').leanModal();
console.log('dsfdsf');

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
