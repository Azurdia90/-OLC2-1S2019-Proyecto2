import Simbolo from "./Estructuras/Simbolo";
import Tabla_Simbolos from "./Estructuras/Tabla_Simbolos";


class Instruccion
{
    protected fila : number
    protected columna: number

    constructor(pfila:number, pcolumna: number)
    {
        this.fila = pfila;
        this.columna = pcolumna;
    }

    ejecutar(entorno_local?: Map<String,Simbolo>)
    {
        return new Simbolo(0,0);
    }
}

export default Instruccion;