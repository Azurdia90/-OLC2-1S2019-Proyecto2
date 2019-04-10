import Instruccion from "../Instruccion";

import Simbolo from "../Estructuras/Simbolo";
import Expresion from "../Expresiones/Expresion";
import Sentencia_Salto_Destino from "./Sentencia_Salto_Destino";


class Sentencia_If extends Instruccion
{
    private expresion : Expresion;
    private etiqueta_verdadera : String;
    private lista_instrucciones : Array<Instruccion>;

    constructor(p_expresion : Expresion, p_etiqueta_verdadera : String, p_lista_instrucciones : Array<Instruccion>)
    {
        super(0,0);
        this.expresion = p_expresion;
        this.etiqueta_verdadera = p_etiqueta_verdadera;
        this.lista_instrucciones = p_lista_instrucciones;
    }

    ejecutar(entorno_local?: Map<String,Simbolo>)
    {
        try
        {
            if(entorno_local != undefined)
            {
                var resultado_expresion = this.expresion.ejecutar(entorno_local);
                if(resultado_expresion.classValor == 1)
                {
                    for(var i = 0; i < this.lista_instrucciones.length; i ++)
                    {
                        var destino : Sentencia_Salto_Destino = <Sentencia_Salto_Destino> this.lista_instrucciones[i];
                        if(destino.classEtiqueta == this.etiqueta_verdadera)
                        {
                            return new Simbolo(i,1);
                        }  
                    }
                    return new Simbolo(-33,-12);
                }
                else
                {
                    return new Simbolo(-10,-4);
                }
            }
            else
            {
                return new Simbolo(-33,-12);
            }
        }
        catch(Error)
        {
            return new Simbolo(-33,-12);
        }
    }

}

export default Sentencia_If;