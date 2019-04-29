import Expresion from "../Expresion";
import Simbolo from "../../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../../Tabla_Simbolos/Tabla_Simbolos";

class Or extends Expresion
{
    constructor(p_operador1: (Expresion|Simbolo), p_operador2: (Expresion|Simbolo))
    {
        super(p_operador1,"||", p_operador2);
    }

    ejecutar(entorno_padre: Map<String,Simbolo>, ptr_entorno: Array<number>)
    {
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
                valor2 = this.operador2.ejecutar(entorno_padre, ptr_entorno);
            }
            else 
            {
                valor2 = <Simbolo> this.operador2;
            }

            if(valor1.classRol == tipo_rol.error )
            {
                return valor1;
            }
            
            if(valor2.classRol == tipo_rol.error)
            {
                return valor2;
            }

            resultado = new Simbolo();

            if(valor1.classTipo == tipo_dato_primitivo.booleano && valor2.classTipo == tipo_dato_primitivo.booleano)
            {
                var etiqueta_positiva1 = "L" + tabla_simbolos.classEtiqueta;
                var etiqueta_negativa1 = "L" + tabla_simbolos.classEtiqueta;
                var etiqueta_positiva2 = "L" + tabla_simbolos.classEtiqueta;
                var etiqueta_negativa2 = "L" + tabla_simbolos.classEtiqueta;
                
                valor1 = this.operador1.ejecutar(entorno_padre, ptr_entorno);
                valor2 = this.operador2.ejecutar(entorno_padre, ptr_entorno);

                tabla_simbolos.classCodigo_3D = "if(" + valor1.classValor + ") goto " + etiqueta_positiva1 + ";\n";
                tabla_simbolos.classCodigo_3D = "goto " + etiqueta_negativa1 + ";\n";
                tabla_simbolos.classCodigo_3D =  etiqueta_negativa1 + ":\n";
                tabla_simbolos.classCodigo_3D = "if(" + valor2.classValor + ") goto " + etiqueta_positiva2 + ";\n";
                tabla_simbolos.classCodigo_3D = "goto " + etiqueta_negativa2 + ";\n";
                
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.aceptado;
                resultado.classTipo = tipo_dato_primitivo.booleano;
                resultado.classIdentificador = "10-4";                
                resultado.classValor = valor1.classValor + "|| " + valor2.classValor; 
                return resultado;               
            } 
            else
            {
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.error;
                resultado.classIdentificador = this.fila + "-" + this.columna;                
                resultado.classValor = "No es posible realizar Or con valores no booleanos.";    
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

export default Or;