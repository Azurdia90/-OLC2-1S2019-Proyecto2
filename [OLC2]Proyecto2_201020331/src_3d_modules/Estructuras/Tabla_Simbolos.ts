import Stack from "./Stack";
import Heap from "./Heap";
import Simbolo from "./Simbolo";

class Tabla_Simbolos
{
    private mi_stack : Stack;
    private mi_heap  : Heap;
    private lista_entorno : Map<String,Simbolo>[];
    private entorno_global: Map<String,Simbolo>;
    private tam_entorno : number;
    private consola : string;

    constructor()
    {
        this.mi_stack = new Stack();
        this.mi_heap = new Heap();
        this.lista_entorno = new Array();        
        this.entorno_global = new Map<String,Simbolo>();
        this.lista_entorno[0] = this.entorno_global;
        this.tam_entorno = 1;
        this.consola = "";
    }

    get classTabla_Simbolos()
    {
        return this.lista_entorno;
    }

    set classTabla_Simbolos(p_tabla_temporales : Map<String,Simbolo>[])
    {
        this.lista_entorno = p_tabla_temporales;
    }

    get classStack()
    {
        return this.mi_stack;
    }

    set classStack(p_stack : Stack)
    {
        this.mi_stack = p_stack;
    }

    get classHeap()
    {
        return this.mi_heap;
    }

    set classHeap(p_heap : Heap)
    {
        this.mi_heap = p_heap;
    }

    get classConsola()
    {
        return this.consola;
    }

    set classConsola(p_consola : string)
    {
        this.consola = this.consola + p_consola;
    }

    crear_entorno(entorno_local : Map<String,Simbolo>)
    {
        this.tam_entorno++;
        this.lista_entorno[this.tam_entorno] = entorno_local;        
    }

    eliminar_entorno()
    {
        this.lista_entorno[this.tam_entorno] = new Map<String,Simbolo>();
        this.tam_entorno--;
    }

    obtener_simbolo(p_id : String)
    {
        for(var i = (this.tam_entorno-1); i > -1; i--)
        {
            var entorno_aux : Map<String,Simbolo> = this.lista_entorno[i];
            if(entorno_aux.has(p_id))
            {
                return  entorno_aux.get(p_id);                
            }
        }

        return new Simbolo(-33,-12);
    }

    existe_simbolo(p_id : String)
    {
        for(var i = (this.tam_entorno-1); i > -1; i--)
        {
            var entorno_aux : Map<String,Simbolo> = this.lista_entorno[i];
            if(entorno_aux.has(p_id))
            {
                return true;
            }
        }
        return false;
    }

    limpiar()
    {
        this.mi_stack = new Stack();
        this.mi_heap = new Heap();
        this.lista_entorno = new Array(1024);
        this.entorno_global = new Map<String,Simbolo>();
        this.lista_entorno[0] = this.entorno_global;
        this.tam_entorno = 1;
        this.consola = "";
    }
}

const tabla_simbolos = new Tabla_Simbolos();
export default tabla_simbolos;