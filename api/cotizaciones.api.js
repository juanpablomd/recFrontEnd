import { API } from "./API.js";

export const getCotizaciones = async()=>{
    try {
        const res = await fetch(`${API}/cotz/getCotizaciones`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
        return {status:false}
    }
}


export const getDolares = async()=>{
    try {
        const res = await fetch(`${API}/cotz/getDolares`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
        return {status:false}
    }
}

export const updateCotizacion = async(id, compra, venta)=>{
    try {
        const res = await fetch(`${API}/cotz/updateCotizacion/${id}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                compra,
                venta
            })
        });
        if (!res.ok) {
            console.error('Error al actualizar cotización:', await res.text());
            return { status: false };
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
        return {status:false}
    }
}