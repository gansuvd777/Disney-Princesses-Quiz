$(document).ready(function() {
    //Objects:
    //******
    
        var questions = [{//Question 1
            question: "Which movie dramatizes the meeting of English colonists and American Indians?",
            choices: ["Pocahontas", "The Little Mermaid", "Peter Pan", "Mulan"],
            correct: 0,//index number
            url: ("https://media.giphy.com/media/ZM1GZ5m9Y4R6U/giphy.gif"),
            audiosrc: "assets/audio/gotit2.wav"
        }, {//Question 2
            question: "Which character dresses up as a man to take her father's place in the army?",
            choices: ["Jasmine", "Pocahontas", "Mulan", "Belle"],
            correct: 2,//index number
            url: ("https://media.giphy.com/media/v3zrOsLhw30D6/giphy.gif"),
            audiosrc: "assets/audio/gotit2.wav"
        }, {//Question 3
            question: "A terrible monster kept this princess locked away in a castle; who is she?",
            choices: ["Ariel", "Belle", "Snow White", "Pocahontas"],
            correct: 1,//index number
            url: ("https://media.giphy.com/media/l0DAIsbP4gJt33Dfa/giphy.gif"),
            audiosrc: "assets/audio/gotit2.wav"
        }, {//Question 4
            question: "Which of these characters is not a Disney Princess?",
            choices: ["Snow White", "Cinderella", "Wendy", "Pocahontas"],
            correct: 2,//index number
            url: ("https://media.giphy.com/media/k3qEYZH7P1i0M/giphy.gif"),
            audiosrc: "assets/audio/gotit2.wav"
        }, {//Question 5
            question: "The song 'Some Day My Prince Will Come' was featured in which Disney Princess movie?",
            choices: ["Beauty and the Beast", "Snow White and the Seven Dwarves", "Mulan", "Aladdin"],
            correct: 1,//index number
            url: ("https://media.giphy.com/media/zg0bpSD5KOBwY/giphy.gif"),
            audiosrc: "assets/audio/gotit2.wav"
        }, {//Question 6
            question: "Which princess proved her identity by fitting into a glass slipper?",
            choices: ["Belle", "Jasmine", "Mulan", "Cinderella"],
            correct: 3,//index number
            url: ("https://media.giphy.com/media/yr9UlUm4yd6Kc/giphy.gif"),
            audiosrc: "assets/audio/gotit2.wav"
        }, {//Question 7
            question: "This princess runs away when her father tells her she has to get married.",
            choices: ["Snow White", "Jasmine", "Mulan", "Cinderella"],
            correct: 1,//index number
            url: "https://media.giphy.com/media/X59T7Lg3zdzPO/giphy.gif",
            audiosrc: "assets/audio/gotit2.wav"
        }, {//Question 8
            question: "More than anything in the world, Ariel, the main character of The Little Mermaid, wants:",
            choices: ["to be human", "to live in the sea forever", "to travel the world", "to go to school"],
            correct: 0,//index number
            url: "https://media.giphy.com/media/jarNoneOdIBC8/giphy.gif",
            audiosrc: "assets/audio/gotit2.wav"
        }, {//Question 9
            question: "How many fairies look after Aurora for sixteen years to keep her safe from Maleficent?",
            choices: ["Two", "Three", "Seven", "Five"],
            correct: 1,//index number
            url: "https://media.giphy.com/media/4TqFtS65xaxfW/giphy.gif",
            audiosrc: "assets/audio/gotit2.wav"
        }];
    
    //Variables:
    //**********    
        var currentQuestion = 0;
        var correctAnswers = 0;
        var incorrectAnswers = 0;
        var outOfTimeQuestions = 0;
        var number = 15;
        var intervalId;
        var question;
        var questionClass;
        var choiceList;
        var numChoices;
        var audio = new Audio();
    
    //Srart the game on click and hide the button #start
    //***************************************************
    
    $("#start").click(function() {
        $("#start").hide();
        reset();
    });
    // Conditions if correct answer --> this happens || else --> this happens. Give correct answer information.
    //*********************************************************************************************************
        function game() {

            $(".list-group-item").click(function() {
                var value = $(".list-group-item").index(this);
                // console.log(value);
                if (value === questions[currentQuestion].correct) {
                    stop();
                    // console.log("clicked right answer!");
                    correctAnswers++;
                    breakTimeCorrect();
                }
                else {
                    stop();
                    // console.log("clicked wrong answer");
                    incorrectAnswers++;
                    breakTimeIncorrect();
                };

            });
        };
    
        function playRight() {
            audio.src = questions[currentQuestion].audiosrc;
            // console.log(audio);
            audio.load();
            audio.play();
        }
        function playWrong() {
            audio.src = "assets/audio/focus.wav";
            // console.log(audio);
            audio.load();
            audio.play();
        }
        function breakTimeCorrect() {
            playRight();
            $(".timeLeft").html("Correct!");
            $(".question").html("<img src='" + questions[currentQuestion].url + "'/>");
            $(".choiceList").hide();
            setTimeout(function() {
                $(".timeLeft").html(number);
                $(".result").hide();
                $(".choiceList").show();
                nextQuestion();
            }, 3000);
    
        }
    
        function breakTimeIncorrect() {
            playWrong();
            var j = questions[currentQuestion].correct;
            $(".timeLeft").html("WRONG! Correct answer is " + questions[currentQuestion].choices[j]);
            $(".question").html("<img src='" + questions[currentQuestion].url + "'/>");
            $(".choiceList").hide();
            setTimeout(function() {
                $(".timeLeft").html(number);
                $(".result").hide();
                $(".choiceList").show();
                nextQuestion();
            }, 3000);
        };
    
        function nextQuestion() {
            $(".result").unbind();
            currentQuestion++;
            if (currentQuestion < questions.length) {
                displayQuestion();
            }
            else {
                displayScore();
            };
        };
    
        function displayScore() {
            audio.src = "assets/audio/Reflection.mp3";
            audio.play();
            $(".timeLeft").empty();
            $(".question").html("<img src='assets/images/bg.jpg'/>");
            $(".choiceList").hide();
            $("#start").html("Play Again").show().click(function() {
                audio.stop();
                reset();
                });
            $(".result").html("Correct answers: " + correctAnswers + "<br> Incorrect answers: " + incorrectAnswers + "<br>Unanswered Questions: " + outOfTimeQuestions);
            $(".result").show();
        };
    
        function reset() {
            currentQuestion = 0;
            correctAnswers = 0;
            incorrectAnswers = 0;
            outOfTimeQuestions = 0;
            $(".choiceList").show();
            $(".timeLeft").show();
            $(".result").hide();
            $("#up").show();
            displayQuestion();
        }

        function displayQuestion() {
            $("#start").hide();
            timer();
            question = questions[currentQuestion].question;
            // console.log("current question: " + question);
            questionClass = $(".quizContainer").find(".question");
            choiceList = $(".quizContainer").find(".choiceList");
            numChoices = questions[currentQuestion].choices.length;
            // console.log("current answer index: " + questions[currentQuestion].correct);
    
            // Set the questionClass to the current question
            $(questionClass).html(question);
    
            // Remove all current <li> elements (if any)
            $(choiceList).find(".list-group-item").remove();
    
            var choice;
            for (i = 0; i < numChoices; i++) {
                choice = questions[currentQuestion].choices[i];
                $("<button type='button' class='list-group-item'>" + choice + "</button>").appendTo(choiceList);
            };
            game();
    
        }; 
        
    // Seting timer time
    //==================
        function timer() {
            intervalId = setInterval(decrement, 1000);
    
        };
    
        function decrement() {
            number--;
            $(".timeLeft").html("<h3>" + number + "</h3>");
            if (number === 0) {
                stop();
                number = 15;
                outOfTimeQuestions++;
                // console.log("out of time");
                breakTimeIncorrect();
            };
        };
    //Stop counting function
    //======================
        function stop() {
            clearInterval(intervalId);
            number = 15;
        };
    // adding extra digital clock :)
        function clock() {
            var fullDate = new Date();
            var hours = fullDate.getHours();
            var mins = fullDate.getMinutes();
            var secs = fullDate.getSeconds();
        
            if (hours <10){
                hours = "0" + hours;
            }
            if (mins<10) {
                mins = "0" + mins;
            }
            if (secs < 10) {
                secs = "0" + secs;
            }
            document.getElementById("hour").innerHTML = hours;
            document.getElementById("minute").innerHTML = ":" + mins;
            document.getElementById("second").innerHTML = ":" + secs;
        
        }
        setInterval(clock, 100);
    //ending document.ready
    });  