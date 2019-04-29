import Expresion from "../Expresion";
import Simbolo from "../../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../../Tabla_Simbolos/Tabla_Simbolos";


class Operador_Ternario extends Expresion
{
    private comparacion : any;
    private expresion1 : any;
    private expresion2 : any;

    constructor(p_expresion_comparacion : Expresion|Simbolo, p_expresion1 : Expresion|Simbolo, p_expresion2 : Expresion|Simbolo)
    {
        super(new Simbolo(),"?");
        this.comparacion = p_expresion_comparacion;
        this.expresion1 = p_expresion1;
        this.expresion2 = p_expresion2;
    }

    ejecutar(entorno_padre?: Map<String,Simbolo>, ptr_entorno?: Array<number>)
    {
        try
        {
            var valor_comparacion : Simbolo;
            var valor_expresion1 : Simbolo;
            var valor_expresion2 : Simbolo;

            if(this.comparacion instanceof Expresion)
            {
                valor_comparacion = this.comparacion.ejecutar(entorno_padre, ptr_entorno);
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
                resultado.classValor = "Sentencia Ternario No realizada correctamente: La comparación no pudo ser definida.";
                return resultado;   
            }

            var temporal_resultado = "t" + tabla_simbolos.classTemporal;
            var etiqueta_verdadera = "L" + tabla_simbolos.classEtiqueta;
            var etiqueta_falsa =  "L" + tabla_simbolos.classEtiqueta;
            var etiqueta_salida = "L" + tabla_simbolos.classEtiqueta; 

            tabla_simbolos.classCodigo_3D = "if(" + valor_comparacion.classValor + ") goto " + etiqueta_verdadera + ";\n";
            tabla_simbolos.classCodigo_3D = "goto " + etiqueta_falsa + ";\n";
            tabla_simbolos.classCodigo_3D = etiqueta_verdadera + ":\n";

            if(this.expresion1 instanceof Expresion)
            {
                valor_expresion1 = this.expresion1.ejecutar(entorno_padre, ptr_entorno);
            }
            else if(this.expresion1 instanceof Simbolo)
            {
                valor_expresion1 = this.expresion1;
            }
            else
            {
                tabla_simbolos.limpiar_3d();

                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Ternario No realizada correctamente: El valor 1 no pudo ser definido.";
                return resultado;           
            }
           
            tabla_simbolos.classCodigo_3D = temporal_resultado + " = " + valor_expresion1.classValor + ";\n";
            tabla_simbolos.classCodigo_3D = "goto " + etiqueta_salida + ";\n";
            tabla_simbolos.classCodigo_3D = etiqueta_falsa + ":\n";

            if(this.expresion2 instanceof Expresion)
            {
                valor_expresion2 = this.expresion2.ejecutar(entorno_padre, ptr_entorno);
            }
            else if(this.expresion2 instanceof Simbolo)
            {
                valor_expresion2 = this.expresion2;
            }
            else
            {
                tabla_simbolos.limpiar_3d();

                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Ternario No realizada correctamente: El valor2 no pudo ser definido.";
                return resultado;
            }
            
            tabla_simbolos.classCodigo_3D = temporal_resultado + " = " + valor_expresion2.classValor + ";\n";
            tabla_simbolos.classCodigo_3D = etiqueta_salida + ":\n";

            if(valor_expresion1.classTipo != valor_expresion2.classTipo)
            {
                console.log(valor_expresion1.classTipo);
                console.log(valor_expresion2.classTipo);
                tabla_simbolos.limpiar_3d();

                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Ternario No realizada correctamente: Los posibles valores a retornar no son del mismo tipo.";
                return resultado;

            }            

            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.aceptado;
            resultado.classTipo = valor_expresion1.classTipo;
            resultado.classIdentificador = "10-4";
            resultado.classValor = temporal_resultado;
            resultado.classTam = valor_expresion1.classTam;

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
            resultado.classValor = "Sentencia Ternario No realizada correctamente: " + Error.Message;
            return resultado;
        } 
    }

    evaluar(entorno_padre?: Map<String,Simbolo>, ptr_entorno?: Array<number>)
    {
        try
        {
            var valor_comparacion : Simbolo;
            var valor_expresion1 : Simbolo;
            var valor_expresion2 : Simbolo;

            if(this.comparacion instanceof Expresion)
            {
                valor_comparacion = this.comparacion.evaluar(entorno_padre, ptr_entorno);
            }
            else if(this.comparacion instanceof Simbolo)
            {
                valor_comparacion = this.comparacion;
            }
            else
            {
                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Ternario No realizada correctamente: La comparación no pudo ser definida.";
                return resultado;   
            }

            if(this.expresion1 instanceof Expresion)
            {
                valor_expresion1 = this.expresion1.evaluar(entorno_padre, ptr_entorno);
            }
            else if(this.expresion1 instanceof Simbolo)
            {
                valor_expresion1 = this.expresion1;
            }
            else
            {
                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Ternario No realizada correctamente: El valor 1 no pudo ser definido.";
                return resultado;           
            }
           
            if(this.expresion2 instanceof Expresion)
            {
                valor_expresion2 = this.expresion2.evaluar(entorno_padre, ptr_entorno);
            }
            else if(this.expresion2 instanceof Simbolo)
            {
                valor_expresion2 = this.expresion2;
            }
            else
            {
                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Ternario No realizada correctamente: El valor2 no pudo ser definido.";
                return resultado;
            }

            if(valor_expresion1.classTipo != valor_expresion2.classTipo)
            {

                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Ternario No realizada correctamente: Los posibles valores a retornar no son del mismo tipo.";
                return resultado;

            }            

            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.aceptado;
            resultado.classTipo = valor_expresion1.classTipo;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "10-4";

            return resultado;
        }
        catch(Error)
        {

            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.error;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Sentencia Ternario No realizada correctamente: " + Error.Message;
            return resultado;
        } 
    }

}

export default Operador_Ternario;