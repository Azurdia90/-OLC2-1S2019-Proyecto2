import Simbolo from "../Estructuras/Simbolo";
import Valor from "./Valor";

class Expresion 
{
    protected operador1 : Valor;
    protected tipo: String;
    protected operador2 : any;

    constructor(p_operador1:  Valor, p_tipo: String, p_operador2?: Valor )
    {        
        this.operador1 = p_operador1;
        this.tipo = p_tipo;
        this.operador2 = p_operador2; 
    }

    ejecutar(entorno_local: Map<String,Simbolo>)
    {
        try
        {   
            return new Simbolo(-10, -4);
        }            
        catch(Error)
        {     
            return new Simbolo(-33,-12);
        }
    }
}

export default Expresion;