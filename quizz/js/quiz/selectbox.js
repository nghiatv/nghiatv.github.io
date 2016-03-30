/**
 * Created by TechMaster on 6/24/14.
 */
String.prototype.trim = function() {
    return this.replace(/^[\s,]|[\s,]$/g,"");
};
String.prototype.ltrim = function() {
    return this.replace(/^[\s,]+/,"");
};
String.prototype.rtrim = function() {
    return this.replace(/[\s,]+$/,"");
};

quiz.select_box =function(question) {


    function resetContent() {

        $("select.select_box_question").off("change");

        $("select.select_box_question").on("change", function(e) {
            selectbox_answer(currentQuestion);
        });
    }

    function selectbox_render (question) {

        $("#quiz-answer-content").html("");
        $("#quiz-answer-content").append('<div id="content" class=""></div>');
        $("#quiz-answer-content>#content").html(question.answer_description.paragraph);

        resetContent();
        if(question.answer && question.answer != null && question.answer != "") {
            var select_methods = JSON.parse(question.answer);

            $("select.select_box_question").each(function(index) {
                $(this).val(select_methods[index]);
            });

        }
        $("select.select_box_question").on("change", function(e) {
            selectbox_answer(currentQuestion);
        });
    }

    function selectbox_answer(question) {
        var answers = new Array();

        resetContent();

        $("select.select_box_question ").each(function(index) {
            answers.push($(this).val());
        });

        question.answer = JSON.stringify(answers);

        return question.answer;

    }
    this.currentQuestion = question;

    selectbox_render(question);

};