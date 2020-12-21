const RESTART_URL = "http://hermes:8090/";
// const RESTART_URL = "http://localhost:8090/";
const restart = $('#restart');

$(restart).click(() => {
    showPleaseWait();
    $.getJSON(RESTART_URL + "restart",
        (response) => {
            console.log(response);
        }
    ).done(() => {
        hidePleaseWait();
        window.open(RESTART_URL, "_blank");
        alert("Backend succesvol herstart!");
    }).fail(() => {
        hidePleaseWait();
        window.open(RESTART_URL, "_blank");
        alert("Backend succesvol herstart!");
    });
});