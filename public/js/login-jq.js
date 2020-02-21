'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

function initializePage(){
    $('#loginBtn').click(login);
}

function login(){
    var params = {username: $('#usernameInput')[0].value, password: $('#passwordInput')[0].value};
    $.post('/login', params, function(){
        window.location = '/index';   // navigate to index
    }).fail(function(){
        alert('invalid username or password');
    });
}