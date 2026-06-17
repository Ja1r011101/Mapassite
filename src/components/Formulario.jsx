import { useState } from 'react';

function Formulario({ onAgregar }) { 
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  
  const [tipo, setTipo] = useState('gasto'); 

  const manejarEnvio = (e) => {
    e.preventDefault();

    
    if(concepto === '' || monto === '' || (tipo === 'gasto' && categoria === '')) {
      alert('Por favor, llena todos los campos requeridos');
      return;
    }

    const nuevoMovimiento = { 
      id: Date.now(), 
      concepto: concepto, 
      monto: Number(monto), 
      categoria: tipo === 'gasto' ? categoria : 'ingreso', // Forzamos la categoría si es ingreso
      tipo: tipo 
    };
    
    onAgregar(nuevoMovimiento);

    setConcepto('');
    setMonto('');
    setCategoria('');
  };

  return (
    <form className="formulario-gasto" onSubmit={manejarEnvio}>
      
      
      <div className="selector-tipo">
        <button 
          type="button" 
          className={tipo === 'gasto' ? 'activo' : ''} 
          onClick={() => setTipo('gasto')}
        >
          Gasto
        </button>
        <button 
          type="button" 
          className={tipo === 'ingreso' ? 'activo ingreso' : ''} 
          onClick={() => setTipo('ingreso')}
        >
          Ingreso
        </button>
      </div>

      <div className="campo">
        <label htmlFor="concepto">Concepto</label>
        <input 
          type="text" 
          id="concepto" 
          placeholder="Ej. Matcha, libros, cafe..." 
          value={concepto}
          onChange={(e) => setConcepto(e.target.value)} 
        />
      </div>

      <div className="campo">
        <label htmlFor="monto">Monto ($)</label>
        <input 
          type="number" 
          id="monto" 
          placeholder="0.00" 
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
      </div>

      
      {tipo === 'gasto' && (
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select 
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Selecciona una...</option>
            <option value="comida">Comida</option>
            <option value="transporte">Transporte</option>
            <option value="servicios">Servicios</option>
            <option value="salud">Salud</option>
            <option value="ocio">Ocio</option>
            <option value="otro">Otro</option>
          </select>
        </div>
      )}

      <button type="submit" className="btn-agregar">
        Registrar
      </button>
    </form>
  );
}

export default Formulario;