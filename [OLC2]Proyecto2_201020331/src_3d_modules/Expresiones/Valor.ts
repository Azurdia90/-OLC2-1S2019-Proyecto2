import Simbolo from "../Estructuras/Simbolo";
import Expresion from "./Expresion";
import tabla_simbolos from "../Estructuras/Tabla_Simbolos";

class Valor
{
    private valor : string;
    private tipo  : number;
    private pos   : any;

    /*
     * 0. valor entero
     * 1. temporal
     * 2. identificador
     * 3. stack
     * 4. heap
     */
    constructor(p_valor : string, p_tipo : number, p_pos? :Valor)
    {
        this.valor = p_valor;
        this.tipo = p_tipo;
        this.pos = p_pos;        
    }

    ejecutar(entorno_local: Map<String,Simbolo>)
    {
        var resultado : Simbolo;    
        if(this.tipo == 0)
        {
            console.log("Vamos a devolver un valor primitivo : "  + this.valor);
            resultado = new Simbolo(parseFloat(this.valor), 4);
            return resultado;
        }
        else if(this.tipo == 1)
        {
            console.log("Vamos a devolver valor de la etiqueta : "  + this.valor);
            if(tabla_simbolos.existe_simbolo(this.valor))
            {
                return  tabla_simbolos.obtener_simbolo(this.valor);
            }
            else
            {
                return new Simbolo(-33,-12);
            }            
        }
        else if(this.tipo == 2)
        {
            console.log("Vamos a devolver valor de la variable : "  + this.valor);
            if(tabla_simbolos.existe_simbolo(this.valor))
            {
                var resultado = tabla_simbolos.obtener_simbolo(this.valor);             
                return tabla_simbolos.obtener_simbolo(this.valor);
            }
            else
            {
                return new Simbolo(-33,-12);
            }   
        }
        else if(this.tipo == 3)
        {
            var resultado_pos : Simbolo = this.pos.ejecutar(entorno_local);

            if(tabla_simbolos.classStack.classTamaño > resultado_pos.classValor)
            {                
                console.log("vamos a devolver valor de la posicion del stack: " + resultado_pos.classValor);
                return tabla_simbolos.classStack.obtener(resultado_pos.classValor);
            }
            else
            {
                return new Simbolo(-33,12);
            }
        }
        else if(this.tipo == 4)
        {   
            var resultado_pos : Simbolo = this.pos.ejecutar(entorno_local);

            if(tabla_simbolos.classHeap.classTamaño > resultado_pos.classValor)
            {                
                console.log("vamos a devolver valor de la posicion del Heap: " + resultado_pos.classValor);
                return tabla_simbolos.classHeap.obtener(resultado_pos.classValor);
            }
            else
            {
                return new Simbolo(-33,12);
            }
        }
    }
}

export default Valor;