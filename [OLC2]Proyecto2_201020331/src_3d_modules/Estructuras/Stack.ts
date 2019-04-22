import Simbolo from "./Simbolo";

class Stack
{
    private items : Simbolo[];
    private tamaño : number;

    constructor()
    {
        this.items = Array<Simbolo>();
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

    agregar(nuevo_simbolo : Simbolo, pos: number)
    {        
        this.items[pos]= nuevo_simbolo;
        this.tamaño  = this.items.length;  
    }
    
    desapilar()
    {
        var retorno :Simbolo;

        if(!this.estavacia())
        {
            retorno = <Simbolo> this.items.pop();

            this.tamaño = this.items.length;
            return retorno;
        }
        else
        {
            retorno = new Simbolo(-33,-12);            
            return retorno;
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
            return new Simbolo(-33,-12);
        }
    }

    obtener(posicion)
    {
        if(!this.estavacia())
        {
            if(this.tamaño >= posicion)
            {                
                return <Simbolo> this.items[posicion];
            }            
            else
            {
                return new Simbolo(-33,-12);
            }
        }
        else
        {
            return new Simbolo(-33,-12);
        }
    }

    vaciar()
    {
        this.items = new Array<Simbolo>();
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

export default Stack;

