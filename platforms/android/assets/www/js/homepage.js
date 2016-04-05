$('#analyse-button').on('tap',function(event){
    event.preventDefault();

    var text = $('#text').val();
    regex = /\n|([^\r\n.!?]+([.!?]+|$))/gim;
    //cannot read property 'map' of null wnr 1 zin met punt.
    var split = text.match(regex).map($.trim);
    var message = split.join("\\n");
    var text = '{"text": "'+message+'"}';

    $.ajax({
        beforeSend: function() { $.mobile.loading("show") }, 
        complete: function() { $.mobile.loading("hide") },
        url: "https://emotionanalyzer.herokuapp.com/analyzer",
        type: "post",
        contentType: "application/json",
        data: text,
        success: function (response) {
            $('#text').val('');
            $("#analysis-input").hide();
            showResults(response);
            $("#analysis-result").show();
            saveAnalyseToStorage(response);
            var currentState = window.localStorage.getItem('saveAnalyse');
            var stringToJson = JSON.parse(currentState);
            if(stringToJson.value == "on"){
                appendToHistory(response._id);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});

$('#back-result-button').on('tap', function(event){
    event.preventDefault();
    $("#analysis-result").hide();
    $("#analysis-input").show();
    $('#sentence-analysis tbody').empty();
});

function showResults(data){
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
    
    $("#global-emotion").html("Emotion: " + emotion);
    $("#global-writing").html("Writing: " + writing);
    $("#global-social").html("Social: " + social);

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
            $('#sentence-analysis tbody').append(row);
        }
    }
}

function highestValue(tones){
    var toneName;
    var high = 0;
    
    for(var i = 0; i < tones.length; i++){
        if(tones[i].score > high){
            toneName = tones[i].tone_name;
            high = tones[i].score;
        }
    }
    
    if(toneName){
        return toneName + ' ' + Math.round(high * 100) + '%';
    }
    else{
        return "0%";
    }
}