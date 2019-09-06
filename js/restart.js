const RESTART_URL = "http://christos:8090/";
// const RESTART_URL = "http://localhost:8090/";
const restart = $('#restart');

$(restart).click(() => {
    $.getJSON(RESTART_URL + "restart",
        (response) => {
            console.log(response);
        }
    ).done(() => {
        window.open(RESTART_URL, "_blank");
        alert("Backend succesvol herstart!");
    }).fail(() => {
        window.open(RESTART_URL, "_blank");
        alert("Backend succesvol herstart!");
    });
});