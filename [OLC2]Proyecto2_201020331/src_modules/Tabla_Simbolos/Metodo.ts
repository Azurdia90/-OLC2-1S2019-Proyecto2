import Instruccion from "../Instruccion";
import Simbolo from "./Simbolo";
import tabla_simbolos from "./Tabla_Simbolos";
import Sentencia_Break from "../Sentencias/Sentencia_Break";
import Sentencia_Continue from "../Sentencias/Sentencia_Continue";
import Sentencia_Return from "../Sentencias/Sentencia_Return";

class Metodo extends Instruccion
{
    private lista_modficadores : Array<tipo_acceso>;
    private tipo_metodo:  tipo_dato_primitivo;
    private identificador: String;
    private lista_parametros: Array<Simbolo>;
    private lista_sentencias: Array<Instruccion>;

    private entorno_local : any;
    private ptr_entorno: Array<number>;


    constructor(p_lista_modificador: Array<tipo_acceso>, p_tipo_metodo: tipo_dato_primitivo, p_identificador: String, p_lista_parametros: Array<Simbolo>, p_lista_instrucciones : Array<Instruccion>)    
    {
        super(0,0);
        this.lista_modficadores = p_lista_modificador;
        this.tipo_metodo = p_tipo_metodo;
        this.identificador = p_identificador;
        this.lista_parametros = p_lista_parametros;
        this.lista_sentencias = p_lista_instrucciones;
        
        this.ptr_entorno = new Array<number>();
        this.ptr_entorno[0] = 2;
        //0 es pa this
        //1 es pa return
    }

    ejecutar(entorno_padre: Map<String,Simbolo>, ptr_entorno?: Array<number>)
    {
        try
        {
            this.entorno_local = new Map<String,Simbolo>();
            tabla_simbolos.classEntornos.agregar(this.entorno_local);

            for(var a = 0; a < this.lista_parametros.length; a ++)
            {
                var parametros = this.lista_parametros[a];                
                parametros.classPos = this.ptr_entorno[0];                
                this.entorno_local.set(parametros.classIdentificador,parametros);
                this.ptr_entorno[0]++;
            }

            var bk_3d = tabla_simbolos.classCodigo_3D;
            var etiqueta_retorno = "L" + tabla_simbolos.classTemporal;

            tabla_simbolos.limpiar_3d();
            tabla_simbolos.limpiar_temporal();

            for(var i = 0; i < this.lista_sentencias.length; i++)
            {
                var sentencia;
                var resultado_sentencia;
                
                sentencia = this.lista_sentencias[i];                
                if(sentencia instanceof Sentencia_Break)
                {
                    var resultado  = new Simbolo();
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.cadena;
                    resultado.classIdentificador = "33-12";
                    resultado.classValor = "Metodo No realizado correctamente: No se permite una sentencia break en un metodo.";
                    return resultado;
                }
                else if(sentencia instanceof Sentencia_Continue)
                {
                    var resultado  = new Simbolo();
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.error;
                    resultado.classTipo = tipo_dato_primitivo.cadena;
                    resultado.classIdentificador = "33-12";
                    resultado.classValor = "Metodo No realizado correctamente: No se permite una sentencia continue en un metodo.";
                    return resultado;
                }
                else if(sentencia instanceof Sentencia_Return) //pendiente ceremonia cambio de ambito
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,this.ptr_entorno,etiqueta_retorno);
                }
                else
                {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local,this.ptr_entorno,etiqueta_retorno);
                }           

                if(resultado_sentencia.classRol == tipo_rol.error)
                {
                    tabla_simbolos.classEntornos.desapilar();
                    return resultado_sentencia;
                }
            }

            tabla_simbolos.classCodigo_3D = "\n";
            tabla_simbolos.classCodigo_3D = etiqueta_retorno + ":\n";
            tabla_simbolos.classCodigo_3D = "end\n";

            tabla_simbolos.classEntornos.desapilar();

            var bk_metodo = tabla_simbolos.classCodigo_3D;

            var cd_metodo = "\n";
            cd_metodo = cd_metodo + "proc " + this.identificador + "\n";
            cd_metodo = cd_metodo + "begin\n";
            cd_metodo = cd_metodo + "\n"   
            cd_metodo = cd_metodo + this.build_declaracion_etiquetas();
            cd_metodo = cd_metodo + bk_metodo;

            tabla_simbolos.limpiar_3d();

            tabla_simbolos.classCodigo_3D = bk_3d + cd_metodo;

            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.aceptado;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Metodo realizado correctamente";
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
            resultado.classValor = "Metodo No realizado correctamente: " + Error.Message;
            return resultado;
        }
    }

    build_declaracion_etiquetas()
    {
        var dec_etiquetas : string = "var ";
        var begin_etiquetas : number = 100;
        var end_etiquetas : number = tabla_simbolos.classTemporal;

        dec_etiquetas = dec_etiquetas + "t" + begin_etiquetas;

        for(var i = (begin_etiquetas + 1); i < end_etiquetas; i++)
        {
            dec_etiquetas = dec_etiquetas + ",t" + i;
        }
        
        var dec_etiquetas_final =  dec_etiquetas + ";\n";
        
        return dec_etiquetas_final;
    }

    get classTipo()
    {
        return this.tipo_metodo;
    }

    set classTipo(p_tipo : tipo_dato_primitivo)
    {
        this.tipo_metodo = p_tipo;
    }

    get classIdentificador()
    {
        return this.identificador;
    }

    set classIdentificador(p_identificador : String)
    {
        this.identificador = p_identificador;
    }

    get classLista_parametros()
    {
        return this.lista_parametros;
    }

    set classLista_parametros(p_lista_parametros : Array<Simbolo>)
    {
        this.lista_parametros = p_lista_parametros;
    }
}

export default Metodo;