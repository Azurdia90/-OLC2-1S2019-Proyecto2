import Simbolo from "./Tabla_Simbolos/Simbolo";

class Instruccion
{
    protected fila : number
    protected columna: number
    protected codigo_3D : String

    constructor(pfila:number, pcolumna: number)
    {
        this.fila = pfila;
        this.columna = pcolumna;
        this.codigo_3D = "";
    }

    ejecutar()
    {
        return new Simbolo();
    }
}

export default Instruccion;