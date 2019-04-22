import Instruccion from "../Instruccion";
import Simbolo from "../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../Tabla_Simbolos/Tabla_Simbolos";
import Sentencia_Caso from "./Sentencia_Caso";
import Expresion from "../Expresiones/Expresion";
import Sentencia_Break from "./Sentencia_Break";
import Sentencia_Continue from "./Sentencia_Continue";
import Sentencia_Return from "./Sentencia_Return";
import Sentencia_If from "./Sentencia_If";

class Sentencia_Switch extends Instruccion
{
    private comparacion : any;
    private lista_casos : Array<Sentencia_Caso>;
    private lista_defecto : Array<Instruccion>;

    private entorno_local : any;

    constructor(p_comparacion : Expresion|Simbolo, p_lista_casos : Array<Sentencia_Caso>, p_lista_defecto : Array<Instruccion>)
    {
        super(0,0);
        this.comparacion = p_comparacion;
        this.lista_casos = p_lista_casos;
        this.lista_defecto = p_lista_defecto;
    }

    ejecutar(entorno_padre: Map<String,Simbolo>, ptr_entorno: Array<number>, etiqueta_retorno? : String, etiqueta_inicio? : String, etiqueta_fin? : String, p_etiqueta_falsa? : String)
    {
        try
        {
            tabla_simbolos.classCodigo_3D = "\n";
            
            var valor_comparacion : Simbolo;
            if(this.comparacion instanceof Expresion)
            {
                valor_comparacion = this.comparacion.ejecutar();
            }
            else if(this.comparacion instanceof Simbolo)
            {
                valor_comparacion = this.comparacion;
            }
            else
            {
                tabla_simbolos.limpiar_3d();

                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Switch No realizada correctamente: El valor de comparación no pudo ser definido";
                return resultado;
            }

            var etiqueta_default = "L" + tabla_simbolos.classEtiqueta;
            var etiqueta_verdadera ;            
            
            for(var i = 0; i < this.lista_casos.length; i++)
            {
                var valor2 = this.lista_casos[i].classValor;

                etiqueta_verdadera = "L" + tabla_simbolos.classEtiqueta;
                tabla_simbolos.classCodigo_3D = "if(" + valor_comparacion.classValor + " != " + valor2.classValor + ") goto " + etiqueta_verdadera + ";\n";
                this.lista_casos[i].ejecutar(entorno_padre,ptr_entorno,etiqueta_retorno,etiqueta_inicio,etiqueta_default);                
                tabla_simbolos.classCodigo_3D = etiqueta_verdadera + ": \n"; 
            }
            
            this.entorno_local = new Map<String,Simbolo>();
            tabla_simbolos.classEntornos.agregar(this.entorno_local);

            for(var i = 0; i < this.lista_defecto.length; i++)
            {
                var sentencia;
                var resultado_sentencia;
            
                sentencia = this.lista_defecto[i];
                
                if(sentencia instanceof Sentencia_Break)
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_default);
                }
                else if(sentencia instanceof Sentencia_Continue)
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_inicio);
                }
                else if(sentencia instanceof Sentencia_Return) //pendiente ceremonia cambio de ambito
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno);
                }
                else if(sentencia instanceof Sentencia_Caso)
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno,etiqueta_inicio,etiqueta_default);
                }
                else if(sentencia instanceof Sentencia_If)
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno,etiqueta_inicio,etiqueta_default);
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

            tabla_simbolos.classEntornos.agregar(this.entorno_local);
            tabla_simbolos.classCodigo_3D = etiqueta_default + ": \n";

            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.aceptado;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Sentencia Switch realizada correctamente";
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
            resultado.classValor = "Sentencia Switch No realizada correctamente: " + Error.Message;
            return resultado;
        }        
    }
}

export default Sentencia_Switch;