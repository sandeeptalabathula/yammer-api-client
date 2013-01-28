var myMessages = ['warning', 'error', 'success']; // define the messages types

var messageSuffix = "<p class='notificationMessage'><code>(click on this box to dismiss)</code></p>";

function hideAllMessages() {
    try {
        var messagesHeights = new Array(); // this array will store height for each

        for (i = 0; i < myMessages.length; i++) {
            messagesHeights[i] = $('.' + myMessages[i]).outerHeight();
            $('.' + myMessages[i]).css('top', -messagesHeights[i]); //move element outside viewport	  
        }
    }
    catch (e) {
        alert(e);
    }
}

function showMessage(type, message) {
    try {
        hideAllMessages();
        $('.notificationMessage').remove();
        var messageTitle;
        if (type == 'success') {
            messageTitle = '<h3>Success Message</h3>';
        }
        if (type == 'error') {
            messageTitle = '<h3>Error Message</h3>';
        }
        if (type == 'warning') {
            messageTitle = '<h3>Warning Message</h3>';
        }
        $('.' + type).show();
        $('.' + type).append($('<p class="notificationMessage">' + message + '</p>' + messageSuffix).fadeIn('slow'));
        $('.' + type).animate({ top: "0", left: "200px", right: "200px" }, 500);

        $('.notifications').delegate(".message", "click", function () {
            $('.message').fadeOut("slow");
        });
    } catch (e) {
        alert(e);
    }
}