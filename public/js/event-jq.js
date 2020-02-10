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

    if (item['claimed-by'] === []){
        return;
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
    modal.find("#assignee-list").html(assignee_code)
  }

function makeAvatar(name){
    return "<div class=\"avatar\">" + name[0].toUpperCase() + "</div>";
}