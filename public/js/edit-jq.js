'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

var usersData = {};
var eventData = {};

var invitedPeople = [];

var allPeople = [
    'Jason Lin', 
    'Jordan Gassaway',
    'Andrew Camp',
    'Bill Gonzalez',
    'Bill Smith'
];

function initializePage(){
    initSelectPeopleModal(allPeople, onGuestsChange);

    $('#addGuestsModal').on('show.bs.modal', function(){
        openSelectPeopleModalHandler(invitedPeople);
    });

    // Extract data
    eventData = $('#eventData').data('event');
    usersData = $('#eventData').data('users');
    invitedPeople = eventData.guests.map(guest => usersData[guest].name);
    updateAvatarList();
}

var invitedPeople = [];
var closeButton = '<i class="material-icons rem-person-btn">cancel</i>'

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
            avatarsHTML += makeAvatar(person);
        }
        $('#peopleContainer').html(avatarsHTML);
    } else{
        $('#peopleContainer').text('Guests will appear here when you add them');
    }
}