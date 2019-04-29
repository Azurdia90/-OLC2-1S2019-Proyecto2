import Expresion from "../Expresion";
import Simbolo from "../../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../../Tabla_Simbolos/Tabla_Simbolos";

class Suma extends Expresion
{

    private tabla_suma : tipo_operacion [][] =  [
                                        /*nulo*/    [tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error],
                                        /*booleano*/[tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.concatenacion,tipo_operacion.error,tipo_operacion.error],
                                        /*entero*/  [tipo_operacion.error,tipo_operacion.error,tipo_operacion.suma_entero,tipo_operacion.suma_decimal,tipo_operacion.suma_entero_caracter,tipo_operacion.concatenacion,tipo_operacion.error,tipo_operacion.error],
                                        /*decimal*/ [tipo_operacion.error,tipo_operacion.error,tipo_operacion.suma_decimal,tipo_operacion.suma_decimal,tipo_operacion.suma_decimal_caracter,tipo_operacion.concatenacion,tipo_operacion.error,tipo_operacion.error],
                                        /*caracter*/[tipo_operacion.error,tipo_operacion.error,tipo_operacion.suma_caracter_entero,tipo_operacion.suma_caracter_decimal,tipo_operacion.concatenacion,tipo_operacion.concatenacion,tipo_operacion.error,tipo_operacion.error],
                                        /*cadena*/  [tipo_operacion.error,tipo_operacion.concatenacion,tipo_operacion.concatenacion,tipo_operacion.concatenacion,tipo_operacion.concatenacion,tipo_operacion.concatenacion,tipo_operacion.error,tipo_operacion.error],
                                        /*error*/   [tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error],
                                                ];

    constructor(p_operador1: (Expresion|Simbolo), p_operador2: (Expresion|Simbolo))
    {
        super(p_operador1,"+", p_operador2);         
    }

    ejecutar(entorno_padre: Map<String,Simbolo>, ptr_entorno: Array<number>)
    {
        var tipo_suma : tipo_operacion;

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

            if(valor1.classRol == tipo_rol.error)
            {
                return valor1;
            }
            
            if(valor2.classRol == tipo_rol.error)
            {
                return valor2;
            }

            tipo_suma = this.tabla_suma[valor1.classTipo] [valor2.classTipo];
            resultado = new Simbolo();

            switch(tipo_suma)
            {                
                case tipo_operacion.suma_entero:
                    
                    var etiqueta_actual = tabla_simbolos.classTemporal;
                    tabla_simbolos.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " + " + valor2.classValor + ";\n";
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.entero;
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = "t" + etiqueta_actual;
                    
                    return resultado;
                case tipo_operacion.suma_decimal:

                    var etiqueta_actual = tabla_simbolos.classTemporal;
                    tabla_simbolos.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " + " + valor2.classValor + ";\n";
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado; 
                    resultado.classTipo = tipo_dato_primitivo.decimal;                                       
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = "t" + etiqueta_actual;
                    
                    return resultado;      
                case tipo_operacion.suma_entero_caracter:
                    
                    var etiqueta_actual = tabla_simbolos.classTemporal;
                    tabla_simbolos.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " + " + valor2.classValor+ ";\n";
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.entero;
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = "t" + etiqueta_actual;
                    
                    return resultado;
                case tipo_operacion.suma_caracter_entero:
                    
                    var etiqueta_actual = tabla_simbolos.classTemporal;
                    tabla_simbolos.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " + " + valor2.classValor + ";\n";
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado ;
                    resultado.classTipo = tipo_dato_primitivo.entero;                    
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = "t" + etiqueta_actual;
                    
                    return resultado;
                case tipo_operacion.suma_decimal_caracter:
                    
                    var etiqueta_actual = tabla_simbolos.classTemporal;
                    tabla_simbolos.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " + " + valor2.classValor + ";\n";
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.decimal;
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = "t" + etiqueta_actual;
                    
                    return resultado;    
                case tipo_operacion.suma_caracter_decimal:
                    
                    var etiqueta_actual = tabla_simbolos.classTemporal;
                    tabla_simbolos.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " + " + valor2.classValor + ";\n";
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;                    
                    resultado.classTipo = tipo_dato_primitivo.decimal;
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = "t" + etiqueta_actual;
                    
                    return resultado;                    
                case tipo_operacion.concatenacion:
                    
                    if(valor1.classTipo == tipo_dato_primitivo.cadena && valor2.classTipo == tipo_dato_primitivo.cadena)
                    {
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
                        tabla_simbolos.classCodigo_3D = "call concatenacion_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = temporal_retorno;                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.booleano && valor2.classTipo == tipo_dato_primitivo.cadena)
                    {
                        var tam_metodo = ptr_entorno[0];
                        var temporal_simulado = "t" + tabla_simbolos.classTemporal;
                        var temporal_contador = "t" + tabla_simbolos.classTemporal;
                        var temporal_pos_return  = "t" + tabla_simbolos.classTemporal;
                        var temporal_retorno     = "t" + tabla_simbolos.classTemporal;
                                                                                
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor1.classValor + ";\n";                        
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call cast_boolean_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + temporal_retorno + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  3;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor2.classValor + ";\n";
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call concatenacion_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = temporal_retorno;                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.cadena && valor2.classTipo == tipo_dato_primitivo.booleano)
                    {
                        var tam_metodo = ptr_entorno[0];
                        var temporal_simulado = "t" + tabla_simbolos.classTemporal;
                        var temporal_contador = "t" + tabla_simbolos.classTemporal;
                        var temporal_pos_return  = "t" + tabla_simbolos.classTemporal;
                        var temporal_retorno     = "t" + tabla_simbolos.classTemporal;
                                                                                
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor2.classValor + ";\n";                        
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call cast_boolean_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor1.classValor + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  3;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + temporal_retorno + ";\n";
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call concatenacion_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = temporal_retorno;                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.caracter && valor2.classTipo == tipo_dato_primitivo.cadena)
                    {
                        var tam_metodo = ptr_entorno[0];
                        var temporal_simulado = "t" + tabla_simbolos.classTemporal;
                        var temporal_contador = "t" + tabla_simbolos.classTemporal;
                        var temporal_pos_return  = "t" + tabla_simbolos.classTemporal;
                        var temporal_retorno     = "t" + tabla_simbolos.classTemporal;
                                                                                
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor1.classValor + ";\n";                        
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call cast_char_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + temporal_retorno + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  3;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor2.classValor + ";\n";
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call concatenacion_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = temporal_retorno;                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.cadena && valor2.classTipo == tipo_dato_primitivo.caracter)
                    {
                        var tam_metodo = ptr_entorno[0];
                        var temporal_simulado = "t" + tabla_simbolos.classTemporal;
                        var temporal_contador = "t" + tabla_simbolos.classTemporal;
                        var temporal_pos_return  = "t" + tabla_simbolos.classTemporal;
                        var temporal_retorno     = "t" + tabla_simbolos.classTemporal;
                                                                                
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor2.classValor + ";\n";    
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call cast_char_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor1.classValor + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  3;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + temporal_retorno + ";\n";
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call concatenacion_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = temporal_retorno;                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.entero && valor2.classTipo == tipo_dato_primitivo.cadena)
                    {
                        var tam_metodo = ptr_entorno[0];
                        var temporal_simulado = "t" + tabla_simbolos.classTemporal;
                        var temporal_contador = "t" + tabla_simbolos.classTemporal;
                        var temporal_pos_return  = "t" + tabla_simbolos.classTemporal;
                        var temporal_retorno     = "t" + tabla_simbolos.classTemporal;
                                                                                
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor1.classValor + ";\n";                        
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call cast_int_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + temporal_retorno + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  3;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor1.classValor + ";\n";
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call concatenacion_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = temporal_retorno;                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.cadena && valor2.classTipo == tipo_dato_primitivo.entero)
                    {
                        var tam_metodo = ptr_entorno[0];
                        var temporal_simulado = "t" + tabla_simbolos.classTemporal;
                        var temporal_contador = "t" + tabla_simbolos.classTemporal;
                        var temporal_pos_return  = "t" + tabla_simbolos.classTemporal;
                        var temporal_retorno     = "t" + tabla_simbolos.classTemporal;
                                                                                
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor2.classValor + ";\n";                        
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call cast_int_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor1.classValor + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  3;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + temporal_retorno + ";\n";
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call concatenacion_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = temporal_retorno;                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.decimal && valor2.classTipo == tipo_dato_primitivo.cadena)
                    {
                        var tam_metodo = ptr_entorno[0];
                        var temporal_simulado = "t" + tabla_simbolos.classTemporal;
                        var temporal_contador = "t" + tabla_simbolos.classTemporal;
                        var temporal_pos_return  = "t" + tabla_simbolos.classTemporal;
                        var temporal_retorno     = "t" + tabla_simbolos.classTemporal;
                                                                                
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor1.classValor + ";\n";                        
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call cast_decimal_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + temporal_retorno + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  3;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor1.classValor + ";\n";
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call concatenacion_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = temporal_retorno;                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.cadena && valor2.classTipo == tipo_dato_primitivo.decimal)
                    {
                        var tam_metodo = ptr_entorno[0];
                        var temporal_simulado = "t" + tabla_simbolos.classTemporal;
                        var temporal_contador = "t" + tabla_simbolos.classTemporal;
                        var temporal_pos_return  = "t" + tabla_simbolos.classTemporal;
                        var temporal_retorno     = "t" + tabla_simbolos.classTemporal;
                                                                                
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor2.classValor + ";\n";                        
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call cast_decimal_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " +  tam_metodo + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor1.classValor + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  3;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + temporal_retorno + ";\n";
                        tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";                
                        tabla_simbolos.classCodigo_3D = "call concatenacion_cadena;\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                        tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                        
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = temporal_retorno;                    
                        return resultado;
                    }

                case tipo_operacion.error:                    

                    tabla_simbolos.limpiar_3d();

                    resultado.classAcceso = tipo_acceso.publico;    
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.error;
                    resultado.classIdentificador = this.fila + "-" + this.columna;                    
                    resultado.classValor = "No es posible sumar un valor del tipo " + valor1.classTipo + " con un valor tipo " + valor2.classTipo + ".";
                    
                    return resultado;
                default:                    

                    tabla_simbolos.limpiar_3d();

                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;                    
                    resultado.classTipo  = tipo_dato_primitivo.error;
                    resultado.classIdentificador = this.fila + "-" + this.columna;                    
                    resultado.classValor = "No es posible realizar la suma, verifique el tipo de los valores.";

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
        var tipo_suma : tipo_operacion;

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

            if(valor1.classRol == tipo_rol.error)
            {
                return valor1;
            }
            
            if(valor2.classRol == tipo_rol.error)
            {
                return valor2;
            }

            tipo_suma = this.tabla_suma[valor1.classTipo] [valor2.classTipo];
            resultado = new Simbolo();

            switch(tipo_suma)
            {                
                case tipo_operacion.suma_entero:
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.entero;
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = "10-4";
                    
                    return resultado;
                case tipo_operacion.suma_decimal:

                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado; 
                    resultado.classTipo = tipo_dato_primitivo.decimal;                                       
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = "10-4";
                    
                    return resultado;      
                case tipo_operacion.suma_entero_caracter:
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.entero;
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = "10-4";
                    
                    return resultado;
                case tipo_operacion.suma_caracter_entero:
                     
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado ;
                    resultado.classTipo = tipo_dato_primitivo.entero;                    
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = "10-4";
                    
                    return resultado;
                case tipo_operacion.suma_decimal_caracter:
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.decimal;
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = "10-4";
                    
                    return resultado;    
                case tipo_operacion.suma_caracter_decimal:
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;                    
                    resultado.classTipo = tipo_dato_primitivo.decimal;
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = "10-4";
                    
                    return resultado;                    
                case tipo_operacion.concatenacion:
                    
                    if(valor1.classTipo == tipo_dato_primitivo.cadena && valor2.classTipo == tipo_dato_primitivo.cadena)
                    {
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = "10-4";                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.booleano && valor2.classTipo == tipo_dato_primitivo.cadena)
                    {                        
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = "10-4";                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.cadena && valor2.classTipo == tipo_dato_primitivo.booleano)
                    {                        
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = "10-4";                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.caracter && valor2.classTipo == tipo_dato_primitivo.cadena)
                    {                        
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = "10-4";                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.cadena && valor2.classTipo == tipo_dato_primitivo.caracter)
                    {                        
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = "10-4";                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.entero && valor2.classTipo == tipo_dato_primitivo.cadena)
                    {
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = "10-4";                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.cadena && valor2.classTipo == tipo_dato_primitivo.entero)
                    {                        
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = "10-4";                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.decimal && valor2.classTipo == tipo_dato_primitivo.cadena)
                    {
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = "10-4";                    
                        return resultado;
                    }
                    else if(valor1.classTipo == tipo_dato_primitivo.cadena && valor2.classTipo == tipo_dato_primitivo.decimal)
                    {
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;                                        
                        resultado.classIdentificador = "10-4";                    
                        resultado.classValor = "10-4";                    
                        return resultado;
                    }

                case tipo_operacion.error:        

                    resultado.classAcceso = tipo_acceso.publico;    
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.error;
                    resultado.classIdentificador = this.fila + "-" + this.columna;                    
                    resultado.classValor = "No es posible sumar un valor del tipo " + valor1.classTipo + " con un valor tipo " + valor2.classTipo + ".";
                    
                    return resultado;
                default:    

                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;                    
                    resultado.classTipo  = tipo_dato_primitivo.error;
                    resultado.classIdentificador = this.fila + "-" + this.columna;                    
                    resultado.classValor = "No es posible realizar la suma, verifique el tipo de los valores.";

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

export default Suma;