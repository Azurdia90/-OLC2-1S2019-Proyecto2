import Simbolo from "../Tabla_Simbolos/Simbolo";
import Instruccion from "../Instruccion";

class Expresion extends Instruccion
{
    protected operador1 : any;
    protected tipo: String;
    protected operador2 : any;

    constructor(p_operador1: (Expresion | Simbolo), p_tipo: String, p_operador2?: (Expresion | Simbolo) )
    {        
        super(0,0);
        this.operador1 = p_operador1;
        this.tipo = p_tipo;
        this.operador2 = p_operador2; 
    }

    ejecutar()
    {
        var valor1 : Simbolo;
        var resultado : Simbolo;
        try
        {   
            if(this.operador1 instanceof Expresion)
            {
                valor1 = this.operador1.ejecutar();
            }
            else 
            {
                valor1 = <Simbolo> this.operador1;
            }

            resultado = valor1;
            return resultado;

        }            
        catch(Error)
        {
            resultado = new Simbolo();
            resultado.classRol = tipo_rol.error;
            resultado.classTipo = tipo_dato_primitivo.error;
            resultado.classIdentificador = this.fila + "-" + this.columna;
            resultado.classValor =  "Error: " + Error.message;        
            return resultado;
        }
    }
}

export default Expresion;