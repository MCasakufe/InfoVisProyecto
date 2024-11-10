//const data = require('./data.json');

const data = [
    {
        "FECHA": "240107",
        "velocidad": "43.04592"
    },
    {
        "FECHA": "240109",
        "velocidad": "31.694616"
    },
    {
        "FECHA": "240116",
        "velocidad": "29.167452"
    },
    {
        "FECHA": "240125",
        "velocidad": "26.620704"
    },
    {
        "FECHA": "240203",
        "velocidad": "34.0758"
    },
    {
        "FECHA": "240211",
        "velocidad": "32.65506"
    },
    {
        "FECHA": "240216",
        "velocidad": "29.556288"
    },
    {
        "FECHA": "240223",
        "velocidad": "23.547852"
    },
    {
        "FECHA": "240303",
        "velocidad": "23.049612"
    },
    {
        "FECHA": "240308",
        "velocidad": "33.761592"
    },
    {
        "FECHA": "240313",
        "velocidad": "30.519432"
    },
    {
        "FECHA": "240319",
        "velocidad": "28.825308000000003"
    },
    {
        "FECHA": "240325",
        "velocidad": "25.52364"
    },
    {
        "FECHA": "240404",
        "velocidad": "25.745400000000004"
    },
    {
        "FECHA": "240414",
        "velocidad": "23.345388"
    },
    {
        "FECHA": "240416",
        "velocidad": "25.738632"
    },
    {
        "FECHA": "240426",
        "velocidad": "29.868408"
    },
    {
        "FECHA": "240501",
        "velocidad": "31.589496"
    },
    {
        "FECHA": "240507",
        "velocidad": "34.061904"
    },
    {
        "FECHA": "240513",
        "velocidad": "22.300344"
    },
    {
        "FECHA": "240522",
        "velocidad": "24.916464"
    },
    {
        "FECHA": "240530",
        "velocidad": "18.46764"
    },
    {
        "FECHA": "240608",
        "velocidad": "42.18372"
    },
    {
        "FECHA": "240613",
        "velocidad": "47.152800000000006"
    },
    {
        "FECHA": "240618",
        "velocidad": "32.397192"
    },
    {
        "FECHA": "240627",
        "velocidad": "19.880028000000003"
    },
    {
        "FECHA": "240703",
        "velocidad": "19.709100000000003"
    },
    {
        "FECHA": "240710",
        "velocidad": "28.717668"
    },
    {
        "FECHA": "240721",
        "velocidad": "23.718168"
    },
    {
        "FECHA": "240725",
        "velocidad": "18.972576"
    },
    {
        "FECHA": "240802",
        "velocidad": "46.24092"
    },
    {
        "FECHA": "240806",
        "velocidad": "34.538616000000005"
    },
    {
        "FECHA": "240816",
        "velocidad": "20.357928"
    },
    {
        "FECHA": "240819",
        "velocidad": "26.158212"
    },
    {
        "FECHA": "240826",
        "velocidad": "23.526252"
    },
    {
        "FECHA": "240902",
        "velocidad": "34.90056"
    },
    {
        "FECHA": "240913",
        "velocidad": "25.34652"
    },
    {
        "FECHA": "240919",
        "velocidad": "26.24994"
    },
    {
        "FECHA": "240924",
        "velocidad": "29.206728"
    },
    {
        "FECHA": "241001",
        "velocidad": "34.519248000000005"
    },
    {
        "FECHA": "241009",
        "velocidad": "23.760648"
    }
]
function createChart() {
    const dates = data.map(item => {
        const year = parseInt(item.FECHA.slice(0, 2)) + 2000;
        const month = parseInt(item.FECHA.slice(2, 4)) - 1; // JS months are 0-indexed
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
        line: {
            color: 'rgba(0, 0, 0, 1)', // Black line
            width: 2
        }
    };

    const layout = {
        xaxis: {
            type: 'date',
            tickformat: '%B',
            dtick: 'M1', // Show tick every month
            tickangle: -45,
            ticktext: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            tickvals: dates.filter((d, i, arr) => 
                i === 0 || d.getMonth() !== arr[i-1].getMonth()
            ),
            showgrid: false // Remove background grid for x-axis
        },
        yaxis: { 
            title: 'Velocidad (Km/h)',
            range: [0, 50], // Set y-axis range from 0 to 50
            showgrid: false // Remove background grid for y-axis
        },
        shapes: [
            {
                type: 'line',
                x0: dates[0],
                y0: 0,
                x1: dates[0],
                y1: 50,
                line: {
                    color: 'rgba(0, 0, 0, 1)',
                    width: 1,
                }
            },
            {
                type: 'line',
                x0: new Date(2024, 5, 13),
                y0: 0,
                x1: new Date(2024, 5, 13),
                y1: 47.1528,
                line: {
                    color: 'rgba(130, 0, 0, 0.8)',
                    width: 2,
                }
            },
            {
                type: 'line',
                x0: new Date(2024, 7, 2),
                y0: 0,
                x1: new Date(2024, 7, 2),
                y1: 46.24092,
                line: {
                    color: 'rgba(0, 0, 130, 0.8)',
                    width: 2,
                }
            },
            {
                type: 'circle',
                x0: new Date(2024, 5, 13).getTime() - 950 * 60 * 60 * 12, // Half a day before
                y0: 47.1528 - 0.2, // Slightly below the point
                x1: new Date(2024, 5, 13).getTime() + 950 * 60 * 60 * 12, // Half a day after
                y1: 47.1528 + 0.2, // Slightly above the point
                fillcolor: 'rgba(130, 0, 0, 0.8)',
                opacity: 1,
                line: {
                    color: 'rgba(130, 0, 0, 0.8)'
                }
            },
            {
                type: 'circle',
                x0: new Date(2024, 7, 2).getTime() - 950 * 60 * 60 * 12, // Half a day before
                y0: 46.24092 - 0.2, // Slightly below the point
                x1: new Date(2024, 7, 2).getTime() + 950 * 60 * 60 * 12, // Half a day after
                y1: 46.24092 + 0.2, // Slightly above the point
                fillcolor: 'rgba(0, 0, 130, 0.8)',
                opacity: 1,
                line: {
                    color: 'rgba(0, 0, 130, 0.8)'
                }
            }
        ],
        annotations: [
            {
                x: new Date(2024, 5, 13),
                y: 48.1528,
                xref: 'x',
                yref: 'y',
                text: '<b style="color:rgba(130, 0, 0, 0.8);">47,1528 Km/h',
                showarrow: false,

            },
            {
                x: new Date(2024, 7, 2),
                y: 47.24092,
                xref: 'x',
                yref: 'y',
                text: '<b style="color:rgba(0, 0, 130, 0.8);">46.24092 Km/h',
                text: '<b style="color:rgba(0, 0, 130, 0.8);">46,24092 Km/h',
                showarrow: false,

            },
            {
                x: new Date(2024, 3, 15),
                y: 10,
                xref: 'x',
                yref: 'y',
                text: '     <b>                      Velocidad máxima del viento alcanzada en 2024</b><br><b style="color:rgba(130, 0, 0, 0.8);">El 13 de junio </b>se registraron ráfagas de viento que alcanzaron los 47 Km/h.     <br> Este evento fue parte de un sistema frontal que provocó lluvias intensas y    <br>     condiciones climáticas adversas en gran parte del centro-sur del país.',
                showarrow: false,
                font: {
                    color: 'black'
                }
            },
            {
                x: new Date(2024, 7, 14), // August 2, 2024
                y: 10,
                xref: 'x',
                yref: 'y',
                text: '                                     El <b style="color:rgba(0, 0, 130, 0.8);">2 de agosto </b>se registraron fuertes <br>                               ráfagas de viento. Esto junto a la <br>                                intensa lluvia dejaron a gran parte<br>                                  de la poblacion sin servicio de agua <br>  y electricidad.',
                showarrow: false,
                font: {
                    color: 'black'
                }
            }
        ],
        autosize: true,
        height: 600,
        margin: { l: 50, r: 50, b: 100, t: 20, pad: 4 },
    };

    const config = {
        responsive: true,
        displayModeBar: false, // Disable the mode bar
        staticPlot: true // Disable interactions that cut the graph
    };

    Plotly.newPlot('chart', [trace], layout, config);
}

document.addEventListener('DOMContentLoaded', createChart);
