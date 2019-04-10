import Instruccion from "../Instruccion";
import Simbolo from "../Estructuras/Simbolo";

class Sentencia_Salto_Destino extends Instruccion
{
    private etiqueta : String;

    constructor(p_etiqueta : String)
    {
        super(0,0);
        this.etiqueta = p_etiqueta;
    }

    get classEtiqueta()
    {
        return this.etiqueta;
    }

    set classEtiqueta(p_etiqueta : String)
    {
        this.etiqueta = p_etiqueta;
    }

    ejecutar(entorno_local?: Map<String,Simbolo>)
    {
        return new Simbolo(-10,-4);
    }

}

export default Sentencia_Salto_Destino;