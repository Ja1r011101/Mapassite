function ListaGastos({gastos, onEliminar}){
    if (gastos.length===0){
        return <p className="lista-vacia">No hay gastos registrados aun.</p>
    }

    return (
        <div className="lista-gastos">
            {gastos.map((gasto)=>(
                <div className={`tarjeta-gasto ${gasto.tipo}`} key={gasto.id}>
                    <div className="gasto-info">
                        <h3>{gasto.concepto}</h3>
                        {gasto.tipo === 'gasto' && (
                            <span className={`categoria-tag ${gasto.categoria}`}>
                                {gasto.categoria}
                            </span>
                        )}
                        {gasto.tipo === 'ingreso' && (
                            <span className="categoria-tag ingreso">Ingreso</span>
                        )}
                    </div>
                    
                    <div className="gasto-acciones">
                        <div className={`gasto-monto ${gasto.tipo}`}>
                            {gasto.tipo === 'ingreso' ? '+' : '-'}${gasto.monto.toFixed(2)}
                        </div>
                    </div>
                    <button 
                        className="btn-eliminar" 
                        onClick={() => onEliminar(gasto.id)}
                        title="Borrar registro"
                    >✕</button>
                </div>
            ))}
        </div>
    );
}

export default ListaGastos;