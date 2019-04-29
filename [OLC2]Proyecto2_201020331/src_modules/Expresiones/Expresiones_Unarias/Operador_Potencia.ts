import Expresion from "../Expresion";
import Simbolo from "../../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../../Tabla_Simbolos/Tabla_Simbolos";


class Operador_Potencia extends Expresion
{
    private tabla_potencia : tipo_operacion [][] = [
                                                    /*nulo*/    [tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error],
                                                    /*booleano*/[tipo_operacion.error,tipo_operacion.potencia_entero,tipo_operacion.potencia_decimal,tipo_operacion.potencia_entero,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error],
                                                    /*entero*/  [tipo_operacion.error,tipo_operacion.potencia_entero,tipo_operacion.potencia_entero,tipo_operacion.potencia_decimal,tipo_operacion.potencia_entero,tipo_operacion.error,tipo_operacion.error],
                                                    /*decimal*/ [tipo_operacion.error,tipo_operacion.potencia_entero,tipo_operacion.potencia_entero,tipo_operacion.potencia_decimal,tipo_operacion.potencia_entero,tipo_operacion.error,tipo_operacion.error],
                                                    /*caracter*/[tipo_operacion.error,tipo_operacion.potencia_entero,tipo_operacion.potencia_entero,tipo_operacion.potencia_decimal,tipo_operacion.potencia_entero,tipo_operacion.error,tipo_operacion.error],
                                                    /*cadena*/  [tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error],
                                                    /*error*/   [tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error],
                                                    ];

    constructor(p_expresion1 : Expresion|Simbolo, p_expresion2 : Expresion|Simbolo)    
    {
        super(p_expresion1, "^", p_expresion2);

    }

    ejecutar(entorno_padre: Map<String,Simbolo>, ptr_entorno: Array<number>)
    {
        var tipo_potencia : tipo_operacion;

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
            
            tipo_potencia = this.tabla_potencia[valor1.classTipo] [valor2.classTipo];
            resultado = new Simbolo();

            switch(tipo_potencia)
            {
                case tipo_operacion.potencia_entero:                    
                    var tam_metodo = ptr_entorno[0];
                    var temporal_simulado = "t" + tabla_simbolos.classTemporal;
                    var temporal_contador = "t" + tabla_simbolos.classTemporal;
                    var temporal_pos_return  = "t" + tabla_simbolos.classTemporal;
                    var temporal_retorno     = "t" + tabla_simbolos.classTemporal;

                    tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                    tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                    tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor1.classValor + ";\n";
                    tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  3;\n";
                    tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor2.classValor + ";\n";
                    tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                    tabla_simbolos.classCodigo_3D = "call pow_potencia_entero;\n";
                    tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                    tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                    tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.decimal;                                        
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = temporal_retorno;

                    return resultado;
                case tipo_operacion.potencia_decimal:
                    var tam_metodo = ptr_entorno[0];
                    var temporal_simulado = "t" + tabla_simbolos.classTemporal;
                    var temporal_contador = "t" + tabla_simbolos.classTemporal;
                    var temporal_pos_return  = "t" + tabla_simbolos.classTemporal;
                    var temporal_retorno     = "t" + tabla_simbolos.classTemporal;

                    tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                    tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                    tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor1.classValor + ";\n";
                    tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  3;\n";
                    tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor2.classValor + ";\n";
                    tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                    tabla_simbolos.classCodigo_3D = "call pow_potencia_decimal;\n";
                    tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                    tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                    tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.decimal;                                        
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = temporal_retorno;

                    return resultado;
                case tipo_operacion.error:

                    tabla_simbolos.limpiar_3d();

                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.error;
                    resultado.classIdentificador = this.fila + "-" + this.columna;                    
                    resultado.classValor("No es posible realizar la funcion potencia de un valor del tipo " + valor1.classTipo + " con un valor tipo " + valor2.classTipo +".");
                    
                    return resultado;
                default: 

                    tabla_simbolos.limpiar_3d();

                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.error;
                    resultado.classIdentificador = this.fila + "-" + this.columna;                    
                    resultado.classValor("No es posible realizar la función Potencia, verifique los valores.");
                    
                    return resultado;                
            }
        }
        catch(Error)
        {
            tabla_simbolos.limpiar_3d();

            resultado = new Simbolo();
            resultado.classRol = tipo_rol.error;
            resultado.classTipo = tipo_dato_primitivo.error;
            resultado.classIdentificador = this.fila + "-" + this.columna;
            resultado.classValor =  "Error: " + Error.message;        
            return resultado;
        }
    }

    evaluar(entorno_padre: Map<String,Simbolo>, ptr_entorno: Array<number>)
    {
        var tipo_potencia : tipo_operacion;

        var valor1 : Simbolo;
        var valor2 : Simbolo;        
        var resultado : Simbolo;
        
        try
        {            
            if(this.operador1 instanceof Expresion)
            {
                valor1 = this.operador1.evaluar(entorno_padre, ptr_entorno);
            }
            else 
            {
                valor1 = <Simbolo> this.operador1;
            }

            if(this.operador2 instanceof Expresion)
            {
                valor2 = this.operador2.evaluar(entorno_padre, ptr_entorno);
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
            
            tipo_potencia = this.tabla_potencia[valor1.classTipo] [valor2.classTipo];
            resultado = new Simbolo();

            switch(tipo_potencia)
            {
                case tipo_operacion.potencia_entero:                    
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.decimal;                                        
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = "10-4";

                    return resultado;
                case tipo_operacion.potencia_decimal:
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.decimal;                                        
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = "10-4";

                    return resultado;
                case tipo_operacion.error:

                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.error;
                    resultado.classIdentificador = this.fila + "-" + this.columna;                    
                    resultado.classValor("No es posible realizar la funcion potencia de un valor del tipo " + valor1.classTipo + " con un valor tipo " + valor2.classTipo +".");
                    
                    return resultado;
                default: 

                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.error;
                    resultado.classIdentificador = this.fila + "-" + this.columna;                    
                    resultado.classValor("No es posible realizar la función Potencia, verifique los valores.");
                    
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
export default Operador_Potencia;