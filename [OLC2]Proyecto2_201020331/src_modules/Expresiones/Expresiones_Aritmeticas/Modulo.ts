import Expresion from "../Expresion";
import Simbolo from "../../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../../Tabla_Simbolos/Tabla_Simbolos";



class Modulo extends Expresion
{

    constructor(p_operador1: (Expresion|Simbolo), p_operador2: (Expresion|Simbolo))
    {
        super(p_operador1,"%",p_operador2);
    }

    ejecutar(entorno_padre?: Map<String,Simbolo>, ptr_entorno?: Array<number>)
    {
        var tipo_modulo : tipo_operacion;

        var valor1 : Simbolo;
        var valor2 : Simbolo;        
        var resultado : Simbolo;
        
        try
        {
            if(this.operador1 instanceof Expresion)
            {
                valor1 = this.operador1.ejecutar(entorno_padre, ptr_entorno);
            }
            else 
            {
                valor1 = <Simbolo> this.operador1;
            }
    
            if(this.operador2 instanceof Expresion)
            {
                valor2 = this.operador1.ejecutar(entorno_padre, ptr_entorno);
            }
            else 
            {
                valor2 = <Simbolo> this.operador1;
            }

            if(valor1.classRol == tipo_rol.error )
            {
                return valor1;
            }
            
            if(valor2.classRol == tipo_rol.error)
            {
                return valor2;
            }

            //tipo_multiplicacion = this.tabla_multiplicacion[valor1.classTipo] [valor2.classTipo];
            resultado = new Simbolo();
            return resultado;
        }
        catch(Error)
        {
            tabla_simbolos. limpiar_3d();
            
            resultado = new Simbolo();
            resultado.classRol = tipo_rol.error;
            resultado.classTipo = tipo_dato_primitivo.error;
            resultado.classIdentificador = this.fila + "-" + this.columna;
            resultado.classValor =  "Error: " + Error.message;        
            return resultado;
        }
    }
}

export default Modulo;