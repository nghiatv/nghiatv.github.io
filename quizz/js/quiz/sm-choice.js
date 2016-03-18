/**
 * Created by nghiatv on 3/20/17.
 */

var quiz = quiz || {};
var questionList = questionList || [];

quiz.smChoice = function (q) {
    //console.log("nghia");
    displayQuestion();
    initChoice();

    function displayQuestion() {
        if (q.answer_description.length > 0) {
            var html = "<div class='card-smChoice'>";
            $.each(q.answer_description, function (index) {
                var check = '';
                if (q.answer.length > 0 && $.inArray(this.id, q.answer) != -1) {
                    check = ' checked="checked" data-content="' + index + '"';
                }
                if (q.multi_choice == true) {
                    //html += '<div class="checkbox"><label><input type="checkbox" name="answer" class="controls" ' + check + ' value="' + this.id + '"> ' + this.content + '</label></div>';
                    html += '<label class="label-checkbox"><input type="checkbox" class="checkbox-material" name="answer" ' + check + ' value="' + this.id + '"> ' + this.content + '</label>';
                } else {
                    //html += '<div class="radio"><label><input type="radio" name="answer" class="controls" '+check+' value="'+this.id+'"> '+this.content+'</label></div>';

                    html += '<label class="radio"><input type="radio" name="answer" ' + check + 'value="' + this.id + '"><span class="outer"><span class="inner"></span></span>' + this.content + '</label>';
                }
            });
            html += "</div>";

            $("#quiz-answer-content")[0].innerHTML = "<div class=\"quiz_sm_choice\"><p>" + html + "</p></div>";
        }
    }

    function initChoice() {
        $(".quiz_sm_choice input").click(function () {
            var select = $(".quiz_sm_choice input:checked");
            q.answer = [];
            if (q.multi_choice == true) {
                $.each(select, function () {
                    q.answer.push(parseInt($(this).val()));
                });
            } else {
                q.answer = [parseInt(select.val())];
            }
        });
    }
};
//
//<label class="radio">
//    <input id="radio1" type="radio" name="radios" checked="">
//    <span class="outer"><span class="inner"></span></span>Robert Baratheon</label>