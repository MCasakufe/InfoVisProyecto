document.addEventListener('DOMContentLoaded', function() {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const velocities2022 = [18.5, 20, 17, 19, 20.5, 17, 17, 15.5, 33, 32, 29, 22];
    const velocities2023 = [29, 20, 14.8, 25, 25, 29, 19, 22, 27, 30, 37, 38];

    const trace2022 = {
        x: months,
        y: velocities2022,
        type: 'scatter',
        mode: 'lines',
        name: '2022',
        line: {color: '#1f77b4'},
        marker: {symbol: 'triangle-down', size: 10}
    };

    const trace2023 = {
        x: months,
        y: velocities2023,
        type: 'scatter',
        mode: 'lines',
        name: '2023',
        line: {color: '#ff7f0e'},
        marker: {symbol: 'triangle-up', size: 10}
    };

    const layout = {
        title: 'Velocidad del Viento 2022 vs 2023',
        xaxis: {title: 'Mes'},
        yaxis: {title: 'Velocidad (KM/h)', range: [0, 60]},
        legend: {
            x: 0,
            y: 1.2,
            orientation: 'h'
        },
        annotations: [
            {
                x: 'Marzo',
                y: 14.8,
                xref: 'x',
                yref: 'y',
                text: 'V. min 2023<br>Marzo: 14.8',
                showarrow: true,
                arrowhead: 7,
                ax: 0,
                ay: -40
            },
            {
                x: 'Noviembre',
                y: 38,
                xref: 'x',
                yref: 'y',
                text: 'V. max 2023<br>Marzo: 25.9',
                showarrow: true,
                arrowhead: 7,
                ax: 0,
                ay: -40
            },
            {
                x: 'Agosto',
                y: 15.5,
                xref: 'x',
                yref: 'y',
                text: 'V. min 2022<br>Agosto: 15.5',
                showarrow: true,
                arrowhead: 7,
                ax: 0,
                ay: 40
            }
        ]
    };

    const config = {responsive: true};

    Plotly.newPlot('windGraph', [trace2022, trace2023], layout, config);
});