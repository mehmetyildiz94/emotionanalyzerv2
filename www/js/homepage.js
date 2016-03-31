
$('#analyse-button').on('tap',function(event){
    event.preventDefault();

    // VARIABLES OPHALEN TEXT EN CONTROLEREN OF HET EINDIGT OP INTERPUNCTIE
    var text = $('#text').val();
    //var regex = /[^\r\n.!?]+(:?(:?\r\n|[\r\n]|[.!?])+|$)/gi;
    regex = /\n|([^\r\n.!?]+([.!?]+|$))/gim;
    var split = text.match(regex).map($.trim);
    var message = split.join("\\n");
    var text = '{"text": "'+message+'"}';

    $.ajax({
        beforeSend: function() { $.mobile.loading("show") }, 
        complete: function() { $.mobile.loading("hide") },
        url: "https://emotionanalyzer.herokuapp.com/analyzer/analyze",
        type: "post",
        contentType: "application/json",
        data: text,
        success: function (response) {
            $("#analysis-input").hide();
            showResults(response);
            $("#analysis-result").show();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});


function showResults(data){
    var docTone = data.analysis.document_tone.tone_categories;
    var sentenceTone = data.analysis.sentences_tone;
    
    var emotion, writing, social;
    
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
            
            var emotion;
            var writing;
            var social;
            
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