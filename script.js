<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gráfico de Velocidad del Viento</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>
    <div id="chart" style="width:100%; max-width:800px; height:600px;"></div>

    <script>
        const data = [
            { "FECHA": "240107", "velocidad": "43.04592" },
            { "FECHA": "240109", "velocidad": "31.694616" },
            // Agrega el resto de los datos aquí...
        ];

        function createChart(data) {
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
                mode: 'lines',
                name: 'Velocidad',
                line: { color: 'rgba(0, 0, 0, 1)', width: 2 }
            };

            const layout = {
                xaxis: {
                    type: 'date',
                    tickformat: '%B',
                    dtick: 'M1',
                    tickangle: -45,
                    ticktext: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    tickvals: dates.filter((d, i, arr) => i === 0 || d.getMonth() !== arr[i-1].getMonth()),
                    showgrid: false
                },
                yaxis: {
                    title: 'Velocidad (Km/h)',
                    range: [0, 50],
                    showgrid: false
                },
                shapes: [
                    // Agrega las formas y anotaciones aquí
                ],
                annotations: [
                    // Agrega las anotaciones aquí
                ],
                autosize: true,
                height: 600,
                margin: { l: 50, r: 50, b: 100, t: 20, pad: 4 }
            };

            const config = { responsive: true, displayModeBar: false, staticPlot: true };

            Plotly.newPlot('chart', [trace], layout, config).then(chartElement => {
                // Define los sonidos
                const highWindAudio = new Audio("nature008.mp3");
                const mediumWindAudio = new Audio("mediumWind.mp3");
                const lowWindAudio = new Audio("lowWind.mp3");
                let currentAudio = null;

                // Evento para reproducir sonido
                chartElement.on('plotly_hover', eventData => {
                    const windSpeed = parseFloat(eventData.points[0].y);

                    if (windSpeed >= 40) {
                        currentAudio = highWindAudio;
                        currentAudio.volume = Math.min(1, (windSpeed - 40) / 10);
                    } else if (windSpeed >= 20) {
                        currentAudio = mediumWindAudio;
                        currentAudio.volume = Math.min(1, (windSpeed - 20) / 10);
                    } else {
                        currentAudio = lowWindAudio;
                        currentAudio.volume = Math.min(1, windSpeed / 10);
                    }

                    currentAudio.currentTime = 0;
                    currentAudio.play();
                });

                // Evento para detener sonido
                chartElement.on('plotly_unhover', () => {
                    if (currentAudio) {
                        currentAudio.pause();
                        currentAudio.currentTime = 0;
                    }
                });
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Si usas un archivo JSON, puedes cargarlo así:
            // fetch('./data.json')
            //     .then(response => response.json())
            //     .then(data => createChart(data))
            //     .catch(error => console.error('Error cargando el archivo JSON:', error));
            
            // Si los datos están en el código, usa esto directamente
            createChart(data);
        });
    </script>
</body>
</html>
