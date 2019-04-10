
class Simbolo
{
    private valor : number;
    private tam   : number;

    private next : any;
    
    constructor(p_valor : number, p_tam : number )
    {
        this.valor = p_valor;
        this.tam = p_tam;
    }

    //gets y sets
    get classValor()
    {
        return this.valor;
    }

    set classValor(p_valor : number)
    {
        this.valor = p_valor;
    }

    get classTam()
    {
        return this.tam;
    }

    set classTam(p_tam : number)
    {
        this.tam = p_tam;
    }

    get classNext()
    {
        return this.next;
    }

    set classNext(p_next : Simbolo)
    {
        this.next = p_next;
    }
}

export default Simbolo;