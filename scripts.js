const url="https://ferqueve.github.io/pruebafetch/ciudades.json";

document.addEventListener('DOMContentLoaded',()=>{

       document.getElementById('buscar').addEventListener('click',()=>{

            fetch(url)
            .then(response => response.json())
            .then(ciudades => {

                let habitantes= document.getElementById('poblacion').value; 
                let datos="";
                for (let ciudad of ciudades ){
                    if (ciudad.poblacion >= habitantes){
                        datos+="<tr><td>"+ ciudad.ciudad+"</td><td>"+ ciudad.poblacion +"<td></tr>";
                    }
                }
                    document.getElementById('datos').innerHTML =datos;



            })




       })








})