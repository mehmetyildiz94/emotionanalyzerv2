function appLanguage(){
	var lang;

	var  TR_TAB_ONE;
	var  TR_TAB_TWO;
	var  TR_TAB_THREE;
	var  TR_BUTTON_ANALYSE;
	var  TR_BUTTON_SAMPLE;
	var  TR_TEXTAREA;
	var  TR_LABEL_ANSAVE;
	var  TR_INPUT_ANSAVE_YES;
	var  TR_INPUT_ANSAVE_NO;
	var  TR_INFORMATION;
	var  TR_LINK;
	var  TR_MAIL;
	// var  TR_ALERT_NOTSAVED;
	var  TR_DETAILS_GLOBAL;
	var  TR_DETAILS_SENTENCES;
	var  TR_BUTTON_BACK;
	var  TR_SENTENCE;
	var  TR_EMOTION;
	var  TR_WRITING;
	var  TR_SOCIAL;

	navigator.globalization.getPreferredLanguage(
	    function (language) {
	    	alert('language: ' + language.value + '\n'); lang = language.value;

			$.get('js/languages/locale-'+lang+'.txt', function(data) {
		  		TR_TAB_ONE = $.parseJSON(data).TR_TAB_ONE;
		  		TR_TAB_TWO = $.parseJSON(data).TR_TAB_TWO;
		  		TR_TAB_THREE = $.parseJSON(data).TR_TAB_THREE;
		  		TR_BUTTON_ANALYSE = $.parseJSON(data).TR_BUTTON_ANALYSE;
		  		TR_BUTTON_SAMPLE = $.parseJSON(data).TR_BUTTON_SAMPLE;
		  		TR_TEXTAREA = $.parseJSON(data).TR_TEXTAREA;
		  		TR_LABEL_ANSAVE = $.parseJSON(data).TR_LABEL_ANSAVE;
		  		TR_INPUT_ANSAVE_YES = $.parseJSON(data).TR_INPUT_ANSAVE_YES;
		  		TR_INPUT_ANSAVE_NO = $.parseJSON(data).TR_INPUT_ANSAVE_NO;
		  		TR_INFORMATION = $.parseJSON(data).TR_INFORMATION;
		  		TR_LINK = $.parseJSON(data).TR_LINK;
		  		TR_MAIL = $.parseJSON(data).TR_MAIL;
		  		// TR_ALERT_NOTSAVED = $.parseJSON(data).TR_ALERT_NOTSAVED;
		  		TR_DETAILS_GLOBAL = $.parseJSON(data).TR_DETAILS_GLOBAL;
		  		TR_DETAILS_SENTENCES = $.parseJSON(data).TR_DETAILS_SENTENCES;
		  		TR_BUTTON_BACK = $.parseJSON(data).TR_BUTTON_BACK;
		  		TR_SENTENCE = $.parseJSON(data).TR_SENTENCE;
		  		TR_EMOTION = $.parseJSON(data).TR_EMOTION;
		  		TR_WRITING = $.parseJSON(data).TR_WRITING;
		  		TR_SOCIAL = $.parseJSON(data).TR_SOCIAL;

		  		$('#tab-one').text(TR_TAB_ONE);
		  		$('#tab-two').text(TR_TAB_TWO);
		  		$('#tab-three').text(TR_TAB_THREE);
		  		$('#analyse-button').prop("value",TR_BUTTON_ANALYSE);
		  		$('#sample-button').prop("value",TR_BUTTON_SAMPLE);
		  		$('#text').attr("placeholder",TR_TEXTAREA);
		  		$('#TR_DETAILS_GLOBAL').text(TR_DETAILS_GLOBAL);
		  		$('#TR_DETAILS_SENTENCES').text(TR_DETAILS_SENTENCES);
		  		$('#TR_SENTENCE').text(TR_SENTENCE);
		  		$('#TR_EMOTION').text(TR_EMOTION);
		  		$('#TR_WRITING').text(TR_WRITING);
		  		$('#TR_SOCIAL').text(TR_SOCIAL);
		  		$('#back-result-button').prop("value",TR_BUTTON_BACK);
		  		$('#TR_LABEL_ANSAVE').text(TR_LABEL_ANSAVE);
		  		$('#TR_INPUT_ANSAVE_YES').text(TR_INPUT_ANSAVE_YES);
		  		$('#TR_INPUT_ANSAVE_NO').text(TR_INPUT_ANSAVE_NO);
		  		$('#TR_INFORMATION').text(TR_INFORMATION);
		  		$('#TR_LINK').text(TR_LINK);
		  		$('#TR_MAIL').text(TR_MAIL);

			}); 
	    },
	    function () {alert('Error getting language\n');}
	);

}
