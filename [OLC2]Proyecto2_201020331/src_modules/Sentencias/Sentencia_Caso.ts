import Instruccion from "../Instruccion";
import Simbolo from "../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../Tabla_Simbolos/Tabla_Simbolos";
import Sentencia_Break from "./Sentencia_Break";
import Sentencia_Continue from "./Sentencia_Continue";
import Sentencia_Return from "./Sentencia_Return";
import Sentencia_Switch from "./Sentencia_Switch";
import Sentencia_If from "./Sentencia_If";
import Expresion from "../Expresiones/Expresion";


class Sentencia_Caso extends Instruccion
{

    private valor : any;
    private lista_sentencias : Array<Instruccion>;
    private entorno_local : any;

    constructor(p_valor : Expresion|Simbolo, p_lista_sentencias: Array<Instruccion>)
    {
        super(0,0);
        this.valor = p_valor;
        this.lista_sentencias = p_lista_sentencias;
    }

    ejecutar(entorno_padre: Map<String,Simbolo>, ptr_entorno: Array<number>, etiqueta_retorno? : String, etiqueta_inicio? : String, etiqueta_fin? : String)
    {
        try
        {
            this.entorno_local = new Map<String,Simbolo>();
            tabla_simbolos.classEntornos.agregar(this.entorno_local);

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
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_inicio);
                }
                else if(sentencia instanceof Sentencia_Return) //pendiente ceremonia cambio de ambito
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno);
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

            tabla_simbolos.classEntornos.desapilar();

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

    get classValor()
    {
        if(this.valor instanceof Expresion)
        {
            return this.valor.ejecutar();
        }
        else if(this.valor instanceof Simbolo)
        {
            return this.valor;
        }
        else
        {
            tabla_simbolos.limpiar_3d();

            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.error;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Sentencia Switch No realizada correctamente: No se puede definir el valor del caso.";
            return resultado;
        }
    }

    set classValor(p_valor : Simbolo)
    {
        this.valor = p_valor;
    }
}

export default Sentencia_Caso;