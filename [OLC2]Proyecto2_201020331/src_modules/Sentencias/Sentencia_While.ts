import Instruccion from "../Instruccion";
import Simbolo from "../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../Tabla_Simbolos/Tabla_Simbolos";
import Expresion from "../Expresiones/Expresion";
import Sentencia_Break from "./Sentencia_Break";
import Sentencia_Continue from "./Sentencia_Continue";
import Sentencia_Return from "./Sentencia_Return";
import Sentencia_If from "./Sentencia_If";
import Sentencia_Switch from "./Sentencia_Switch";

class Sentencia_While extends Instruccion
{
    private evaluacion :  any;
    private lista_instrucciones : Array<Instruccion>;
    private entorno_local : any;

    constructor(p_evaluacion : Expresion | Simbolo, p_lista_instrucciones : Array<Instruccion>)
    {
        super(0,0);
        this.evaluacion = p_evaluacion;
        this.lista_instrucciones = p_lista_instrucciones;
    }

    ejecutar(entorno_padre: Map<String,Simbolo>, ptr_entorno: Array<number>, etiqueta_retorno?: String)
    {
        try
        {
            this.entorno_local = new Map<String,Simbolo>();
            tabla_simbolos.classEntornos.agregar(this.entorno_local);
        
            var comparacion_f : Simbolo; 

            if(this.evaluacion instanceof Expresion)
            {
                comparacion_f = this.evaluacion.ejecutar()
            }
            else if(this.evaluacion instanceof Simbolo)
            {
                comparacion_f = this.evaluacion;
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
                resultado.classValor = "Sentencia While No realizada correctamente: No existe un valor definido.";
                return resultado;
            }

            var etiqueta_inicio  = "L" + tabla_simbolos.classEtiqueta;
            var etiqueta_ejecucion  = "L" + tabla_simbolos.classEtiqueta;
            var etiqueta_fin  = "L" + tabla_simbolos.classEtiqueta;

            tabla_simbolos.classCodigo_3D = etiqueta_inicio + ":\n";
            tabla_simbolos.classCodigo_3D = "if(" + comparacion_f.classValor + " ) goto " + etiqueta_ejecucion + ";\n";
            tabla_simbolos.classCodigo_3D = "goto " + etiqueta_fin + ";\n";
            tabla_simbolos.classCodigo_3D = etiqueta_ejecucion + ":\n";        

            for(var i = 0; i< this.lista_instrucciones.length; i++)
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
                else if(sentencia instanceof Sentencia_If)
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno,etiqueta_fin,etiqueta_inicio);
                }
                else if(sentencia instanceof Sentencia_Switch)
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno);
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
            tabla_simbolos.classCodigo_3D = "goto " + etiqueta_inicio + ";\n";
            tabla_simbolos.classCodigo_3D = etiqueta_fin + ":\n";

            tabla_simbolos.classEntornos.desapilar();

            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.aceptado;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Sentencia While realizada correctamente.";
            return resultado;
        }
        catch(Error)
        {
            tabla_simbolos.limpiar_3d();

            tabla_simbolos.classEntornos.desapilar();

            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.error;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Sentencia While No realizada correctamente: " + Error.Message;
            return resultado;
        }
    }
}

export default Sentencia_While;