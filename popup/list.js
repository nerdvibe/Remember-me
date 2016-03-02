$( document ).ready(function() {

    $(".newNotes").on( "click", function(event) {
        event.preventDefault();
        location.replace('popup.html');
    });

});
