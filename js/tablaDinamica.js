//#region Métodos
function CrearThead(lista) 
{
    const $thead = document.createElement("thead");
    const $cabecera = document.createElement("tr");
    $cabecera.style.backgroundColor = "silver";

    for (const dato in lista[0]) 
    {
        if(dato !== "id")
        {
            const th = document.createElement("th");
            const $contenido = document.createTextNode(dato);
            th.appendChild($contenido);
            $cabecera.appendChild(th);            
        }
    }

    $thead.appendChild($cabecera);

    return $thead;
}

function CrearTbody(lista) 
{
    const $tbody = document.createElement("tbody");

    lista.forEach(objeto => 
    {
        const $tr = document.createElement("tr");

        for (const dato in objeto) 
        {
            if(dato === "id")
            {
                $tr.setAttribute("data-id",parseInt(objeto[dato]));
            }
            else
            {
                const $td = document.createElement("td");
                $td.textContent = objeto[dato];
                
                if(dato=="precio")
                {
                    $td.setAttribute("class",dato);
                    $td.textContent = ConvertirNumeros(objeto[dato]);
                }

                $tr.appendChild($td)
            }
        }
        $tbody.appendChild($tr);
    });
    return $tbody;
}

export function CrearTabla(lista) 
{
    const $tabla = document.createElement("table");
    const $thead = CrearThead(lista);
    const $tbody = CrearTbody(lista);

    $tabla.appendChild($thead);
    $tabla.appendChild($tbody);

    return $tabla;
}

function ConvertirNumeros(numero)
{
    return numero.toLocaleString('en-US');
}
  

//#endregion