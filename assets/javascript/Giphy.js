
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
    console.log('hi')
    renderButtons();
});



// $("#topic-button").on("click", function () {

// var topic = $(this).attr("data-topic");
// var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + gifApiKey + "&limit=" + gifLimit;
//     console.log("click");
//     console.log("click2");
// });
// $.ajax({
//     url: gifURL,
//     method: "GET"
// }).then(function (response) {
//     console.log(response);
//     var results = response.data;

//     for (var i = 0; i < gifLimit; i++) {
//         var gifCard = $("<div class='card'>");
//         var p = $("<p>").text("Rating: " + results[i].rating);

//         var gifImg = $("<img>");
//         gifImg.attr("class", "card-img-top");
//         gifImg.attr("src", results[i].images.fixed_height.url);
//         gifImg.attr("data-still", results[i].images.fixed_height_still.url);
//         gifImg.attr("data-animate", results[i].images.fixed_height.url);
//         gifImg.attr("data-state", "still");
//         gifCard.append(p, gifImg);
//         $('#gifResults').prepend(gifDiv);
//     }
// });

// });

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
    $("#button-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var gifBut = $('<button>');
        gifBut.addClass("gif-btn" + i);
        gifBut.attr("data-topic", topics[i]);
        gifBut.text(topics[i]);
        $("#button-view").append(gifBut);
        $(".gif-btn" + i).click(function () {
            var gifTopic = $(this);
            var topic = gifTopic[0].dataset.topic;
            var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + gifApiKey + "&limit=" + gifLimit;

            $.ajax({
                url: gifURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var results = response.data;
debugger;
                for (var i = 0; i < gifLimit; i++) {
                    var gifCard = $('<div>');
                    gifCard.addClass('card-body');
                    var h = $('<h5>');
                    h.addClass('card-title')
                    h.text(results[i].title);
                    var p = $("<p>");
                    p.text("Rating: " + results[i].rating);
                    debugger;
                    var gifImg = $("<img>");
                    gifImg.attr("class", "card-img-top");
                    gifImg.attr("src", results[i].images.fixed_height.url);
                    gifImg.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImg.attr("data-animate", results[i].images.fixed_height.url);
                    gifImg.attr("data-state", "still");
                    gifCard.append(h,p, gifImg);
                    $('#gifResults').prepend(gifDiv);
                }
            });


        });
    }
}

//  $(".gif-btn" + i).click(function() {
//     console.log($(this));
// });

renderButtons();
