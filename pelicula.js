let pagina = 1;
let btnSiguiente = document.getElementById("btnSiguiente");
let btnAnterior = document.getElementById("btnAnterior");

btnSiguiente.addEventListener("click", () =>{
    if (pagina < 1000) {
        pagina ++;
        cargarPelicula();        
    }
});
btnAnterior.addEventListener("click", () =>{
    if (pagina > 1) {
        pagina--;
        cargarPelicula();        
    }
});


let cargarPelicula = async () => {
    try {
        let respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=93955306273fed843fb339c874770be2&language=es-ES&page=${pagina}`);
       
        //si la respuesta es correcta
        if (respuesta.status === 200) {
            let datos = await respuesta.json();

            let peliculas = "";
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class = "pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>`;


            });
            document.getElementById("contenedor").innerHTML = peliculas;

        } else if (respuesta.status === 401) {
            console.log('No autorizado');
        } else if (respuesta.status === 404) {
            console.log('No existe');
        }

    } catch (error) {
        console.log(error);
    }

}
cargarPelicula();