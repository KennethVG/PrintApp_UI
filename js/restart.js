const RESTART_URL = "http://christos:8090/restart/";
// const RESTART_URL = "http://localhost:8090/restart/";
const restart = $('#restart');

$(restart).click(() => {
    $.getJSON(RESTART_URL,
        (response) => {
            console.log(response);
        }
    ).done(() => {
        alert("Backend succesvol herstart!");
    });
});