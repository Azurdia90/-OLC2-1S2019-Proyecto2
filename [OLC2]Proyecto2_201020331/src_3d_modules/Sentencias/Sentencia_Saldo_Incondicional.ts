import Instruccion from "../Instruccion";
import Simbolo from "../Estructuras/Simbolo";
import Sentencia_Salto_Destino from "./Sentencia_Salto_Destino";

class Sentencia_Salto_Incondicional extends Instruccion
{

    private lista_instrucciones : Array<Instruccion>;
    private etiqueta_destino : String;

    constructor(p_lista_instrucciones : Array<Instruccion>, p_etiqueta_destino : String)
    {
        super(0,0);
        this.lista_instrucciones = p_lista_instrucciones;
        this.etiqueta_destino = p_etiqueta_destino;
    }

    ejecutar(entorno_local?: Map<String,Simbolo>)
    {
        try
        {
            for(var i = 0; i < this.lista_instrucciones.length; i++)
            {
                if(this.lista_instrucciones[i] instanceof Sentencia_Salto_Destino)
                {
                    var destino : Sentencia_Salto_Destino = <Sentencia_Salto_Destino> this.lista_instrucciones[i];
                    if(destino.classEtiqueta == this.etiqueta_destino)
                    {
                        return new Simbolo(i,1);
                    }                    
                }
            }

            return new Simbolo(-33,-12);
        }
        catch(Error)
        {
            return new Simbolo(-33,-12);
        }
    }
}

export default Sentencia_Salto_Incondicional;