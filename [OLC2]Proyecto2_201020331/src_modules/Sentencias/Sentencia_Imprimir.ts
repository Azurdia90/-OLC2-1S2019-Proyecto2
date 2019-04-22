import Instruccion from "../Instruccion";
import Expresion from "../Expresiones/Expresion";
import Simbolo from "../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../Tabla_Simbolos/Tabla_Simbolos";

class Sentencia_Imprimir extends Instruccion
{
    private  expresion : any;

    constructor(p_expresion: Expresion | Simbolo)
    {
        super(0,0);
        this.expresion = p_expresion;        
    }

    ejecutar(entorno_local: Map<String,Simbolo>, ptr_entorno?: Array<number>)
    {
        try
        {
            var resultado : Simbolo;

            var simbolo_exp : Simbolo
            
            if(this.expresion instanceof Expresion)
            {
                simbolo_exp = this.expresion.ejecutar();
                
                if(simbolo_exp.classRol == tipo_rol.error)
                {
                    tabla_simbolos.limpiar_3d();
                    return simbolo_exp;
                }
            }
            else if(this.expresion instanceof Simbolo)
            {
                simbolo_exp = this.expresion;

                if(simbolo_exp.classRol == tipo_rol.error)
                {
                    tabla_simbolos.limpiar_3d();
                    return simbolo_exp;
                }
            }
            else
            {
                tabla_simbolos.limpiar_3d();

                resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = this.fila + "-" + this.columna;
                resultado.classValor = "Impresión No realizada: No existe un valor a imprimir";
                return resultado;
            }

            
            if(simbolo_exp.classTipo == tipo_dato_primitivo.booleano)
            {
                tabla_simbolos.classCodigo_3D = "t0 = " + simbolo_exp.classValor + ";\ncall imprimir_booleano;\n";
            }
            else if(simbolo_exp.classTipo == tipo_dato_primitivo.entero)
            {
                tabla_simbolos.classCodigo_3D = "t1 = " + simbolo_exp.classValor + ";\ncall imprimir_entero;\n";
            }
            else if(simbolo_exp.classTipo == tipo_dato_primitivo.decimal)
            {
                tabla_simbolos.classCodigo_3D = "t2 =" + simbolo_exp.classValor + ";\ncall imprimir_decimal;\n";
            }
            else if(simbolo_exp.classTipo == tipo_dato_primitivo.caracter)
            {
                tabla_simbolos.classCodigo_3D = "t3 = " + simbolo_exp.classValor + ";\ncall imprimir_caracter;\n";
            }
            else if(simbolo_exp.classTipo == tipo_dato_primitivo.cadena)
            {
                tabla_simbolos.classCodigo_3D = "t4 = " + simbolo_exp.classValor + ";\ncall imprimir_cadena;\n";
            }
            else
            {
                console.log("algo esta mal aca: " + simbolo_exp.classTipo);
                resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = this.fila + "-" + this.columna;
                resultado.classValor = "Impresión No realizada: El tipo de valor no fue reconocido";
                return resultado;
            }

            resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.aceptado;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Impresión realizada correctamente";
            return resultado;
        }
        catch(Error)
        {
            tabla_simbolos.limpiar_3d();

            resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.error;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Impresión No realizada correctamente: " + Error.Message;
            return resultado;
        }
    }
}

export default Sentencia_Imprimir;