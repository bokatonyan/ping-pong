$(document).ready(menu);
function menu() {
    $("<div/>").attr("id", "map").appendTo("body")
    var pictureImg = $("<img/>").attr("src", "images/tennis.png").css({
        "position": "absolute",
        "width": "70%"
    }).attr("id", "img").appendTo("#map");
    var btn = $("<button/>").attr("id", "btn").text("Play").appendTo("#map");
    btn.click(function () {
        $("body").empty();
        game();

    });

    btn.css({
        "position": "absolute",
        "top": "71%",
        "left": "43%",
        "font-size": "30px"
    });


    var soundImg = $("<img/>").attr("src", "images/sound.png").css({
        "position": "absolute",
        "top": "67%",
        "width": "10%"
    }).attr("id", "img").appendTo("#map");

    var clickSound = $("<audio/>").appendTo("#map");
    clickSound[0].src = "sounds/click.wav";

    soundImg.click(function () {
        clickSound[0].play();
        if ($("div").children("img").attr("src") == "images/sound.png") {
            $("div").children("img").attr("src", "images/soundno.png");
        }
        else {
            $("div").children("img").attr("src", "images/sound.png");
        }
    });
}
