import Instruccion from "../Instruccion";
import Expresion from "../Expresiones/Expresion";
import Simbolo from "../Estructuras/Simbolo";
import Tabla_Simbolos from "../Estructuras/Tabla_Simbolos";
import Valor from "../Expresiones/Valor";

class Sentencia_Declaracion extends Instruccion
{

    private lista_id : String[];
    private valor : any;

    constructor(p_id : String[], p_expresion? : Expresion | Valor)
    {
        super(0,0);
        this.lista_id = p_id;    
        this.valor = p_expresion;
    }

    ejecutar(entorno_local?: Map<String,Simbolo>)
    {
        try
        {
            for(var i = 0; i < this.lista_id.length; i++)
            {
                console.log("se declarara variable: " + this.lista_id[i]);

                if(entorno_local != undefined && !(entorno_local.has(this.lista_id[i])) )
                {                    
                    if(this.valor != undefined)
                    {
                        var resultado_valor : Simbolo = this.valor.ejecutar(entorno_local);

                        if(resultado_valor.classTam != -12)
                        {
                            console.log("el valor de la expresion es: " + resultado_valor.classValor);
                            var simbolo_nuevo = new Simbolo(resultado_valor.classValor, resultado_valor.classTam);
                            entorno_local.set(this.lista_id[i],simbolo_nuevo);                            
                        }
                        else
                        {
                            new Simbolo(-33,-12);
                        }               
                    }
                    else
                    {                    
                        var simbolo_nuevo = new Simbolo(-10, -4);
                        entorno_local.set(this.lista_id[i],simbolo_nuevo);                        
                    }                    
                }
                else
                {
                    console.log("entorno esta muerto en sentencia declaracion");
                    return new Simbolo(-33,-12);
                }  
            }                 
            return new Simbolo(-10,-4);
        }
        catch(Error)
        {
            console.log("Error: " + Error.Message);
            return new Simbolo(-33,-12);
        }        
    }
}

export default Sentencia_Declaracion;