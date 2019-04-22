import Simbolo from "../Tabla_Simbolos/Simbolo";
import Instruccion from "../Instruccion";
import tabla_simbolos from "../Tabla_Simbolos/Tabla_Simbolos";
import Expresion from "../Expresiones/Expresion";
import Sentencia_Break from "./Sentencia_Break";
import Sentencia_Continue from "./Sentencia_Continue";
import Sentencia_Return from "./Sentencia_Return";
import Sentencia_Switch from "./Sentencia_Switch";

class Sentencia_If extends Instruccion
{

    private tipo : number;
    private evaluacion : any;
    private lista_instrucciones : Array<Instruccion>;
    private lista_instrucciones_else_if : Array<Instruccion>;
    private lista_instrucciones_else : Array<Instruccion>;
    private entorno_local : any;

    constructor(p_tipo : number, p_evaluacion : Expresion | Simbolo, p_lista_instrucciones : Array<Instruccion>, p_lista_instrucciones_else_if : Array<Instruccion>, p_lista_instrucciones_else : Array<Instruccion>)
    {
        super(0,0);
        this.tipo = p_tipo;
        this.evaluacion = p_evaluacion;
        this.lista_instrucciones = p_lista_instrucciones;
        this.lista_instrucciones_else_if = p_lista_instrucciones_else_if;
        this.lista_instrucciones_else = p_lista_instrucciones_else;
    }

    ejecutar(entorno_padre: Map<String,Simbolo>, ptr_entorno: Array<number>, etiqueta_retorno? : String, etiqueta_inicio? : String, etiqueta_fin? : String, p_etiqueta_falsa? : String, p_etiqueta_salida? : String)
    {
        try
        {
            this.entorno_local = new Map<String,Simbolo>();
            tabla_simbolos.classEntornos.agregar(this.entorno_local);
            
            var etiqueta_verdadera: String
            var etiqueta_falsa : String;
            var etiqueta_salida : String;

            etiqueta_verdadera  = "L" + tabla_simbolos.classEtiqueta;

            if(p_etiqueta_falsa != undefined && p_etiqueta_falsa != "")
            {
                etiqueta_falsa = p_etiqueta_falsa;
            }
            else
            {
                etiqueta_falsa = "L" + tabla_simbolos.classEtiqueta;
            }                        
            
            if(p_etiqueta_salida != undefined && p_etiqueta_salida != "")
            {
                etiqueta_salida = p_etiqueta_salida;
            }
            else
            {
                etiqueta_salida = "L" + tabla_simbolos.classEtiqueta;
            }
            
            var resultado_evaluacion = this.evaluacion.ejecutar(entorno_padre);
            
            if(resultado_evaluacion.classRol == tipo_rol.error)
            {
                tabla_simbolos.classEntornos.desapilar();
                return resultado_evaluacion;
            }

            if(resultado_evaluacion.classTipo  == tipo_dato_primitivo.booleano)
            {
                tabla_simbolos.classCodigo_3D = "if( " + resultado_evaluacion.classValor + ") goto " + etiqueta_verdadera + ";\n";
                tabla_simbolos.classCodigo_3D = "goto " + etiqueta_falsa + ";\n";
                tabla_simbolos.classCodigo_3D = etiqueta_verdadera + ":\n";

                for(var i = 0; i < this.lista_instrucciones.length; i++)
                {
                    var sentencia;
                    var resultado_sentencia;
                
                    sentencia = this.lista_instrucciones[i];
                    
                    if(sentencia instanceof Sentencia_Break)
                    {
                        resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_fin);
                    }
                    else if(sentencia instanceof Sentencia_Continue)
                    {
                        resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_fin);
                    }
                    else if(sentencia instanceof Sentencia_Return) //pendiente ceremonia cambio de ambito
                    {
                        resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno);
                    }
                    else if(sentencia instanceof Sentencia_Switch)
                    {
                        resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno,etiqueta_inicio,etiqueta_fin);
                    }
                    else if(sentencia instanceof Sentencia_If)
                    {
                        resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno,etiqueta_inicio,etiqueta_fin);
                    }
                    else
                    {
                        resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno);
                    }           

                    if(resultado_sentencia.classRol == tipo_rol.error)
                    {
                        tabla_simbolos.classEntornos.desapilar();
                        return resultado_sentencia;
                    }
                }
                
                tabla_simbolos.classCodigo_3D = "goto " + etiqueta_salida + ";\n";
                if(this.tipo == 0)
                {
                    for(var i = 0; i < this.lista_instrucciones_else_if.length; i++)
                    {
                        var sentencia;
                        var resultado_sentencia;
                    
                        sentencia = this.lista_instrucciones[i];
                        
                        if(sentencia instanceof Sentencia_Break)
                        {
                            resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_fin);
                        }
                        else if(sentencia instanceof Sentencia_Continue)
                        {
                            resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_inicio);
                        }
                        else if(sentencia instanceof Sentencia_Return) //pendiente ceremonia cambio de ambito
                        {
                            resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno);
                        }
                        else if(sentencia instanceof Sentencia_Switch)
                        {
                            resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno,etiqueta_inicio,etiqueta_fin);
                        }
                        else if(sentencia instanceof Sentencia_If)
                        {
                            resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno,etiqueta_inicio,etiqueta_fin,etiqueta_falsa,etiqueta_salida);
                        }                        
                        else
                        {
                            resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno);
                        }           

                        if(resultado_sentencia.classRol == tipo_rol.error)
                        {
                            tabla_simbolos.classEntornos.desapilar();
                            return resultado_sentencia;
                        }                   
                    }
                    tabla_simbolos.classCodigo_3D = etiqueta_falsa + ":\n";
                    for(var i = 0; i < this.lista_instrucciones_else.length; i++)
                    {
                        var sentencia;
                        var resultado_sentencia;
                    
                        sentencia = this.lista_instrucciones_else[i];
                        
                        if(sentencia instanceof Sentencia_Break)
                        {
                            resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_fin);
                        }
                        else if(sentencia instanceof Sentencia_Continue)
                        {
                            resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_inicio);
                        }
                        else if(sentencia instanceof Sentencia_Return) //pendiente ceremonia cambio de ambito
                        {
                            resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno);
                        }
                        else if(sentencia instanceof Sentencia_Switch)
                        {
                            resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno,etiqueta_inicio,etiqueta_fin);
                        }
                        else if(sentencia instanceof Sentencia_If)
                        {
                            resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno,etiqueta_inicio,etiqueta_fin);
                        }
                        else
                        {
                            resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno);
                        }           

                        if(resultado_sentencia.classRol == tipo_rol.error)
                        {
                            tabla_simbolos.classEntornos.desapilar();
                            return resultado_sentencia;
                        }
                    }
                    tabla_simbolos.classCodigo_3D = etiqueta_salida + ":\n";
                }
                        
                tabla_simbolos.classEntornos.desapilar();

                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.aceptado;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "10-4";
                resultado.classValor = "Sentencia If  realizada correctamente";
                return resultado;
            }
            else
            {
                tabla_simbolos.classEntornos.desapilar();
                tabla_simbolos.limpiar_3d();

                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia If No realizada correctamente: El valor a evaluar no es de tipo booleano.";
                return resultado;                
            }            
        }
        catch(Error)
        {
            tabla_simbolos.classEntornos.desapilar();
            tabla_simbolos.limpiar_3d();

            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.error;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Sentencia If No realizada correctamente: " + Error.Message;
            return resultado;
        }
    }
}

export default Sentencia_If;