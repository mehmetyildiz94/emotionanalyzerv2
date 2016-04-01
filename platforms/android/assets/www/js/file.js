function onInitFs(fs) {

  fs.root.getFile('sample.txt', {}, function(fileEntry) {

    // Get a File object representing the file,
    // then use FileReader to read its contents.
    fileEntry.file(function(file) {
       var reader = new FileReader();

       reader.onloadend = function(e) {
         var txtArea = $('#text');
         txtArea.value = this.result;
       };

       reader.readAsText(file);
    }, errorHandler);

  }, errorHandler);

}


$('#sample-button').on('tap', function(event){
    event.preventDefault();
    alert('button-click');
    window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);
});