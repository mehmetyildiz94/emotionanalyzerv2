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

function getAnalyseState() {
 	var currentState = window.localStorage.getItem('saveAnalyse');
 	var stringToJson = JSON.parse(currentState);
  	$('#saveAnalyse').val(stringToJson.value).change();
}

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

function savePageToStorage() {
	var jsonToString;
	var tab_id;
	if(window.localStorage.getItem('savePage') == null){
		setNavBarActive("tab-one")
		jsonToString = JSON.stringify({"page_id": "tab-one"});
    	window.localStorage.setItem('savePage',  jsonToString);
	}else{
		$("#tabs").tabs({
		  beforeActivate: function (event, ui) {
		   tab_id = ui.newTab.children().attr('id');
		   jsonToString = JSON.stringify({"value": tab_id});
		   window.localStorage.setItem('savePage',  jsonToString);
		  }
		});
	}
}

function getPageState() {
 	var currentState = window.localStorage.getItem('savePage');
 	var stringToJson = JSON.parse(currentState);
  	setNavBarActive(stringToJson.value);
}

$(document).on("tabsbeforeactivate", "#tabs", function (e, ui) {
    $(ui.newPanel).addClass("in pop").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass("in pop");
        saveAnalyseState();
        savePageToStorage();
    });
});

function setNavBarActive(id) {
   $('#'+id).trigger('click');
}

$(document).on( "ready", function() {
	saveAnalyseState();
	getAnalyseState();
	savePageToStorage();
	getPageState();
});

