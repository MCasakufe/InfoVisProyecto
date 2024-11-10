// Cargar los archivos de audio
const highWind = new Audio('nature008.mp3');
const mediumWind = new Audio('mediumWind.mp3');
const lowWind = new Audio('lowWind.mp3');

const data = [
    { "FECHA": "240107", "velocidad": "43.04592" },
    { "FECHA": "240109", "velocidad": "31.694616" },
    { "FECHA": "240116", "velocidad": "29.167452" },
    { "FECHA": "240125", "velocidad": "26.620704" },
    { "FECHA": "240203", "velocidad": "34.0758" },
    { "FECHA": "240211", "velocidad": "32.65506" },
    { "FECHA": "240216", "velocidad": "29.556288" },
    { "FECHA": "240223", "velocidad": "23.547852" },
    { "FECHA": "240303", "velocidad": "23.049612" },
    { "FECHA": "240308", "velocidad": "33.761592" },
    { "FECHA": "240313", "velocidad": "30.519432" },
    { "FECHA": "240319", "velocidad": "28.825308000000003" },
    { "FECHA": "240325", "velocidad": "25.52364" },
    { "FECHA": "240404", "velocidad": "25.745400000000004" },
    { "FECHA": "240414", "velocidad": "23.345388" },
    { "FECHA": "240416", "velocidad": "25.738632" },
    { "FECHA": "240426", "velocidad": "29.868408" },
    { "FECHA": "240501", "velocidad": "31.589496" },
    { "FECHA": "240507", "velocidad": "34.061904" },
    { "FECHA": "240513", "velocidad": "22.300344" },
    { "FECHA": "240522", "velocidad": "24.916464" },
    { "FECHA": "240530", "velocidad": "18.46764" },
    { "FECHA": "240608", "velocidad": "42.18372" },
    { "FECHA": "240613", "velocidad": "47.152800000000006" },
    { "FECHA": "240618", "velocidad": "32.397192" },
    { "FECHA": "240627", "velocidad": "19.880028000000003" },
    { "FECHA": "240703", "velocidad": "19.709100000000003" },
    { "FECHA": "240710", "velocidad": "28.717668" },
    { "FECHA": "240721", "velocidad": "23.718168" },
    { "FECHA": "240725", "velocidad": "18.972576" },
    { "FECHA": "240802", "velocidad": "46.24092" },
    { "FECHA": "240806", "velocidad": "34.538616000000005" },
    { "FECHA": "240816", "velocidad": "20.357928" },
    { "FECHA": "240819", "velocidad": "26.158212" },
    { "FECHA": "240826", "velocidad": "23.526252" },
    { "FECHA": "240902", "velocidad": "34.90056" },
    { "FECHA": "240913", "velocidad": "25.34652" },
    { "FECHA": "240919", "velocidad": "26.24994" },
    { "FECHA": "240924", "velocidad": "29.206728" },
    { "FECHA": "241001", "velocidad": "34.519248000000005" },
    { "FECHA": "241009", "velocidad": "23.760648" }
];

function createChart() {
    const dates = data.map(item => {
        const year = parseInt(item.FECHA.slice(0, 2)) + 2000;
        const month = parseInt(item.FECHA.slice(2, 4)) - 1;
        const day = parseInt(item.FECHA.slice(4, 6));
        return new Date(year, month, day);
    });
    const velocities = data.map(item => parseFloat(item.velocidad));

    const trace = {
        x: dates,
        y: velocities,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Velocidad',
        line: { color: 'rgba(0, 0, 0, 1)', width: 2 }
    };

    const layout = {
        xaxis: { /* configuración del eje x */ },
        yaxis: { /* configuración del eje y */ },
        shapes: [ /* configuración de las líneas y círculos */ ],
        annotations: [ /* configuración de las anotaciones */ ],
        autosize: true,
        height: 600,
        margin: { l: 50, r: 50, b: 100, t: 20, pad: 4 },
    };

    const config = {
        responsive: true,
        displayModeBar: false,
        staticPlot: true
    };

    Plotly.newPlot('chart', [trace], layout, config);

    // Evento al pasar por cada punto del gráfico
    const chartDiv = document.getElementById('chart');
    chartDiv.on('plotly_hover', function(eventData) {
        const pointIndex = eventData.points[0].pointIndex;
        const velocity = velocities[pointIndex];
        
        if (velocity > 40) {
            highWind.play();
        } else if (velocity > 30) {
            mediumWind.play();
        } else {
            lowWind.play();
        }
    });

    // Detener el audio al salir del punto
    chartDiv.on('plotly_unhover', function() {
        highWind.pause();
        mediumWind.pause();
        lowWind.pause();
        
        highWind.currentTime = 0;
        mediumWind.currentTime = 0;
        lowWind.currentTime = 0;
    });
}

document.addEventListener('DOMContentLoaded', createChart);
