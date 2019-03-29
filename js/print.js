'use strict';

const PRINTJOB_URL_START = "http://localhost:8080/printjob/start";
const PRINTJOB_URL_STOP = "http://localhost:8080/printjob/stop";

const btnStart = $("#start");
const btnStop = $("#stop");

$(btnStart).click(()=>{
    $.get(PRINTJOB_URL_START, () =>{

    }).done(()=>{
        btnStop.prop('disabled', false);
    });
});

$(btnStop).click(()=>{
    $.get(PRINTJOB_URL_STOP, () =>{

    }).done(()=>{
        btnStart.prop('disabled', false);
    });
});