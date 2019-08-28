const RESTART_URL = "http://christos:8090/restart/";
// const RESTART_URL = "http://localhost:8090/restart/";
const restart = $('#restart');

$(restart).click(() => {
    $.getJSON(RESTART_URL,
        (response) => {
            console.log(response);
            window.open("http://christos:8090", "_blank");
        }
    ).done(() => {
        alert("Backend succesvol herstart!");
    });
});