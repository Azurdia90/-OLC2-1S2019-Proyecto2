import Instruccion from "../Instruccion";
import Simbolo from "../Estructuras/Simbolo";
import Sentencia_Declaracion from "./Sentencia_Declaracion";
import Sentencia_Asignacion from "./Sentencia_Asignacion";
import Sentencia_Salto_Destino from "./Sentencia_Salto_Destino";
import Sentencia_Salto_Incondicional from "./Sentencia_Saldo_Incondicional";
import Sentencia_If from "./Sentencia_If";
import Sentencia_If_False from "./Sentencia_If_False";
import Sentencia_Imprimir from "./Sentencia_Imprimir";
import Suma from "../Expresiones/Expresiones_Aritmeticas/Suma";
import Resta from "../Expresiones/Expresiones_Aritmeticas/Resta";
import Multiplicacion from "../Expresiones/Expresiones_Aritmeticas/Multiplicacion";
import Division from "../Expresiones/Expresiones_Aritmeticas/Division";
import Modulo from "../Expresiones/Expresiones_Aritmeticas/Modulo";
import Menor_Que from "../Expresiones/Expresiones_Relacionales/Menor_Que";
import Mayor_Que from "../Expresiones/Expresiones_Relacionales/Mayor_Que";
import Mayor_Igual_Que from "../Expresiones/Expresiones_Relacionales/Mayor_Igual_Que";
import Menor_Igual_Que from "../Expresiones/Expresiones_Relacionales/Menor_Igual_Que";
import Igual_Que from "../Expresiones/Expresiones_Relacionales/Igual_Que";
import Diferente_Que from "../Expresiones/Expresiones_Relacionales/Diferente_Que";
import Valor from "../Expresiones/Valor";
import tabla_simbolos from "../Estructuras/Tabla_Simbolos";
import Sentencia_LLamada_Metodo from "./Sentencia_LLamada_Metodo";

class Sentencia_Metodo extends Instruccion
{
    private identificador : String;
    private subsuperjason : JSON;
    private lista_instrucciones : Array<Instruccion>;
    private entorno_local : any; //lo creamos hasta que vayamos a ejecutar

    constructor(p_id : String, p_subsuperjason : JSON)
    {
        super(0,0);
        this.identificador = p_id;
        this.subsuperjason = p_subsuperjason;
        this.lista_instrucciones = new Array<Instruccion>();
        for(var i :number = 0; i < this.subsuperjason['sentencias'].length; i++ )
        {            
            this.lista_instrucciones.push(this.fabrica_instrucciones(this.subsuperjason['sentencias'][i]));    
        }
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
        else if(subsuperjason['etiqueta'] == "sentencia_llamada")
        {
            return new Sentencia_LLamada_Metodo(subsuperjason['valor'], this.lista_instrucciones);
        }
        else if(subsuperjason['etiqueta'] == "sentencia_imprimir")
        {            
            return new Sentencia_Imprimir(subsuperjason['tipo_impresion'],subsuperjason['valor']);
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
                return new Valor(subsubsuperjason['valor'], subsubsuperjason['tipo'],subsubsuperjason['pos']);
            }
        }
        else
        {

        }
    }    

    ejecutar(entorno_padre?: Map<String,Simbolo>)
    {
        try
        {
            this.entorno_local = new Map<String,Simbolo>();
            tabla_simbolos.crear_entorno(<Map<String,Simbolo>> this.entorno_local);

            for(var i = 0; i < this.lista_instrucciones.length; i++)
            {            
                var resultado : Simbolo;
                var sentencia : any;

                sentencia = this.lista_instrucciones[i];
                resultado = sentencia.ejecutar(this.entorno_local);

                if(sentencia instanceof Sentencia_Salto_Incondicional)
                {
                    if(resultado.classValor > 0)
                    {                        
                        i = resultado.classValor;
                    }
                    else
                    {
                        tabla_simbolos.eliminar_entorno();
                        break;
                    }                
                }
                else if(sentencia instanceof Sentencia_If)
                {
                    if(resultado.classValor > - 11)
                    {
                        if(resultado.classValor > 0)
                        {
                            i = resultado.classValor;
                        }                    
                    }
                    else
                    {
                        tabla_simbolos.eliminar_entorno();
                        break;
                    }                
                }
                else if(sentencia instanceof Sentencia_If_False)
                {
                    if(resultado.classValor > - 11)
                    {
                        if(resultado.classValor > 0)
                        {
                            i = resultado.classValor;
                        }                    
                    }
                    else
                    {
                        tabla_simbolos.eliminar_entorno();
                        break;
                    }                
                }
                else if(sentencia instanceof Sentencia_LLamada_Metodo)
                {
                    if(resultado.classValor > - 11)
                    {
                        if(resultado.classValor > 0)
                        {
                            i = resultado.classValor;
                        }                    
                    }
                    else
                    {
                        break;
                    } 
                }
                else if(resultado.classTam == -12)
                {
                    tabla_simbolos.eliminar_entorno();
                    break;
                }
            }

            tabla_simbolos.eliminar_entorno();
            return new Simbolo(-10,-4);
        }
        catch(Error)
        {
            tabla_simbolos.eliminar_entorno();
            return new Simbolo(-33,-12);
        }
    }

    get classId()
    {
        return this.identificador;
    }

    set classId(p_id : String)
    {
        this.identificador = p_id;
    }
}

export default Sentencia_Metodo;