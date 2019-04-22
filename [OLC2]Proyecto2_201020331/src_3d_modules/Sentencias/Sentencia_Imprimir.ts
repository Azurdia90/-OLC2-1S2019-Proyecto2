import tabla_simbolos from "../Estructuras/Tabla_Simbolos";
import Simbolo from "../Estructuras/Simbolo";
import Instruccion from "../Instruccion";

class Sentencia_Imprimir extends Instruccion
{

    private id : String;
    private pos_stack : number;
    private tipo_dato : String;

    constructor(p_tipo_dato : String, p_id : String)
    {
        super(0,0);
        this.id = p_id;
        this.pos_stack = 0;
        this.tipo_dato = p_tipo_dato;
    }

    ejecutar(entorno_local?: Map<String,Simbolo>)
    {
        try
        {
            if(entorno_local != undefined && (tabla_simbolos.existe_simbolo(this.id)))
            {   
                var resultado = tabla_simbolos.obtener_simbolo(this.id);

                if(resultado != undefined)
                {                    
                    if(this.tipo_dato == "%e")
                    {
                        tabla_simbolos.classConsola = (resultado.classValor).toFixed(0);
                    }
                    else if(this.tipo_dato == "%d")
                    {
                        tabla_simbolos.classConsola = (resultado.classValor).toFixed(2);
                    }
                    else if(this.tipo_dato == "%c")
                    {
                        tabla_simbolos.classConsola = String.fromCharCode(resultado.classValor);
                    }
                    else
                    {
                        console.log("Error Tipo Dato no reconocido");
                    }                    
                }
                else
                {
                    console.log("nulo");
                }            
                return new Simbolo(-10,-4);    
            }
            console.log("entorno esta muerto en sentencia imprimir");
            return new Simbolo(-33,-12);
        }
        catch(Error)
        {
            console.log("Hubo un error al imprimir: " + Error.Message);
            return new Simbolo(-33,-12);
        }        
    }
}

export default Sentencia_Imprimir;