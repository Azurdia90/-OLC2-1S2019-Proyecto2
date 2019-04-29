class Simbolo
{
    private _clase: String;
    private _acceso: tipo_acceso;
    private _rol: tipo_rol;
    private _tipo: tipo_dato_primitivo;
    private _identificador : String;
    private _valor : any;
    private _pos: number;
    private _tam: number;
    private _parametros: String;
    
    constructor()
    {
        this._clase = "";
        this._acceso = tipo_acceso.publico;
        this._rol = tipo_rol.valor;
        this._tipo = tipo_dato_primitivo.nulo;
        this._identificador = "";        
        this._pos = 0;
        this._tam = 0;
        this._parametros = "";
    }
    
    //get y set

    get classClase()
    {
        return this._clase;
    }

    get classAcceso()
    {
        return this._acceso;
    }

    get classRol()
    {
        return this._rol;
    }

    get classTipo()
    {
        return this._tipo;
    }

    get classIdentificador()
    {
        return this._identificador;
    }

    get classValor()
    {
        return this._valor;
    }

    get classPos()
    {
        return this._pos;
    }

    get classTam()
    {
        return this._tam;
    }

    set classClase(p_clase : String)
    {
        this._clase = p_clase;
    }
    
    set classAcceso(p_acceso : tipo_acceso)
    {
        this._acceso = p_acceso;
    }

    set classRol(p_rol : tipo_rol)
    {
        this._rol = p_rol; 
    }

    set classTipo(p_tipo : tipo_dato_primitivo)
    {
        this._tipo = p_tipo;
    }

    set classIdentificador(p_identificador : String)
    {
        this._identificador = p_identificador;
    }

    set classValor(p_valor : any)
    {
        this._valor = p_valor;
    }

    set classPos(p_pos : number)
    {
        this._pos = p_pos;
    }

    set classTam(p_tam : number)
    {
        this._tam = p_tam;
    }

}

export default Simbolo;