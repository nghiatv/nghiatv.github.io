/**
 * Created by huydq on 6/23/14.
 */

var quiz = quiz || {};
var questionList = questionList || [];

quiz.dragDropImage = function (q) {

    var bgcolor_recommend_wrapper = "whitesmoke";
    var bgcolor_placeholder = "#F4D03F";
    var bgcolor_item = "#5cb85c";
    var border_image = "3px solid ";
    var border_color_image = "F4D03F";

    loadQuestion();
    initSortable(bgcolor_recommend_wrapper,bgcolor_placeholder,bgcolor_item,border_image,border_color_image)

    function loadQuestion() {
        // Load answer description
        var image_size = 206;
        var image_margin = 8;
        var recommend_wrapper = '<div class="col-md-12 drag-drop-image-recommend-wrapper"><div class="middle-block">';
        var recommend = q.answer_description.recommend;
        var answer = q.answer;
        $.each(recommend, function (key, value) {
            // Check recommend not in answer
            if (jQuery.inArray(value, answer) == -1) {
                recommend_wrapper += '<span class="drag-drop-image-item" answer="' + value + '">' + value + '</span>';
            }
        });
        recommend_wrapper += "</div></div>";

        var number_images = q.answer_description.paragraph.length;
        var number_large = Math.ceil(number_images / 2);
        var paragraph_left_wrapper = '<div class="col-md-12 drag-drop-image-paragraph-wrapper">';
        for (var a = 0; a < (number_images / 2); a++) {
            paragraph_left_wrapper += '<div class="drag-drop-image-droppable" style="background:url(\'img/' + q.answer_description.paragraph[a] + '\') no-repeat center center"></div>';
        }
        paragraph_left_wrapper += "</div>";
        var paragraph_right_wrapper = '<div class="col-md-12 drag-drop-image-paragraph-wrapper">';
        for (var b = number_large; b < number_images; b++) {
            paragraph_right_wrapper += '<div class="drag-drop-image-droppable" style="background:url(\'img/' + q.answer_description.paragraph[b] + '\') no-repeat center center"></div>';
        }
        paragraph_right_wrapper += "</div>";

        $("#quiz-answer-content")[0].innerHTML = paragraph_left_wrapper + recommend_wrapper + paragraph_right_wrapper;

        // Load answer
        var i = 0;
        $(".drag-drop-image-droppable").each(function () {
            // Check answer in recommend
            if (jQuery.inArray(answer[i], recommend) > -1) {
                var html = '<span class="drag-drop-image-item" answer="' + answer[i] + '">' + answer[i] + '</span>';
                $(this).html(html);
            }
            i++;
        });

        // Balance CSS
        var total_images_width = number_large * (image_size + image_margin) - image_margin;
        $(".middle-block").width(total_images_width);

        var middle_block = $(".drag-drop-image-recommend-wrapper .middle-block");
        middle_block.height(middle_block.height());
    }

    function initSortable(bgcolor_recommend_wrapper,bgcolor_placeholder,bgcolor_item,border_image,border_color_image) {

        var droppableParent;

        $(".drag-drop-image-recommend-wrapper .middle-block").sortable({
            connectWith: ".drag-drop-image-droppable",
            placeholder: "drag-drop-image-placeholder",
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
            },
            receive: function (event, ui) {
                $(this).css("background-color", "");
                ui.item.css("position", "");
                ui.item.css("left", "");
            }
        }).droppable({
            over: function (event, ui) {
                $(this).css("background-color", bgcolor_recommend_wrapper);
            },
            out: function (event, ui) {
                $(this).css("background-color", "");
            }
        });

        $(".drag-drop-image-droppable").sortable({
            connectWith: ".drag-drop-image-recommend-wrapper .middle-block, .drag-drop-image-droppable",
            placeholder: "drag-drop-image-placeholder",
            cursor: "move",
            cursorAt: {
                top: 10,
                left: 15
            },
            start: function (event, ui) {
                droppableParent = $(this);
            },
            stop: function (event, ui) {
                $(this).css("border", border_image + border_color_image);
                $(this).children().css("background-color","");
            },
            receive: function (event, ui) {
                // Save answer when drag-drop
                saveAnswer(q.answer);

                // Reset CSS
                $(this).css("border", border_image + border_color_image);
                $(this).children().css("position", "");
                $(this).children().css("left", "");

                // Init swappable
                var children = $(this).children();
                children.each(function () {
                    if ($(this)[0] != ui.item[0]) {
                        $(this).appendTo(droppableParent).hide().show(300);
                        $(this).css("background-color", bgcolor_item);

                        // Reset CSS in recommend
                        if (droppableParent[0].className == "middle-block ui-sortable") {
                            droppableParent.children().css("background-color", bgcolor_item);
                            droppableParent.children().css("position", "");
                            droppableParent.children().css("left", "");
                        }
                        // Save answer when swap
                        saveAnswer(q.answer);
                    }
                });
            },
            remove: function (event, ui) {
                // Save answer when remove
                saveAnswer(q.answer);
            }
        }).droppable({
            over: function (event, ui) {
                $(this).css("border", border_image + bgcolor_placeholder);
                $(this).children().css("background-color", bgcolor_placeholder);
                ui.draggable.css("background-color", "");
            },
            out: function (event, ui) {
                $(this).css("border", border_image + border_color_image);
                $(this).children().css("background-color", "");
            }
        });

        $(".drag-drop-image-paragraph-wrapper, .drag-drop-image-recommend-wrapper").disableSelection();
    }

    function saveAnswer(data) {
        var i = 0;
        $(".drag-drop-image-droppable").each(function () {
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