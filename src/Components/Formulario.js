import React, { useState} from 'react';  
import Error from './Error';

const Formulario = ({guardarBusqueda}) => {

    const [termino, guardarTermino] = useState('');
    const [error, guardarError] = useState(false);
    const buscarImagenes = e => {
        e.preventDefault();

        //validar
        if(termino.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        //enviar el termino de búsqueda al componente principal
        guardarBusqueda(termino);
    }

    return ( 
        <form
        onSubmit={buscarImagenes}>
            <div className= "row">
                <div className="form-group col-md-8">
                    <input
                        type = "text"
                        className = "form-control form-control-lg"
                        placeholder = "Ejemplo fútbol o café"
                        onChange = {e => guardarTermino(e.target.value)}
                    ></input>
                </div>
                <div className="form-group col-md-4">
                    <input
                        type = "submit"
                        className = "btn btn-lg btn-danger btn-block"
                        value = "Buscar"
                    ></input>
                </div> 
            </div>
            { error ?  <Error mensaje="Agrega un término para realizar la búsqueda." /> : null}
        </form>
     );
}
 
export default Formulario;