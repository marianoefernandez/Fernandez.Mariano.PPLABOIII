import { Anuncio } from "./anuncio.js";
import { CrearTabla } from "./tablaDinamica.js";

//#region Contenido  

window.addEventListener("click",RetornarAnuncio);

const anuncios = InicializarLista("anuncios");

anuncios.sort(OrdenarPorTitulo);

const tablaAnuncios = CrearTabla(anuncios);
const $divTabla = document.getElementById("divTabla");
const $divMensaje = document.getElementById("divMensaje");
const $formulario = document.forms[0];

const $btnGuardar = document.getElementById("btnGuardar");
const $btnEliminar = document.getElementById("btnEliminar");
const $btnCancelar = document.getElementById("btnCancelar");

let idElementoABorrar=-1;

$formulario.addEventListener("submit",AgregarElemento);//Boton guardar/modificar
$btnEliminar.addEventListener("click",EliminarElemento);//Boton Eliminar
$btnCancelar.addEventListener("click",CancelarSeleccion);//Boton Cancelar

//Cargando();

ActualizarTabla(anuncios);

//console.log(tablaPersonas);

//#endregion

//#region Métodos

function RetornarAnuncio(e) 
{    
    if(e.target.matches("td"))
    {
        let anuncio = anuncios.find((objeto) => objeto.id == e.target.parentElement.dataset.id);
        CargarFormulario(anuncio);
        idElementoABorrar = anuncio.id;
        $btnEliminar.setAttribute("type","button");
        $btnCancelar.setAttribute("type","button");
        $btnGuardar.setAttribute("value","Modificar");
    }    
}

function CargarFormulario(anuncio) 
{
    const {txtId, txtTitulo, rdoTransaccion, txtDescripcion , txtPrecio, txtCantBaños, txtCantAutos, txtCantDormitorios} = $formulario;

    txtId.value = anuncio.id;
    txtTitulo.value = anuncio.titulo;
    rdoTransaccion.value = anuncio.transaccion;
    txtDescripcion.value = anuncio.descripcion;
    txtPrecio.value = anuncio.precio;
    txtCantBaños.value = anuncio.cantidadBaños;
    txtCantAutos.value = anuncio.cantidadAutos;
    txtCantDormitorios.value = anuncio.cantidadDormitorios;
}

function LimpiarTabla() 
{
    while($divTabla.hasChildNodes())
    {
        $divTabla.removeChild($divTabla.firstElementChild);
    }
}

function ActualizarTabla(lista) 
{
    lista.sort(OrdenarPorTitulo);
    LimpiarTabla();
    $divTabla.appendChild(CrearTabla(lista));
}
 
function AgregarElemento(e) 
{
    e.preventDefault();

    const {txtId, txtTitulo, rdoTransaccion, txtDescripcion , txtPrecio, txtCantBaños, txtCantAutos, txtCantDormitorios} = $formulario;
    const anuncioAux = new Anuncio(parseInt(txtId.value), txtTitulo.value, rdoTransaccion.value ,txtDescripcion.value, parseFloat(txtPrecio.value), parseInt(txtCantBaños.value) , parseInt(txtCantAutos.value), parseInt(txtCantDormitorios.value));
    let mensaje = "No se agrego el anuncio debido a que es exactamente igual a otro anuncio de la lista.";
    Cargando(2000);


    if(txtId.value === "")
    {
        anuncioAux.Id = GenerarId(anuncios);

        if(!(EstaEnLista(anuncios,anuncioAux)))
        {
            AltaElemento(anuncios,anuncioAux,"anuncios");
            mensaje = "¡Anuncio agregado con éxito!";
        }
    }
    else
    {
        if(ModificarUnElemento(anuncios,anuncioAux,"anuncios"))
        {
            mensaje = "¡Anuncio modificado con éxito!";
        }
        else
        {
            mensaje = "El anuncio es igual al anterior, no hay necesidad de modificarlo"; 
        }
    }

    setTimeout(() =>
    {
        ImprimirMensaje(2500,mensaje);
        ActualizarTabla(anuncios);
        $formulario.reset();   
        CancelarSeleccion(e);
    }, 2000);
}

function EliminarElemento(e) 
{
    e.preventDefault();
    let respuesta = confirm("¿Desea eliminar el anuncio?");
    let mensaje="¡Operacion Cancelada!";
    Cargando(2000);

    if (respuesta) 
    {
        if(idElementoABorrar != -1)
        {
            DarDeBajaUnElemento(anuncios,idElementoABorrar,"anuncios");
            mensaje="¡Anuncio borrado con éxito!";
        }
        else
        {
            mensaje="¡No se pudo borrar el anuncio!";
        }
    }

    setTimeout(() => 
    {
        CancelarSeleccion(e);
        ImprimirMensaje(2500,mensaje);
        ActualizarTabla(anuncios);
    }, 2000);

}

function CancelarSeleccion(e) 
{
    const {txtId} = $formulario;

    txtId.value="";

    e.preventDefault();
    idElementoABorrar=-1;
    $btnEliminar.setAttribute("type","hidden");
    $btnCancelar.setAttribute("type","hidden");
    $btnGuardar.setAttribute("value","Guardar");
    $formulario.reset();
}

function ImprimirMensaje(tiempo,mensaje) 
{
    const $fragmento = document.createDocumentFragment();
    let $br = document.createElement("br");
    $fragmento.appendChild($br);   

    let $p=document.createElement("p");
    $p.textContent = mensaje;

    $fragmento.appendChild($p);
    $p.classList.add("mensaje");
    $divMensaje.appendChild($fragmento);

    setTimeout(function()
    { 
        $divMensaje.removeChild($p);
        $divMensaje.removeChild($br);
    }, tiempo);

}
//Me define si un objeto esta en la lista 
//necesito tener un método Equals para que funcione
function EstaEnLista(lista,objeto) 
{
    let retorno=false;

    lista.forEach(objetoAux => 
    {
        if(objeto.Equals(objetoAux))
        {
            retorno=true;
        }
    });

    return retorno;
}

function AltaElemento(lista,elemento,nombreElemento) 
{
    lista.push(elemento);
    ActualizarStorage(lista,nombreElemento);
}

function ModificarUnElemento(lista,elementoModificado,nombreElemento)
{
    let retorno=false;

    let indice = lista.findIndex((elemento)=>
    {
        return elemento.id == elementoModificado.id;
    });

    if(!(elementoModificado.Equals(lista[indice])))
    {
        lista.splice(indice,1);

        lista.push(elementoModificado);
    
        ActualizarStorage(lista,nombreElemento);
        ActualizarTabla(lista);

        retorno=true;
    }

    return retorno;
}


function DarDeBajaUnElemento(lista,idABorrar,nombreElemento) 
{
    let indiceABorrar = BuscarElementoPorId(idABorrar,lista);

    if(indiceABorrar != -1)
    {
        lista.splice(indiceABorrar,1);    
    }

    ActualizarStorage(lista,nombreElemento);

    return lista;
}

function EliminarDatos(nombreDeObjeto) 
{
    localStorage.removeItem(nombreDeObjeto);
}

function ActualizarStorage(elemento,nombreDeObjeto)
{
    localStorage.setItem(nombreDeObjeto,JSON.stringify(elemento));
}

//lista = Lista en la que voy a hardcodear los datos, nombreObjeto es el nombre del objeto en el localStorage
function HardcodearDatos(lista,nombreDeObjeto) 
{
    ActualizarStorage(lista,nombreDeObjeto);
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

function InicializarLista(nombreObjeto) 
{
    return JSON.parse(localStorage.getItem(nombreObjeto)) || [];    
}

function BuscarElementoPorId(id,lista)
{
    let index=-1;
    let len = lista.length;

    for (let i = 0; i < len; i++) 
    {
        if(lista[i].id == id)
        {
            index=i;
            break;
        }
    }

    return index;
}

//Para que esto funcione, el objeto debe tener el atributo id, sino no funcionara correctamente
function GenerarId(lista) 
{
    let len=lista.length;
    let idAutoIncremental;

    if(len!=0)
    {
        idAutoIncremental = JSON.parse(localStorage.getItem("idAutoIncremental")) || lista[len-1].id;
    }
    else
    {
        idAutoIncremental = JSON.parse(localStorage.getItem("idAutoIncremental")) || 0;
    }

    idAutoIncremental++;

    ActualizarStorage(idAutoIncremental,"idAutoIncremental");

    return idAutoIncremental;   
}

function Cargando(tiempo) 
{
    let $divCargando=document.getElementById("cargando");
    let $divSpinner=document.getElementById("spinner");
    let $parrafoCargando=document.getElementById("parrafo");


    $divCargando.setAttribute("class","cargando");
    $divSpinner.setAttribute("class","spinner");
    $parrafoCargando.textContent = "Cargando";

    setTimeout(() => 
    {
        $divCargando.removeAttribute("class");
        $divSpinner.removeAttribute("class");
        $parrafoCargando.textContent = "";
    }, tiempo);
}
//#endregion