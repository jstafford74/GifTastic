
var gifApiKey = "pKiLNKQV2SjERLUPH7vMCwMB42eoCBYN";
var topic = "";
var gifLimit = 10;
var gifRating = "r";
var topics = ["Conan Obrien", "Awkward", "Excited", "Drunk", "Mind Blown", "Halloween", "Tom Brady"];
var gifClasses = [];


$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    console.log(topics);
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
   console.log($(this));
    // var state = $(this).attr("data-state");
    // if (state === "still") {
    //     $(this).attr("src", $(this).attr("data-animate"));
    //     $(this).attr("data-state", "animate");
    // } else {
    //     $(this).attr("src", $(this).attr("data-still"));
    //     $(this).attr("data-state", "still");
    // }
});

function renderButtons() {
    $("#button-view").empty();
    
    for (var i = 0; i < topics.length; i++) {
        var gifBut = $('<button>');
        var gifClass = "gif-btn" + i;
        gifBut.addClass(gifClass);
        gifBut.attr("data-topic", topics[i]);
        gifBut.text(topics[i]);
        $("#button-view").append(gifBut);
    }
}

function displayGif() {
    $('button').click(function () {
        var item = $(this);
        var topiq = item[0].dataset.topic;
        var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + topiq + "&api_key=" + gifApiKey + "&limit=" + gifLimit;
        $.ajax({
            url: gifURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < gifLimit; i++) {
                gifCard = $("<div>");
                gifCard.addClass('card');
                var gifImg = $("<img>");
                gifImg.attr("class", "card-img-top gif");
                gifImg.attr("src", results[i].images.fixed_height.url);
                gifImg.attr("data-still", results[i].images.fixed_height_still.url);
                gifImg.attr("data-animate", results[i].images.fixed_height.url);
                gifImg.attr("data-state", "still");
                var cardText = $("<div>");
                cardText.addClass("card-body");
                var h = $("<h5>");
                h.addClass('card-title')
                h.text(results[i].title);
                
                var p = $("<p>");
                p.addClass("card-text");
                p.text("Rating: " + results[i].rating);
                cardText.append(h,p);

                gifCard.append(gifImg,cardText);

                $('#gifResults').prepend(gifCard);
            }
        });
    });
}

    


renderButtons();
displayGif();
