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
    if (backGate < 0) {
        oneNineSix.innerText = 'You probably missed the bus';
    } else {
        oneNineSix.innerText = parseTime(backGate % 1000);
    }
    if (oppRoad < 0) {
        oneNineEight.innerText = 'You probably missed the bus';
    } else {
        oneNineEight.innerText = parseTime(oppRoad % 1000);
    }
}

function parseTime(time) {
    const minutes = Math.floor(time / 60);
    time -= minutes * 60;
    return `${minutes}m${parseInt(time)}s`;
}
