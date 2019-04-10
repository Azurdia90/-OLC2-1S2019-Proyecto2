import Instruccion from "../Instruccion";
import Expresion from "../Expresiones/Expresion";
import Simbolo from "../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../Tabla_Simbolos/Tabla_Simbolos";

class Sentencia_Imprimir extends Instruccion
{
    private  expresion : Expresion;

    constructor(p_expresion: Expresion)
    {
        super(0,0);
        this.expresion = p_expresion;        
    }

    ejecutar()
    {
        try
        {
            var resultado : Simbolo;
            var simbolo_exp = this.expresion.ejecutar();
            
            if(simbolo_exp.classTipo == tipo_dato_primitivo.booleano)
            {
                tabla_simbolos.classCodigo_3D = "call imprimir_booleano();\n";
            }
            else if(simbolo_exp.classTipo == tipo_dato_primitivo.entero)
            {
                tabla_simbolos.classCodigo_3D = "call imprimir_entero();\n";
            }
            else if(simbolo_exp.classTipo == tipo_dato_primitivo.decimal)
            {
                tabla_simbolos.classCodigo_3D = "call imprimir_decimal();\n";
            }
            else if(simbolo_exp.classTipo == tipo_dato_primitivo.caracter)
            {
                tabla_simbolos.classCodigo_3D = "call imprimir_caracter();\n";
            }
            else if(simbolo_exp.classTipo == tipo_dato_primitivo.cadena)
            {
                tabla_simbolos.classCodigo_3D = "call imprimir_cadena()\n";
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

            tabla_simbolos.classCodigo_3D = "";

            resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.aceptado;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Impresión realizada correctamente";
            return resultado;
        }
    }
}

export default Sentencia_Imprimir;