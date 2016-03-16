/**
 * Created by huydq on 6/23/14.
 */

var quiz = quiz || {};
var questionList = questionList || [];

quiz.dragDropDialog = function (q) {

    var bgcolor_recommend_wrapper = "whitesmoke";
    var bgcolor_placeholder = "#F4D03F";
    var bg_radius_placeholder = "4px";

    loadQuestion();
    initSortable(bgcolor_recommend_wrapper, bgcolor_placeholder, bg_radius_placeholder);

    function loadQuestion() {
        // Load answer description
        var recommend_wrapper = '<div class="col-md-6 drag-drop-dialog-recommend-wrapper">';
        var recommend = q.answer_description.recommend;
        var answer = q.answer;
        $.each(recommend, function (key, value) {
            // Check recommend not in answer
            if (jQuery.inArray(value, answer) == -1) {
                recommend_wrapper += '<span class="drag-drop-dialog-item" answer="' + value + '">' + value + '</span>';
            }
        });
        recommend_wrapper += "</div>";

        var paragraph_wrapper = '<div class="col-md-6 drag-drop-dialog-paragraph-wrapper">';
        paragraph_wrapper += q.answer_description.paragraph;
        paragraph_wrapper += "</div>";

        $("#quiz-answer-content")[0].innerHTML = paragraph_wrapper + recommend_wrapper;

        // Load answer
        var i = 0;
        $(".drag-drop-dialog-droppable").each(function () {
            // Check answer in recommend
            if (jQuery.inArray(answer[i], recommend) > -1) {
                var html = '<span class="drag-drop-dialog-item" answer="' + answer[i] + '">' + answer[i] + '</span>';
                $(this).html(html);
                $(this).css("border-bottom", "none");
                $(this).css("margin", "0");
            }
            i++;
        });

        // Balance CSS
        var paragraph_wrapper_height = $(".drag-drop-dialog-paragraph-wrapper").height();
        $(".drag-drop-dialog-recommend-wrapper").height(paragraph_wrapper_height);
    }

    function initSortable(bgcolor_recommend_wrapper, bgcolor_placeholder, bg_radius_placeholder){

        var droppableParent;

        $(".drag-drop-dialog-recommend-wrapper").sortable({
            connectWith: ".drag-drop-dialog-droppable",
            placeholder: "drag-drop-dialog-placeholder",
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
                $(this).css("border-radius","");
            },
            receive: function (event, ui) {
                $(this).css("background-color", "");
                $(this).css("border-radius","");
            }
        }).droppable({
            over: function (event, ui) {
                $(this).css("background-color", bgcolor_recommend_wrapper);
                $(this).css("border-radius",bg_radius_placeholder);
            },
            out: function (event, ui) {
                $(this).css("background-color", "");
                $(this).css("border-radius","");
            }
        });

        $(".drag-drop-dialog-droppable").sortable({
            connectWith: ".drag-drop-dialog-recommend-wrapper, .drag-drop-dialog-droppable",
            placeholder: "drag-drop-dialog-placeholder",
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
                        $(this).css("border-radius","");

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
                $(this).css("border-radius",bg_radius_placeholder);
            },
            out: function (event, ui) {
                $(this).css("background-color", "");
                $(this).css("border-radius","");
            }
        });

        $(".drag-drop-dialog-item").droppable({
            over: function (event, ui) {
                if ($(this).parent()[0].className == "drag-drop-dialog-droppable ui-sortable ui-droppable") {
                    $(this).css("background-color", bgcolor_placeholder);
                    $(this).css("border-radius",bg_radius_placeholder);
                }
            },
            out: function (event, ui) {
                $(this).css("background-color", "");
                $(this).css("border-radius","");
            }
        });

        $(".drag-drop-dialog-paragraph-wrapper, .drag-drop-dialog-recommend-wrapper").disableSelection();
    }

    function saveAnswer(data) {
        var i = 0;
        $(".drag-drop-dialog-droppable").each(function () {
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