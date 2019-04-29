import Expresion from "../Expresion";
import Simbolo from "../../Estructuras/Simbolo";
import Valor from "../Valor";

class Suma extends Expresion
{
    constructor(p_operador1:  Valor, p_operador2: Valor)
    {        
        super(p_operador1,"+",p_operador2); 
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

            var res_suma  : number; 
            var new_tam   : number;
            
            res_suma =  (<number> valor1.classValor) + (<number> valor2.classValor);
            new_tam  =  valor1.classTam + valor2.classTam;

            resultado = new Simbolo(res_suma, new_tam);
            return resultado;

        }            
        catch(Error)
        {
            //resultado.classValor =  "Error: " + Error.message;  
            resultado = new Simbolo(-33,-12);      
            return resultado;
        }
    }
}

export default Suma;