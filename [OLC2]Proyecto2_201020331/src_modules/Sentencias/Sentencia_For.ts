import tabla_simbolos from "../Tabla_Simbolos/Tabla_Simbolos";
import Simbolo from "../Tabla_Simbolos/Simbolo";
import Expresion from "../Expresiones/Expresion";
import Instruccion from "../Instruccion";
import Sentencia_Break from "./Sentencia_Break";
import Sentencia_Continue from "./Sentencia_Continue";
import Sentencia_Return from "./Sentencia_Return";
import Sentencia_If from "./Sentencia_If";
import Sentencia_Switch from "./Sentencia_Switch";

class Sentencia_For extends Instruccion
{
    private sentencia_inicio : Instruccion;
    private sentencia_comparacion : any;
    private sentencia_fin : Expresion;
    private lista_sentencias : Array<Instruccion>;
    private entorno_local : any;

    constructor(p_sentencia_inicio: Instruccion, p_sentencia_comparacion : Expresion | Simbolo, p_sentencia_final : Expresion, p_lista_instrucciones : Array<Instruccion>)
    {
        super(0,0);
        this.sentencia_inicio = p_sentencia_inicio;
        this.sentencia_comparacion = p_sentencia_comparacion;
        this.sentencia_fin = p_sentencia_final;
        this.lista_sentencias = p_lista_instrucciones;
    }

    ejecutar(entorno_padre: Map<String,Simbolo>, ptr_entorno: Array<number>, etiqueta_retorno? : String)
    {
        try
        {
            this.entorno_local = new Map<String,Simbolo>();
            tabla_simbolos.classEntornos.agregar(this.entorno_local);
                        
            var etiqueta_inicio  = "L" + tabla_simbolos.classEtiqueta;
            var etiqueta_ejecucion  = "L" + tabla_simbolos.classEtiqueta;
            var etiqueta_continue  = "L" + tabla_simbolos.classEtiqueta;
            var etiqueta_fin  = "L" + tabla_simbolos.classEtiqueta;

            var condicion_f :Simbolo;
            
            var inicio = this.sentencia_inicio.ejecutar(this.entorno_local,ptr_entorno);
            
            if(inicio.classRol == tipo_rol.error)
            {
                tabla_simbolos.classEntornos.desapilar();
                return inicio;
            }

            tabla_simbolos.classCodigo_3D = etiqueta_inicio + ":\n";

            if(this.sentencia_comparacion instanceof Expresion)
            {
                condicion_f = this.sentencia_comparacion.ejecutar();
            }
            else if(this.sentencia_comparacion instanceof Simbolo)
            {
                condicion_f = this.sentencia_comparacion;
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
                resultado.classValor = "Sentencia For No realizada correctamente: No existe una expresion relacional.";
                return resultado;
            }

            if(condicion_f.classTipo != tipo_dato_primitivo.booleano)
            {
                tabla_simbolos.classEntornos.desapilar();
                tabla_simbolos.limpiar_3d();

                console.log(condicion_f.classValor);
                console.log(condicion_f.classTipo);
                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia For No realizada correctamente: La expresion relacional no resulta un valor booleano.";
                return resultado;
            }
            
            tabla_simbolos.classCodigo_3D = "if(" + condicion_f.classValor + " ) goto " + etiqueta_ejecucion + ";\n";
            tabla_simbolos.classCodigo_3D = "goto " + etiqueta_fin + ";\n";
            tabla_simbolos.classCodigo_3D = etiqueta_ejecucion + " :\n";
            
            for(var i = 0; i < this.lista_sentencias.length; i++)
            {
                var sentencia;
                var resultado_sentencia;
                
                sentencia = this.lista_sentencias[i];                
                if(sentencia instanceof Sentencia_Break)
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_fin);
                }
                else if(sentencia instanceof Sentencia_Continue)
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_continue);
                }
                else if(sentencia instanceof Sentencia_Return) //pendiente ceremonia cambio de ambito
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno);
                }
                else if(sentencia instanceof Sentencia_If)
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno,etiqueta_fin,etiqueta_continue);
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
            
            tabla_simbolos.classCodigo_3D = etiqueta_continue + ":\n";
            var fin = this.sentencia_fin.ejecutar();

            if(fin.classRol == tipo_rol.error)
            {
                tabla_simbolos.classEntornos.desapilar();
                return fin;
            }

            tabla_simbolos.classCodigo_3D = "goto " + etiqueta_inicio + ";\n";
            tabla_simbolos.classCodigo_3D = etiqueta_fin + " :\n";

            tabla_simbolos.classEntornos.desapilar();

            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.aceptado;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Sentencia If  realizada correctamente";
            return resultado;
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

export default Sentencia_For;