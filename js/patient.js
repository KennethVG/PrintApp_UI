// const PATIENT_URL = "http://localhost:8089/patient/";
// const PATIENT_URL_SEARCH = "http://localhost:8089/patient/search/";
// const CAREGIVER_URL = "http://localhost:8089/caregiver/";

const PATIENT_URL = "http://hermes:8090/patient/";
const PATIENT_URL_SEARCH = "http://hermes:8090/patient/search/";
const CAREGIVER_URL = "http://hermes:8090/caregiver/";

// Formulieren:
const patientForm = $('#patientForm');
const externalIdForm = $('#externalIdForm');

// Input velden:
const inputVoornaam = $('#inputVoornaam');
const inputAchternaam = $('#inputAchternaam');
const inputHuisArtsMnemonic = $("#inputHuisartsMnemonic");
const inputHuisArtsAchternaam = $("#inputHuisartsAchternaam");
const inputHuisArtsVoornaam = $("#inputHuisartsVoornaam");
const inputMnemonicNieuweHuisarts = $("#inputMnemonicNieuweHuisarts");
const inputNaamNieuweHuisarts = $("#inputNaamNieuweHuisarts");
const inputGDPR = $("#inputGDPR");
const inputOpmerking = $("#inputOpmerking");

// Select veld
const selectPatient = $("#selectPatient");

// Buttons
const btnZoekPatient = $('#zoekPatient');
const btnUpdatePatient = $('#updatePatient');
const btnZoekPatientOpNaam = $("#zoekPatientOpNaam");

let dokterId;

selectPatient.hide();


// Don't go to action
$(patientForm).submit((e) => {
    e.preventDefault();
});

$(externalIdForm).submit((e) => {
    e.preventDefault();
});

$(btnZoekPatient).click(() => {
    if (checkExternalId("Vul het externalId in van de patiënt")) {
        selectPatient.hide();
        inputNaam.val('');
        foutExternalId.hide();
        const getPatient = PATIENT_URL + inputExternalId.val();
        zoekPatientOpExternalId(getPatient);
    }
});

$(inputMnemonicNieuweHuisarts).keyup(() => {
    const mnemonicNieuweDokter = inputMnemonicNieuweHuisarts.val();
    if (mnemonicNieuweDokter.length == 5) {
        foutExternalId.hide();
        const getDokter = CAREGIVER_URL + mnemonicNieuweDokter;
        $.getJSON(getDokter,
            ((data) => {
                inputNaamNieuweHuisarts.val(data.fullName);
                dokterId = data.id;
            })
        ).done(() => {
            btnUpdatePatient.prop('disabled', false);
        }).fail((jqXHR) => {
            toonFoutmelding(jqXHR);
        });
    }
});

$(btnUpdatePatient).click(() => {
    if (checkExternalId("Vul het externalId in van de patiënt")) {
        foutExternalId.hide();
        const postPatient = PATIENT_URL + inputExternalId.val();
        const mnemonicNieuweDokter = inputMnemonicNieuweHuisarts.val();
        if (mnemonicNieuweDokter == null || mnemonicNieuweDokter == '') {
            foutExternalId.show().html("Vul de mnemonic in van de nieuwe huisarts");
        } else {
            $.ajax({
                url: postPatient,
                type: "POST",
                data: dokterId,
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    window.alert(response);
                    patientForm.trigger("reset");
                    externalIdForm.trigger("reset");
                    btnUpdatePatient.prop('disabled', true);
                },
                error: (jqXHR) => {
                    console.log("Niet gelukt!");
                    toonFoutmelding(jqXHR);
                }
            });
        }

    }
});

$(btnZoekPatientOpNaam).click(() => {
    if (checkNaam("Vul de voor of achternaam van de patiënt in")) {
        showPleaseWait();
        selectPatient.empty().append(new Option("Selecteer patiënt ...", ""));
        $.getJSON(PATIENT_URL_SEARCH + inputNaam.val(), ((data) => {
            for (let c of data.patients) {
                let opt = new Option(c.person.firstName + ' ' + c.person.lastName + '(' + c.externalId + ')', c.externalId);
                selectPatient.append(opt);
            }
        })).done(() => {
            hidePleaseWait();
            selectPatient.show();
        }).fail((jqXHR) => {
            hidePleaseWait();
            toonFoutmelding(jqXHR);
        });
    }
});

$(selectPatient).change(() => {
    const getPatient = PATIENT_URL + selectPatient.val();
    inputExternalId.val(selectPatient.val());
    zoekPatientOpExternalId(getPatient);
});

function zoekPatientOpExternalId(url) {
    $.getJSON(url,
        ((data) => {
            inputAchternaam.val(data.person.lastName);
            inputVoornaam.val(data.person.firstName);
            inputHuisArtsMnemonic.val(data.externalCaregiver.externalID);
            inputHuisArtsAchternaam.val(data.externalCaregiver.lastName);
            inputHuisArtsVoornaam.val(data.externalCaregiver.firstName);
            inputOpmerking.val(data.remark);
            inputGDPR.prop('checked', data.consent == true);
        })
    ).done(() => {
        inputMnemonicNieuweHuisarts.prop('disabled', false);
        btnUpdatePatient.prop('disabled', false);
    }).fail((jqXHR) => {
        toonFoutmelding(jqXHR);
    });
}