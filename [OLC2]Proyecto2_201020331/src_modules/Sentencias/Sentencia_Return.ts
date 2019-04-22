import Instruccion from "../Instruccion";
import Simbolo from "../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../Tabla_Simbolos/Tabla_Simbolos";
import Expresion from "../Expresiones/Expresion";

class Sentencia_Return extends Instruccion
{
    private etiqueta : String;
    private retorno : any;

    constructor(p_etiqueta : String, p_retorno?: Expresion | Simbolo)
    {
        super(0,0);
        this.etiqueta = p_etiqueta;
        this.retorno = p_retorno;
    }

    ejecutar(entorno_padre: Map<String,Simbolo>, ptr_entorno: Array<number>, etiqueta_fin? : String)
    {
        try
        {
            if(etiqueta_fin != undefined)
            {
                if(this.retorno == undefined)
                {
                    tabla_simbolos.classCodigo_3D = "goto " + etiqueta_fin + ";\n";
                }
                else
                {   
                    //escribir ceremonia de cambio de ambito al metodo anterior....
                    tabla_simbolos.classCodigo_3D = "goto " + etiqueta_fin + ";\n";
                }

                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.aceptado;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "10-4";
                resultado.classValor = "Sentencia Break realizada correctamente";
                return resultado;
            }
            else
            {
                tabla_simbolos.limpiar_3d();

                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Break NO realizada: No fue especificada la etiqueta de salida.";
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
            resultado.classValor = "Sentencia Break NO realizada: " + Error.Message;
            return resultado;
        }
    }

}

export default Sentencia_Return;