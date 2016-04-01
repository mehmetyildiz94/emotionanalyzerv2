// HET OPSLAAN VAN DE SETTINGS IN LOCALSTORAGE
function saveAnalyseState() {
	var jsonToString;
	    	console.log('1');

	if(window.localStorage.getItem('saveAnalyse') == null){
		    	console.log('2');
		jsonToString = JSON.stringify({"value": "off"});
    	window.localStorage.setItem('saveAnalyse',  jsonToString);
    	console.log('3');
	}else{
		$('#saveAnalyse').on('change', function() {
  	 		jsonToString = JSON.stringify({"value": $(this).val()});
    		window.localStorage.setItem('saveAnalyse',  jsonToString);
  		});
  		console.log('else');
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
	 	// navigator.notification.alert(
	  //     'De analyse is niet opgeslagen.',  // message
	  //       'callback',         // callback
	  //       'Analyse',            // title
	  //       'Close'                  // buttonName
	  //   );
	    navigator.notification.alert("De analyse is niet opgeslagen.", function(){}, "", "");
	}
}

$(document).on( "ready", function() {
	console.log('docready');
	saveAnalyseState();
	getAnalyseState();
});

