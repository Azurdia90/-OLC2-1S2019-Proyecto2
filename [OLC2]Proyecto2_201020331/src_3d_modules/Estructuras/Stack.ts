import Simbolo from "./Simbolo";

class Stack
{
    private simbolo_inicio : Simbolo;
    private tamaño : number;
    private vacio  : boolean;

    constructor()
    {
        this.simbolo_inicio = new Simbolo(0,1);
        this.tamaño = 0;
        this.vacio = true;
    }

    estavacia()
    {
        return this.vacio;
    }

    agregar(nuevo_simbolo : Simbolo)
    {
        if(this.estavacia())
        {
            this.simbolo_inicio = nuevo_simbolo;
            this.vacio = false;
            this.tamaño ++;            
        }
        else
        {
            nuevo_simbolo.classNext = this.simbolo_inicio;
            this.simbolo_inicio = nuevo_simbolo;
            this.tamaño++;
        }
    }
    
    desapilar()
    {
        var retorno :Simbolo;

        if(!this.estavacia())
        {
            retorno = this.simbolo_inicio;
            this.simbolo_inicio = this.simbolo_inicio.classNext;
            this.tamaño--;

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
            return this.simbolo_inicio;
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
            if(this.tamaño > posicion)
            {
                var aux = this.simbolo_inicio;
                for(var i = 1; i < posicion; i++)
                {
                    aux = aux.classNext;
                }
                return aux;
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
        this.simbolo_inicio = new Simbolo(0,0);
        this.tamaño = 1;
        this.vacio = true;
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

