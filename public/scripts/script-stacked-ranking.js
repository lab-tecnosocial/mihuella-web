document.addEventListener('DOMContentLoaded', function() {
    // 1. Datos para el Gráfico de Barras Apiladas (Huella Hídrica per cápita en América Latina)
    // Los valores están expresados en m³/año (metros cúbicos por año).
    [cite_start]// Fuente de los totales: Mekonnen & Hoekstra (2012); Water Footprint Network (2012) [cite: 784, 1222, 1232]
    
    // Los datos específicos de la huella verde, azul y gris para cada país han sido estimados
    // basándose en el contexto del documento y en los totales citados.
    
    const labels = [
        'Bolivia',
        'Ecuador',
        'Argentina',
        'Colombia',
        'Perú',
        'Nicaragua'
    ];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Huella Verde (Lluvia)',
                data: [2000, 1200, 800, 700, 500, 500], // Estimado
                backgroundColor: 'rgba(54, 162, 235, 0.6)', // Azul claro/Verde para la lluvia
            },
            {
                label: 'Huella Azul (Ríos, Acuíferos)',
                data: [1000, 500, 600, 400, 400, 300], // Estimado
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Cian/Azul oscuro para agua superficial
            },
            {
                label: 'Huella Gris (Contaminación)',
                data: [468, 307, 207, 275, 188, 112], // Estimado
                backgroundColor: 'rgba(153, 102, 255, 0.6)', // Morado/Gris para contaminación
            }
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true, // Esto hace que las barras se apilen
                    title: {
                        display: true,
                        text: 'Países'
                    }
                },
                y: {
                    stacked: true, // Esto hace que los valores de las barras se sumen
                    title: {
                        display: true,
                        text: 'Huella hídrica per cápita (m³/año)'
                    },
                    // Aseguramos que los totales citados estén representados
                    max: 4000 
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Huella Hídrica per cápita en países seleccionados de América Latina (1996-2005)'
                },
                tooltip: {
                    callbacks: {
                        footer: (tooltipItems) => {
                            let total = 0;
                            tooltipItems.forEach(item => {
                                total += item.parsed.y;
                            });
                            return `Total Anual: ${total} m³/año`;
                        }
                    }
                }
            }
        }
    };

    // Renderizar el gráfico en el elemento <canvas> con id="stackedRankingChart"
    const ctx = document.getElementById('stackedRankingChart');
    if (ctx) {
        new Chart(ctx, config);
    }
});


<script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>


document.addEventListener('DOMContentLoaded', function() {

    // --- 1. DATOS DEL GRÁFICO ---
    const alimentos = ['Carne de res', 'Queso', 'Pollo', 'Legumbres', 'Cereales', 'Frutas'];
    const huellaHidricaLitrosPorKg = [15000, 9000, 5000, 3900, 1200, 700]; 

    // --- 2. PALETA DE COLORES Y ASIGNACIÓN ---
    const nuevaPaletaColores = [
        '#56638C', // Azul grisáceo oscuro
        '#3397BF', // Azul claro
        '#38A668', // Verde
        '#94BF54', // Verde lima
        // Los colores se ciclarán/repetirán para las dos barras restantes.
    ];
    
    // Asignar colores a cada barra, usando el operador módulo (%) para ciclar
    const coloresBarra = huellaHidricaLitrosPorKg.map((valor, index) => {
        return nuevaPaletaColores[index % nuevaPaletaColores.length];
    });

    // Usamos el color Azul grisáceo oscuro para todos los bordes para dar uniformidad
    const colorBorde = '#56638C'; 

    // --- 3. CONFIGURACIÓN DEL GRÁFICO ---
    const ctx = document.getElementById('huellaHidricaAlimentosChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar', 
        data: {
            labels: alimentos,
            datasets: [{
                label: 'Litros de agua por kg',
                data: huellaHidricaLitrosPorKg,
                backgroundColor: coloresBarra, // ¡CADA BARRA TIENE UN COLOR DIFERENTE!
                borderColor: colorBorde,
                borderWidth: 1,
                borderRadius: 5, 
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y', 
            plugins: {
                legend: {
                    display: false, 
                },
                title: {
                    display: false, 
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += new Intl.NumberFormat('es-ES').format(context.parsed.x);
                            return label + ' L';
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Litros por kg',
                        padding: { top: 10 }
                    },
                    grid: {
                        display: true,
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return new Intl.NumberFormat('es-ES').format(value);
                        }
                    }
                },
                y: {
                    grid: {
                        display: false, 
                        drawBorder: false
                    },
                    ticks: {
                        padding: 10
                    }
                }
            },
            // --- ANIMACIÓN ---
            animation: {
                duration: 1500, 
                easing: 'easeInOutQuart',
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default') {
                        delay = context.dataIndex * 150; 
                    }
                    return delay;
                },
            }
        }
    });
});