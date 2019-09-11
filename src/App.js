import React, { useState, Fragment } from 'react';


function Cita({cita}) {
  return(
    <div className="cita">
      <p>Nombre: <span>{cita.nombre}</span></p>
      <p>Apellidos: <span>{cita.apellidos}</span></p>
      <p>Teléfono: <span>{cita.telefono}</span></p>
      <p>Fecha: <span>{cita.fecha}</span></p>
      <p>Hora: <span>{cita.hora}</span></p>
      <p>Síntomas: <span>{cita.sintomas}</span></p>
    </div>
  )
}

function Formulario({crearCita}) {

  const [cita, actualizarCita] = useState({
    nombre:'',
    apellidos:'',
    telefono:'',
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

  const enviarCita = e => {
    e.preventDefault();

    console.log(cita);

    //Pasar la cita hacia el componente principal
    crearCita(cita)

    //Reiniciar el state (reiniciar el form)
  }

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      <form onSubmit={enviarCita}>
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

                  <label>Teléfono</label>
                  <input 
                    type="text" 
                    name="telefono"
                    className="u-full-width"  
                    placeholder="Teléfono"
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

  //Agregar las nuevas citas al state
  const crearCita = cita => {
    //Hacer una copia del state y agregar el nuevo cliente
    const nuevasCitas = [...citas, cita];

    //Almacenamos en el state
    guardarCita(nuevasCitas);
  }

  return(
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario 
                crearCita={crearCita}
              />
          </div>
          <div className="one-half column">
            {citas.map((cita, index) =>(
              <Cita 
                key={index}
                index={index}
                cita={cita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )

}


export default App;

