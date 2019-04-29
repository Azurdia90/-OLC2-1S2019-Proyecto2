import Simbolo from "../Tabla_Simbolos/Simbolo";
import Instruccion from "../Instruccion";

class Expresion extends Instruccion
{
    protected operador1 : any;
    protected tipo_operacion: String;
    protected operador2 : any;

    constructor(p_operador1: (Expresion | Simbolo), p_tipo: String, p_operador2?: (Expresion | Simbolo) )
    {        
        super(0,0);
        this.operador1 = p_operador1;
        this.tipo_operacion = p_tipo;
        this.operador2 = p_operador2; 
    }

    ejecutar(entorno_padre?: Map<String,Simbolo>, ptr_entorno?: Array<number>)
    {
        try
        {   
            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.aceptado;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Impresión realizada correctamente";
            return resultado;

        }            
        catch(Error)
        {
            var resultado = new Simbolo();
            resultado.classRol = tipo_rol.error;
            resultado.classTipo = tipo_dato_primitivo.error;
            resultado.classIdentificador = this.fila + "-" + this.columna;
            resultado.classValor =  "Error: " + Error.message;        
            return resultado;
        }
    }

    evaluar(entorno_padre?: Map<String,Simbolo>, ptr_entorno?: Array<number>)
    {
        try
        {   
            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.aceptado;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Impresión realizada correctamente";
            return resultado;

        }            
        catch(Error)
        {
            var resultado = new Simbolo();
            resultado.classRol = tipo_rol.error;
            resultado.classTipo = tipo_dato_primitivo.error;
            resultado.classIdentificador = this.fila + "-" + this.columna;
            resultado.classValor =  "Error: " + Error.message;        
            return resultado;
        }
    }
}

export default Expresion;