/**
 * Created by huydq on 6/23/14.
 */

var quiz = quiz || {};
var questionList = questionList || [];

quiz.dragDrop = function (q) {

    var bgcolor_recommend_wrapper = "whitesmoke";
    var bgcolor_placeholder = "#F4D03F";
    var bg_radius_placeholder = "4px";

    loadQuestion();
    initSortable(bgcolor_recommend_wrapper, bgcolor_placeholder, bg_radius_placeholder);

    function loadQuestion() {
        // Load answer description
        var recommend_wrapper = '<div class="drag-drop-recommend-wrapper panel-warning">';
        var recommend = q.answer_description.recommend;
        var answer = q.answer;
        $.each(recommend, function (key, value) {
            // Check recommend not in answer
            if (jQuery.inArray(value, answer) == -1) {
                recommend_wrapper += '<span class="drag-drop-item hoverable" answer="' + value + '">' + value + '</span>';
            }
        });
        recommend_wrapper += "</div>";

        var paragraph_wrapper = '<div class="drag-drop-paragraph-wrapper">';
        paragraph_wrapper += q.answer_description.paragraph;
        paragraph_wrapper += "</div>";

        $("#quiz-answer-content")[0].innerHTML = recommend_wrapper + paragraph_wrapper;

        // Load answer
        var i = 0;
        $(".drag-drop-droppable").each(function () {
            // Check answer in recommend
            if (jQuery.inArray(answer[i], recommend) > -1) {
                var html = '<span class="drag-drop-item" answer="' + answer[i] + '">' + answer[i] + '</span>';
                $(this).html(html);
                $(this).css("border-bottom", "none");
                $(this).css("margin", "0");
            }
            i++;
        });

        // Balance CSS
        var recommend_wrapper_height = $(".drag-drop-recommend-wrapper");
        recommend_wrapper_height.height(recommend_wrapper_height.height);
    }

    function initSortable(bgcolor_recommend_wrapper, bgcolor_placeholder, bg_radius_placeholder) {

        var droppableParent;

        $(".drag-drop-recommend-wrapper").sortable({
            connectWith: ".drag-drop-droppable",
            placeholder: "drag-drop-placeholder",
            cursor: "move",
            cursorAt: {
                top: 10,
                left: 15
            },
            start: function (event, ui) {
                droppableParent = $(this);
            },
            stop: function (event, ui) {
                $(this).css("background-color", "");
                $(this).css("border-radius", "");
            },
            receive: function (event, ui) {
                $(this).css("background-color", "");
                $(this).css("border-radius", "");
            }
        }).droppable({
            over: function (event, ui) {
                $(this).css("background-color", bgcolor_recommend_wrapper);
                $(this).css("border-radius", bg_radius_placeholder);
            },
            out: function (event, ui) {
                $(this).css("background-color", "");
                $(this).css("border-radius", "");
            }
        });

        $(".drag-drop-droppable").sortable({
            connectWith: ".drag-drop-recommend-wrapper, .drag-drop-droppable",
            placeholder: "drag-drop-placeholder",
            cursor: "move",
            cursorAt: {
                top: 10,
                left: 15
            },
            start: function (event, ui) {
                droppableParent = $(this);
            },
            receive: function (event, ui) {
                // Save answer when drag-drop
                saveAnswer(q.answer);

                // Reset CSS
                $(this).css("border", "none");
                $(this).css("margin", "0");

                // Init swappable
                var children = $(this).children();
                children.each(function () {
                    if ($(this)[0] != ui.item[0]) {
                        $(this).appendTo(droppableParent).hide().show(300);

                        // Reset CSS in paragraph
                        $(this).css("background-color", "");
                        $(this).css("border-radius", "");

                        // Save answer when swap
                        saveAnswer(q.answer);
                    }
                });
            },
            remove: function (event, ui) {
                $(this).css("border-bottom", "1px solid #333333");
                $(this).css("margin", "0 5px 0 5px");

                // Save answer when remove
                saveAnswer(q.answer);
            }
        }).droppable({
            over: function (event, ui) {
                $(this).css("background-color", bgcolor_placeholder);
                $(this).css("border-radius", bg_radius_placeholder);
            },
            out: function (event, ui) {
                $(this).css("background-color", "");
                $(this).css("border-radius", "");
            }
        });

        $(".drag-drop-item").droppable({
            over: function (event, ui) {
                if ($(this).parent()[0].className == "drag-drop-droppable ui-sortable ui-droppable") {
                    $(this).css("background-color", bgcolor_placeholder);
                    $(this).css("border-radius", bg_radius_placeholder);
                }
            },
            out: function (event, ui) {
                $(this).css("background-color", "");
                $(this).css("border-radius", "");
            }
        });

        $(".drag-drop-paragraph-wrapper, .drag-drop-recommend-wrapper").disableSelection();
    }

    function saveAnswer(data) {
        var i = 0;
        $(".drag-drop-droppable").each(function () {
            var answer = $(this).children().attr("answer");
            if (answer != "" && answer != null) {
                data[i] = answer;
            } else {
                data[i] = "";
            }
            i++;
        });
    }
};