let size = 100;
let horizontal = new Array(size);

for(let i = 0; i <= size; i++){
    horizontal[i] = i;
}

function repaintChart() {
    series.length = 0;

    for (var i = 0; i < terms.length; i++){
        let serial = getSeriesByTerm(terms[i].term(),100);
        series.push(serial);
    }

    chart.update();
}
