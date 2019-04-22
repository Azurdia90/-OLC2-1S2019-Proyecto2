import Simbolo from "./Simbolo";

class Pila_Entornos
{
    private items : Map<String,Simbolo>[];
    private tamaño : number;

    constructor()
    {
        this.items = Array<Map<String,Simbolo>>();
        this.tamaño = this.items.length;
    }

    estavacia()
    {
        if(this.items.length < 1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    agregar(nuevo_simbolo : Map<String,Simbolo>)
    {        
        this.items.push(nuevo_simbolo);
        this.tamaño  = this.items.length;  
    }
    
    desapilar()
    {        
        if(!this.estavacia())
        {
            var retorno : Map<String,Simbolo>;
            retorno = <Map<String,Simbolo>> this.items.pop();

            this.tamaño = this.items.length;
            return retorno;
        }
        else
        {
            return undefined;
        }
    }

    peek()
    {
        if(!this.estavacia())
        {
            return this.items[this.classTamaño - 1];
        }
        else
        {
            return undefined;
        }
    }

    obtener(posicion)
    {
        if(!this.estavacia())
        {
            if(this.tamaño >= posicion)
            {                
                return <Map<String,Simbolo>> this.items[posicion];
            }            
            else
            {
                return undefined;
            }
        }
        else
        {
            return undefined;
        }
    }

    vaciar()
    {
        this.items = new Array<Map<String,Simbolo>>();
        this.tamaño = 0;
    }

    get classTamaño()
    {
        return this.tamaño;
    }

    set classTamaño(p_tamaño : number)
    {
        this.tamaño = p_tamaño;
    }
}

export default Pila_Entornos;