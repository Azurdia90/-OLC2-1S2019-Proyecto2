import Expresion from "../Expresion";
import Simbolo from "../../Tabla_Simbolos/Simbolo";

class Not extends Expresion
{
    constructor(p_operador1: (Expresion|Simbolo))
    {
        super(p_operador1,"!");
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
        
            if(valor1.classRol == tipo_rol.error )
            {
                return valor1;
            }
            
            resultado = new Simbolo();

            if(valor1.classTipo == tipo_dato_primitivo.booleano)
            {
                //boolean val1_boolean = valor1.getValor().toString().equals("verdadero") ? true : false;
                //boolean val2_boolean = valor2.getValor().toString().equals("verdadero") ? true : false;
                //boolean resultado = val1_boolean && val2_boolean;
                
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.aceptado;
                resultado.classTipo = tipo_dato_primitivo.booleano;
                resultado.classIdentificador = "10-4";                
                resultado.classValor = "!" + valor1.classValor + "\n"; 
                return resultado;               
            } 
            else
            {
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.error;
                resultado.classIdentificador = this.fila + "-" + this.columna;                
                resultado.classValor = "No es posible realizar Not con valores no booleanos.";    
                return resultado;
            }
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

export default Not;