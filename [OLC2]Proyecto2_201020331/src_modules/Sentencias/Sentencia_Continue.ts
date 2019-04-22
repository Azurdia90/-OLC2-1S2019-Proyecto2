import Instruccion from "../Instruccion";
import Simbolo from "../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../Tabla_Simbolos/Tabla_Simbolos";

class Sentencia_Continue extends Instruccion
{
    private etiqueta : String;

    constructor(p_etiqueta : String)
    {
        super(0,0);
        this.etiqueta = p_etiqueta;
    }

    ejecutar(entorno_padre: Map<String,Simbolo>, ptr_entorno: Array<number>, etiqueta_inicio? : String)
    {
        try
        {
            if(etiqueta_inicio != undefined)
            {
                tabla_simbolos.classCodigo_3D = "goto " + etiqueta_inicio + ";\n";
                
                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.aceptado;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "10-4";
                resultado.classValor = "Sentencia Continue realizada correctamente";
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
                resultado.classValor = "Sentencia Continue NO realizada: No fue especificada la etiqueta de salida.";
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
            resultado.classValor = "Sentencia Continue NO realizada: " + Error.Message;
            return resultado;
        }
    }
}

export default Sentencia_Continue;