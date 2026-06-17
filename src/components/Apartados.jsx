import { useState } from "react";

function Apartados({apartados, totalEnApartados}){
    const [expandido, setExpandido] = useState(false);

    return (
        <section className="seccion-apartados">
            <div className="apartados-header"
                onClick={()=> setExpandido(!expandido)}>
                
                <div className="apartados-titulo">
                    <h2>Apartados</h2>
                    <span className="badge-total">${totalEnApartados.toFixed(2)}</span>
                </div>

                <button className="btn-toggle">{expandido ? '▲' : '▼'}</button>

            </div>
            {expandido&&(
                <div className="apartados-contenido">
                <button className="btn-nuevo-apartado">+ Crear nuevo apartado</button>

                {apartados.length===0 ? (
                    <p className="lista-vacia">No tienes dinero en apartados.</p>
                ):(
                    <div className="lista-apartados">

                    </div>
                )}
            </div>
            )}
        </section>
    );
        
    
}

export default Apartados;