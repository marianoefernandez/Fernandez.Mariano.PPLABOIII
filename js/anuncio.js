export class Anuncio
{
    //#region Constructor

    constructor(id,titulo,transaccion,descripcion,precio,cantidadBaños,cantidadAutos,cantidadDormitorios)
    {
        this.Id=id;
        this.Titulo=titulo;
        this.Transaccion=transaccion;
        this.Descripcion=descripcion;
        this.Precio=precio;
        this.CantidadBaños=cantidadBaños;
        this.CantidadAutos=cantidadAutos;
        this.CantidadDormitorios=cantidadDormitorios;
    }

    //#endregion

    //#region Propiedades

    //PROPIEDADES SET

    set Id(value)
    {
        this.id = value;
    }

    set Titulo(value)
    {
        this.titulo = value;
    }

    set Transaccion(value)
    {
        this.transaccion = value;
    }

    set Descripcion(value)
    {
        this.descripcion = value;
    }

    set Precio(value)
    {
        this.precio = value;
    }

    set CantidadBaños(value)
    {
        this.cantidadBaños = value;
    }

    set CantidadAutos(value)
    {
        this.cantidadAutos = value;
    }

    set CantidadDormitorios(value)
    {
        this.cantidadDormitorios = value;
    }

    //PROPIEDADES GET

    get Id()
    {
        return this.id;
    }

    get Titulo()
    {
        return this.titulo;
    }

    get Transaccion()
    {
        return this.transaccion;
    }

    get Descripcion()
    {
        return this.descripcion;
    }

    get Precio()
    {
        return this.precio;
    }

    get CantidadBaños()
    {
        return this.cantidadBaños;
    }

    get CantidadAutos()
    {
        return this.cantidadAutos;
    }

    get CantidadDormitorios()
    {
        return this.cantidadDormitorios;
    }

    //#endregion

    //#region Métodos

    Equals(anuncio)
    {
        return (
            this.Titulo == anuncio.titulo && 
            this.Descripcion == anuncio.descripcion &&
            this.Precio == anuncio.precio &&
            this.CantidadBaños == anuncio.cantidadBaños &&
            this.CantidadAutos == anuncio.cantidadAutos &&
            this.CantidadDormitorios == anuncio.cantidadDormitorios
            );
    }
    //#endregion
}
 