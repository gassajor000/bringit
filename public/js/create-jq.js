'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})


function initializePage(){
    $('#addGuestsModal').on('show.bs.modal', function(){
        openSelectPeopleModalHandler(invitedPeople);
    });

    $('#save-btn').click(addEvent);

    allPeople = $('#eventData').data('allpeople');

    initSelectPeopleModal(allPeople, onGuestsChange);
}

var allPeople = [];

var invitedPeople = [];
var closeButton = '<i class="material-icons rem-person-btn">cancel</i>'

function makeAvatar(name){
    return "<div class=\"avatar\">" + name[0].toUpperCase() + "</div>";
}

function updateAvatarList(){
    if(invitedPeople.length > 0){
        var avatarsHTML = ''
        for(var i=0; i < invitedPeople.length; i++){
            var person = invitedPeople[i];
            avatarsHTML += makeAvatar(person.name);
        }
        $('#peopleContainer').html(avatarsHTML);
    } else{
        $('#peopleContainer').text('Guests will appear here when you add them');
    }
}

function onGuestsChange(newInviteList){
    invitedPeople = Array.from(newInviteList);
    updateAvatarList();
}

function addEvent () {
    var guest = invitedPeople.map(user => user.username);
    var category = [];
    var params = {title:$('#inputName')[0].value, date:$('#inputDate')[0].value, type:$('#inputEventType')[0].value, guests:guest, categories:category};
    $.post('/createEvent', params);
}