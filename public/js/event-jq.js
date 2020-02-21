'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

var claimClicked = false;
var usersData = {};
var itemsData = {};
var eventData = {};

function initializePage(){
    $('#claimModal').on('show.bs.modal', openClaimModal);
    $('#claimModal').on('hide.bs.modal', function (event){
        claimClicked = false;
    });
    $('#detailsModal').on('show.bs.modal', openDetailsModal);
    $('#newItemModal').on('show.bs.modal', openAddItemModal);
    $('#add-category-field').hide();
    $('#submit-category-btn').click(submitCategory);
    $('#add-category-btn').click(addCategory);
    $('#addItemSubmitBtn').click(addItem);
    $('#claimSubmitBtn').click(claimItem);

    // Extract data
    eventData = $('#eventData').data('event');
    usersData = $('#eventData').data('users');
    itemsData = $('#eventData').data('items');
}

function openClaimModal(event) {
    claimClicked = true;
    var button = $(event.relatedTarget); // Button that triggered the modal
    var item = itemsData[button.data('itemid')]; // Extract info from data-* attributes
    
    var modal = $(this);
    modal.data('item', item);
    modal.find('.modal-title').text('Claim ' + item.name);
    modal.find('#quantity-addon').text('x' + item.quantity);
  }

function openAddItemModal(event) {
    claimClicked = true;
    var button = $(event.relatedTarget); // Button that triggered the modal
    var category = button.data('category'); // Extract category to add to
    
    $(this).data('category', category);
  }

  function openDetailsModal(event) {
    var button = $(event.relatedTarget);

    if(claimClicked){
        event.stopPropagation();
        return false;
    }

    var item = itemsData[button.data('item')];
    
    var modal = $(this);
    modal.find('.modal-title').text(item["name"]);
    modal.find('#item-quantity').text('x' + item.quantity);
    modal.find('#item-points').text(item.points + 'pts');
    modal.find('#item-details').text(item.description);

    var assignee_list = modal.find("#assignee-list");
    if (item['claimedBy'].length === 0){
        assignee_list.addClass('hidden');
        return;
    } else {
        assignee_list.removeClass('hidden');
    }

    var assignee_code = '<tbody>';
    for(const assignee in item.claimedBy){
        var user = usersData[assignee];
        assignee_code += '<tr scope="row">';
        assignee_code += "<td>" + makeAvatar(user.name) + "</td>";
        assignee_code += '<td class="center-cell">' + user.name + "</td>";
        assignee_code += "<td>x" + item.claimedBy[assignee] + "</td>";
        assignee_code +='</tr>';
    }

    assignee_code +='</tbody>';
    assignee_list.html(assignee_code)
  }

function makeAvatar(name){
    return "<div class=\"avatar\">" + name[0].toUpperCase() + "</div>";
}

function addCategory(){
    $('#add-category-field').show();
    $('#add-category-btn').hide();
}
function submitCategory(){
    $('#add-category-field').hide();
    $('#add-category-btn').show();
    var params = {category: $('#add-category-input')[0].value, eventId: eventData.id};
    $.post('/addcategory', params);
}

function claimItem(){
    var modal = $('#claimModal');

    var params = {itemId: modal.data('item').id, quantity:  modal.find('#quantityInput')[0].value}
    $.post('/claimitem', params);
}

function addItem(){
    var params = {name: $('#inputItemName')[0].value, quantity: $('#inputQuantity')[0].value, points: $('#inputPoints')[0].value, description: $('#inputDetails')[0].value, category: $('#newItemModal').data.category, eventId: eventData.id};
    $.post('/additem', params);
}