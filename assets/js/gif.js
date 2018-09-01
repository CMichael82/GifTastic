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
			var gifURL = results[i].images.fixed_height_still.url;
			var image = $("<img>")
			image.attr("src", gifURL);
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

renderButtons();

$(document).on("click", ".btn-info", displayGifs);