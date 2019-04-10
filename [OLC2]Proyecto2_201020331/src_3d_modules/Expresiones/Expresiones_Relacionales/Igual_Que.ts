import Expresion from "../Expresion";
import Simbolo from "../../Estructuras/Simbolo";
import Valor from "../Valor";

class Igual_Que extends Expresion
{
    constructor(p_operador1:  Valor, p_operador2: Valor)
    {        
        super(p_operador1,"==",p_operador2); 
    }

    ejecutar(entorno_local: Map<String,Simbolo>)
    {
        var resultado : Simbolo;
        try
        {   
            var valor1 = this.operador1.ejecutar(entorno_local);
            var valor2 = this.operador2.ejecutar(entorno_local);

            if(valor1 == undefined)
            {
                return new Simbolo(-33,-12);            
            }

            if(valor2 == undefined)
            {
                return new Simbolo(-33,-12);
            }

            var res_igual_que  : boolean; 
            var new_tam        : number; 

            res_igual_que = valor1.classValor == valor2.classValor;
            new_tam  =  1;
            resultado = new Simbolo(res_igual_que == true ? 1 : 0, new_tam);
            return resultado;
        }            
        catch(Error)
        {
            resultado = new Simbolo(-33,-12);
            //resultado.classValor =  "Error: " + Error.message;        
            return resultado;
        }
    }
}

export default Igual_Que;