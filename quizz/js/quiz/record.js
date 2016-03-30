/**
 * Created by thanhnv on 6/23/14.
 */

var quiz = quiz || {};
var questionList = questionList || [];

quiz.record = function (q){
    $("#quiz-answer-content")[0].innerHTML = '<h2>Record</h2>            <p>Record monitor volume: <input type="range" max="1" step="0.1" value="0" onchange="changeVolume(this.value)"/></p>        <p>            <button class="btn btn-primary" onclick="startRecording(this);">Record</button>            <button class="btn btn-warning" onclick="stopRecording(this);" disabled>Stop</button>        </p><table id="recordingslist" style="width: 100%"></table>';
}

quiz.stopRecording = function(blob){
    var reader = new FileReader();
    // this function is triggered once a call to readAsDataURL returns
    reader.onload = function(event){
        var fd = new FormData();
        fd.append('fname', 'test.wav');
        fd.append('data', event.target.result);
        $.ajax({
            type: 'POST',
            url: 'upload.php',
            data: fd,
            processData: false,
            contentType: false
        }).done(function(data) {
            // print the output from the upload.php script
            console.log(data);
        });
    };
    // trigger the read from the reader...
    reader.readAsDataURL(blob);
}

