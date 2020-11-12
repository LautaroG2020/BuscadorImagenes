
import React , {useState, useEffect}from 'react';
import Formulario from './Components/Formulario';
import ListadoImagenes from './Components/ListadoImagenes';

function App() {
  //state de la app
  const [ busqueda, guardarBusqueda] = useState('');
  const [ imagenes, guardarImagenes] = useState([]);
  const [ paginaactual, guardarPaginaActual ] = useState(1);
  const [ totalpaginas, guardarTotalPaginas ] = useState(1);


  useEffect(() => {
  const consultarApi = async () => {
      if (busqueda === '') return;

      const imagenesPorPagina = 25;
      const key = '19077686-9078b6f28e46b029e97b6a2d1';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
    
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      //calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      //mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior : 'smooth'});
  }

  consultarApi();
}, [busqueda, paginaactual])

  //definir pagina anterior
  const paginaAnterior = () =>{
    const nuevaPaginaActual = paginaactual - 1;

    if (nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  //definir la pagina siguiente
  const paginaSiguiente = () =>{
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  }
  return (
    <div className= "container">
      <div className = "jumbotron">
        <p className="lead text-center"> Buscador de imagenes</p>
        <Formulario 
          guardarBusqueda = {guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes} 
        />

        { (paginaactual === 1) ? null : (
          <button 
          type="button"
          className="btn btn-info mr-1"
          onClick={(paginaAnterior)}>
            &laquo;Anterior 
          </button>
        )}

        { (paginaactual === totalpaginas) ? null : (
          <button 
          type="button"
          className="btn btn-info "
          onClick = {(paginaSiguiente)}>
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
