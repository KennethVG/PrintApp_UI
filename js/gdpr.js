// const GDPR_URL = "http://localhost:8089/patient/beperking";
const GDPR_URL = "http://hermes:8090/patient/beperking";

const table = document.getElementById("table");

function zoekPatienten(url) {
    $.getJSON(url,
        ((data) => {
            for (const patient of data.patients) {
                const tr = table.insertRow();
                for (let i = 0; i < 4; i++) {
                    tr.insertCell(i);
                }
                const cells = tr.cells;
                cells.item(0).innerText = patient.externalId;
                cells.item(1).innerText = patient.person.firstName;
                cells.item(2).innerText = patient.person.lastName;
                cells.item(3).innerText = patient.remark;
                table.appendChild(tr);
            }
        })
    ).done(() => {

    }).fail((jqXHR) => {
        toonFoutmelding(jqXHR);
    });
}

zoekPatienten(GDPR_URL);