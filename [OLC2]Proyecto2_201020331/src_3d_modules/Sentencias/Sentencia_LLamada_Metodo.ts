import Instruccion from "../Instruccion";
import Simbolo from "../Estructuras/Simbolo";
import Sentencia_Metodo from "./Sentencia_Metodo";

class Sentencia_LLamada_Metodo extends Instruccion
{
    private identificador : String;
    private lista_instrucciones : Array<Instruccion>;

    constructor(p_id : String, p_lista_instrucciones : Array<Instruccion>)
    {
        super(0,0);
        this.identificador = p_id;
        this.lista_instrucciones = p_lista_instrucciones;
    }

    ejecutar(entorno_local?: Map<String,Simbolo>)
    {
        try
        {
            for(var i = 0; i < this.lista_instrucciones.length; i++)
            {
                if(this.lista_instrucciones[i] instanceof Sentencia_Metodo)
                {
                    var destino : Sentencia_Metodo = <Sentencia_Metodo> this.lista_instrucciones[i];
                    if(destino.classId == this.identificador)
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

export default Sentencia_LLamada_Metodo;