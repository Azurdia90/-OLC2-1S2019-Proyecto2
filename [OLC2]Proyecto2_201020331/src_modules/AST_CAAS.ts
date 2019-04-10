import Simbolo from "./Tabla_Simbolos/Simbolo";
import Suma from "./Expresiones/Expresiones_Aritmeticas/Suma";
import Sentencia_Imprimir from "./Sentencias/Sentencia_Imprimir";
import Instruccion from "./Instruccion";
import Resta from "./Expresiones/Expresiones_Aritmeticas/Resta";
import Multiplicacion from "./Expresiones/Expresiones_Aritmeticas/Multiplicacion";
import Division from "./Expresiones/Expresiones_Aritmeticas/Division";
import Modulo from "./Expresiones/Expresiones_Aritmeticas/Modulo";
import Menor_Que from "./Expresiones/Expresiones_Relacionales/Menor_Que";
import Mayor_Que from "./Expresiones/Expresiones_Relacionales/Mayor_Que";
import Menor_Igual_Que from "./Expresiones/Expresiones_Relacionales/Menor_Igual_Que";
import Mayor_Igual_Que from "./Expresiones/Expresiones_Relacionales/Mayor_Igual_Que";
import Igual_Que from "./Expresiones/Expresiones_Relacionales/Igual_Que";
import Diferente_Que from "./Expresiones/Expresiones_Relacionales/Diferente_Que";
import And from "./Expresiones/Expresiones_Logicas/And";
import Or from "./Expresiones/Expresiones_Logicas/Or";
import Not from "./Expresiones/Expresiones_Logicas/Not";
import tabla_simbolos from "./Tabla_Simbolos/Tabla_Simbolos";

class AST_CAAS
{
    private superjason : JSON;

    constructor(psuperjason : JSON)
    {
        tabla_simbolos.limpiar();
        this.superjason = psuperjason;        
        this.build_ast();
    }

    build_ast()
    {   
        var instruccion_begin : any = this.fabrica_instrucciones(this.superjason);
        this.exec_ast(instruccion_begin);
    }

    exec_ast(instruccions : Instruccion)
    {
        instruccions.ejecutar();
    }

    fabrica_instrucciones(subsuperrjason : JSON)
    {        
        if(subsuperrjason['etiqueta'] == "sentencia_imprimir")
        {
            var expresion: any = this.fabrica_instrucciones(subsuperrjason['valor']);
            var sentencia_imprimir = new Sentencia_Imprimir(expresion);
            return  sentencia_imprimir;
        }
        else if(subsuperrjason['etiqueta'] == "expresion")
        {
            console.log("expresion");
            this.fabrica_instrucciones(subsuperrjason['valor']);
        }
        else if(subsuperrjason['etiqueta'] == "expresion_aritmetica")
        {                    
            if(subsuperrjason['tipo'] == "+")
            {
                var operador1 : any = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 : any = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nueva_suma = new Suma(operador1,operador2);  
                return nueva_suma;              
            }
            else if(subsuperrjason['tipo'] == "-")
            {
                var operador1 : any = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 : any = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nueva_resta = new Resta(operador1,operador2);  
                return nueva_resta; 
            }
            else if(subsuperrjason['tipo'] == "*")
            {
                var operador1 : any = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 : any = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nueva_multiplicacion = new Multiplicacion(operador1,operador2);  
                return nueva_multiplicacion; 
            }
            else if(subsuperrjason['tipo'] == "/")
            {
                var operador1 : any = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 : any = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nueva_division = new Division(operador1,operador2);  
                return nueva_division; 
            } 
            else if(subsuperrjason['tipo'] == "%")
            {
                var operador1 : any = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 : any = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_modulo = new Modulo(operador1,operador2);  
                return nuevo_modulo; 
            }
        }
        else if(subsuperrjason['etiqueta'] == "expresion_relacional")
        {
            if(subsuperrjason['tipo'] == "<")
            {
                var operador1 : any = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 : any = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_menor_que = new Menor_Que(operador1,operador2);  
                return nuevo_menor_que;              
            }
            else if(subsuperrjason['tipo'] == ">")
            {
                var operador1 : any = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 : any = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_mayor_que = new Mayor_Que(operador1,operador2);  
                return nuevo_mayor_que; 
            }
            else if(subsuperrjason['tipo'] == "<=")
            {
                var operador1 : any = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 : any = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_menor_igual_que = new Menor_Igual_Que(operador1,operador2);  
                return nuevo_menor_igual_que; 
            }
            else if(subsuperrjason['tipo'] == ">=")
            {
                var operador1 : any = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 : any = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_mayor_igual_que = new Mayor_Igual_Que(operador1,operador2);  
                return nuevo_mayor_igual_que; 
            } 
            else if(subsuperrjason['tipo'] == "==")
            {
                var operador1 : any = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 : any = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_igual_que= new Igual_Que(operador1,operador2);  
                return nuevo_igual_que; 
            }
            else if(subsuperrjason['tipo'] == "!=")
            {
                var operador1 : any = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 : any = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_diferente_que = new Diferente_Que(operador1,operador2);  
                return nuevo_diferente_que; 
            }
        }
        else if(subsuperrjason['etiqueta'] == "expresion_logica")
        {
            if(subsuperrjason['tipo'] == "&&")
            {
                var operador1 : any = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 : any = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_and = new And(operador1,operador2);  
                return nuevo_and;              
            }
            else if(subsuperrjason['tipo'] == "||")
            {
                var operador1 : any = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var operador2 : any = this.fabrica_instrucciones(subsuperrjason['operador2']);
                var nuevo_or = new Or(operador1,operador2);  
                return nuevo_or; 
            }
            else if(subsuperrjason['tipo'] == "!")
            {
                var operador1 : any = this.fabrica_instrucciones(subsuperrjason['operador1']);
                var nuevo_not = new Not(operador1);  
                return nuevo_not; 
            }
        }
        else if(subsuperrjason['etiqueta'] == "expresion_unaria")
        {
            console.log("expresion_unaria");
            this.fabrica_instrucciones(subsuperrjason['operador1']);
            console.log(subsuperrjason['tipo']);
        }
        else if(subsuperrjason['etiqueta'] == "valor_primitivo")
        {
            var nuevo_simbolo = new Simbolo();
            nuevo_simbolo.classAcceso = tipo_acceso.publico;
            nuevo_simbolo.classRol = tipo_rol.valor;                    
            nuevo_simbolo.classTipo = this.get_tipo_primitivo(subsuperrjason['tipo']);
            nuevo_simbolo.classIdentificador = "10-4";
            nuevo_simbolo.classValor =  subsuperrjason['valor'];    
        
            return nuevo_simbolo;
        }
        else
        {
            console.log("etiqueta erronea: " + subsuperrjason['etiqueta']);
        }
    } 
    
    get_tipo_primitivo(p_tipo : String)
    {
        if(p_tipo == "booleano")
        {
            return tipo_dato_primitivo.booleano;
        }
        else if(p_tipo == "entero")
        {
            return tipo_dato_primitivo.entero;
        }
        else if(p_tipo == "decimal")
        {
            return tipo_dato_primitivo.decimal;
        }
        else if(p_tipo == "caracter")
        {
            return tipo_dato_primitivo.caracter;
        }
        else if(p_tipo == "cadena")
        {
            return tipo_dato_primitivo.cadena;
        }
        else if(p_tipo == "nulo")
        {
            return tipo_dato_primitivo.nulo;
        }
        else
        {
            return tipo_dato_primitivo.error;
        }
    }    
}

export default AST_CAAS;