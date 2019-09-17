
//---------------Initialize Firebase (YOUR OWN APP)------------------------
var firebaseConfig = {
    apiKey: "AIzaSyAlRsXALoi52VoaIuSpgtxUsWV3w-l6BPY",
    authDomain: "classproj-c95fe.firebaseapp.com",
    databaseURL: "https://classproj-c95fe.firebaseio.com",
    projectId: "classproj-c95fe",
    storageBucket: "",
    messagingSenderId: "813898612157",
    appId: "1:813898612157:web:e01fb2f037bebac48d26d4"
};

//----------------Initialize Firebase-------------------------------
firebase.initializeApp(firebaseConfig);

//----------------Set Variables--------------------
var database = firebase.database();
var initialValue = 0;
var gifApiKey = "pKiLNKQV2SjERLUPH7vMCwMB42eoCBYN";
var topics = ["Conan Obrien", "Awkward", "Excited", "Drunk", "Mind Blown", "Halloween", "Tom Brady"];
var gifLimit = 10;
var gifRating = "r";
var gifClasses = [];
var topic = topics[3];
// Use the below variable clickCounter to keep track of the clicks.
var clickCounter = initialValue;


// Set Database Notation--------------------------------------------------------------
database.ref('b/').set({
    clickCount: clickCounter,
    topics: topics,
    activeTopic: topic
});

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + gifApiKey + "&limit=" + gifLimit;
    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        clickCounter++;
        database.ref('b/').set({
            clickCount: clickCounter,
            topics: topics,
            activeTopic: topic
        });

        renderButtons();
        renderCard(results);
    });
});

function renderButtons() {
    $("#button-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var gifLi = $('<li>');
        var gifBut = $('<button>');
        var gifClass = "gif-btn" + i;
        gifBut.addClass("btn btn-outline-success btn-lg");
        gifBut.attr("data-topic", topics[i]);
        gifBut.attr("type", "button");
        gifBut.text(topics[i]);
        gifLi.append(gifBut);
        $("#button-view").prepend(gifLi);
    }
}

function renderCard(item) {
    item = $(this);
    var topiq = item[0].dataset.topic;
    var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + topiq + "&api_key=" + gifApiKey + "&limit=" + gifLimit;
    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function () {
        var results = response.data;
        for (var i = 0; i < gifLimit; i++) {
            gifCard = $("<div>");
            gifCard.addClass('card border-success mb-3');
            gifCard.attr('style', 'max-width: 18rem');
            var gifImg = $("<img>");
            gifImg.addClass("card-img-top gif");
            gifImg.attr("src", results[i].images.fixed_height_still.url);
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
            cardText.append(h, p);
            gifCard.append(gifImg, cardText);
            $('#gifResults').prepend(gifCard);
        }
    });
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

            var results = response.data;
            // renderCard(results);
            for (var i = 0; i < gifLimit; i++) {
                gifCard = $("<div>");
                gifCard.addClass('card border-success mb-3');
                gifCard.attr('style', 'max-width: 18rem');
                var gifImg = $("<img>");
                gifImg.addClass("card-img-top gif");
                gifImg.attr("src", results[i].images.fixed_height_still.url);
                gifImg.attr("data-still", results[i].images.fixed_height_still.url);
                gifImg.attr("data-animate", results[i].images.fixed_height.url);
                gifImg.attr("data-state", "still");
                var cardText = $("<div>");
                cardText.addClass("card-body");
                var h = $("<h5>");
                h.addClass('card-title')
                h.text("Title: " + results[i].title);
                var p = $("<p>");
                p.addClass("card-text");
                p.text("Rating: " + results[i].rating);
                cardText.append(h, p);
                gifCard.append(gifImg, cardText);
                $('#gifResults').prepend(gifCard);
            }

        });
    });
}

$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});




renderButtons();
displayGif();
