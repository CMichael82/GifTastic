var topics = ["Kurt Cobain", "Joan Baez", "John Lennon", "Amy Winehouse", "Nina Simone", "Bob Dylan", "Keith Richards", "Michael Jackson", "Jamie Foxx", "Elvis Presley", "Cher"];

var $addButtons = $("#addButtons");
var $showResult = $("#showResult");

function displayGifs() {
	var artist = $(this).attr("data-topic");
	var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" +
		artist + "&api_key=2GJ0qp4kXP8LCKLPFVPuiylHFmdAsNea&limit=10";

	var omdbURL = "https://www.omdbapi.com/?t=" + artist + "&y=&plot=short&apikey=de79b866";
	
	$.ajax({
		url: omdbURL,
		method: "GET"
	}).then(function (movieResponse) {
		console.log(movieResponse);
		var movieDiv = $("<div class='movieDiv'>");
		var title = movieResponse.Title;
		var showTitle = $("<p>").text("Title: " + title);
		var plot = movieResponse.Plot;
		var showPlot = $("<p>").text("Plot: " + plot);
		var year = movieResponse.Year;
		var showYear = $("<p>").text("Released: " + year);
		var posterUrl = movieResponse.Poster;
		var showPoster = $("<img id='poster'>").attr("src", posterUrl);
		showPoster.attr("alt", "Poster Unavailable");
		movieDiv.append(showTitle, showPlot, showYear, showPoster);
		$showResult.prepend(movieDiv);

	});

	$.ajax({
		url: giphyURL,
		method: "GET"
	}).then(function (response) {
		console.log(response);

		var gifResults = response.data;
		for (var i = 0; i < gifResults.length; i++) {
			var gifDiv = $("<div class='gifDiv'>");
			var rating = gifResults[i].rating;
			var displayRating = $("<p>").text("Rating: " + rating)
			var stillURL = gifResults[i].images.fixed_height_still.url;
			var animateURL = gifResults[i].images.fixed_height.url;
			var image = $("<img class='gif'>")
			image.attr("src", stillURL);
			image.attr("data-still", stillURL);
			image.attr("data-state", "still");
			image.attr("data-animate", animateURL);
			gifDiv.append(displayRating, image);
			$showResult.prepend(gifDiv);
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
	var artist = $("#topicInput").val().trim();
	event.preventDefault();
	topics.push(artist);
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
