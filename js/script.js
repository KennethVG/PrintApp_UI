'use strict';

// Globale variabelen en functies die gebruikt worden in dokter en patient 

const inputExternalId = $('#inputExternalId');
const foutExternalId = $("#foutExternalId");
const inputNaam = $("#inputNaam");

function checkNaam(foutboodschap) {
    const naam = inputNaam.val();
    if (naam == null || naam == '') {
        foutExternalId.show().html(foutboodschap);
        return false;
    } else {
        return true;
    }
}

function checkExternalId(foutboodschap) {
    const externalId = inputExternalId.val();
    if (externalId == null || externalId == '') {
        foutExternalId.show().html(foutboodschap);
        return false;
    } else {
        return true;
    }
}

function toonFoutmelding(jqXHR) {
    let msg;
    if (jqXHR.status === 0) {
        msg = 'De backend api draait momenteel niet [0]';
    } else if (jqXHR.status == 404) {
        msg = jqXHR.responseText + ' [404]';
    } else if (jqXHR.status == 500) {
        msg = 'Er is een probleem met de server [500]';
    }
    $(foutExternalId).show().html(msg);
}

/**
 * Displays overlay with "Please wait" text. Based on bootstrap modal. Contains animated progress bar.
 */
function showPleaseWait() {
    let modalLoading = '<div class="modal" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false" role="dialog">' + 
        '<div class="modal-dialog">' +
            '<div class="modal-content">' + 
                '<div class="modal-header">' + 
                    '<h4 class="modal-title">Even geduld ...</h4>' + 
                '</div>' + 
                '<div class="modal-body">' + 
                    '<div class="progress">' + 
                      '<div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" ' + 
                      'aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%; height: 40px"> ' + 
                      '</div> ' + 
                    '</div>' + 
                '</div> ' + 
            '</div>' + 
        '</div> ' + 
    '</div>';
    $(document.body).append(modalLoading);
    $("#pleaseWaitDialog").modal("show");
}

/**
 * Hides "Please wait" overlay. See function showPleaseWait().
 */
function hidePleaseWait() {
    $("#pleaseWaitDialog").modal("hide");
}