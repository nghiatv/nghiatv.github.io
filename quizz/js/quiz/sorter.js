/**
 * Created by huydq on 6/25/14.
 */
var quiz = quiz || {};
var questionList = questionList || [];

quiz.sorter = function (q) {
    quiz.opt.answer_content.empty();
    quiz.opt.answer_content.append('<div id="list"><ul id="group1"></ul><ul id="arrow"></ul><ul id="group2"></ul> </div>');
    var group1 = $("#group1");
    var group2 = $("#group2");
    var arrow = $("#arrow");
    q.answer_description.g1.forEach(function (r) {
        group1.append("<li><p class='lead sorter-item-left'> " + r + "</li>");
        arrow.append('<li class="ui-state-default"><p class="lead sorter-item-center"><i class="glyphicon glyphicon-arrow-left"></i><i class="glyphicon glyphicon-arrow-right"></i> </li>');
    });
    q.answer_description.g2.forEach(function (r) {
        group2.append("<li><p class='lead sorter-item-right'>" + r + "</li>");
    });
//    q.answer_description.group1.foreach(function(r){
//        group1.append("<li>"+r+"</li>");
//    });
//    $("#list").append('<ul id="group1">        <li class="ui-state-default">Item 1</li>        <li class="ui-state-default">Item 2</li>    <li class="ui-state-default">Item 3</li>        <li class="ui-state-default">Item 4</li>    <li class="ui-state-default">Item 5</li>    </ul>');
//    $("#list").append('<ul id="arrow">        <li class="ui-state-default"><i class="glyphicon glyphicon-arrow-left"></i><i class="glyphicon glyphicon-arrow-right"></i> </li>        <li class="ui-state-default"><i class="glyphicon glyphicon-arrow-left"></i><i class="glyphicon glyphicon-arrow-right"></i> </li>    <li class="ui-state-default"><i class="glyphicon glyphicon-arrow-left"></i><i class="glyphicon glyphicon-arrow-right"></i> </li>        <li class="ui-state-default"><i class="glyphicon glyphicon-arrow-left"></i><i class="glyphicon glyphicon-arrow-right"></i> </li>    <li class="ui-state-default"><i class="glyphicon glyphicon-arrow-left"></i><i class="glyphicon glyphicon-arrow-right"></i> </li>    </ul>');
//    $("#list").append('<ul id="group2">        <li class="ui-state-highlight">Item 1</li>        <li class="ui-state-highlight">Item 2</li>    <li class="ui-state-highlight">Item 3</li>        <li class="ui-state-highlight">Item 4</li>    <li class="ui-state-highlight">Item 5</li>    </ul>');

    group2.sortable({
        placeholder: "group-state-highlight",
        cursor: "move"
    });

}