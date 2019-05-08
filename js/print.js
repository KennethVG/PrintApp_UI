'use strict';

// const PRINTJOB_URL_START = "https://localhost:8090/printjob/start";
// const PRINTJOB_URL_STOP = "https://localhost:8090/printjob/stop";
const PRINTJOB_URL_START = "http://cctest:8090/printjob/start";
const PRINTJOB_URL_STOP = "http://cctest:8090/printjob/stop";

const btnStart = $("#start");
const btnStop = $("#stop");
const printstatus = $("#printstatus");

$(btnStart).click(() => {
    $.get(PRINTJOB_URL_START, (response) => {
        $(printstatus).html(response);
    }).done(() => {
        btnStop.prop('disabled', false);
        btnStart.prop('disabled', true);
    });
});

$(btnStop).click(() => {
    $.get(PRINTJOB_URL_STOP, (response) => {
        $(printstatus).html(response);
    }).done(() => {
        btnStart.prop('disabled', false);
        btnStop.prop('disabled', true);
    });
});