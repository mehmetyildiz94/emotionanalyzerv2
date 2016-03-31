
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
            $("analysis-input").hide();
            process(reponse);
            $("analysis-result").show();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
});


function process(data){
    var docTone = data.analysis.document_tone.tone_categories;
    var sentenceTone = data.analysis.sentences_tone;
    
    //document_tone algemene analyse
    for(var i = 0; i < docTone.length; i++){
        if(docTone[i].category_name == "Emotion Tone"){
            $('.doc-emotion-value').text(highestValue(docTone[i].tones));
        } else if(docTone[i].category_name == "Writing Tone"){
            $('.doc-writing-value').text(highestValue(docTone[i].tones));
        }
        else{
            $('.doc-social-value').text(highestValue(docTone[i].tones));
        }
    }
    
    for(var i= 0; i < sentenceTone.length; i++){
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

function highestValue(tones){
    var toneName;
    var high = 0;
    
    for(var i = 0; i < tones.length; i++){
        if(tones[i].score > high){
            toneName = tones[i].tone_name;
            high = tones[i].score;
        }
    }
    
    high = high * 100;
    if(toneName){
        return toneName + ' ' + high;
    }
    else{
        return 0
    }
}