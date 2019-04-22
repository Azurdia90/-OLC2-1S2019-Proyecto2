import Pila_Entornos from "./Pila_Entornos";
import Simbolo from "./Simbolo";

class Tabla_Simbolos
{
    private _codigo_3D : string;
    private _temporal : number;
    private _etiqueta : number;
    private _heap : number;
    
    private _entorno : Pila_Entornos;

    constructor()
    {
        this._entorno = new Pila_Entornos();

        this._codigo_3D = "";
        this._temporal = 100;
        this._etiqueta = 100;
        this._heap = 0;
    }

    limpiar()
    {
        this._entorno = new Pila_Entornos();

        this._codigo_3D = "";
        this._temporal = 100;
        this._etiqueta = 100; 
        this._heap = 0;
    }

    get classEntornos()
    {
        return this._entorno;
    }

    set classEntornos(p_pila_entornos : Pila_Entornos)
    {
        this._entorno = p_pila_entornos;
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

    get classHeap()
    {
        var t = this._heap;
        this._heap++;
        return t;
    }

    set classHeap(p_heap : number)
    {
        this._heap = p_heap;
    }


    obtener_simbolo(p_id : String)
    {
        for(var i = (this._entorno.classTamaño - 1); i > -1; i--)
        {
            var entorno_aux  = this._entorno.obtener(i);
            if(entorno_aux != undefined)
            {
                if(entorno_aux.has(p_id))
                {
                    return  entorno_aux.get(p_id);                
                }
            }
            else
            {
                tabla_simbolos.limpiar_3d();

                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Existio un error con la tabla de simbolos: El entorno no fue encontrado.";
                return resultado;
            }
        }

        tabla_simbolos.limpiar_3d();

        var resultado  = new Simbolo();
        resultado.classAcceso = tipo_acceso.publico;
        resultado.classRol = tipo_rol.error;
        resultado.classTipo = tipo_dato_primitivo.cadena;
        resultado.classIdentificador = "33-12";
        resultado.classValor = "La variable \"" + p_id + "\" no existe.";
        return resultado;
    }

    existe_simbolo(p_id : String)
    {
        for(var i = (this._entorno.classTamaño - 1); i > -1; i--)
        {
            var entorno_aux  = this._entorno.obtener(i);
            if(entorno_aux != undefined)
            {
                if(entorno_aux.has(p_id))
                {
                    return true;                
                }
            }
            else
            {
                return false;
            }
        }
        return false
    }

    limpiar_3d()
    {
        this._codigo_3D = "";
    }
}

const tabla_simbolos = new Tabla_Simbolos;

export default tabla_simbolos;