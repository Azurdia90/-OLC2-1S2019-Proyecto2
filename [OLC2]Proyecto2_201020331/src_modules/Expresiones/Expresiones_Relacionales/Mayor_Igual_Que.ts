import Expresion from "../Expresion";
import Simbolo from "../../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../../Tabla_Simbolos/Tabla_Simbolos";

class Mayor_Igual_Que extends Expresion
{
    private tabla_mayor_igual_que : tipo_operacion [][] = [
                                            /*nulo*/    [tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error],
                                            /*booleano*/[tipo_operacion.error,tipo_operacion.mayorigualque_booleano,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error],
                                            /*entero*/  [tipo_operacion.error,tipo_operacion.error,tipo_operacion.mayorigualque_numerico,tipo_operacion.mayorigualque_numerico,tipo_operacion.mayorigualque_numerico_caracter,tipo_operacion.mayorigualque_numerico_caracter,tipo_operacion.error,tipo_operacion.error],
                                            /*decimal*/ [tipo_operacion.error,tipo_operacion.error,tipo_operacion.mayorigualque_numerico,tipo_operacion.mayorigualque_numerico,tipo_operacion.mayorigualque_numerico_caracter,tipo_operacion.mayorigualque_numerico_caracter,tipo_operacion.error,tipo_operacion.error],
                                            /*caracter*/[tipo_operacion.error,tipo_operacion.error,tipo_operacion.mayorigualque_caracter_numerico,tipo_operacion.mayorigualque_caracter_numerico,tipo_operacion.mayorigualque_caracter,tipo_operacion.mayorigualque_caracter,tipo_operacion.error,tipo_operacion.error],
                                            /*cadena*/  [tipo_operacion.error,tipo_operacion.error,tipo_operacion.mayorigualque_caracter_numerico,tipo_operacion.mayorigualque_caracter_numerico,tipo_operacion.mayorigualque_caracter,tipo_operacion.mayorigualque_caracter,tipo_operacion.error,tipo_operacion.error],
                                            /*error*/   [tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error]
                                                    ]

    constructor(p_operador1: (Expresion|Simbolo), p_operador2: (Expresion|Simbolo))
    {
        super(p_operador1,">=", p_operador2);
    }

    ejecutar()
    {
        var tipo_mayor_igual_que : tipo_operacion;

        var valor1 : Simbolo;
        var valor2 : Simbolo;        
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
    
            if(this.operador2 instanceof Expresion)
            {
                valor2 = this.operador2.ejecutar();
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

            tipo_mayor_igual_que = this.tabla_mayor_igual_que[valor1.classTipo] [valor2.classTipo];
            resultado = new Simbolo();

            switch(tipo_mayor_igual_que)
            {
                case tipo_operacion.mayorigualque_numerico:
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.booleano;
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = valor1.classValor + " >= " + valor2.classValor;
                    
                    return resultado;
                case tipo_operacion.mayorigualque_caracter:
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.booleano;
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = valor1.classValor + " >= " + valor2.classValor;
                    
                    return resultado;      
                case tipo_operacion.mayorigualque_booleano:                    
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.booleano;                    
                    resultado.classIdentificador = "10-4";                    
                    resultado.classValor = valor1.classValor + " >= " + valor2.classValor;
                    
                    return resultado;
                case tipo_operacion.mayorigualque_numerico_caracter:
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.booleano;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = valor1.classValor + " >= " + valor2.classValor;
                    
                    return resultado;
                case tipo_operacion.mayorigualque_caracter_numerico:
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.booleano;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = valor1.classValor + " >= " + valor2.classValor;
                    
                    return resultado;                 
                case tipo_operacion.error: 
                    
                    tabla_simbolos.limpiar_3d();
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.error;
                    resultado.classIdentificador = this.fila + "-" + this.columna;                    
                    resultado.classValor("No es posible relacionar un valor del tipo " + valor1.classTipo + " con un valor tipo " + valor2.classTipo +".");
                    
                    return resultado;
                default:

                    tabla_simbolos.limpiar_3d();

                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.error;                    
                    resultado.classIdentificador = this.fila + "-" + this.columna;                    
                    resultado.classValor("No es posible realizar mayor igual que, verifique los valores.");
                    
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
}

export default Mayor_Igual_Que;