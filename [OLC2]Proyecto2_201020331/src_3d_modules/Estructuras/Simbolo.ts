
class Simbolo
{
    private valor : number;
    private tam   : number;
    
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

}

export default Simbolo;