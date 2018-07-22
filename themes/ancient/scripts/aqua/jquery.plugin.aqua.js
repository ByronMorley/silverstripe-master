;(function ($, window, document, undefined) {

    // Baked-in settings for extension
    var defaults = {
        theme: '',  // String (default 'none'): Choices ('aq-atebol-theme' , 'aq-dark-theme' )
        startIndex: 0, //Int : DO NOT CHANGE
        scoreMultiplier: 10,  //Int : change to increase score output value

        onInit: function () {
        }, // Func: User-defined, fires with slider initialisation
        onChange: function () {
        }, // Func: User-defined, fires with transition start
        afterChange: function () {
        }  // Func: User-defined, fires after transition end
    };

    // RS (RefineSlide) object constructor
    var AQ = function (elem, settings) {
        this.$activity = $(elem).addClass('aq-activity');      // Elem: Activity
        this.settings = $.extend({}, defaults, settings, $(elem).data('aqua-opts'));   // Obj: Merged user settings/defaults
        this.$questions = this.$activity.find('.aq-activities > li');
        this.$mainPanel = this.$activity.find('.aq-main-panel');
        this.questions = [];    //array of Question OBJ
        this.currentIndex = this.settings['startIndex'];
        this.questionCount = this.$questions.length;
        this.$nextButton = $(this.$activity.find('.aq-next'));
        this.nextButtonActive = false;

        this.$introText = this.$activity.find('.aq-intro');
        this.$score = this.$activity.find('.aq-score');
        this.score = 0;
        this.scoreCap = 0;  //worked out once questions are init

        this.$tryAgainButton = this.$activity.find('.aq-try-again');
        this.$finishPanel = this.$activity.find('.aq-finish-panel');
        this.$finalScore = this.$activity.find('.aq-final-score');
        this.init();  // Call AQ initialisation method
    };

    // AQ object Prototype
    AQ.prototype = {
        init: function () {
            var _this = this;

            // User-defined function to fire on slider initialisation
            this.settings['onInit']();

            this.$nextButton.on('click', function () {
                if (_this.nextButtonActive) _this.next();
            });

            this.$tryAgainButton.on('click', function () {
                _this.restartActivity();
            });

            this.setup();

        },
        setup: function () {
            var _this = this;

            this.$questions.each(function () {
                _this.questions.push(new Question(this, _this));
            });

            //activate question 1
            this.questions[this.currentIndex].activate();

            this.updateUI();
            this.updateScore();
        },
        updateUI: function () {
            this.deactivateNextButton();
            this.addIntroText();
        },
        next: function () {

            if (this.currentIndex < this.questionCount - 1) {

                //Remove previous question
                this.questions[this.currentIndex].deactivate();
                this.currentIndex++;

                //Add next question
                this.questions[this.currentIndex].activate();

                this.updateUI();
            } else {
                this.finishActivity();
            }
        },
        activateNextButton: function () {
            this.$nextButton.removeClass('inactive');
            this.nextButtonActive = true;

            if (this.currentIndex == this.questionCount - 1) {
                this.$nextButton.text('Finish');
            }
        },
        deactivateNextButton: function () {
            this.$nextButton.addClass('inactive');
            this.nextButtonActive = false;
        },
        addIntroText: function () {
            this.$introText.empty();
            this.$introText.append($('<h3>').text('Question ' + (this.currentIndex + 1) + " of " + this.questionCount))
        },
        updateScore: function () {
            var scoreString = "Score: " + this.score + "/" + this.scoreCap;
            this.$score.empty();
            this.$score.append($('<span>').text(scoreString));
            this.$finalScore.empty();
            this.$finalScore.append($('<span>').text(scoreString));
        },
        addScore: function () {
            this.score += this.settings['scoreMultiplier'];
        },
        finishActivity: function () {
            this.$mainPanel.css('display', 'none');
            this.$finishPanel.css('display', 'block');
        },
        restartActivity: function () {
            this.$mainPanel.css('display', 'block');
            this.$finishPanel.css('display', 'none');
            this.reset();

        },
        reset: function () {

            for (var a = 0; a < this.questions.length; a++) {
                this.questions[a].reset();
            }

            //reset back to question 1
            this.currentIndex = 0;

            //reset the score to zero
            this.score = 0;

            //sort out the next button
            this.$nextButton.text('Next');
            this.deactivateNextButton();

            //activate question
            this.questions[this.currentIndex].activate();
            this.updateUI();
            this.updateScore();
        }
    };

    var Question = function (elem, AQ) {

        this.AQ = AQ;
        this.$elem = $(elem);
        this.$question = this.$elem.find('.activity-question');
        this.$answers = this.$question.find('.aq-answer');
        this.answers = [];          //Array of Answer OBJ
        this.$confirmButton = $(this.$question.find('.aq-confirm'));
        this.confirmButtonActive = false;

        this.$explanationText = this.$question.find('.aq-explanation');
        this.correctAnswerCount = parseInt(this.$question.data('correct'));
        this.selectedCorrectAnswerCount = 0;
        this.hasOneAnswer = (this.correctAnswerCount <= 1);

        this.init();
    };

    Question.prototype = {
        init: function () {

            var _Question = this;

            //setup Answer OBJ
            this.$answers.each(function () {
                _Question.answers.push(new Answer(this, _Question));
            });

            //add Listener to Confirm Button
            this.$confirmButton.on('click', function () {
                _Question.confirm();
            });

            //add potential score count to scoreCap
            this.AQ.scoreCap += (this.correctAnswerCount * this.AQ.settings['scoreMultiplier']);

        },
        activate: function () {
            this.$elem.css('display', 'block');
        },
        deactivate: function () {
            this.$elem.css('display', 'none');
        },
        clearSelected: function () {

            //clear the Selected Dom Elements
            this.$answers.removeClass('selected');

            //clear the Selected Answer OBJ
            for (var a = 0; a < this.answers.length; a++) {
                this.answers[a].selected = false;
            }
        },
        countSelected: function () {

            var count = 0;
            for (var a = 0; a < this.answers.length; a++) {
                if (this.answers[a].selected) count++;
            }
            return count;
        },
        toggleConfirm: function () {
            if (this.countSelected() > 0) {
                this.activateConfirm();
            } else {
                this.deactivateConfirm();
            }
        },
        confirm: function () {
            if (this.confirmButtonActive) {
                for (var a = 0; a < this.answers.length; a++) {
                    this.answers[a].check();
                }
                this.updateExplanationArea();
                this.deactivateConfirm();
                this.AQ.activateNextButton();
                this.addScores();
                this.AQ.updateScore();
            }
        },
        activateConfirm: function () {
            this.$confirmButton.removeClass('inactive');
            this.confirmButtonActive = true;
        },
        deactivateConfirm: function () {
            this.$confirmButton.addClass('inactive');
            this.confirmButtonActive = false;
        },
        explanationText: function () {
            if (this.hasOneAnswer) {
                if (this.selectedCorrectAnswerCount) {
                    return "Correct Answer";
                } else {
                    return "Incorrect Answer";
                }
            } else {
                return "You have got " + this.selectedCorrectAnswerCount + " out of " + this.correctAnswerCount + " Correct."
            }
        },
        updateExplanationArea: function () {
            this.$explanationText.empty();
            this.$explanationText.css('display', 'block').append($('<p>').text(this.explanationText()));
        },
        addScores: function () {
            for (var a = 0; a < this.answers.length; a++) {
                var answer = this.answers[a];
                if (answer.selected && answer.correct) {
                    this.AQ.addScore();
                }
            }
        },
        reset: function () {
            for (var a = 0; a < this.answers.length; a++) {
                this.answers[a].reset();
            }
            this.$elem.css('display', 'none');
            this.$explanationText.css('display', 'none');
            this.selectedCorrectAnswerCount = 0;
        }
    };

    var Answer = function (elem, Question) {

        this.Question = Question;
        this.$answer = $(elem);
        this.id = this.$answer.attr('id');
        this.number = parseInt(this.$answer.data('number'));
        this.selected = false;
        this.correct = (this.$answer.data('answer')) ? true : false;
        this.init();

    };

    Answer.prototype = {
        init: function () {

            var _Answer = this;

            this.$answer.on('click', function () {
                _Answer.click();
            });
        },
        click: function () {
            if (this.selected) {
                this.unselect();
            } else {
                if (this.Question.hasOneAnswer) {
                    this.Question.clearSelected();
                }
                this.select();
            }
            this.Question.toggleConfirm();
        },
        select: function () {
            this.selected = true;
            this.$answer.addClass('selected');
        },
        unselect: function () {
            this.selected = false;
            this.$answer.removeClass('selected');
        },
        check: function () {
            if (this.selected) {
                if (this.correct) {
                    this.Question.selectedCorrectAnswerCount++;
                    this.addTick();
                } else {
                    this.addCross();
                }
            } else {
                if (this.correct) {
                    this.addTick();
                } else {
                    this.fadeOut();
                }
            }
        },
        fadeOut: function () {
            this.$answer.css('opacity', 0.3);
        },
        fadeIn: function () {
            this.$answer.css('opacity', 1);
        },
        addTick: function () {
            this.$answer.addClass('correct');
        },
        removeTick: function () {
            this.$answer.removeClass('correct');
        },
        addCross: function () {
            this.$answer.addClass('incorrect');
        },
        removeCross: function () {
            this.$answer.removeClass('incorrect');
        },
        reset: function () {
            this.unselect();
            this.removeCross();
            this.removeTick();
            this.fadeIn();
        }
    };


    // jQuery plugin wrapper
    $.fn['aqua'] = function (settings) {
        return this.each(function () {
            // Check if already instantiated on this elem
            if (!$.data(this, 'aqua')) {
                // Instantiate & store elem + string
                $.data(this, 'aqua', new AQ(this, settings));
            }
        });
    }
})(jQuery, window, document);