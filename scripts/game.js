function game() {
    var contect = $("<div/>").attr("id", "contect").appendTo("body");
    var game = $("<div/>").attr("id", "game").appendTo("#contect");
    var ball = $("<div/>").attr("id", "ball").appendTo("#game");
    var paddleA = $("<div/>").attr("id", "paddleA").appendTo("#game");
    var paddleB = $("<div/>").attr("id", "paddleB").appendTo("#game");
    var score = $("<div/>").attr("id", "score").appendTo("#contect");
    var scorepaddleA = $("<div/>").attr("id", "scorepaddleA").appendTo("#score")
    $("#scorepaddleA").text("0")
    var scorepaddleB = $("<div/>").attr("id", "scorepaddleB").appendTo("#score")
    $("#scorepaddleB").text("0")

    var ball = {
        speed: 3,
        x: 290,
        y: 140,
        directionX: 1,
        directionY: 1,
        width: $("#ball").width(),
        height: $("#ball").height()
    };


    var scores = {
        playerA: 0,
        playerB: 0,
    }




    var pA = {
        speed: 3,
        x1: $("#paddleA").position().left,
        x2: $("#paddleA").position().left + $("#paddleA").width(),
        y1: $("#paddleA").position().top,
        y2: $("#paddleA").position().top + $("#paddleA").height(),
        update: function () {
            this.y1 = $("#paddleA").position().top;
            this.y2 = this.y1 + $("#paddleA").height();
        }
    };
    var pB = {
        speed: 3,
        x1: $("#paddleB").position().left,
        x2: $("#paddleB").position().left + $("#paddleB").width(),
        y1: $("#paddleB").position().top,
        y2: $("#paddleB").position().top + $("#paddleB").height(),
        update: function () {
            this.y1 = $("#paddleB").position().top;
            this.y2 = this.y1 + $("#paddleB").height();
        }
    };

    //Set main loop to be called on the desired frame rate
    setInterval(gameLoop, 1000 / 60);

    // Main loop of the game
    function gameLoop() {
        moveBall();
        movepaddleA();
        movepaddleB();
    }

    var pauseBall = false;


    // Control movement of the ball doing collision checking
    function moveBall() {
        var gameWidth = parseInt($("#game").width());
        var gameHeight = parseInt($("#game").height());

        if (pauseBall) return;

        // Check collision to the bottom border and change the moving orientation on Y axis
        if (ball.y + ball.speed * ball.directionY > (gameHeight - parseInt($("#ball").height()))) {
            ball.directionY = -1
        }

        // Check collision to the top border and change the moving orientation on Y axis
        if (ball.y + ball.speed * ball.directionY < 0) {
            ball.directionY = 1
        }

        // Check collision to the left border and change the moving orientation on X axis
        if (ball.x + ball.speed * ball.directionX > (gameWidth - parseInt($("#ball").width()))) {
            ball.directionX = -1
            score.playerA = score.playerA + 1;
            console.log(score.playerA);
            ball.x = 290;
            ball.y = 140;
            pauseBall = true;
            $("#ball").animate({ "left": ball.x, "top": ball.y }, 2000, function () { pauseBall = false; });
            return;
        }

        // Check collision to the right border and change the moving orientation on X axis
        if (ball.x + ball.speed * ball.directionX < 0) {
            ball.directionX = 1
            score.playerB = score.playerB + 1;
            console.log(score.playerB);
            ball.x = 290;
            ball.y = 140;
            pauseBall = true;
            $("#ball").animate({ "left": ball.x, "top": ball.y }, 2000, function () { pauseBall = false; });
            return;
        }

        // Left collision with paddleA
        if (ball.x + ball.speed * ball.directionX < pA.x2) {
            if (pA.y1 < ball.y && ball.y < pA.y2) {
                ball.directionX = 1
            }
        }

        if (ball.x + ball.speed * ball.directionX < pA.x2 &&
            ball.y + ball.speed * ball.directionY > pA.y1 &&
            ball.y + ball.speed * ball.directionY < pA.y2) {
            ball.directionX = 1
        }

        // Left collision with paddleB
        if (ball.x + ball.speed * ball.directionX + ball.width > pB.x1 &&
            ball.y + ball.speed * ball.directionY + ball.width > pB.y1 &&
            ball.y + ball.speed * ball.directionY + ball.width < pB.y2) {
            ball.directionX = -1
        }

        // Update ball position on X and Y axes based on speed and orientation
        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;
        //ball.y = 140


        // Render the updated ball position
        $("#ball").css({ "left": ball.x, "top": ball.y });
    };




    var paddleA = $("#paddleA");
    var directions = {};
    var speed = 4;

    $('html').keyup(stop).keydown(charMovement);

    function charMovement(e) {
        directions[e.which] = true;
        //console.log(directions);
    }

    function stop(e) {
        delete directions[e.which];
        //console.log(directions);

    }

    function movepaddleA(e) {
        for (var i in directions) {

            if (paddleA.position().top > 0 && i == 87) {
                paddleA.css("top", (paddleA.position().top - speed) + "px");
            }

            if (paddleA.position().top < ($("#game").height() - paddleA.height()) && i == 83) {
                paddleA.css("top", (paddleA.position().top + speed) + "px");
            }
        }
        pA.update();
        pB.update();
    }



    var paddleB = $("#paddleB");

    function movepaddleB(e) {
        for (var i in directions) {

            if (paddleB.position().top > 0 && i == 38) {
                paddleB.css("top", (paddleB.position().top - speed) + "px");
            }

            if (paddleB.position().top < ($("#game").height() - paddleB.height()) && i == 40) {
                paddleB.css("top", (paddleB.position().top + speed) + "px");
            }
        }
    }


}