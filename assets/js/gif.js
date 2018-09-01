var topics = ["Blizzard", "Clouds", "Cyclone", "Derecho", "Fog", "Hailstorm", "Hurricane", "Lightening", "Rainbow", "Snowstorm", "Windy"];

var $addButtons = $("#addButtons");
var $showImages = $("#showImages");

function displayGifs() {
	var weather = $(this).attr("data-topic");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		weather + "&api_key=2GJ0qp4kXP8LCKLPFVPuiylHFmdAsNea";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		console.log(response);

		var results = response.data;
		for (var i = 0; i < 10; i++) {
			var gifDiv = $("<div>");
			var stillURL = results[i].images.fixed_height_still.url;
			var animateURL = results[i].images.fixed_height.url;
			var image = $("<img class='gif'>")
			image.attr("src", stillURL);
			image.attr("data-still", stillURL);
			image.attr("data-state", "still");
			image.attr("data-animate", animateURL);
			gifDiv.append(image);
			var rating = results[i].rating;
			var displayRating = $("<p>").text("Rating: " + rating)
			gifDiv.append(displayRating);
			$showImages.prepend(gifDiv);
		}
	});
}


function renderButtons() {
	$addButtons.empty();

	for (var i = 0; i < topics.length; i++) {
		var button = $("<button>");
		button.addClass("btn btn-info");
		button.attr("data-topic", topics[i]);
		button.text(topics[i]);
		$addButtons.append(button);
	}
}

$("#addTopic").on("click", function (event) {
	var weather = $("#topicInput").val().trim();
	event.preventDefault();
	topics.push(weather);
	renderButtons();
});



function animatePause() {
	var state = $(this).attr("data-state");
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
}

renderButtons();

	$(document).on("click", ".btn-info", displayGifs);
	$(document).on("click", ".gif", animatePause);
