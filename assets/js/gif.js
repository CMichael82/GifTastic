//GLOBAL VARIABLES//
var topics = ["Joan Baez", "David Bowie", "Cher", "Kurt Cobain","Bob Dylan", "Elvis", "Eminem", "Jamie Foxx", "Michael Jackson", "John Lennon", "Keith Richards", "Nina Simone", "Amy Winehouse"];

var $addButtons = $("#addButtons");
var $showResult = $("#showResult");

//FUNTIONS//

//Add Buttons to the DOM//
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

//Allow user to add artist from an input field//
$("#addTopic").on("click", function (event) {
	var artist = $("#topicInput").val().trim();
	event.preventDefault();
	topics.push(artist);
	renderButtons();
});

//Link information from APIs and Display//
function displayResults() {
	var artist = $(this).attr("data-topic");
	var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" +
		artist + "&api_key=2GJ0qp4kXP8LCKLPFVPuiylHFmdAsNea&limit=10";

	var omdbURL = "https://www.omdbapi.com/?t=" + artist + "&y=&plot=short&apikey=de79b866";
	
	//Pull movie information from OMDB and add to DOM//
	$.ajax({
		url: omdbURL,
		method: "GET"
	}).then(function (movieResponse) {
		console.log(movieResponse);
		//Create new variables and HTML elements//
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
		//Attach the new variables/Elements to the DOM//
		movieDiv.append(showTitle, showPlot, showYear, showPoster);
		$showResult.prepend(movieDiv);

	});

	//Pull information from GIFPHY API//
	$.ajax({
		url: giphyURL,
		method: "GET"
	}).then(function (response) {
		console.log(response);
		var gifResults = response.data;
		for (var i = 0; i < gifResults.length; i++) {

			//Create new variables and HTML elements//
			var gifDiv = $("<div class='gifDiv'>");
			var rating = gifResults[i].rating;
			var displayRating = $("<p>").text("Rating: " + rating);
			var title = gifResults[i].title;
			var displayTitle =$("<p>").text("Title: " + title);
			var stillURL = gifResults[i].images.fixed_height_still.url;
			var animateURL = gifResults[i].images.fixed_height.url;
			var image = $("<img class='gif'>")
			image.attr("src", stillURL);
			image.attr("data-still", stillURL);
			image.attr("data-state", "still");
			image.attr("data-animate", animateURL);
		
			//Add a favorites button for each gif with URLs that can be animated later//
			var favorites = $("<button class='favorite'>");
			favorites.text("Add to Favorites");
			favorites.attr("data-favStill", stillURL);
			favorites.attr("data-favAnimate", animateURL);
			showFavorites = $("<p>").append(favorites);

			//Attach the new variables/Elements to the DOM//
			gifDiv.append(displayRating,displayTitle, image, showFavorites);
			$showResult.prepend(gifDiv);
		}
	});
}

//Allow user to animate or pause GIFs//
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

//Allow user to add GIFs to a Favorites List//
function addToFavorites (){
	var favStill = $(this).attr("data-favStill");
	var favAnimate = $(this).attr("data-favAnimate");
	console.log("you clicked me" + favStill);
	var favDiv =$("<div>");
	var favImage =$("<img class='favImage'>");
	favImage.attr("src", favStill);
	favImage.attr("data-still", favStill);
	favImage.attr("data-state", "still");
	favImage.attr("data-animate", favAnimate);
	favDiv.append(favImage);
	$("#showFavorites").prepend(favDiv);
	}

//CALL-RUN FUNCTIONS
renderButtons();
$(document).on("click", ".btn-info", displayResults);
$(document).on("click", ".gif", animatePause);
$(document).on("click", ".favorite", addToFavorites);
$(document).on("click", ".favImage", animatePause);

