function loadHistory(){
    for (var analyseItem in localStorage) {
        if(analyseItem != 'saveAnalyse' && analyseItem != 'savePage'){
            appendToHistory(analyseItem);
        }
    }
}

function appendToHistory(key){
    var analysis = JSON.parse(localStorage[key]);

    
    var li = "<li id='" + analysis._id + "'> <a href='#'>" +
    analysis.text.substring(0,20) + "... " + analysis.date.split("T")[0] + 
    "</a></li>";
    
    $('#history').append(li);
    $('#history').listview('refresh');
    
    $('ul#history li').on('click', function(event){
        var id = $(this).attr("id");
        showDetail(id);
        $("#history").hide();
        $("#history-detail").show();
    });
}

$('#back-detail-button').on('tap', function(event){
    event.preventDefault();
    $("#history-detail").hide();
    $("#history").show();
    
    $('#hsentence-analysis tbody').empty();
});

function showDetail(id){
    var data = JSON.parse(localStorage[id]);
    var docTone = data.analysis.document_tone.tone_categories;
    var sentenceTone = data.analysis.sentences_tone;
    
    var emotion, writing, social;
    var emotion_img, writing_img, social_img;
    
    //document_tone algemene analyse
    for(var i = 0; i < docTone.length; i++){
        if(docTone[i].category_name == "Emotion Tone"){
            emotion = highestValue(docTone[i].tones);
        } else if(docTone[i].category_name == "Writing Tone"){
            writing = highestValue(docTone[i].tones);
        }
        else{
            social = highestValue(docTone[i].tones);
        }
    }
    
    $("#hglobal-emotion").html("Emotion: " + emotion);
    $("#hglobal-writing").html("Writing: " + writing);
    $("#hglobal-social").html("Social: " + social);

    if(sentenceTone){
        for(var i = 0; i < sentenceTone.length; i++){
            var categories = sentenceTone[i].tone_categories;
            
            var emotion, writing, social;
            
            for(var j = 0; j < categories.length; j++){
                if(categories[j].category_name == "Emotion Tone"){
                    emotion = highestValue(categories[j].tones);
                } else if(categories[j].category_name == "Writing Tone"){
                    writing = highestValue(categories[j].tones);
                }
                else{
                    social = highestValue(categories[j].tones);
                }
            }

            if(emotion.replace(" ", "%").split("%")[0] == 0){emotion_img="undefined";}else{emotion_img=emotion.replace(" ", "%").split("%")[0];}
            if(writing.replace(" ", "%").split("%")[0] == 0){writing_img="undefined";}else{writing_img=writing.replace(" ", "%").split("%")[0];}
            if(social.replace(" ", "%").split("%")[0] == 0){social_img="undefined";}else{social_img=social.replace(" ", "%").split("%")[0];}

            var row = '<tr><td class="text-bold">' + sentenceTone[i].text + '</td>' +
            '<td id="'+emotion_img+'">' + emotion + ' - <img class="'+emotion_img+'" src="img/img_trans.gif">' + '</td>' +
            '<td id="'+writing_img+'">' + writing + ' - <img class="'+writing_img+'" src="img/img_trans.gif">' + '</td>' +
            '<td id="'+social_img+'">' + social +  ' - <img class="'+social_img+'" src="img/img_trans.gif">' + '</td></tr>';
            $('#hsentence-analysis tbody').append(row);
        }
    }
}



