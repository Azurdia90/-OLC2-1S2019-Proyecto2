import Instruccion from "../Instruccion";
import tabla_simbolos from "../Tabla_Simbolos/Tabla_Simbolos";
import Simbolo from "../Tabla_Simbolos/Simbolo";
import Metodo from "../Tabla_Simbolos/Metodo";
import Expresion from "../Expresiones/Expresion";

class Sentencia_LLamada extends Expresion
{
    private identificador : String;
    private lista_parametros : Array<any>;
    private lista_metodos : any;

    constructor(p_identificador : String, p_lista_parametros : Array<any>, p_lista_metodos? : Array<Instruccion>)
    {
        super(new Simbolo(),"call");
        this.identificador = p_identificador;
        this.lista_parametros = p_lista_parametros;
        this.lista_metodos = p_lista_metodos;
    }

    ejecutar(entorno_padre: Map<String,Simbolo>, ptr_entorno: Array<number>)
    {
        try
        {
            var pas : boolean = false;
            var metodo_encontrado : any;

            for(var i = 0; i < tabla_simbolos.classLista_parametros.length; i++)
            {
                pas = this.verificar_metodo(entorno_padre,ptr_entorno,tabla_simbolos.classLista_parametros[i]);
                if(pas)
                {
                    metodo_encontrado = tabla_simbolos.classLista_parametros[i];
                    break;
                }
            }                

            if(pas == true && metodo_encontrado != undefined)
            {
                var tam_metodo = ptr_entorno[0];
                var temporal_simulado    = "t" + tabla_simbolos.classTemporal;
                var temporal_contador    = "t" + tabla_simbolos.classTemporal;
                var temporal_pos_return  = "t" + tabla_simbolos.classTemporal;
                var temporal_retorno     = "t" + tabla_simbolos.classTemporal;
                
                tabla_simbolos.classCodigo_3D = "\n";
                tabla_simbolos.classCodigo_3D = temporal_simulado + " = P + " + tam_metodo  + ";\n";

                
                for(var i = 0; i < this.lista_parametros.length; i++)
                {
                    var par = this.lista_parametros[i];
                    var resul;
                    if(par instanceof Expresion)
                    {                           
                        resul = par.ejecutar();                        
                    }
                    else if(par instanceof Simbolo)
                    {
                        resul = par;
                    }
                    else
                    {
                        tabla_simbolos.limpiar_3d();

                        var resultado  = new Simbolo();
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.error;
                        resultado.classTipo = tipo_dato_primitivo.cadena;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "Sentencia Llamada NO realizada: los parametros no pudieron ser definidos";
                        return resultado;
                    }

                    tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " + " +  (i + 2) + ";\n";
                    tabla_simbolos.classCodigo_3D = "Stack[" + temporal_contador + "] = " + resul.classValor + ";\n"; 
                }                

                tabla_simbolos.classCodigo_3D = "P = P + " + tam_metodo + ";\n";
                tabla_simbolos.classCodigo_3D = "call " + this.identificador +  ";\n";
                tabla_simbolos.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                tabla_simbolos.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                tabla_simbolos.classCodigo_3D = "P = P - " + tam_metodo + ";\n";                

                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.valor;
                resultado.classTipo = metodo_encontrado.classTipo;
                resultado.classIdentificador = metodo_encontrado.classIdentificador;
                resultado.classValor = temporal_retorno;
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
                resultado.classValor = "Sentencia Llamada NO realizada: Metodo no encontrado";
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
            resultado.classValor = "Sentencia Llamada NO realizada: " + Error.Message;
            return resultado;
        }
    }

    verificar_metodo(entorno_padre: Map<String,Simbolo>, ptr_entorno: Array<number>, metodo_analizar : Metodo)    
    {        
        if(this.identificador != metodo_analizar.classIdentificador)
        {
            return false;
        }

        if(this.lista_parametros.length != metodo_analizar.classLista_parametros.length)
        {
            return false;
        }

        for(var i = 0; i < this.lista_parametros.length; i++)
        {
            if(this.lista_parametros[i] instanceof Simbolo)
            {
                if(this.lista_parametros[i].classTipo != metodo_analizar.classLista_parametros[i].classTipo)
                {
                    return false;
                }
            }
            else if(this.lista_parametros[i] instanceof Expresion)
            {
                var expresion = this.lista_parametros[i].evaluar(entorno_padre, ptr_entorno);
                console.log(expresion.Tipo)
                console.log(metodo_analizar.classLista_parametros[i].classTipo)
                if(expresion.classTipo != metodo_analizar.classLista_parametros[i].classTipo)
                {
                    if(!((expresion.classTipo == tipo_dato_primitivo.entero || expresion.classTipo == tipo_dato_primitivo.decimal) && (metodo_analizar.classLista_parametros[i].classTipo == tipo_dato_primitivo.entero || metodo_analizar.classLista_parametros[i].classTipo == tipo_dato_primitivo.decimal)))
                    {
                        return false;
                    }                    
                }
            }            
        }
        return true;
    }

}

export default Sentencia_LLamada;