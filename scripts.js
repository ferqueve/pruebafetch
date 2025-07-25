// ============================================================================
// SCRIPT 1: BÚSQUEDA DE CIUDADES POR POBLACIÓN (VERSIÓN MEJORADA)
// ============================================================================

// URL del archivo JSON que contiene los datos de las ciudades
const url = "https://ferqueve.github.io/pruebafetch/ciudades.json";

// Espera a que todo el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {

    // Agrega un event listener al botón con id 'buscar'
    document.getElementById('buscar').addEventListener('click', () => {

        // Obtiene y valida el valor ingresado en el campo de población
        const poblacionInput = document.getElementById('poblacion').value.trim();
        const habitantes = parseInt(poblacionInput);

        // Validación: verifica que sea un número válido y mayor a 0
        if (!poblacionInput || isNaN(habitantes) || habitantes < 0) {
            document.getElementById('datos').innerHTML = 
                `<tr><td colspan="2" style="color: red; text-align: center;">
                    Por favor, ingresa un número válido mayor o igual a 0
                </td></tr>`;
            return;
        }

        // Muestra mensaje de carga mientras se obtienen los datos
        document.getElementById('datos').innerHTML = 
            `<tr><td colspan="2" style="text-align: center;">Cargando ciudades...</td></tr>`;

        // Realiza una petición HTTP para obtener el archivo JSON de ciudades
        fetch(url)
            .then(response => {
                // Verifica que la respuesta sea exitosa
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.json(); // Convierte la respuesta a formato JSON
            })
            .then(ciudades => { // Procesa el array de ciudades obtenido
                
                // Filtra las ciudades que cumplen con el criterio de población
                const ciudadesFiltradas = ciudades.filter(ciudad => 
                    ciudad.poblacion >= habitantes
                );

                // Si no hay ciudades que cumplan el criterio
                if (ciudadesFiltradas.length === 0) {
                    document.getElementById('datos').innerHTML = 
                        `<tr><td colspan="2" style="text-align: center;">
                            No se encontraron ciudades con ${habitantes} o más habitantes
                        </td></tr>`;
                    return;
                }

                // Genera las filas HTML usando template literals para mejor legibilidad
                const filas = ciudadesFiltradas.map(ciudad => 
                    `<tr>
                        <td>${ciudad.ciudad}</td>
                        <td>${ciudad.poblacion.toLocaleString()} habitantes</td>
                    </tr>`
                ).join('');
                
                // Inserta todas las filas generadas en el elemento con id 'datos'
                document.getElementById('datos').innerHTML = filas;
            })
            .catch(error => {
                // Manejo de errores: muestra mensaje amigable al usuario
                console.error('Error al obtener las ciudades:', error);
                document.getElementById('datos').innerHTML = 
                    `<tr><td colspan="2" style="color: red; text-align: center;">
                        Error al cargar los datos. Por favor, intenta nuevamente.
                    </td></tr>`;
            });
    });

    // Permite buscar al presionar Enter en el campo de población
    document.getElementById('poblacion').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('buscar').click();
        }
    });
});
