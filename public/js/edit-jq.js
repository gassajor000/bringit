'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

var usersData = {};
var eventData = {};

var invitedPeople = [];

var allPeople = {};

function initializePage(){
    $('#addGuestsModal').on('show.bs.modal', function(){
        openSelectPeopleModalHandler(invitedPeople);
    });

    // Extract data
    eventData = $('#eventData').data('event');
    usersData = $('#eventData').data('users');
    allPeople = $('#eventData').data('allpeople');

    initSelectPeopleModal(allPeople, onGuestsChange);

    invitedPeople = eventData.guests.map(guest => usersData[guest]);
    updateAvatarList();
    $('#save-btn').click(updateEvent);
}

var closeButton = '<i class="material-icons rem-person-btn">cancel</i>';
var invitePeopleText = '<div class="invite-people-text"><i class="material-icons">group_add</i>Invite People</div>';

function makeAvatar(name){
    return "<div class=\"avatar\">" + name[0].toUpperCase() + "</div>";
}

function onGuestsChange(newInviteList){
    invitedPeople = Array.from(newInviteList);
    updateAvatarList();
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
        $('#peopleContainer').html(invitePeopleText);
    }
}

function updateEvent() {
    var guest = invitedPeople.map(user => user.username);
    var params = {title:$('#inputName')[0].value, date:$('#inputDate')[0].value, type:"", guests:guest, eventId: eventData.id};
    $.post('./updateevent', params);
}