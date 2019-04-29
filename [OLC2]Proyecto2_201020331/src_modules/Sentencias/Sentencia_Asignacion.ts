import Instruccion from "../Instruccion";
import Expresion from "../Expresiones/Expresion";
import Simbolo from "../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../Tabla_Simbolos/Tabla_Simbolos";

class Sentencia_Asignacion extends Instruccion
{

    private tipo : number;    
    private identificador : String;
    private tipo_valor : any;    
    private valor : any;
    private posicion : any;

    constructor(p_id : String, p_tipo: number, p_tipo_valor? : String, p_valor? : any, p_pos?: Array<any>)
    {
        super(0,0);
        this.tipo = p_tipo;
        this.identificador = p_id;        
        this.tipo_valor = p_tipo_valor;        
        this.valor = p_valor;
        this.posicion = p_pos;
    }

    ejecutar(entorno_local: Map<String,Simbolo>, ptr_entorno: Array<number>)
    {
        try
        {                          
            if(this.tipo == 0)
            {
                if(tabla_simbolos.existe_simbolo(this.identificador))
                {
                    var simbolo_asignar = tabla_simbolos.obtener_simbolo(this.identificador);

                    if(simbolo_asignar != undefined)
                    {                          
                        if(this.tipo_valor != "" && this.valor instanceof Array) //se quiere instanciar con new Array
                        {
                            
                            if(simbolo_asignar.classRol == tipo_rol.arreglo)
                            {
                                if(simbolo_asignar.classTipo == this.get_tipo_primitivo(this.tipo_valor))
                                {
                                    var temporal_contador = "t" + tabla_simbolos.classTemporal;
                                    var temporal_posicion_stack_array = "t" + tabla_simbolos.classTemporal;                    
                                    var temporal_posicion_heap_array = "t" + tabla_simbolos.classTemporal;
                                    var temporal_fin_posicion_heap_array = "t" + tabla_simbolos.classTemporal;
 
                                    tabla_simbolos.classCodigo_3D = "\n";                                             
                                    tabla_simbolos.classCodigo_3D = temporal_contador + " = 1;\n";
                                    tabla_simbolos.classCodigo_3D = temporal_posicion_stack_array + " = P + " + simbolo_asignar.classPos + ";\n";
                                    tabla_simbolos.classCodigo_3D = temporal_posicion_heap_array + " = H;\n";
                                    tabla_simbolos.classCodigo_3D = "Stack[" + temporal_posicion_stack_array + "] = " + temporal_posicion_heap_array + ";\n"  
                                    tabla_simbolos.classCodigo_3D = "H = H + 1;\n";

                                    for(var i = 0; i < this.valor.length; i++)
                                    {
                                        var tam_dim :Simbolo;
                                        if(this.valor[i] instanceof Expresion)
                                        {
                                            tam_dim = this.valor[i].ejecutar(entorno_local,ptr_entorno);
                                        }
                                        else if(this.valor[i] instanceof Simbolo)
                                        {
                                            tam_dim = this.valor[i];
                                        }
                                        else
                                        {
                                            tam_dim = new Simbolo();
                                        }
                                        
                                        tabla_simbolos.classCodigo_3D = "\n";
                                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_contador + " * " + tam_dim.classValor + ";\n";
                                        tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = " + tam_dim.classValor + ";\n";
                                        tabla_simbolos.classCodigo_3D = temporal_posicion_heap_array + " = " + temporal_posicion_heap_array + " + 1;\n";                            
                                        tabla_simbolos.classCodigo_3D = "H = H + 1;\n";                                                    
                                    }
                                    
                                    tabla_simbolos.classCodigo_3D = "\n";
                                    tabla_simbolos.classCodigo_3D = "H = H + " + temporal_contador + ";\n";
                                    tabla_simbolos.classCodigo_3D = temporal_fin_posicion_heap_array + " = H;\n"                         
                                    tabla_simbolos.classCodigo_3D = "\n";
                                    //vamos a asignar valores por defecto a los espacios que vengan
                                    var etiqueta_inicio = "L" + tabla_simbolos.classEtiqueta;
                                    var etiqueta_verdadera = "L" + tabla_simbolos.classEtiqueta;
                                    var etiqueta_falsa = "L" + tabla_simbolos.classEtiqueta;

                                    temporal_posicion_stack_array
                                    tabla_simbolos.classCodigo_3D = etiqueta_inicio + ":\n";
                                    tabla_simbolos.classCodigo_3D = "if(" + temporal_posicion_heap_array + " < " + temporal_fin_posicion_heap_array + ") goto " + etiqueta_verdadera + ";\n";
                                    tabla_simbolos.classCodigo_3D = "goto " + etiqueta_falsa + ";\n";
                                    tabla_simbolos.classCodigo_3D = etiqueta_verdadera + ":\n";
                                    if(this.tipo_valor == "boolean")
                                    {
                                        tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 0;\n"; 
                                    }
                                    else if(this.tipo_valor == "int")
                                    {
                                        tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 0;\n"; 
                                    }
                                    else if(this.tipo_valor == "double")
                                    {
                                        tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 0.0;\n"; 
                                    }
                                    else if(this.tipo_valor == "char")
                                    {
                                        tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 3;\n"; 
                                    }
                                    else if(this.tipo_valor == "String")
                                    {
                                        var temporal_pos_heap =  "t" + tabla_simbolos.classTemporal;
                                        tabla_simbolos.classCodigo_3D = temporal_pos_heap + " =  H;\n";
                                        tabla_simbolos.classCodigo_3D = "Heap[H] = 32;\n";
                                        tabla_simbolos.classCodigo_3D = "H = H + 1;\n";
                                        tabla_simbolos.classCodigo_3D = "Heap[H] = 3;\n";
                                        tabla_simbolos.classCodigo_3D = "H = H + 1;\n";
                                        tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] =  " + temporal_pos_heap +";\n"; 
                                    }
                                    else if(this.tipo_valor == "null")
                                    {
                                        tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = -77777;\n"; 
                                    }
                                    else
                                    {
                                        tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = -77777;\n"; 
                                    }
                                    tabla_simbolos.classCodigo_3D = temporal_posicion_heap_array + " = " + temporal_posicion_heap_array + " + 1;\n"; 
                                    tabla_simbolos.classCodigo_3D = "goto " + etiqueta_inicio + ";\n";
                                    tabla_simbolos.classCodigo_3D = etiqueta_falsa + ":\n";

                                    var resultado  = new Simbolo();
                                    resultado.classAcceso = tipo_acceso.publico;
                                    resultado.classRol = tipo_rol.aceptado;
                                    resultado.classTipo = tipo_dato_primitivo.cadena;
                                    resultado.classIdentificador = "10-4";
                                    resultado.classValor = "Asignacion realizada correctamente.";
                                    return resultado;
                                }
                                else
                                {
                                    tabla_simbolos.limpiar_3d();                                
                    
                                    var resultado  = new Simbolo();
                                    resultado.classAcceso = tipo_acceso.publico;
                                    resultado.classRol = tipo_rol.error;
                                    resultado.classTipo = tipo_dato_primitivo.cadena;
                                    resultado.classIdentificador = "33-12";
                                    resultado.classValor = "Asignacion No realizada correctamente: La variable \"" + simbolo_asignar.classIdentificador + "\" no es un arreglo.";
                                    return resultado;

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
                                resultado.classValor = "Asignacion No realizada correctamente: La variable \"" + simbolo_asignar.classIdentificador + "\" no es un arreglo.";
                                return resultado;
                            }
                        }
                        else if(this.tipo_valor == "" && this.valor instanceof Array) //se asignara un arrego {{},{}}
                        {
                            if(simbolo_asignar.classRol == tipo_rol.arreglo)
                            {
                                var temporal_contador = "t" + tabla_simbolos.classTemporal;
                                var temporal_posicion_stack_array = "t" + tabla_simbolos.classTemporal;
                                var temporal_posicion_heap_array = "t" + tabla_simbolos.classTemporal;
               
                                tabla_simbolos.classCodigo_3D = "\n";                                             
                                tabla_simbolos.classCodigo_3D = temporal_contador + " = 1;\n";
                                tabla_simbolos.classCodigo_3D = temporal_posicion_stack_array + " = P + " + simbolo_asignar.classPos + ";\n";
                                tabla_simbolos.classCodigo_3D = temporal_posicion_heap_array + " = H;\n";
                                tabla_simbolos.classCodigo_3D = "Stack[" + temporal_posicion_stack_array + "] = " + temporal_posicion_heap_array + ";\n"  
                                tabla_simbolos.classCodigo_3D = "H = H + 1;\n";
            
                                for(var i = 0; i < this.valor.length; i++)
                                {
                                    var tam_dim  = new Simbolo();
                                    tam_dim.classAcceso = tipo_acceso.publico;
                                    tam_dim.classRol = tipo_rol.aceptado;
                                    tam_dim.classTipo = tipo_dato_primitivo.entero;
                                    tam_dim.classIdentificador = "10-4";
                                    tam_dim.classValor = this.valor[0].length;                            
                                    
                                    tabla_simbolos.classCodigo_3D = "\n";
                                    tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_contador + " * " + tam_dim.classValor + ";\n";
                                    tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = " + tam_dim.classValor + ";\n";
                                    tabla_simbolos.classCodigo_3D = temporal_posicion_heap_array + " = " + temporal_posicion_heap_array + " + 1;\n";
                                    tabla_simbolos.classCodigo_3D = "H = H + 1;\n";
                                }
                                
                                tabla_simbolos.classCodigo_3D = "\n";                        
                                tabla_simbolos.classCodigo_3D = "H = H + " + temporal_contador + ";\n";
                                
                                for(var x = 0; x < this.valor.length; x++)
                                {
                                    var lista_valores = this.valor[x];
                                    for(var y = 0; y < lista_valores.length; y++)
                                    {
                                        var resultado_d : Simbolo;
                                        if(lista_valores[y] instanceof Simbolo)
                                        {
                                            resultado_d = lista_valores[y];
                                        } 
                                        else if(lista_valores[y] instanceof Expresion)
                                        {
                                            resultado_d = lista_valores[y].ejecutar(entorno_local,ptr_entorno);
                                        }
                                        else
                                        {
                                            tabla_simbolos.limpiar_3d();
            
                                            var resultado  = new Simbolo();
                                            resultado.classAcceso = tipo_acceso.publico;
                                            resultado.classRol = tipo_rol.error;
                                            resultado.classTipo = tipo_dato_primitivo.cadena;
                                            resultado.classIdentificador = "33-12";
                                            resultado.classValor = "Declaracion No realizada correctamente: No es posible asignar un valor.";
                                            return resultado;
                                        }
                                                    
                                        if(resultado_d.classTipo == simbolo_asignar.classTipo)
                                        {
                                            tabla_simbolos.classCodigo_3D = "\n";
                                            tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = " + resultado_d.classValor + ";\n";
                                            tabla_simbolos.classCodigo_3D = temporal_posicion_heap_array + " = " + temporal_posicion_heap_array + " + 1;\n";
                                        }
                                        else
                                        {
                                            tabla_simbolos.limpiar_3d();
            
                                            var resultado  = new Simbolo();
                                            resultado.classAcceso = tipo_acceso.publico;
                                            resultado.classRol = tipo_rol.error;
                                            resultado.classTipo = tipo_dato_primitivo.cadena;
                                            resultado.classIdentificador = "33-12";
                                            resultado.classValor = "Declaracion No realizada correctamente: No es posible asignar un valor del tipo \"" + resultado_d.classTipo + "\" a un arreglo del tipo: \"" + simbolo_asignar.classTipo + "\".";
                                            return resultado;
                                        }
                                    }
                                }

                                var resultado  = new Simbolo();
                                resultado.classAcceso = tipo_acceso.publico;
                                resultado.classRol = tipo_rol.aceptado;
                                resultado.classTipo = tipo_dato_primitivo.cadena;
                                resultado.classIdentificador = "10-4";
                                resultado.classValor = "Asignacion realizada correctamente.";
                                return resultado;
                            }
                            else
                            {
                                tabla_simbolos.limpiar_3d();                                
                    
                                var resultado  = new Simbolo();
                                resultado.classAcceso = tipo_acceso.publico;
                                resultado.classRol = tipo_rol.error;
                                resultado.classTipo = tipo_dato_primitivo.cadena;
                                resultado.classIdentificador = "33-12";
                                resultado.classValor = "Asignacion No realizada correctamente: La variable \"" + simbolo_asignar.classIdentificador + "\" no es un arreglo.";
                                return resultado;
                            }
                        }
                        else
                        {
                            var valor_f : Simbolo;

                            if(this.valor instanceof Expresion)   
                            {
                                valor_f = this.valor.ejecutar(entorno_local,ptr_entorno);
                            }     
                            else if(this.valor instanceof Simbolo)
                            {
                                valor_f = <Simbolo> this.valor;
                            }    
                            else
                            {
                                tabla_simbolos.limpiar_3d();                                
                    
                                var resultado  = new Simbolo();
                                resultado.classAcceso = tipo_acceso.publico;
                                resultado.classRol = tipo_rol.error;
                                resultado.classTipo = tipo_dato_primitivo.cadena;
                                resultado.classIdentificador = "33-12";
                                resultado.classValor = "Asignacion No realizada correctamente: No existe un valor definido.";
                                return resultado;
                            }

                            console.log("acceder a: " + simbolo_asignar.classTipo);
                            console.log("valor asignar: " + valor_f.classTipo);

                            if(simbolo_asignar.classTipo == valor_f.classTipo)
                            {   
                                tabla_simbolos.classCodigo_3D = "\n"; 
                                var temporal_pos_stak = "t" + tabla_simbolos.classTemporal;
                                tabla_simbolos.classCodigo_3D = temporal_pos_stak + " = P + " + simbolo_asignar.classPos + ";\n"; 
                                tabla_simbolos.classCodigo_3D = "Stack[" + temporal_pos_stak + "] = " + valor_f.classValor + ";\n";
    
                                var resultado  = new Simbolo();
                                resultado.classAcceso = tipo_acceso.publico;
                                resultado.classRol = tipo_rol.aceptado;
                                resultado.classTipo = tipo_dato_primitivo.cadena;
                                resultado.classIdentificador = "10-4";
                                resultado.classValor = "Asignacion realizada correctamente.";
                                return resultado;
                            }
                            else
                            {
                                tabla_simbolos.limpiar_3d();
        
                                var resultado  = new Simbolo();
                                resultado.classAcceso = tipo_acceso.publico;
                                resultado.classRol = tipo_rol.error;
                                resultado.classTipo = tipo_dato_primitivo.cadena;
                                resultado.classIdentificador = "33-12";
                                resultado.classValor = "Asignacion No realizada correctamente: No es posible realizar asignacion de una variable \"" + simbolo_asignar.classTipo + "\" a auna variable \"" + valor_f.classTipo ;
                                return resultado;
                            }
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
                        resultado.classValor = "Asignacion No realizada correctamente: La variable \"" + this.identificador + "\" no existe:";
                        return resultado;
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
                    resultado.classValor = "Asignacion No realizada correctamente: La variable \"" + this.identificador + "\" no existe:";
                    return resultado;
                }    
            }
            else if(this.tipo == 1)
            {
                if(tabla_simbolos.existe_simbolo(this.identificador))
                {
                    var simbolo_asignar = tabla_simbolos.obtener_simbolo(this.identificador);

                    if(simbolo_asignar != undefined)
                    {   
                        var valor_f : Simbolo;

                            if(this.valor instanceof Expresion)   
                            {
                                valor_f = this.valor.ejecutar(entorno_local,ptr_entorno);
                            }     
                            else if(this.valor instanceof Simbolo)
                            {
                                valor_f = <Simbolo> this.valor;
                            }    
                            else
                            {
                                tabla_simbolos.limpiar_3d();                                
                    
                                var resultado  = new Simbolo();
                                resultado.classAcceso = tipo_acceso.publico;
                                resultado.classRol = tipo_rol.error;
                                resultado.classTipo = tipo_dato_primitivo.cadena;
                                resultado.classIdentificador = "33-12";
                                resultado.classValor = "Asignacion No realizada correctamente: No existe un valor definido.";
                                return resultado;
                            }
                            
                        console.log("acceder a: " + simbolo_asignar.classIdentificador);
                        console.log("valor asignar: " + valor_f.classValor);

                        if(simbolo_asignar.classTipo == valor_f.classTipo)
                        {
                            var etiqueta_posicion_stack_array = "t" + tabla_simbolos.classTemporal;                            
                            var etiqueta_posicion_heap_array = "t" + tabla_simbolos.classTemporal;
                            var etiqueta_posicion_length_array = "t" + tabla_simbolos.classTemporal;
                            var etiqueta_length_array = "t" + tabla_simbolos.classTemporal;
                            var etiqueta_length_total_array = "t" + tabla_simbolos.classTemporal;
                            tabla_simbolos.classCodigo_3D = "\n";
                            tabla_simbolos.classCodigo_3D = etiqueta_posicion_stack_array + " = P + " + simbolo_asignar.classPos + ";\n";
                            tabla_simbolos.classCodigo_3D  = etiqueta_posicion_heap_array + " = Stack[" + etiqueta_posicion_stack_array + "];\n";
                            tabla_simbolos.classCodigo_3D = etiqueta_posicion_length_array + " = " + etiqueta_posicion_heap_array + " +  0 ;\n";
                            tabla_simbolos.classCodigo_3D = etiqueta_length_array + " = Heap[" + etiqueta_posicion_length_array + "];\n";
                            tabla_simbolos.classCodigo_3D = etiqueta_length_total_array + " = " + etiqueta_posicion_heap_array + " + " + simbolo_asignar.classTam + ";\n";

                            var etiqueta_pos_especifica_array = "t" + tabla_simbolos.classTemporal;

                            for(var i = 0; i < this.posicion.length; i++)
                            {
                                var tam_dim :Simbolo;
                                if(this.posicion[i] instanceof Expresion)
                                {
                                    tam_dim = this.posicion[i].ejecutar(entorno_local,ptr_entorno);
                                }
                                else if(this.posicion[i] instanceof Simbolo)
                                {
                                    tam_dim = this.posicion[i];
                                }
                                else
                                {
                                    tam_dim = new Simbolo();
                                }
                            
                                if(i==0)
                                {
                                    tabla_simbolos.classCodigo_3D = etiqueta_pos_especifica_array + " = " + tam_dim.classValor + ";\n"; 
                                    tabla_simbolos.classCodigo_3D = etiqueta_pos_especifica_array + " = " + etiqueta_pos_especifica_array + " * " + etiqueta_length_array + ";\n";
                                }
                                else
                                {
                                    tabla_simbolos.classCodigo_3D = etiqueta_pos_especifica_array + " = " + etiqueta_pos_especifica_array + " + " + tam_dim.classValor + ";\n";                                    
                                }                                                                                                
                            }

                            tabla_simbolos.classCodigo_3D = etiqueta_pos_especifica_array + " = " + etiqueta_pos_especifica_array + " + " +  etiqueta_length_total_array + ";\n";
                            tabla_simbolos.classCodigo_3D = "Heap[" + etiqueta_pos_especifica_array + "] = " + valor_f.classValor + ";\n";

                            var resultado  = new Simbolo(); 
                            resultado.classAcceso = tipo_acceso.publico;
                            resultado.classRol = tipo_rol.aceptado;
                            resultado.classTipo = tipo_dato_primitivo.cadena;
                            resultado.classIdentificador = "10-4";
                            resultado.classValor = "Asignacion realizada correctamente.";
                            return resultado;
                        }
                        else
                        {
                            tabla_simbolos.limpiar_3d();
    
                            var resultado  = new Simbolo();
                            resultado.classAcceso = tipo_acceso.publico;
                            resultado.classRol = tipo_rol.error;
                            resultado.classTipo = tipo_dato_primitivo.cadena;
                            resultado.classIdentificador = "33-12";
                            resultado.classValor = "Asignacion No realizada correctamente: No es posible realizar asignacion de una variable \"" + simbolo_asignar.classTipo + "\" a auna variable \"" + valor_f.classTipo ;
                            return resultado;
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
                        resultado.classValor = "Asignacion No realizada correctamente: El arreglo \"" + this.identificador + "\" no existe.";
                        return resultado;                        
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
                    resultado.classValor = "Asignacion No realizada correctamente: El arreglo \"" + this.identificador + "\" no existe.";
                    return resultado;
                }                                
            }
            else
            {
                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;
                resultado.classRol = tipo_rol.error;
                resultado.classTipo = tipo_dato_primitivo.cadena;
                resultado.classIdentificador = "10-4";
                resultado.classValor = "Impresión NO realizada correctamente: Tipo de Asignación no realizada.";
                return resultado;
            }
        }
        catch(Error)
        {
            tabla_simbolos.limpiar_3d();

            var resultado  = new Simbolo();
            resultado.classAcceso = tipo_acceso.publico;
            resultado.classRol = tipo_rol.error;
            resultado.classTipo = tipo_dato_primitivo.cadena;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Asignacion No realizada correctamente: " + Error.Message;
            return resultado;
        }
    }

    get_tipo_primitivo(p_tipo : String)
    {
        if(p_tipo == "boolean")
        {
            return tipo_dato_primitivo.booleano;
        }
        else if(p_tipo == "int")
        {
            return tipo_dato_primitivo.entero;
        }
        else if(p_tipo == "double")
        {
            return tipo_dato_primitivo.decimal;
        }
        else if(p_tipo == "char")
        {
            return tipo_dato_primitivo.caracter;
        }
        else if(p_tipo == "String")
        {
            return tipo_dato_primitivo.cadena;
        }
        else if(p_tipo == "null")
        {
            return tipo_dato_primitivo.nulo;
        }
        else
        {
            return tipo_dato_primitivo.error;
        }
    }
}

export default Sentencia_Asignacion;