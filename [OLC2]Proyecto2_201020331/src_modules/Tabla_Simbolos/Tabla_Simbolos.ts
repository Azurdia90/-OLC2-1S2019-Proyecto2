
class Tabla_Simbolos
{
    private _codigo_3D : string;
    private _temporal : number;
    private _etiqueta : number;

    constructor()
    {
        this._codigo_3D = "";
        this._temporal = 100;
        this._etiqueta = 0;
    }

    limpiar()
    {
        this._codigo_3D = "";
        this._temporal = 100;
        this._etiqueta = 0; 
    }

    get classCodigo_3D()
    {
        return this._codigo_3D;
    }

    set classCodigo_3D(p_codigo : string)
    {
        this._codigo_3D = this._codigo_3D + p_codigo;
    }

    get classTemporal()
    {
        var t = this._temporal;
        this._temporal++;
        return t;
    }

    set classTemporal(p_temporal : number)
    {
        this._temporal = p_temporal;
    }

    get classEtiqueta()
    {
        var e = this._etiqueta;
        this._etiqueta++;
        return e;
    }

    set classEtiqueta(p_etiqueta : number)
    {
        this._etiqueta = p_etiqueta;
    }

    limpiar_3d()
    {
        this._codigo_3D = "";
    }
}

const tabla_simbolos = new Tabla_Simbolos;

export default tabla_simbolos;