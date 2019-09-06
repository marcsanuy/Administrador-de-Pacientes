import React, { useState, Fragment } from 'react';


function Formulario() {

  const [cita, actualizarCita] = useState({
    nombre:'',
    apellidos:'',
    fecha:'',
    hora:'',
    sintomas:''
  });

  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name] : e.target.value
    })
  }

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      <form>
                  <label>Nombre</label>
                  <input 
                    type="text" 
                    name="nombre"
                    className="u-full-width" 
                    placeholder="Nombre" 
                    onChange={actualizarState}
                  />

                  <label>Apellidos</label>
                  <input 
                    type="text" 
                    name="apellidos"
                    className="u-full-width"  
                    placeholder="Apellidos"
                    onChange={actualizarState}
                  />

                  <label>Fecha</label>
                  <input 
                    type="date" 
                    className="u-full-width"
                    name="fecha"
                    onChange={actualizarState}
                  />               

                  <label>Hora</label>
                  <input 
                    type="time" 
                    className="u-full-width"
                    name="hora" 
                    onChange={actualizarState}
                  />

                  <label>Sintomas</label>
                  <textarea 
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                  ></textarea>

                  <button type="submit" className="button-primary u-full-width">Agregar</button>
          </form>
  </Fragment>
  )
}


function App() {
  //useState retorna 2 funciones
  // El state actual = this.state;
  // Funcions que actualiza el state this.setState();
  const [citas, guardarCita] = useState( [] );

  return(
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario />
          </div>
          <div className="one-half column">

          </div>
        </div>
      </div>
    </Fragment>
  )

}


export default App;

