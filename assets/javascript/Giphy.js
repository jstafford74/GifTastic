
var gifApiKey = "pKiLNKQV2SjERLUPH7vMCwMB42eoCBYN";
var topic = "";
var gifLimit = 10;
var gifRating = "r";
var topics = ["Conan Obrien", "Awkward", "Excitied", "Drunk", "Mind Blown", "Halloween", "Tom Brady"];
var topic = $("#topic-input").val().trim();
var gifLimit = $("#limit-input").val().trim();
var gifRating = $("#rating-input").val().trim();


$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);

    renderButtons();
});

$(".btn-primary").on("click", function (event) {
    var topic = $(this).attr("data-topic");
    var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + gifApiKey + "&limit=" + gifLimit;

    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;

        for (var i = 0; i < gifLimit; i++) {
            var gifCard = $("<div class='card'>");
            var p = $("<p>").text("Rating: " + results[i].rating);

            var gifImg = $("<img>");
            gifImg.attr("class", "card-img-top");
            gifImg.attr("src", results[i].images.fixed_height.url);
            gifImg.attr("data-still", results[i].images.fixed_height_still.url);
            gifImg.attr("data-animate", results[i].images.fixed_height.url);
            gifImg.attr("data-state", "still");
            gifCard.append(p, gifImg);
            $('#gifResults').prepend(gifDiv);
        }
    });
    
});

    $(".gif").on("click", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    function renderButtons() {
        $("#button-view").empty();                     // Deleting the movies prior to adding new movies

        for (var i = 0; i < topics.length; i++) {
            var gifBut = $("<button>");
            gifBut.addClass("btn btn-primary");
            gifBut.attr("data-topic", topics[i]);
            gifBut.attr("type", "button");
            gifBut.text(topics[i]);
            $("#button-view").append(gifBut);
        }
    }

    renderButtons();
