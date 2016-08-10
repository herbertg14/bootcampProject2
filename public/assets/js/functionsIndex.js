// $( document ).ready(function(){

// })

$(".button-collapse").sideNav();

$('.modal-trigger').leanModal({
	dismissible: true, // Modal can be dismissed by clicking outside of the modal
	opacity: .5, // Opacity of modal background
	in_duration: 300, // Transition in duration
	out_duration: 300 // Transition out duration// Ending top style attribute
}
);

function initMap() {
// Create a map object and specify the DOM element for display.
var map = new google.maps.Map(document.getElementById('googleMaps'), {
  center: {lat: -34.397, lng: 150.644},
  scrollwheel: false,
  zoom: 8
});
}