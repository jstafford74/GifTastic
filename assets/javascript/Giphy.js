
//----------------Set Variables--------------------
var gifApiKey = "pKiLNKQV2SjERLUPH7vMCwMB42eoCBYN";
var topics = ["Conan Obrien", "Awkward", "Excited", "Drunk", "Mind Blown", "Halloween", "Tom Brady"];
var gifLimit = 10;
var gifRating = "r";



//-------Add Gif Button--------------------------
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    var gifRating = $("#rating")[0].value;
    var gifLimit = $("#limit")[0].value;
    var gifURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + gifApiKey + "&limit=" + gifLimit;
    src = [];
    stillURL = [];
    animeURL = [];
    title = [];
    rating = [];
    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function (response) {
        results = response.data;
        renderCard(results);
    });
});


function renderCard(results) {
    for (var i = 0; i < gifLimit; i++) {
        src.push(results[i].images.fixed_height_still.url);
        stillURL.push(results[i].images.fixed_height_still.url);
        animeURL.push(results[i].images.fixed_height.url);
        title.push(results[i].title.toUpperCase());
        rating.push(results[i].rating.toUpperCase());
        var gifCard = $("<div>");
        gifCard.addClass('card border-success mb-3');
        gifCard.attr('style', 'max-width: 24rem;max-height: 20rem');
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

}



//----------Render Buttons Function----------------
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


//---------------Any Button Click Function--------------------
$("button[name='viewGIF']").click(function () {
    var gifURL = $(this)[0].attributes.formaction.value;
   console.log($(this));
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
        renderCard(results);
    });

});

//---------Initialize and Change State------------------
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

renderButtons(topics);



