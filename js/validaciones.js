//Está función me permite permitir caracteres desde un rango a otro
export function PermitirCaracteresPorRango(clase,min,max) 
{

}

//Le paso true o false, si es false no me permite escribir en la clase si es true si
export function PermitirCaracteresPorCondicion(clase,condicion) 
{

}



/*
Muchos if, pero quiero validar todo tipo de letra existente en el código ascii
Podria haber hecho hasta el 122, pero quiero que mi programa
permita letras alemanas, griegas, acentos, etc.
*/
export function PermitirSoloLetras(e) 
{ 
   let charCode = (e.which) ? e.which : event.keyCode;

   retorno =
      (
      charCode == 32 || charCode == 157 ||
      (charCode > 64 && charCode < 91) 
      || (charCode > 97 && charCode < 122) 
      || (charCode > 126 && charCode < 156) 
      || (charCode > 159 && charCode < 166) 
      || (charCode > 180 && charCode < 184) 
      || (charCode > 197 && charCode < 200) 
      || (charCode > 208 && charCode < 213) 
      || (charCode > 223 && charCode < 238)
      );

      return retorno;
}