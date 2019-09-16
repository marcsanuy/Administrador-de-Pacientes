import React, { useState, useEffect, Fragment } from 'react';


function Cita({cita, index, eliminarCita}) {
  return(
    <div className="cita">
      <p>Nombre: <span>{cita.nombre}</span></p>
      <p>Apellidos: <span>{cita.apellidos}</span></p>
      <p>Teléfono: <span>{cita.telefono}</span></p>
      <p>Fecha: <span>{cita.fecha}</span></p>
      <p>Hora: <span>{cita.hora}</span></p>
      <p>Síntomas: <span>{cita.sintomas}</span></p>
      <button
      onClick={() => eliminarCita(index)}
      type="button" className="button eliminar u-full-width">Eliminar Cita</button>
    </div>
  )
}

function Formulario({crearCita}) {

  const stateInicial = {
    nombre:'',
    apellidos:'',
    telefono:'',
    fecha:'',
    hora:'',
    sintomas:''
  }

  // cita = state actual
  // actualizarCita = función para cambiar el state
  const [cita, actualizarCita] = useState(stateInicial);

  // actualiza el state
  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name] : e.target.value
    })
  }

  // pasamos la cita al componete principal
  const enviarCita = e => {
    e.preventDefault();

    console.log(cita);

    //Pasar la cita hacia el componente principal
    crearCita(cita)

    //Reiniciar el state (reiniciar el form)
    actualizarCita(stateInicial)
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
                    value={cita.nombre}
                  />

                  <label>Apellidos</label>
                  <input 
                    type="text" 
                    name="apellidos"
                    className="u-full-width"  
                    placeholder="Apellidos"
                    onChange={actualizarState}
                    value={cita.apellidos}
                  />

                  <label>Teléfono</label>
                  <input 
                    type="text" 
                    name="telefono"
                    className="u-full-width"  
                    placeholder="Teléfono"
                    onChange={actualizarState}
                    value={cita.telefono}
                  />

                  <label>Fecha</label>
                  <input 
                    type="date" 
                    className="u-full-width"
                    name="fecha"
                    onChange={actualizarState}
                    value={cita.fecha}
                  />               

                  <label>Hora</label>
                  <input 
                    type="time" 
                    className="u-full-width"
                    name="hora" 
                    onChange={actualizarState}
                    value={cita.hora}
                  />

                  <label>Sintomas</label>
                  <textarea 
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={cita.sintomas}
                  ></textarea>

                  <button type="submit" className="button-primary u-full-width">Agregar</button>
          </form>
  </Fragment>
  )
}


function App() {
  // cargar las citas de localstorage como state inical
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if(!citasIniciales) {
    citasIniciales = [];
  }

  //useState retorna 2 funciones
  // El state actual = this.state;
  // Funcions que actualiza el state this.setState();
  const [citas, guardarCita] = useState( citasIniciales );

  //Agregar las nuevas citas al state
  const crearCita = cita => {
    //Hacer una copia del state y agregar el nuevo cliente
    const nuevasCitas = [...citas, cita];

    //Almacenamos en el state
    guardarCita(nuevasCitas);
  }

  // Eliminar las citas del state
  const eliminarCita = index => {
    const nuevasCitas = [...citas];
    nuevasCitas.splice(index, 1);
    guardarCita(nuevasCitas);
  }

  useEffect(
    () => {
        let citasIniciales = JSON.parse(localStorage.getItem('citas'));
        if(citasIniciales) {
          localStorage.setItem('citas', JSON.stringify(citas));
        } else {
          localStorage.setItem('citas', JSON.stringify([]));
        }
    }, [citas] )
 

  // Cargar Condicionalmente un Título
  const titulo =  Object.keys(citas).length === 0 ? 'No Hay Citas' : 'Administrar Citas Programadas';

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
            <h2>{titulo}</h2>
            {citas.map((cita, index) =>(
              <Cita 
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )

}


export default App;

