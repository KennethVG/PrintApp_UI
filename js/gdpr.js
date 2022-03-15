// const GDPR_URL = "http://localhost:8089/patient/beperking";
const GDPR_URL = "http://hermes:8090/patient/beperking";

const table = document.getElementById("table");

function zoekPatienten(url) {
    console.log(url);
    $.getJSON(url,
        ((data) => {
            console.log(data);
            for (const patient of data.patients) {
                console.log(patient);
                const tr = table.insertRow();
                for (let i = 0; i < 5; i++) {
                    tr.insertCell(i);
                }
                const cells = tr.cells;
                cells.item(0).innerText = patient.externalId;
                cells.item(1).innerText = patient.person.firstName;
                cells.item(2).innerText = patient.person.lastName;
                cells.item(3).innerText = patient.consent;
                cells.item(4).innerText = patient.remark;
                table.appendChild(tr);
            }
        })
    ).done(() => {
        console.log("Gelukt!");
    }).fail((jqXHR) => {
        toonFoutmelding(jqXHR);
    });
}

zoekPatienten(GDPR_URL);