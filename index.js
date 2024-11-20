import { cotizacion } from "./components/cotizacion.js"
import { formateoMoneda, obtenerDiferencia } from "./utils/moneda.js"
import { getCotizaciones, getDolares, updateCotizacion } from "./api/cotizaciones.api.js"


const containerCompra = document.getElementById('containerCompra')
const containerVenta = document.getElementById('containerVenta')
const select = document.getElementById('dolares');

const newCompra = document.getElementById('compra');
const newVenta = document.getElementById('venta'); 
const btnActualizar = document.getElementById('btnCotizar');

const handlerCotizaciones = async () => {
    const cotizaciones = await getCotizaciones();
    containerCompra.innerHTML = '';
    containerVenta.innerHTML = '';

    cotizaciones.forEach((e) => {
        // Validar si el historial tiene elementos
        const ultimaActualizacion = e.historial.length > 0 
            ? e.historial[e.historial.length - 1] 
            : { compra: e.compra, venta: e.venta, fecha: 'No disponible' };

        // Actualizar HTML con los datos
        containerCompra.innerHTML += cotizacion(
            e.nombre, 
            formateoMoneda(e.compra), 
            obtenerDiferencia(e.compra, ultimaActualizacion.compra), 
            ultimaActualizacion.fecha
        );

        containerVenta.innerHTML += cotizacion(
            e.nombre, 
            formateoMoneda(e.venta), 
            obtenerDiferencia(e.venta, ultimaActualizacion.venta), 
            ultimaActualizacion.fecha
        );
    });
};

const handlerSelect = async()=>{
    const dolares = await getDolares();
    dolares.forEach((e)=>{
        const option = document.createElement('option');
        option.value = e.id;
        option.textContent = e.nombre;
        select.appendChild(option);
    })
}

const handleActualizar = async(id, compra, venta)=>{
    await updateCotizacion(id, compra, venta);
    handlerCotizaciones()
    // Limpiar las cajas de texto
    newCompra.value = '';
    newVenta.value = '';
    // Restablecer el combobox al valor predeterminado
    select.value = '';
}
document.addEventListener('DOMContentLoaded', ()=>{
    handlerCotizaciones();
    handlerSelect();
})

btnActualizar.addEventListener('click', ()=>{
    const id = select.value
    const compra = newCompra.value
    const venta = newVenta.value
    handleActualizar(id, compra, venta)
})
