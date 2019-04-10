import Instruccion from "./Instruccion";
import Valor from "./Expresiones/Valor";
import Multiplicacion from "./Expresiones/Expresiones_Aritmeticas/Multiplicacion";
import Diferente_Que from "./Expresiones/Expresiones_Relacionales/Diferente_Que";
import Igual_Que from "./Expresiones/Expresiones_Relacionales/Igual_Que";
import Menor_Que from "./Expresiones/Expresiones_Relacionales/Menor_Que";
import Mayor_Que from "./Expresiones/Expresiones_Relacionales/Mayor_Que";
import Sentencia_Declaracion from "./Sentencias/Sentencia_Declaracion";
import Division from "./Expresiones/Expresiones_Aritmeticas/Division";
import Sentencia_Asignacion from "./Sentencias/Sentencia_Asignacion";
import Modulo from "./Expresiones/Expresiones_Aritmeticas/Modulo";
import Sentencia_Imprimir from "./Sentencias/Sentencia_Imprimir";
import Resta from "./Expresiones/Expresiones_Aritmeticas/Resta";
import Suma from "./Expresiones/Expresiones_Aritmeticas/Suma";
import Mayor_Igual_Que from "./Expresiones/Expresiones_Relacionales/Mayor_Igual_Que";
import Menor_Igual_Que from "./Expresiones/Expresiones_Relacionales/Menor_Igual_Que";
import tabla_simbolos from "./Estructuras/Tabla_Simbolos";
import Sentencia_Salto_Destino from "./Sentencias/Sentencia_Salto_Destino";
import Simbolo from "./Estructuras/Simbolo";
import Sentencia_Salto_Incondicional from "./Sentencias/Sentencia_Saldo_Incondicional";
import { clear } from "console";
import Sentencia_If from "./Sentencias/Sentencia_If";
import Sentencia_If_False from "./Sentencias/Sentencia_If_False";
import Sentencia_Metodo from "./Sentencias/Sentencia_Metodo";
import Sentencia_LLamada_Metodo from "./Sentencias/Sentencia_LLamada_Metodo";

class AST_3D
{
    private superjason : JSON;
    private lista_instrucciones : Array<Instruccion>;
    
    constructor(psuperjason : JSON)
    {
        this.superjason = psuperjason;
        this.lista_instrucciones = [];
        tabla_simbolos.limpiar();
        clear();
        console.clear();
        this.build_ast();
    }

    build_ast()
    {   
        for(var i :number = 0; i < this.superjason['sentencias'].length; i++ )
        {            
            this.lista_instrucciones.push(this.fabrica_instrucciones(this.superjason['sentencias'][i]));    
        }
        
        this.exec_ast();
    }    

    fabrica_instrucciones(subsuperjason : JSON)
    {
        if(subsuperjason['etiqueta'] == "sentencia_declaracion")
        {
            if(subsuperjason['valor'] != undefined)
            {
                var expresion = this.fabrica_expresiones(subsuperjason['valor']);
                return new Sentencia_Declaracion(subsuperjason['id'],expresion);
            }
            else
            {
                return new Sentencia_Declaracion(subsuperjason['id']);
            }            
        }
        else if(subsuperjason['etiqueta'] == "sentencia_asignacion")
        {
            var expresion = this.fabrica_expresiones(subsuperjason['valor']);
            if(subsuperjason['tipo'] == 0 || subsuperjason['tipo'] == 1)
            {
                return new Sentencia_Asignacion(subsuperjason['id'],subsuperjason['tipo'],expresion);
            }
            else
            {
                var posicion = this.fabrica_expresiones(subsuperjason['posicion'])
                return new Sentencia_Asignacion(subsuperjason['id'],subsuperjason['tipo'],expresion,posicion);
            }
            
        }  
        else if(subsuperjason['etiqueta'] == "salto")
        {
            return new Sentencia_Salto_Destino(subsuperjason['expresion']);
        }
        else if(subsuperjason['etiqueta'] == "sentencia_salto")
        {
            return new Sentencia_Salto_Incondicional(this.lista_instrucciones,subsuperjason['expresion']);
        }
        else if(subsuperjason['etiqueta'] == "sentencia_if")
        {
            var expresion_relacional = this.fabrica_expresiones(subsuperjason['expresion'])
            return new Sentencia_If(expresion_relacional, subsuperjason['verdadero'],this.lista_instrucciones);
        }
        else if(subsuperjason['etiqueta'] == "sentencia_if_false")
        {
            var expresion_relacional = this.fabrica_expresiones(subsuperjason['expresion'])
            return new Sentencia_If_False(expresion_relacional, subsuperjason['falso'],this.lista_instrucciones);
        }
        else if(subsuperjason['etiqueta'] == "sentencia_metodo")
        {
            return new Sentencia_Metodo(subsuperjason['valor'], subsuperjason['valor2']);
        }
        else if(subsuperjason['etiqueta'] == "sentencia_llamada")
        {
            return new Sentencia_LLamada_Metodo(subsuperjason['valor'], this.lista_instrucciones);
        }
        else if(subsuperjason['etiqueta'] == "sentencia_imprimir")
        {            
            return new Sentencia_Imprimir(subsuperjason['tipo'],subsuperjason['valor']);
        }
        else
        {

        } 
        return new Instruccion(0,0);
    }

    fabrica_expresiones(subsubsuperjason: JSON)
    {        
        if(subsubsuperjason['etiqueta'] == "expresion_aritmetica")
        {
            if(subsubsuperjason['simbolo'] == '+')
            {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Suma(operador1,operador2);
            }
            else if(subsubsuperjason['simbolo'] == '-')
            {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Resta(operador1,operador2);
            }
            else if(subsubsuperjason['simbolo'] == '*')
            {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Multiplicacion(operador1,operador2);
            }
            else if(subsubsuperjason['simbolo'] == '/')
            {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Division(operador1,operador2);
            }
            else if(subsubsuperjason['simbolo'] == '%')
            {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Modulo(operador1,operador2);
            }
            else 
            {
                
            }
        }   
        else if(subsubsuperjason['etiqueta'] == "expresion_relacional")
        {
            if(subsubsuperjason['simbolo'] == '<')
            {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Menor_Que(operador1,operador2);
            }
            else if(subsubsuperjason['simbolo'] == '>')
            {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Mayor_Que(operador1,operador2);
            }
            else if(subsubsuperjason['simbolo'] == '<=')
            {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Mayor_Igual_Que(operador1,operador2);
            }
            else if(subsubsuperjason['simbolo'] == '>=')
            {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Menor_Igual_Que(operador1,operador2);
            }
            else if(subsubsuperjason['simbolo'] == '==')
            {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Igual_Que(operador1,operador2);
            }
            else if(subsubsuperjason['simbolo'] == '!=')
            {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Diferente_Que(operador1,operador2);
            }
            else 
            {
                
            }
        } 
        else if(subsubsuperjason['etiqueta'] == "valor_primitivo")
        {
            
            if(subsubsuperjason['tipo'] < 2 )
            {
                return new Valor(subsubsuperjason['valor'], subsubsuperjason['tipo']);
            }
            else
            {
                var posicion = this.fabrica_expresiones(subsubsuperjason['pos']);
                return new Valor(subsubsuperjason['valor'], subsubsuperjason['tipo'],posicion);
            }
        }
        else
        {

        }
    }

    exec_ast()
    {
        for(var i = 0; i < this.lista_instrucciones.length; i++)
        {            
            console.log("cuantos valores tiene el primer entorno " + tabla_simbolos.classTabla_Simbolos[0].size);
            var resultado : Simbolo;
            var sentencia : any;

            sentencia = this.lista_instrucciones[i];
            resultado = sentencia.ejecutar(tabla_simbolos.classTabla_Simbolos[0]);

            if(sentencia instanceof Sentencia_Salto_Incondicional)
            {
                if(resultado.classValor > 0)
                {                    
                    i = resultado.classValor - 1;
                }
                else
                {
                    break;
                }                
            }
            else if(sentencia instanceof Sentencia_If)
            {
                if(resultado.classValor > - 11)
                {
                    if(resultado.classValor > 0)
                    {
                        i = resultado.classValor - 1;
                    }                    
                }
                else
                {
                    break;
                }                
            }
            else if(sentencia instanceof Sentencia_If_False)
            {
                if(resultado.classValor > - 11)
                {
                    if(resultado.classValor > 0)
                    {
                        i = resultado.classValor - 1;
                    }                    
                }
                else
                {
                    break;
                }                
            }
            else if(sentencia instanceof Sentencia_LLamada_Metodo)
            {
                if(resultado.classValor > - 11)
                {
                    if(resultado.classValor > 0)
                    {
                        i = resultado.classValor - 1;
                    }                    
                }
                else
                {
                    break;
                } 
            }
            else if(resultado.classTam == -12)
            {
                break;
            }
        }
    }

}

export default AST_3D;