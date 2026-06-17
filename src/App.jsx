import { useState } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListaGastos from "./components/ListaGastos";
import Apartados from "./components/Apartados";

function App() {
  
  const [movimientos, setMovimientos] = useState([]);
  const [apartados, setApartados] = useState([]);


  const agregarMovimiento = (nuevoMovimiento) => {
    setMovimientos([...movimientos, nuevoMovimiento]);
  };

  const eliminarMovimiento = (id) => {
    setMovimientos(movimientos.filter((mov) => mov.id !== id));
  };

  //matematica del dashboard

  const totalIngresos = movimientos
    .filter(mov => mov.tipo === 'ingreso')
    .reduce((acc, mov) => acc + mov.monto, 0);

  const totalGastos = movimientos
    .filter(mov => mov.tipo === 'gasto')
    .reduce((acc, mov) => acc + mov.monto, 0);

  const totalEnApartados= apartados.reduce((acc, ap) => ac + ap.cantidad, 0);

  const balance = totalIngresos - totalGastos - totalEnApartados;

  return (
    <div className="contenedor-principal">
      <Header />
      
      <main>
        {/* columna Formulario */}
        <section className="seccion-registro">
          <h2>Registrar movimiento</h2>
          <Formulario onAgregar={agregarMovimiento} />
        </section>

        {/* Columna movimientos */}
        <section className="seccion-lista">
          <h2>Historial de movimientos</h2>
          <ListaGastos 
            gastos={movimientos} 
            onEliminar={eliminarMovimiento} 
          /> 
        </section>

        {/* columna balance */}
        <div className="columna-derecha">
        <section className="seccion-balance">
          <h2>Balance actual</h2>
          <div className="dashboard-balance">
            <div className="balance-item">
              <p>Ingresos</p>
              <h3 className="texto-ingreso">+${totalIngresos.toFixed(2)}</h3>
            </div>
            <div className="balance-item">
              <p>Gastos</p>
              <h3 className="texto-gasto">-${totalGastos.toFixed(2)}</h3>
            </div>
            <div className="balance-total">
              <p>Disponible</p>
              <h3>${balance.toFixed(2)}</h3>
            </div>
          </div>
        </section>
        <Apartados
        apartados={apartados}
        totalEnApartados={totalEnApartados}/>
        </div>
      </main>
    </div>
  );
}

export default App;