function loadHistory(){
    for (var analyseItem in localStorage) {
        if(analyseItem != 'saveAnalyse'){
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
            
            var row = '<tr><td>' + sentenceTone[i].text + '</td>' +
            '<td>' + emotion + ' - <img class="'+emotion.split(" ")[0]+'" src="">' + '</td>' +
            '<td>' + writing + ' - <img class="'+writing.split(" ")[0]+'" src="">' + '</td>' +
            '<td>' + social +  ' - <img class="'+social.split(" ")[0]+'" src="">' + '</td></tr>';
            $('#hsentence-analysis tbody').append(row);
        }
    }
}

// LAYOUT
function setLayoutTablet(){
    if ($(window).width() > 768) {
        $('#back-detail-button').hide();
    }else{
        $('#back-detail-button').show();
    }
}


