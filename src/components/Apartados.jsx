import { useState } from 'react';

function Apartados({ apartados, totalEnApartados, onAgregarApartado, onEliminarApartado, onRetirarApartado}) {
  const [expandido, setExpandido] = useState(false);
  
  // Estados para retiros
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');

  const [idRetiroActivo, setIdRetiroActivo] = useState(null);
  const [montoRetiro, setMontoRetiro] = useState('');
  const [conceptoRetiro, setConceptoRetiro] = useState('');

  const manejarNuevoApartado = (e) => {
    e.preventDefault();
    if (nombre === '' || cantidad === '') {
      alert('Por favor, llena los datos del apartado');
      return;
    }

    const nuevoApartado = {
      id: Date.now(),
      nombre: nombre,
      cantidad: Number(cantidad)
    };

    onAgregarApartado(nuevoApartado);

    // Limpiamos y cerramos el formulario
    setNombre('');
    setCantidad('');
    setMostrarFormulario(false);
  };

  const iniciarRetiro = (apartado)=>{
    setIdRetiroActivo(apartado.id);
    setConceptoRetiro(`Mensualidad - ${apartado.nombre}`);
    setMontoRetiro('');
  };

  const confirmarRetiro = (apartado)=>{
    const monto = Number(montoRetiro);

    if (monto <= 0 || monto > apartado.cantidad){
      alert('Ingresa un monto valido');
      return ;
    }
    if (conceptoRetiro.trim() === ''){
      alert('Agrega un concepto para el retiro');
      return;
    }

    onRetirarApartado(apartado.id, monto, conceptoRetiro);
    setMontoRetiro('');
    setConceptoRetiro('')
    setIdRetiroActivo(null);
  }

  return (
    <section className="seccion-apartados">
      <div 
        className="apartados-header" 
        onClick={() => setExpandido(!expandido)}
      >
        <div className="apartados-titulo">
          <h2>Tus Apartados</h2>
          <span className="badge-total">${totalEnApartados.toFixed(2)}</span>
        </div>
        <button className="btn-toggle">
          {expandido ? '▲' : '▼'}
        </button>
      </div>

      {expandido && (
        <div className="apartados-contenido">
          
          {!mostrarFormulario ? (
            <button 
              className="btn-nuevo-apartado"
              onClick={() => setMostrarFormulario(true)}
            >
              + Crear nuevo apartado
            </button>
          ) : (
            <form className="formulario-apartado" onSubmit={manejarNuevoApartado}>
              <input 
                type="text" 
                placeholder="Nombre (Ej. Ahorros)" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input 
                type="Number" 
                placeholder="Monto de apartado" 
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
              <div className="botones-apartado">
                <button type="submit" className="btn-guardar-apartado">Guardar</button>
                <button 
                  type="button" 
                  className="btn-cancelar-apartado"
                  onClick={() => setMostrarFormulario(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          
          <div className="lista-apartados" style={{ marginTop: '1rem' }}>
            {apartados.length === 0 && !mostrarFormulario && (
              <p className="lista-vacia">No tienes dinero en apartados.</p>
            )}
            {apartados.map(ap => (
              <div key={ap.id} className="tarjeta-apartado">
                
                {/* RENDERIZADO CONDICIONAL: ¿Estamos retirando de ESTA cajita? */}
                {idRetiroActivo === ap.id ? (
                  <div className="modo-retiro">
                    <input 
                      type="text" 
                      value={conceptoRetiro}
                      onChange={(e) => setConceptoRetiro(e.target.value)}
                      placeholder="Concepto (Ej. Pago mes 1)"
                    />
                    <input 
                      type="Number" 
                      value={montoRetiro}
                      onChange={(e) => setMontoRetiro(e.target.value)}
                      placeholder={`Máximo: $${ap.cantidad.toFixed(2)}`}
                    />
                    <div className="botones-apartado">
                      <button className="btn-guardar-apartado" onClick={() => confirmarRetiro(ap)}>Confirmar</button>
                      <button className="btn-cancelar-apartado" onClick={() => setIdRetiroActivo(null)}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  // VISTA NORMAL DE LA TARJETA
                  <>
                    <div className="apartado-info">
                      <strong>{ap.nombre}</strong>
                      <span>${ap.cantidad.toFixed(2)}</span>
                    </div>
                    
                    <div className="apartado-acciones">
                      <button 
                        className="btn-accion-apartado"
                        onClick={() => iniciarRetiro(ap)}
                      >
                        Retirar
                      </button>
                      <button 
                        className="btn-eliminar-apartado"
                        onClick={() => onEliminarApartado(ap.id)}
                        title="Deshacer apartado"
                      >
                        ✕
                      </button>
                    </div>
                  </>
                )}
                
              </div>
            ))}
          </div>

        </div>
      )}
    </section>
  );
}

export default Apartados;