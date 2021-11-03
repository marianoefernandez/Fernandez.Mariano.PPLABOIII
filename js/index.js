import { Anuncio_Auto } from "./anuncio_auto.js";
import { CrearTabla } from "./scripts.js";

function InicializarLista(nombreObjeto) 
{
    return JSON.parse(localStorage.getItem(nombreObjeto)) || [];    
}

function OrdenarPorTitulo(a,b) 
{
    let retorno = 0;

    if(a!=undefined && b!=undefined)
    {
        if(a.titulo > b.titulo)
        {
            retorno = 1;
        }
    
        if(a.titulo < b.titulo)
        {
            retorno = -1;
        }
    }

    return retorno;
}

function ConvertirNumeros(numero)
{
    return numero.toLocaleString('en-US');
}