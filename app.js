let oneNineSix = document.getElementById('196');
let oneNineEight = document.getElementById('198');
let advice = document.getElementById('advice');
grabData();

function grabData() {
    const Http = new XMLHttpRequest();
    Http.open('GET', 'https://arrivelah2.busrouter.sg/?id=17191');
    Http.send();

    Http.onreadystatechange = (e) => {
        let state = Http.readyState;
        if (state == 4) {
            let body = JSON.parse(Http.responseText);
            backGate = body.services[2].next.duration_ms;
            grabData2();
        }
    };
}
function grabData2() {
    const Http = new XMLHttpRequest();

    Http.open('GET', 'https://arrivelah2.busrouter.sg/?id=17129');
    Http.send();

    Http.onreadystatechange = (e) => {
        let state = Http.readyState;
        if (state == 4) {
            let body = JSON.parse(Http.responseText);
            oppRoad = body.services[1].next.duration_ms;

            main();
        }
    };
}
function main() {
    oneNineSix.innerText = parseTime(backGate % 1000);

    oneNineEight.innerText = parseTime(oppRoad % 1000);
}

function parseTime(time) {
    if (time < 0) return 'Leaving';
    const hours = Math.floor(time / 3600);
    time -= hours * 3600;
    const minutes = Math.round(time / 60);

    if (hours == 0) return `${minutes}m`;
    return `${hours}h${parseInt(minutes)}m`;
}
