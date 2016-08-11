
$(".button-collapse").sideNav();

$('.modal-trigger').leanModal({
	dismissible: true, // Modal can be dismissed by clicking outside of the modal
	opacity: .5, // Opacity of modal background
	in_duration: 300, // Transition in duration
	out_duration: 300 // Transition out duration// Ending top style attribute
}
);

function initMap() {
	// marker position
	var austin = {lat:30.407, lng:-97.959};
	var dallas = {lat:32.6945, lng:-96.81996};

	var map = new google.maps.Map(document.getElementById('googleMaps'), {
		center: austin,
		scrollwheel: true,
		zoom: 10


	});

	// set the geolocation to you
	// only works in internet explorer
	// var yourPin = addPin(map,austin);
	// if (navigator.geolocation){
	// 	navigator.geolocation.getCurrentPosition(function(position){
	// 		var pos = {
	// 			lat: position.coords.latitude,
	// 			lng: position.coords.longitude
	// 		};
	// 		yourPin.setPosition(pos);
	// 		addMessage(yourPin, "you are here");
	// 		map.setCenter(pos);
	// 	});
	// }

	var pin = makePin(map, austin);
	var otherpin = makePin(map, dallas);

	var pins =[pin, otherpin];
	fitAll(map,pins);
}

function makePin(map, position){
	var content = '<div id="iw-container">' +
										'<div class="iw-title">{{this.name}}</div>' +

										'<div class="iw-content">' +
											'<img src="http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c7fb9aff59f9/ico/stars/v1/stars_2_half.png" height="25" width="75">' +
											'<div class="iw-subTitle">Contact</div>' +
											'<p>{{this.display_address}}<br>'+
											'<br>Phone: {{this.display_phone}} <br>Website: {{this.url}}'+
											'<br>_______________________________________________</p>'+

											'<div class="iw-subTitle"><a id="xbutton" class="waves-effect waves-light btn xbutton">Add to list</a></div>' +
										'</div>' +

									'</div>';

	// A new Info Window is created and set content
	var infowindow = new google.maps.InfoWindow({
		content: content,
		maxWidth: 350
	});

	// marker options
	var marker = new google.maps.Marker({
		position: position,
		map: map,
		title:"{{this.title}}"
	});

	// This event expects a click on a marker
	// When this event is fired the Info Window is opened.
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});

	// Event that closes the Info Window with a click on the map
	google.maps.event.addListener(map, 'click', function() {
		infowindow.close();
	});

	// *
	// START INFOWINDOW CUSTOMIZE.
	// The google.maps.event.addListener() event expects
	// the creation of the infowindow HTML structure 'domready'
	// and before the opening of the infowindow, defined styles are applied.
	// *
	google.maps.event.addListener(infowindow, 'domready', function() {

		// Reference to the DIV that wraps the bottom of infowindow
		var iwOuter = $('.gm-style-iw');

		/* Since this div is in a position prior to .gm-div style-iw.
		 * We use jQuery and create a iwBackground variable,
		 * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
		*/
		var iwBackground = iwOuter.prev();

		// Removes background shadow DIV
		iwBackground.children(':nth-child(2)').css({'display' : 'none'});

		// Removes white background DIV
		iwBackground.children(':nth-child(4)').css({'display' : 'none'});

		// Moves the infowindow 115px to the right.
		iwOuter.parent().parent().css({left: '0px'});

		// Moves the shadow of the arrow 76px to the left margin.
		iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 170px !important;'});

		// Moves the arrow 76px to the left margin.
		iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 170px !important;'});

		// Changes the desired tail shadow color.
		iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

		// Reference to the div that groups the close button elements.
		var iwCloseBtn = iwOuter.next();

		// Apply the desired effect to the close button
		iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

		// If the content of infowindow not exceed the set maximum height, then the gradient is removed.
		if($('.iw-content').height() < 140){
			$('.iw-bottom-gradient').css({display: 'none'});
		}

		// The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
		iwCloseBtn.mouseout(function(){
			$(this).css({opacity: '1'});
		});
	});
	return marker;
}

function addPin(map, position){
	var marker = new google.maps.Marker({
		position: position,
		map:map
	});
	return marker;
};

function addMessage(marker, message){
	var infowindow = new google.maps.InfoWindow({
		content: message
	});

	marker.addListener("click", function(){
		infowindow.open(marker.get("map"), marker);
	});
}

function fitAll(map, markers){
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < markers.length; i++) {
	 bounds.extend(markers[i].getPosition());
	}
	map.fitBounds(bounds);
}

$("#searchButton").on("click",function(){
	var ck = "hsHd6BVA10xYWbvnZm1i5g";
	var cs = "7KhLRiEPkLUYedLyYwj-lA-WSaE";
	var token = "hqhmDxd8ePISP7dpERvMjjQ3iozrNJ8Z";
	var ts = "jfzDO7m_on8qWK3b1fnDfxVc0YU";
	var searchQuery = $("#searchInput").val();
	console.log(searchQuery);
})
// google.maps.event.addDomListener(window, 'load', initMap);

$(".xbutton").on("click",".container",function(){
	console.log("adding to todolist");
})
