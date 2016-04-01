// Link tutorial http://www.raymondcamden.com/2014/07/15/Cordova-Sample-Reading-a-text-file/
function fail(e) {
    console.log("FileSystem Error");
    console.dir(e);
}

function gotFile(fileEntry) {

    fileEntry.file(function(file) {
        var reader = new FileReader();

        reader.onloadend = function(e) {
            $('#text').val(this.result);
        }

        reader.readAsText(file);
    });

}


$('#sample-button').on('tap', function(event){
    event.preventDefault();
    window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/sample.txt", gotFile, fail);
});