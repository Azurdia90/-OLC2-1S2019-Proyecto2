import Expresion from "../Expresion";
import Simbolo from "../../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../../Tabla_Simbolos/Tabla_Simbolos";


class Division extends Expresion
{
    private tabla_division : tipo_operacion [][] =  [
                                            /*nulo*/    [tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error],
                                            /*booleano*/[tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error],
                                            /*entero*/  [tipo_operacion.error,tipo_operacion.error,tipo_operacion.division_decimal,tipo_operacion.division_decimal,tipo_operacion.division_decimal_caracter,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error],
                                            /*decimal*/ [tipo_operacion.error,tipo_operacion.error,tipo_operacion.division_decimal,tipo_operacion.division_decimal,tipo_operacion.division_decimal_caracter,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error],
                                            /*caracter*/[tipo_operacion.error,tipo_operacion.error,tipo_operacion.division_caracter_decimal,tipo_operacion.division_caracter_decimal,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error],
                                            /*cadena*/  [tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error],
                                            /*error*/   [tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error,tipo_operacion.error],
                                                    ];    

    constructor(p_operador1: (Expresion|Simbolo), p_operador2: (Expresion|Simbolo))
    {
        super(p_operador1,"/",p_operador2);
    }

    ejecutar()
    {
        var tipo_division : tipo_operacion;

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

            tipo_division = this.tabla_division[valor1.classTipo] [valor2.classTipo];
            resultado = new Simbolo();

            switch(tipo_division)
            {
                case tipo_operacion.division_decimal:                                                            
                    if(valor2.classValor != 0)
                    { 
                        var etiqueta_actual = tabla_simbolos.classTemporal;
                        tabla_simbolos.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " / " + valor2.classValor + ";\n";                       

                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.decimal;
                        resultado.classIdentificador = "10-4";                        
                        resultado.classValor = "t" + etiqueta_actual;
                    }                    
                    else
                    {
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.error;
                        resultado.classTipo = tipo_dato_primitivo.error;
                        resultado.classIdentificador = this.fila + "-" + this.columna; 
                        resultado.classValor = "Division entre cero."; 
                    }
                    
                    return resultado;      
                case tipo_operacion.division_caracter_decimal:                                                            
                    if(valor2.classValor != 0)
                    {
                        var etiqueta_actual = tabla_simbolos.classTemporal;
                        tabla_simbolos.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " / " + valor2.classValor + ";\n";
                        
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classIdentificador = "10-4";
                        resultado.classTipo = tipo_dato_primitivo.decimal;
                        resultado.classValor = "t" + etiqueta_actual;
                    }                    
                    else
                    {
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.error;
                        resultado.classTipo = tipo_dato_primitivo.error;
                        resultado.classIdentificador = "33-12"; 
                        resultado.classValor = "Division entre cero."; 
                    }
                    
                    return resultado; 
                case tipo_operacion.division_decimal_caracter:                    
                    if(valor2.classValor != 0)
                    {
                        var etiqueta_actual = tabla_simbolos.classTemporal;
                        tabla_simbolos.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " / " + valor2.classValor + ";\n";
                        
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.decimal;
                        resultado.classIdentificador = "10-4"; 
                        resultado.classValor = "t" + etiqueta_actual;
                    }                    
                    else
                    {
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.error;
                        resultado.classTipo = tipo_dato_primitivo.error;                        
                        resultado.classIdentificador = this.fila + "-" + this.columna;                        
                        resultado.classValor("Division entre cero.");                        
                    }
                    
                    return resultado;        
                case tipo_operacion.error: 
                    
                    tabla_simbolos.limpiar_3d();
                    
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.error;
                    resultado.classIdentificador = this.fila + "-" + this.columna;                    
                    resultado.classValor = "No es posible division un valor del tipo " + valor1.classTipo + " con un valor tipo " + valor2.classTipo +".";
                    
                    return resultado;
                default:

                    tabla_simbolos.limpiar_3d();    

                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.error;
                    resultado.classIdentificador = this.fila + "-" + this.columna;                    
                    resultado.classValor = "No es posible realizar la division, verifique los valores.";
                    
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

export default Division;