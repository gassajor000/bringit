'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

var claimClicked = false;


function initializePage(){
    $('#claimModal').on('show.bs.modal', openClaimModal);
    $('#claimModal').on('hide.bs.modal', function (event){
        claimClicked = false;
    });
    $('#detailsModal').on('show.bs.modal', openDetailsModal);
    $('#add-category-field').hide();
    $('#submit-category-btn').click(submitCategory);
    $('#add-category-btn').click(addCategory);
}

function openClaimModal(event) {
    claimClicked = true;
    var button = $(event.relatedTarget); // Button that triggered the modal
    var itemName = button.data('item-name'); // Extract info from data-* attributes
    var quantity = button.data('quantity'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    modal.find('.modal-title').text('Claim ' + itemName);
    modal.find('#quantity-addon').text('x' + quantity);
  }

  function openDetailsModal(event) {
    var button = $(event.relatedTarget);

    if(claimClicked){
        event.stopPropagation();
        return false;
    }

    var item = button.data('item');
    
    var modal = $(this);
    modal.find('.modal-title').text(item["item-name"]);
    modal.find('#item-quantity').text('x' + item.quantity);
    modal.find('#item-points').text(item.points + 'pts');
    modal.find('#item-details').text(item.description);

    var assignee_list = modal.find("#assignee-list");
    if (item['claimed-by'].length === 0){
        assignee_list.addClass('hidden');
        return;
    } else {
        assignee_list.removeClass('hidden');
    }

    var assignee_code = '<tbody>';
    for (var i=0; i < item["claimed-by"].length; i++){
        // Do stuff
        var assignee = item["claimed-by"][i];
         assignee_code += '<tr scope="row">' + "</td>";
         assignee_code += "<td>" + makeAvatar(assignee.name);
         assignee_code += "<td>" + assignee.name + "</td>";
         assignee_code += "<td>x" + assignee.quantity + "</td>";
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
}