/**
 * Created by nghia on 3/16/16.
 */

var quiz = quiz || {}; //init quit
var questionList = questionList || [];// mang cau hoi
var currentQuestionIndex = 0; //cau hoi hien tai
var previousQuestionIndex = 0; //cau hoi truoc
var currentQuestion = {}; //mang cau hoi hien tai

$(function () {
    quiz.opt = {
        question_title: $("#quiz-question-title"),
        question_content: $("#quiz-question-content"),
        answer_content: $("#quiz-answer-content"),
        question_list: $("#question-list")
    }
});

quiz.load = function () {
    //Load question list from  AJAX ANKAMA

    questionList = [
        {
            "id": 19,
            "title": "Tìm lỗi cho đoạn code sau:",
            "question": "Choose one correct answer. <br />I was ......... after my mom's best friend.",
            "type": "select_box",
            "session": "cai gi day",
            "multi_choice": false,
            "answer_description": {
                "paragraph": '<pre><code>grade = (student, period=(if b? then 7 else 6)) ' +
                '->if student.excellentWork' +
                '"A+"' +
                'else if student.okayStuff' +
                ' if student.triedHard then "B" else "B-"' +
                'else' +
                '"C"' +
                'class Animal extends Being' +
                'constructor: (@name) ->' +
                'move: (meters) ->' +
                'alert @name + " moved #{meters}m." </code> </pre>',
            },
            "mark": false,
            "answer": "",
            "extra": "",

        },
        {
            "id": 7,
            "title": "Tìm lỗi cho đoạn code sau:",
            "question": "Chọn đáp án sai nhé",
            "type": "select_box",
            "session": "ngu phap",
            "answer_description": {
                "paragraph": "Successful candidates will <select class='select_box_question'><option value='No answer'>No answer</option><option value='be'>be</option><option value='is'>is</option><option value='are'>are</option></select> part of a friendly, motivated and committed talent teams <span><select class='select_box_question'><option>No answer</option><option value='with'>with</option><option value='at'>at</option></select></span> various benefits and attractive offers. We <span><select class='select_box_question'><option value='No answer'>No answer</option><option value='believes'>believes</option><option value='believe'>believe</option></select></span> that enviroment is the key to your and the team’s success, so we try to facilitate for developing your skills"
            },
            "answer": "",
            "mark": false,
            "extra": ""
        },
        {
            "id": 1,
            "question": "Insert in to empty blank",
            "type": "fill_to_input",
            "session": "Advance",
            "answer_description": "The album <input type=\"text\" class=\"quiz_fill_to_input_val\" value=\"\"> executive produced by Giles Martin with production by Martin, Mark Ronson, Ethan Johns and Paul Epworth. McCartney has stated that the record <input type=\"text\" class=\"quiz_fill_to_input_val\" value=\"\"> inspired by recent events <input type=\"text\" class=\"quiz_fill_to_input_val\" value=\"\"> his life as well as memories of his pre-Beatles history.",
            "answer": [],
            "mark": false
        },
        {
            "id": 0,
            "question": "Drag and drop the answers to paragraph",
            "type": "drag-drop",
            "session": "Ngu phap",
            "answer_description": {
                "paragraph": 'Baiji, Iraq&#39s biggest refinery, is surrounded by the rebels, who <div class="drag-drop-droppable"></div> they have seized most of Tal Afar airport.<br>The fighting comes a day after the US said it would send some 300 military advisers to help <div class="drag-drop-droppable"></div> the insurgents.<br>President Barack Obama <div class="drag-drop-droppable"></div> that US troops would not fight in Iraq.<br>US Secretary of State John Kerry is expected to <div class="drag-drop-droppable"></div> to Iraq soon to press for a more representative cabinet,hoping this could <div class="drag-drop-droppable"></div> between the country&#39s rival Muslim sects.',
                "recommend": ["say", "the fight against", "stressed", "travel", "ease tensions"]
            },
            "answer": [],
            "mark": false
        },
        {
            "id": 2,
            "title": "Question 1",
            "question": "Choose one correct answer. <br />I was ......... after my mom's best friend.",
            "type": "sm_choice",
            "session": "English Grammar",
            "multi_choice": false,
            "answer_description": [
                {
                    "id": 1,
                    "content": "called"
                },
                {
                    "id": 0,
                    "content": "termed"
                },
                {
                    "id": 2,
                    "content": "labeled"
                },
                {
                    "id": 3,
                    "content": "named"
                }
            ],
            "answer": [],
            "mark": false
        },
        {
            "id": 5,
            "title": "Question 1",
            "question": "Choose the correct answers. <br />Tom has _________ English lesson on Thursdays.",
            "type": "sm_choice",
            "session": "English Grammar",
            "answer_description": [
                {
                    "id": 0,
                    "content": "one"
                },
                {
                    "id": 1,
                    "content": "a"
                },
                {
                    "id": 4,
                    "content": "two"
                },
                {
                    "id": 3,
                    "content": "three"
                }
            ],
            "multi_choice": true,
            "answer": [],
            "mark": false
        },
        {
            "id": 6,
            "question": "Drag and drop the answers to the dialog",
            "type": "drag-drop-dialog",
            "session": "Ngu phap",
            "answer_description": {
                "paragraph": 'A: Hi, how are you doing?<br>B: <div class="drag-drop-dialog-droppable"></div><br>A: I&#39m pretty good. Thanks for asking.<br>B: No problem. So how have you been?<br>A: <div class="drag-drop-dialog-droppable"></div><br>B: I&#39ve been good. I&#39m in school right now.<br>A: What school do you go to?<br>B: <div class="drag-drop-dialog-droppable"></div><br>A: Do you like it there?<br>B: <div class="drag-drop-dialog-droppable"></div><br>A: Good luck with school.<br>B: Thank you very much.<br>',
                "recommend": ["I'm fine. How about yourself?", "I've been great. What about you?", "I go to PCC.", "It's okay. It's a really big campus."]
            },
            "answer": [],
            "mark": false
        },

        {
            "id": 8,
            "title": "Choose the correct answer",
            "question": "Choose the correct answer",
            "type": "select_box",
            "session": "ngu phap",
            "answer_description": {
                "paragraph": "Successful candidates will be part of a friendly, motivated and committed talent teams <span><select class='select_box_question'><option>No answer</option><option value='with'>with</option><option value='at'>at</option></select></span> various benefits and attractive offers. We <span><select class='select_box_question'><option value='No answer'>No answer</option><option value='believes'>believes</option><option value='believe'>believe</option></select></span> that enviroment is the key to your and the team’s success, so we try to facilitate for developing your skills"
            },
            "answer": "",
            "mark": false,
            "extra": ""
        },
        {
            "id": 9,
            "title": "Choose the correct answer",
            "question": "Choose the correct answer",
            "type": "select_box",
            "session": "ngu phap",
            "answer_description": {
                "paragraph": "Swift <select class='select_box_question'><option value='No answer'>No answer</option><option value='be'>be</option><option value='is'>is</option><option value='are'>are</option></select> a new programming language for iOS and OS X apps that <span><select class='select_box_question'><option value='No answer'>No answer</option><option value='build'>build</option><option value='builds'>builds</option><option value='built'>built</option></select></span>  on the best of C and Objective-C, without the constraints of C compatibility"
            },
            "answer": "",
            "mark": false,
            "extra": ""
        }
    ]
    ;
    var index = 1;
    questionList.forEach(function (q) {
        var cls = "unread";
        if (q.answer != "") {
            cls = "done";
        }
        if (q.mark === true) {
            cls = "reject";
        }
        quiz.opt.question_list.append('<li><a onclick="quiz.setQuestion(' + (index - 1) + ')" class=" z-depth-1 hoverable btn btn-default  ' + cls + '" id="button' + index + '" > Câu ' + index + ' </a></li>')
        index++;
    });
    currentQuestionIndex = 0;
    quiz.setQuestion(currentQuestionIndex);

}
;

//Nut next nhe
quiz.next = function () {
    quiz.save(currentQuestion);
    if (currentQuestionIndex < (questionList.length - 1)) {
        currentQuestionIndex++;
    }
    else {
        return;
    }
    quiz.setQuestion(currentQuestionIndex);
};

quiz.previous = function () {
    quiz.save(currentQuestionIndex);
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
    }
    else {
        return;
    }
    quiz.setQuestion(currentQuestionIndex);
};

//Set cau hoi cho cau hien tai

quiz.setQuestion = function (index) {
    //hljs.initHighlightingOnLoad();
    currentQuestionIndex = index;

    quiz.updateButtonStatus(previousQuestionIndex);
    quiz.updateButtonStatus(index);
    currentQuestion = questionList[index];
    previousQuestionIndex = index;
    var q = currentQuestion;
    quiz.toggleButton(q);
    quiz.opt.question_title[0].innerHTML = "Câu hỏi " + (currentQuestionIndex + 1);
    quiz.opt.question_content[0].innerHTML = q.question;
    //alert(q.question);

    //if(q.extra != undefined && q.extra != ""){
    //    quiz.opt.extra_content.show();
    //    quiz.opt.extra_content[0].innerHTML = q.extra;
    //}
    //else{
    //    quiz.opt.extra_content.hide();
    //}
    // Đoạn này là extra text hiện tại chưa có nên comment lại nhé.

    if (q.type == "drag-drop") {
        quiz.dragDrop(q);
    } else if (q.type == "drag-drop-dialog") {
        quiz.dragDropDialog(q);
    } else if (q.type == "sm_choice") {
        quiz.smChoice(q);
    } else if (q.type == "select_box") {
        quiz.select_box(q);
    } else if (q.type == "sorter") {
        quiz.sorter(q);
    } else if (q.type == "fill_to_input") {
        quiz.fillToInput(q);
    }

};

//nut next va previous

quiz.toggleButton = function (q) {
    //Them chuc nang cho nut next va previous
    if (currentQuestionIndex <= 0) {
        setTimeout(function () {
            $("#previous-quiz").attr("onclick", "").removeClass("waves-effect");
        }, 500);
        $("#next-quiz").attr("onclick", "quiz.next()").addClass('waves-effect');
    } else if (currentQuestionIndex >= (questionList.length - 1 )) {
        setTimeout(function () {
            $("#next-quiz").attr("onclick", "").removeClass('waves-effect');
        }, 500);
        $("previous-quiz").attr("onclick", "quiz.previous()").addClass("waves-effect");
    } else {
        $("#next-quiz").attr("onclick", "quiz.next()").addClass("waves-effect");
        $("#previous-quiz").attr("onclick", "quiz.previous()").addClass("waves-effect");
    }

    // thay đổi màu sắc cho cờ

    if (q.mark) {
        $("#btn-mark").removeClass("btn-warning").addClass("btn-danger");
    } else {
        $("#btn-mark").removeClass("btn-danger").addClass("btn-warning")
    }
};

//kiem tra trạng thái của cờ
quiz.checkMark = function () {
    currentQuestion.mark = !currentQuestion.mark;
    console.log(currentQuestion.mark);
    quiz.updateButtonStatus(currentQuestionIndex);

    var btn_mark = $("#btn-mark");
    if (currentQuestion.mark) {
        btn_mark.removeClass('btn-warning');
        btn_mark.addClass('btn-danger');
    } else {
        btn_mark.removeClass('btn-danger');
        btn_mark.addClass('btn-warning');
    }


};


//Cập nhật trạng thái nút
quiz.updateButtonStatus = function (index) {
    var cls = "reading";
    var q = questionList[index];
    if (q == undefined) {
        return;
    }

    if (q.answer != undefined && quiz.answer != "") {
        cls = "done";
    }
    if (q.answer == "") {
        cls = "unread";
    }
    if (q.mark === true) {
        cls = "reject";
    }
    if (currentQuestionIndex == index) {
        cls = "reading hoverable z-depth-1";
    }
    $("#button" + (index + 1)).removeClass();
    $("#button" + (index + 1)).addClass("btn btn-default");
    $("#button" + (index + 1)).addClass(cls);

};

quiz.save = function () {
    //chỗ này để anh Huy xử lý em chắc chắc không thể làm được nhé!
}

quiz.submitQuiz = function (g) {
    confirm("Chạy rồi nhé. Bấm hủy để quit");
};