// HET OPSLAAN VAN DE SETTINGS IN LOCALSTORAGE
function saveAnalyseState() {
	var jsonToString;

	if(window.localStorage.getItem('saveAnalyse') == null){
		jsonToString = JSON.stringify({"value": "off"});
    	window.localStorage.setItem('saveAnalyse',  jsonToString);
	}else{
		$('#saveAnalyse').on('change', function() {
  	 		jsonToString = JSON.stringify({"value": $(this).val()});
    		window.localStorage.setItem('saveAnalyse',  jsonToString);
  		});
	}
}

// HET OPHALEN VAN SETTINGS. DIT OM BIJ HET OPSTARTEN VAN APP DIRECT OP 'ON' TE ZETTEN VAN APP
function getAnalyseState() {
 	var currentState = window.localStorage.getItem('saveAnalyse');
 	var stringToJson = JSON.parse(currentState);
  	$('#saveAnalyse').val(stringToJson.value).change();
}

// HIER SLA IK ANALYSE OP. IK SLA HET OP IN LOCALSTORAGE
function saveAnalyseToStorage(data) {
	var currentState = window.localStorage.getItem('saveAnalyse');
 	var stringToJson = JSON.parse(currentState);
	if(stringToJson.value == "on"){
		var dataAnalyse = JSON.stringify(data);
    	window.localStorage.setItem(data._id, dataAnalyse);
	}else{
	    navigator.notification.alert("De analyse is niet opgeslagen.", function(){}, "", "");
	}
}

$(document).on( "ready", function() {
	saveAnalyseState();
	getAnalyseState();
});

