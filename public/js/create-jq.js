'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})


function initializePage(){
    initSelectPeopleModal(allPeople, onGuestsChange);

    $('#addGuestsModal').on('show.bs.modal', function(){
        openSelectPeopleModalHandler(invitedPeople);
    });

    $('#save-btn').click(addEvent);

}

var allPeople = [
    'Jason Lin', 
    'Jordan Gassaway',
    'Andrew Camp',
    'Bill Gonzalez',
    'Bill Smith'
];

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
            avatarsHTML += makeAvatar(person);
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
    var params = {title:$('#inputName')[0].value, date:$('#inputDate')[0].value, type:$('inputEventType')[0].value, }

}