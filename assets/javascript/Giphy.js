
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
var storageRef = firebase.database().ref('b/');
var actTop = firebase.database().ref('b/activeTopic');
var initialValue = 0;
var gifApiKey = "pKiLNKQV2SjERLUPH7vMCwMB42eoCBYN";
var topics = ["Conan Obrien", "Awkward", "Excited", "Drunk", "Mind Blown", "Halloween", "Tom Brady"];
var gifLimit = 10;
var gifRating = "r";


// if ($("#topic-input").empty() == true) {
//     console.log("true");
database.ref('b/').on("value", function (snapshot) {
    topic = snapshot.val().activeTopic;
});
// }
// else {
//     topic = $("#topic-input").val().trim();
// }


// Use the below variable clickCounter to keep track of the clicks.
var clickCounter = initialValue;

renderButtons(topics);


// Set Database Notation--------------------------------------------------------------
function write2DB(clickCounter, topics, topic) {
    database.ref('b/').set({
        clickCount: clickCounter,
        topics: topics,
        activeTopic: topics[4]
    });
}

// Initialize Display-----------------------------------------------------------------
// var topic = database.ref('b/activeTopic');
// var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + gifApiKey + "&limit=" + gifLimit;
// $.ajax({
//     url: gifURL,
//     method: "GET"
// }).then(function (response) {
//     var results = response.data;
//     renderCard(results);
// });

$("#add-gif").on("click", function (event) {
    // console.log($(this));

    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);

    database.ref('b/').on("value", function (snapshot) {
        topic = snapshot.val().activeTopic;
    });
    console.log(topic);
    var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + gifApiKey + "&limit=" + gifLimit;
    clickCounter++;
    write2DB(clickCounter, topics, topic);
    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        var gifCard = $("<div>");
        gifCard.addClass('card border-success mb-3');
        gifCard.attr('style', 'max-width: 18rem;max-height: 24rem');
        var gifImg = $("<img>");
        gifImg.addClass("card-img-top gif");
        gifImg.attr("data-state", "still");
        var cardText = $("<div>");
        cardText.addClass("card-body");
        var h = $("<h5>");
        h.addClass('card-title');
        var p = $("<p>");
        p.addClass("card-text");
        for (var i = 0; i < gifLimit; i++) {
            var src = results[i].images.fixed_height_still.url;
            var stillURL = results[i].images.fixed_height_still.url;
            var animeURL = results[i].images.fixed_height.url;
            var title = results[i].title.toUpperCase();
            var rating = results[i].rating.toUpperCase();
            gifImg.attr("src", src[i]);
            gifImg.attr("data-still", stillURL[i]);
            gifImg.attr("data-animate", animeURL[i]);
            h.text("Title: " + title[i]);
            p.text("Rating: " + rating[i]);
            cardText.append(h, p);
            gifCard.append(gifImg, cardText);
            $('#gifResults').prepend(gifCard);

        }


    });
    renderButtons(topics);
});



function renderCard(gifURL) {
    // $.ajax({
    //     url: gifURL,
    //     method: "GET"
    // }).then(function (response) {
    //     var results         = response.data;
    //     var gifCard         = $("<div>");
    //         gifCard.addClass('card border-success mb-3');
    //         gifCard.attr('style', 'max-width: 18rem;max-height: 24rem');
    //     var gifImg          = $("<img>");
    //         gifImg.addClass("card-img-top gif");
    //         gifImg.attr("data-state", "still");
    //     var cardText        = $("<div>");
    //     cardText.addClass("card-body");
    //     var h               = $("<h5>");
    //         h.addClass('card-title');
    //     var p               = $("<p>");
    //         p.addClass("card-text");
    //     for (var i = 0; i < gifLimit; i++) {
    //         var src             = results[i].images.fixed_height_still.url;
    //         var stillURL        = results[i].images.fixed_height_still.url;
    //         var animeURL        = results[i].images.fixed_height.url;
    //         var title           = results[i].title.toUpperCase();
    //         var rating          = results[i].rating.toUpperCase();
    //         gifImg.attr("src", src[i]);
    //         gifImg.attr("data-still", stillURL[i]);
    //         gifImg.attr("data-animate", animeURL[i]);
    //         h.text("Title: " + title[i]);
    //         p.text("Rating: " + rating[i]);
    //         cardText.append(h, p);
    //         gifCard.append(gifImg, cardText);
    //         $('#gifResults').prepend(gifCard);

    //     }


    // });

}

function renderButtons(topics) {
    $("#button-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var topic = topics[i].replace(" ", "");
        var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + gifApiKey + "&limit=" + gifLimit;

        var gifLi = $('<li>');
        var gifBut = $('<button>');

        gifBut.addClass("btn btn-outline-success btn-lg");
        gifBut.attr("data-topic", topics[i]);
        gifBut.attr("formaction", gifURL);
        gifBut.attr("type", "submit");
        gifBut.attr("name", "viewGIF");
        gifBut.attr("value", topics[i]);
        gifBut.text(topics[i].toUpperCase());
        gifLi.append(gifBut);
        $("#button-view").prepend(gifLi);
    }

}



$("button[name='viewGIF']").click(function () {
    var gifURL = $(this)[0].attributes.formaction.value;
    clickCounter++;
    write2DB(clickCounter, topics, topic);
    src = [];
    stillURL = [];
    animeURL = [];
    title = [];
    rating = [];

    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
       

        for (var i = 0; i < gifLimit; i++) {
            src.push(results[i].images.fixed_height_still.url);
            stillURL.push(results[i].images.fixed_height_still.url);
            animeURL.push(results[i].images.fixed_height.url);
            title.push(results[i].title.toUpperCase());
            rating.push(results[i].rating.toUpperCase());
            var gifCard = $("<div>");
            gifCard.addClass('card border-success mb-3');
            gifCard.attr('style', 'max-width: 18rem;max-height: 24rem');
            var gifImg = $("<img>");
            gifImg.addClass("card-img-top gif");
            gifImg.attr("data-state", "still");
            var cardText = $("<div>");
            cardText.addClass("card-body");
            var h = $("<h5>");
            h.addClass('card-title');
            var p = $("<p>");
            p.addClass("card-text");
            gifImg.attr("src", src[i]);
            gifImg.attr("data-still", stillURL[i]);
            gifImg.attr("data-animate", animeURL[i]);
            h.text("Title: " + title[i]);
            p.text("Rating: " + rating[i]);
            cardText.append(h, p);
            gifCard.append(gifImg, cardText);
            $('#gifResults').prepend(gifCard);

        }


    });
});





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





