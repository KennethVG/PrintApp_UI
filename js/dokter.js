class Dokter {
    constructor(externalID, firstName, lastName, nihii, phone, streetWithNumber, zip, city, title, active, printProtocols, format, nihiiAddress, eProtocols, secondCopy) {
        this.externalID = externalID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nihii = nihii;
        this.phone = phone;
        this.streetWithNumber = streetWithNumber;
        this.zip = zip;
        this.city = city;
        this.title = title;
        this.printProtocols = printProtocols;
        this.format = format;
        this.nihiiAddress = nihiiAddress;
        this.active = active;
        this.eProtocols = eProtocols;
        this.secondCopy = secondCopy;
    }
}

class LinkedDokter {
    constructor(externalId, linkedId) {
        this.externalId = externalId;
        this.linkedId = linkedId;
    }
}

// const CAREGIVER_URL = "http://localhost:8089/caregiver/";
// const CAREGIVER_URL_SEARCH = "http://localhost:8089/caregiver/search/";
//
// const LINKEDCAREGIVER_URL = "http://localhost:8089/linkedCaregiver";

const CAREGIVER_URL = "http://hermes:8090/caregiver/";
const CAREGIVER_URL_SEARCH = "http://hermes:8090/caregiver/search/";

const LINKEDCAREGIVER_URL = "http://hermes:8090/linkedCaregiver";

// Formulieren:
const formulier = $('#dokterForm');
const mnemonicFormulier = $('#mnemonicForm');
const linkedFormulier = $('#linkedForm');

// Input velden:
const inputTitel = $('#inputTitel');
const inputVoornaam = $('#inputVoornaam');
const inputAchternaam = $('#inputAchternaam');
const inputStraatEnNummer = $('#inputStraat');
const inputGemeente = $('#inputGemeente');
const inputPostcode = $('#inputZip');
const inputNihii = $('#inputNihii');
const inputTelefoon = $('#inputTelefoon');
const inputNihiiAdres = $('#inputNihiiAdres');
const inputLinkedId = $('#inputLinkedId');

// Select veld
const selectFormaat = $('#selectFormaat');
const selectDokters = $("#selectdokters");

// Checkboxes:
const checkEprotocols = $('#checkEprotocols');
const checkPrintprotocols = $('#checkPrintprotocols');
const checkTweeKopijs = $('#checkTweeKopijs');
const checkActief = $('#checkActief');

// Buttons
const btnZoekDokter = $('#zoekDokter');
const btnUpdateDokter = $('#updateDokter');
const btnZoekDokterOpNaam = $("#zoekDokterOpNaam");
const btnUpdateLinkedId = $("#updateLinkedId");

selectDokters.hide();

// Don't go to action
$(mnemonicFormulier).submit((e) => {
    e.preventDefault();
});

$(formulier).submit((e) => {
    e.preventDefault();
});

$(linkedFormulier).submit((e) => {
    e.preventDefault();
});


$(btnZoekDokterOpNaam).click(() => {
    if (checkNaam("Vul de voor en/of achternaam van de dokter in")) {
        showPleaseWait();
        selectDokters.empty().append(new Option("Selecteer dokter ...", ""));

        $.ajax(getRequest(CAREGIVER_URL_SEARCH + inputNaam.val()))
            .done((data) => {
                for (let c of data.caregivers) {
                    selectDokters.append(new Option(c.firstName + ' ' + c.lastName + '(' + c.externalID + ')', c.externalID));
                }
                hidePleaseWait();
                selectDokters.show();
            }).fail((jqXHR) => {
            hidePleaseWait();
            toonFoutmelding(jqXHR);
        });
    }
});

$(selectDokters).change(() => {
    const getDokter = CAREGIVER_URL + selectDokters.val();
    inputExternalId.val(selectDokters.val());
    zoekDokterOpExternalId(getDokter);
});

$(btnZoekDokter).click(() => {
    if (checkExternalId("Vul de mnemonic in van de dokter")) {
        foutExternalId.hide();
        selectDokters.hide();
        inputNaam.val('');
        const getDokter = CAREGIVER_URL + inputExternalId.val();
        zoekDokterOpExternalId(getDokter);
    }
});

$(btnUpdateLinkedId).click(() => {

    const linkedId = inputLinkedId.val();
    if (linkedId != null && linkedId.length === 5) {
        const linkedDokter = new LinkedDokter(inputExternalId.val(), inputLinkedId.val());

        $.ajax({
            url: LINKEDCAREGIVER_URL,
            type: "POST",
            data: JSON.stringify(linkedDokter),
            contentType: "application/json; charset=utf-8",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            success: function (response) {
                window.alert(response);
                mnemonicFormulier.trigger("reset");
                formulier.trigger("reset");
                linkedFormulier.trigger("reset");
                btnUpdateDokter.prop('disabled', true);
                inputLinkedId.prop('disabled', true);
                btnUpdateLinkedId.prop('disabled', true);
            },
            error: () => {
                console.log("Niet gelukt!");
            }
        });
    } else {
        alert("Dit is geen geldige externalId");
    }
});

$(btnUpdateDokter).click(() => {
    if (checkExternalId("Vul de mnemonic in van de dokter")) {
        foutExternalId.hide();
        const postDokter = CAREGIVER_URL + inputExternalId.val();

        const telefoon = inputTelefoon.val() == '' ? null : inputTelefoon.val();
        const titel = inputTitel.val() == '' ? 'Dr.' : inputTitel.val();

        const dokter = new Dokter(inputExternalId.val(), inputVoornaam.val(), inputAchternaam.val(),
            inputNihii.val(), telefoon, inputStraatEnNummer.val(), inputPostcode.val(),
            inputGemeente.val(), titel, checkActief.prop("checked"), checkPrintprotocols.prop("checked"),
            selectFormaat.val(), inputNihiiAdres.val(), checkEprotocols.prop("checked"),
            checkTweeKopijs.prop("checked"));

        $.ajax({
            url: postDokter,
            type: "POST",
            data: JSON.stringify(dokter),
            contentType: "application/json; charset=utf-8",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            success: function (response) {
                window.alert(response);
                mnemonicFormulier.trigger("reset");
                formulier.trigger("reset");
                btnUpdateDokter.prop('disabled', true);
                inputLinkedId.prop('disabled', true);
                btnUpdateLinkedId.prop('disabled', true);
            },
            error: () => {
                console.log("Niet gelukt!");
            }
        });
    }
});

function getRequest(url) {
    return {
        'cache': false,
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };
}

function zoekLinkedId() {
    $.ajax(getRequest(LINKEDCAREGIVER_URL + "/" + inputExternalId.val()))
        .done((data) => {
            inputLinkedId.val(data.linkedId);
        }).fail((jqXHR) => {
        toonFoutmelding(jqXHR);
    });
}

function zoekDokterOpExternalId(url) {
    $.ajax(getRequest(url))
        .done((data) => {
            inputTitel.val(data.title == '' ? 'Dr.' : data.title);
            inputAchternaam.val(data.lastName);
            inputVoornaam.val(data.firstName);
            inputNihii.val(data.nihii);
            inputStraatEnNummer.val(data.streetWithNumber);
            inputGemeente.val(data.city);
            inputPostcode.val(data.zip);
            inputTelefoon.val(data.phone);
            inputNihiiAdres.val(data.nihiiAddress);
            selectFormaat.val(data.format).prop('selected', true);
            checkActief.prop('checked', data.active);
            checkEprotocols.prop('checked', data.eProtocols);
            checkPrintprotocols.prop('checked', data.printProtocols);
            checkTweeKopijs.prop('checked', data.secondCopy);
            btnUpdateDokter.prop('disabled', false);
            inputLinkedId.prop('disabled', false);
            btnUpdateLinkedId.prop('disabled', false);

            zoekLinkedId();

        }).fail((jqXHR) => {
        toonFoutmelding(jqXHR);
    });
}