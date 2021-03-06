
import Simbolo from "../../Tabla_Simbolos/Simbolo";
import Expresion from "../Expresion";
import tabla_simbolos from "../../Tabla_Simbolos/Tabla_Simbolos";

class Sentencia_Incremento extends Expresion
{
    private identificador : String;
    private tipo : number;

    constructor(operador : Simbolo, p_tipo : number, p_posicion? : Expresion|Simbolo)
    {
        super(operador,"++");
        this.identificador =  operador.classValor;
        this.tipo = p_tipo;
    }

    ejecutar(entorno_padre: Map<String,Simbolo>, ptr_entorno: Array<number>)
    {
        try
        {
            if(this.tipo == 0)
            {
                console.log(this.identificador);
                if(tabla_simbolos.existe_simbolo(this.identificador))
                {
                    var retorno = tabla_simbolos.obtener_simbolo(this.identificador);
                    if(retorno != undefined)
                    {
                        if( (retorno.classTipo == tipo_dato_primitivo.entero) || (retorno.classTipo == tipo_dato_primitivo.decimal))
                        {
                            tabla_simbolos.classCodigo_3D = retorno.classValor + " = " + retorno.classValor + " + 1;\n";

                            var resultado = new Simbolo();
                            resultado.classAcceso = tipo_acceso.publico;
                            resultado.classRol = tipo_rol.aceptado ;
                            resultado.classTipo = retorno.classTipo;                    
                            resultado.classIdentificador = "10-4";                    
                            resultado.classValor = retorno.classValor + " = " + retorno.classValor + " + 1;\n";
                    
                            return resultado;
                        }
                        else
                        {
                            var resultado  = new Simbolo();
                            resultado.classAcceso = tipo_acceso.publico;
                            resultado.classRol = tipo_rol.error;
                            resultado.classTipo = tipo_dato_primitivo.cadena;
                            resultado.classIdentificador = "33-12";
                            resultado.classValor = "Incremento NO realizado correctamente: La variable \"" + this.identificador + "\" no es de tipo numerico.";
                            return resultado;    
                        }
                    }
                    else
                    {
                        var resultado  = new Simbolo();
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.error;
                        resultado.classTipo = tipo_dato_primitivo.cadena;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "Incremento NO realizado correctamente: La variable \"" + this.identificador + "\" no existe.";
                        return resultado;
                    }                    
                }
                else
                {
                    var resultado  = new Simbolo();
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.cadena;
                    resultado.classIdentificador = "33-12";
                    resultado.classValor = "Incremento NO realizado correctamente: La variable \"" + this.identificador + "\" no existe.";
                    return resultado;
                }  
            }
            else
            {
                tabla_simbolos.limpiar_3d();

                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Incremento No realizado correctamente: Funcionalidad No implementada Aun.";
                return resultado;
            }

        }
        catch(Error)
        {
            tabla_simbolos.limpiar_3d();

            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.error;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Incremento No realizado correctamente: " + Error.Message;
            return resultado;
        }
    }

    evaluar(entorno_padre: Map<String,Simbolo>, ptr_entorno: Array<number>)
    {
        try
        {
            if(this.tipo == 0)
            {
                if(tabla_simbolos.existe_simbolo(this.identificador))
                {
                    var retorno = tabla_simbolos.obtener_simbolo(this.identificador);
                    if(retorno != undefined)
                    {
                        if( (retorno.classTipo == tipo_dato_primitivo.entero) || (retorno.classTipo == tipo_dato_primitivo.decimal))
                        {

                            var resultado = new Simbolo();
                            resultado.classAcceso = tipo_acceso.publico;
                            resultado.classRol = tipo_rol.aceptado ;
                            resultado.classTipo = retorno.classTipo;                    
                            resultado.classIdentificador = "10-4";                    
                            resultado.classValor = "10-4";
                    
                            return resultado;
                        }
                        else
                        {
                            var resultado  = new Simbolo();
                            resultado.classAcceso = tipo_acceso.publico;
                            resultado.classRol = tipo_rol.error;
                            resultado.classTipo = tipo_dato_primitivo.cadena;
                            resultado.classIdentificador = "33-12";
                            resultado.classValor = "Incremento NO realizado correctamente: La variable \"" + this.identificador + "\" no es de tipo numerico.";
                            return resultado;    
                        }
                    }
                    else
                    {
                        var resultado  = new Simbolo();
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.error;
                        resultado.classTipo = tipo_dato_primitivo.cadena;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "Incremento NO realizado correctamente: La variable \"" + this.identificador + "\" no existe.";
                        return resultado;
                    }                    
                }
                else
                {
                    var resultado  = new Simbolo();
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.cadena;
                    resultado.classIdentificador = "33-12";
                    resultado.classValor = "Incremento NO realizado correctamente: La variable \"" + this.identificador + "\" no existe.";
                    return resultado;
                }  
            }
            else
            {
                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Incremento No realizado correctamente: Funcionalidad No implementada Aun.";
                return resultado;
            }
        }
        catch(Error)
        {
            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.error;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Incremento No realizado correctamente: " + Error.Message;
            return resultado;
        }
    }
}

export default Sentencia_Incremento;