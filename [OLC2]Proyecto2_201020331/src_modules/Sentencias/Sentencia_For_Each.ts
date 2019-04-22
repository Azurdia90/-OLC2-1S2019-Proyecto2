import Instruccion from "../Instruccion";
import Simbolo from "../Tabla_Simbolos/Simbolo";
import Expresion from "../Expresiones/Expresion";
import tabla_simbolos from "../Tabla_Simbolos/Tabla_Simbolos";
import Sentencia_Declaracion_Instancia from "./Sentencia_Declaracion";
import Sentencia_Break from "./Sentencia_Break";
import Sentencia_Continue from "./Sentencia_Continue";
import Sentencia_Return from "./Sentencia_Return";
import Sentencia_If from "./Sentencia_If";
import Sentencia_Switch from "./Sentencia_Switch";

class Sentencia_For_Each extends Instruccion
{
    private declaracion : Sentencia_Declaracion_Instancia;
    private arreglo : Expresion;
    private lista_sentencias : Array<Instruccion>;
    private entorno_local : any

    constructor(p_declaracion : Sentencia_Declaracion_Instancia, p_arreglo : Expresion, p_lista_sentencias : Array<Instruccion>)
    {
        super(0,0);
        this.declaracion = p_declaracion;
        this.arreglo = p_arreglo;
        this.lista_sentencias = p_lista_sentencias;
    }

    ejecutar(entorno_local: Map<String,Simbolo>, ptr_entorno: Array<number>, etiqueta_retorno? : String)
    {
        try
        {
            this.entorno_local = new Map<String,Simbolo>();
            tabla_simbolos.classEntornos.agregar(this.entorno_local);

            var valor_declaracion : Simbolo;
            var valor_arreglo : Simbolo;

            var temporal_inicio = "t" + tabla_simbolos.classTemporal;
            var temporal_contador = "t" + tabla_simbolos.classTemporal;
            var temporal_tamaño = "t" + tabla_simbolos.classTemporal;
            var temporal_final = "t" + tabla_simbolos.classTemporal;

            var temporal_pos_var = "t" + tabla_simbolos.classTemporal;

            var etiqueta_inicio =  "L" + tabla_simbolos.classEtiqueta;
            var etiqueta_verdadero = "L" + tabla_simbolos.classEtiqueta;
            var etiqueta_continuar = "L" + tabla_simbolos.classEtiqueta;
            var etiqueta_falso = "L" + tabla_simbolos.classEtiqueta;

            valor_declaracion = this.declaracion.ejecutar(this.entorno_local, ptr_entorno);
            
            if(valor_declaracion.classRol == tipo_rol.error)
            {
                tabla_simbolos.limpiar_3d();
                return valor_declaracion;
            }

            valor_arreglo = this.arreglo.ejecutar();

            if(valor_arreglo.classRol != tipo_rol.arreglo)
            {
                tabla_simbolos.limpiar_3d();

                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia For Each No realizada correctamente: Se deben utilizar Arreglos o ArrayList para esta Sentencia.";
                return resultado;
            }

            tabla_simbolos.classCodigo_3D = temporal_inicio + " = " + valor_arreglo.classValor + ";\n";
            tabla_simbolos.classCodigo_3D = temporal_tamaño + " = 1;\n";
            tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_inicio + ";\n";
            tabla_simbolos.classCodigo_3D = temporal_inicio + " = " + temporal_inicio + " + " + valor_arreglo.classTam + ";\n";

            for(var t = 0; t < valor_arreglo.classTam; t++)
            {
                tabla_simbolos.classCodigo_3D = temporal_tamaño + " = " + temporal_tamaño + " * " +  "Heap[" + temporal_contador + "];\n";
                tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_contador + " + 1;\n";
                
            }

            tabla_simbolos.classCodigo_3D = temporal_final + " = " + temporal_inicio  + " + " + temporal_tamaño + ";\n";
            tabla_simbolos.classCodigo_3D = etiqueta_inicio + ":\n";
            tabla_simbolos.classCodigo_3D = "if(" + temporal_inicio + " < " + temporal_final + ") goto " + etiqueta_verdadero + ";\n";
            tabla_simbolos.classCodigo_3D = "goto " + etiqueta_falso + ";\n";
            tabla_simbolos.classCodigo_3D = etiqueta_verdadero + ":\n";
            tabla_simbolos.classCodigo_3D = temporal_pos_var + " = P + " + valor_declaracion.classPos + ";\n";
            tabla_simbolos.classCodigo_3D = "Stack[" + temporal_pos_var + "] = Heap[" + temporal_inicio + "];\n";

            for(var i = 0; i < this.lista_sentencias.length; i++)
            {
                var sentencia;
                var resultado_sentencia;
                
                sentencia = this.lista_sentencias[i];                
                if(sentencia instanceof Sentencia_Break)
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_falso);
                }
                else if(sentencia instanceof Sentencia_Continue)
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_continuar);
                }
                else if(sentencia instanceof Sentencia_Return) //pendiente ceremonia cambio de ambito
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno);
                }
                else if(sentencia instanceof Sentencia_If)
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,ptr_entorno,etiqueta_retorno,etiqueta_falso,etiqueta_continuar);
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
            
            tabla_simbolos.classCodigo_3D = etiqueta_continuar + ":\n";
            tabla_simbolos.classCodigo_3D = temporal_inicio + " = " + temporal_inicio + " + 1;\n";
            tabla_simbolos.classCodigo_3D = "goto " + etiqueta_inicio + ";\n";
            tabla_simbolos.classCodigo_3D = etiqueta_falso + ":\n";

            tabla_simbolos.classEntornos.desapilar();

            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.aceptado;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Sentencia For Each realizada correctamente";
            return resultado;
        }
        catch(Error)
        {
            tabla_simbolos.limpiar_3d();

            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.error;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Sentencia For Each No realizada correctamente: " + Error.Message;
            return resultado;
        }
    }
}

export default Sentencia_For_Each;