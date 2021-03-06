import Instruccion from "../Instruccion";
import Expresion from "../Expresiones/Expresion";
import Simbolo from "../Estructuras/Simbolo";
import Valor from "../Expresiones/Valor";
import tabla_simbolos from "../Estructuras/Tabla_Simbolos";

class Sentencia_Asignacion extends Instruccion
{

    private id : String;
    private tipo : number;
    private valor : any;
    private posicion : any;
    
    constructor(p_id : String, p_tipo :number, p_expresion : Expresion | Valor, p_pos? :Valor)
    {
        super(0,0);
        this.id = p_id;
        this.tipo = p_tipo;
        this.valor = p_expresion;        
        this.posicion = p_pos;                
    }

    ejecutar(entorno_local?: Map<String,Simbolo>)
    {
        try
        {
            if(this.tipo == 0 || this.tipo == 1 )
            {  //variables etiquetas
                if(entorno_local != undefined && tabla_simbolos.existe_simbolo(this.id) )
                {
                    var resultado_valor = this.valor.ejecutar(entorno_local);

                    if(resultado_valor.classTam != -12)
                    {
                        var simbolo_nuevo = new Simbolo(resultado_valor.classValor,1);
                        var etiq_var = tabla_simbolos.obtener_simbolo(this.id);      
                        if(etiq_var != undefined)
                        {
                            etiq_var.classValor = simbolo_nuevo.classValor;
                            etiq_var.classTam = simbolo_nuevo.classTam;
                            return new Simbolo(-10,-4);
                        }      
                        else
                        {
                            return new Simbolo(-33,-12);
                        }
                    }
                    else
                    {
                        new Simbolo(-33,-12);
                    }
                        return new Simbolo(-33,-12);              
                }
                else
                {
                    return new Simbolo(-33,-12);
                }
            }
            else if(this.tipo == 2)
            {
                if(this.posicion != undefined)
                {
                    var resultado_valor = this.valor.ejecutar(entorno_local);
                    var resultado_posicion = this.posicion.ejecutar(entorno_local);
                    
                    if(resultado_valor.classTam != -12 || resultado_posicion.classTam != -12)  
                    {
                        var simbolo_nuevo = new Simbolo(resultado_valor.classValor,resultado_valor.classTam);
                        tabla_simbolos.classStack.agregar(simbolo_nuevo,resultado_posicion.classValor);
                        return new Simbolo(-10,-4);
                    }
                    else
                    {                        
                        new Simbolo(-33,-12);
                    }                    
                }
                return new Simbolo(-33, -12);
            }
            else if(this.tipo == 3)
            {
                if(this.posicion != undefined)
                {
                    var resultado_valor = this.valor.ejecutar(entorno_local);
                    var resultado_posicion = this.posicion.ejecutar(entorno_local);
                    
                    if(resultado_valor.classTam != -12 || resultado_posicion.classTam != -12)  
                    {
                        var simbolo_nuevo = new Simbolo(resultado_valor.classValor,resultado_valor.classTam);
                        tabla_simbolos.classHeap.agregar(simbolo_nuevo,resultado_posicion.classValor);
                        return new Simbolo(-10,-4);
                    }
                    else
                    {                        
                        new Simbolo(-33,-12);
                    }                    
                }
                return new Simbolo(-33, -12);
            }        
            else
            {
                return new Simbolo(-33, -12);
            }
        }
        catch(Error)
        {
            return new Simbolo(-33,-12);
        }
    }
}

export default Sentencia_Asignacion;