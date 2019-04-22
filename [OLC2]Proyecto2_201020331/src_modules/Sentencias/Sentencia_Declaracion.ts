import Expresion from "../Expresiones/Expresion";
import Simbolo from "../Tabla_Simbolos/Simbolo";
import tabla_simbolos from "../Tabla_Simbolos/Tabla_Simbolos";
import Instruccion from "../Instruccion";

class Sentencia_Declaracion_Instancia extends Instruccion
{

    private tipo : number;
    private tipo_id : String;
    private lista_id : String[]; 
    private valor : any;

    //atributos para un arreglo;
    private tipo_id2 :any;
    private lista_tam_dim : any;

    constructor(p_tipo : number, p_tipo_valor : String, p_id : String[], p_expresion? : Expresion | Simbolo, p_tipo_valor2? : String, p_expresion2? : Array<any>)
    {
        super(0,0);
        this.tipo = p_tipo;
        this.tipo_id = p_tipo_valor;
        this.lista_id = p_id;
        this.valor = p_expresion;

        this.tipo_id2 = p_tipo_valor2;
        this.lista_tam_dim = p_expresion2;
    }

    ejecutar(entorno_local: Map<String,Simbolo>, ptr_entorno: Array<number>)
    {
        try
        {
            if(this.tipo == 0)
            {                
                var expresion_r : Simbolo;    
                if(this.valor instanceof Expresion)
                {
                    expresion_r  = this.valor.ejecutar();
    
                    if(expresion_r.classRol == tipo_rol.error)
                    {
                        tabla_simbolos.limpiar_3d();
                        return expresion_r;
                    }
                }
                else if(this.valor instanceof Simbolo)
                {
                    expresion_r = this.valor;
    
                    if(expresion_r.classRol == tipo_rol.error)
                    {
                        tabla_simbolos.limpiar_3d();                    
                        return expresion_r;
                    }
                }
                else
                {
                    if(this.tipo_id == "boolean")
                    {
                        expresion_r = new Simbolo();
                        expresion_r.classAcceso = tipo_acceso.publico;
                        expresion_r.classRol = tipo_rol.valor;
                        expresion_r.classTipo = tipo_dato_primitivo.booleano;
                        expresion_r.classIdentificador = "10-4";
                        expresion_r.classValor = 0;                  
                    }
                    else if(this.tipo_id == "int")
                    {
                        expresion_r = new Simbolo();
                        expresion_r.classAcceso = tipo_acceso.publico;
                        expresion_r.classRol = tipo_rol.valor;
                        expresion_r.classTipo = tipo_dato_primitivo.entero;
                        expresion_r.classIdentificador = "10-4";
                        expresion_r.classValor = 0;
                    }
                    else if(this.tipo_id == "double")
                    {
                        expresion_r = new Simbolo();
                        expresion_r.classAcceso = tipo_acceso.publico;
                        expresion_r.classRol = tipo_rol.valor;
                        expresion_r.classTipo = tipo_dato_primitivo.decimal;
                        expresion_r.classIdentificador = "10-4";
                        expresion_r.classValor = 0.0;
                    }
                    else if(this.tipo_id == "char")
                    {
                        expresion_r = new Simbolo();
                        expresion_r.classAcceso = tipo_acceso.publico;
                        expresion_r.classRol = tipo_rol.valor;
                        expresion_r.classTipo = tipo_dato_primitivo.caracter;
                        expresion_r.classIdentificador = "10-4";
                        expresion_r.classValor = 3;
                    }
                    else if(this.tipo_id == "String")
                    {
                        var temporal_pos_heap =  "t" + tabla_simbolos.classTemporal;
                        tabla_simbolos.classCodigo_3D = "\n";
                        tabla_simbolos.classCodigo_3D = temporal_pos_heap + " =  H;\n";
                        tabla_simbolos.classCodigo_3D = "Heap[H] = 32;\n";
                        tabla_simbolos.classCodigo_3D = "H = H + 1;\n";
                        tabla_simbolos.classCodigo_3D = "Heap[H] = 3;\n";
                        tabla_simbolos.classCodigo_3D = "H = H + 1;\n";

                        expresion_r = new Simbolo();
                        expresion_r.classAcceso = tipo_acceso.publico;
                        expresion_r.classRol = tipo_rol.valor;
                        expresion_r.classTipo = tipo_dato_primitivo.cadena;
                        expresion_r.classIdentificador = "10-4";
                        expresion_r.classValor = temporal_pos_heap;
                        expresion_r.classPos = 0;
                        expresion_r.classTam = 0;
                    }
                    else if(this.tipo_id == "null")
                    {
                        expresion_r = new Simbolo();
                        expresion_r.classAcceso = tipo_acceso.publico;
                        expresion_r.classRol = tipo_rol.valor;
                        expresion_r.classTipo = tipo_dato_primitivo.nulo;
                        expresion_r.classIdentificador = "10-4";
                        expresion_r.classValor = -77777;
                    }
                    else
                    {
                        expresion_r  = new Simbolo();
                        expresion_r.classAcceso = tipo_acceso.publico;
                        expresion_r.classRol = tipo_rol.objeto;
                        expresion_r.classTipo = tipo_dato_primitivo.nulo;
                        expresion_r.classIdentificador = "10-4";
                        expresion_r.classValor = -77777;
                    }
                }
                
                var resultado  = new Simbolo();
                resultado.classAcceso = tipo_acceso.publico;

                for(var i = 0; i < this.lista_id.length; i++)
                {                   
                    if(!entorno_local.has(this.lista_id[i]))
                    {                                            
                        var pos_stack = "t"+ tabla_simbolos.classTemporal;
                        var codigo_3d =  pos_stack + " = P + " + ptr_entorno[0] + ";\n";
                        
                        codigo_3d = codigo_3d 
                                    +"Stack[" + pos_stack + "] = " + expresion_r.classValor + ";\n";
    
                        tabla_simbolos.classCodigo_3D = "\n";       
                        tabla_simbolos.classCodigo_3D = codigo_3d;
    
                        var simbolo_nuevo  = new Simbolo();
                        simbolo_nuevo.classAcceso = tipo_acceso.publico;
                        simbolo_nuevo.classRol = tipo_rol.identificador;
                        simbolo_nuevo.classTipo = this.get_tipo_primitivo(this.tipo_id);
                        simbolo_nuevo.classIdentificador = this.lista_id[i];
                        simbolo_nuevo.classValor = "Stack[" + pos_stack + "]";
                        simbolo_nuevo.classPos = ptr_entorno[0];
                        simbolo_nuevo.classTam = expresion_r.classTam;
    
                        entorno_local.set(this.lista_id[i], simbolo_nuevo);

                        resultado.classRol = simbolo_nuevo.classRol;
                        resultado.classTipo = simbolo_nuevo.classTipo;
                        resultado.classIdentificador = simbolo_nuevo.classIdentificador;
                        resultado.classValor = simbolo_nuevo.classValor;
                        resultado.classPos = simbolo_nuevo.classPos;
                        resultado.classTam = simbolo_nuevo.classTam; 

                        ptr_entorno[0]++;
                    }
                    else
                    {
                        tabla_simbolos.limpiar_3d();
    
                        var resultado  = new Simbolo();
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.error;
                        resultado.classTipo = tipo_dato_primitivo.cadena;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "Declaracion No realizada correctamente: La variable \"" + this.lista_id[i] + "\" ya existe en el entorno actual.";
                        return resultado;
                    }
                }
    
                return resultado;
            }
            else if (this.tipo == 1)
            {
                var dimension_r : Simbolo;    
                if(this.valor instanceof Simbolo)
                {
                    dimension_r = this.valor;
    
                    if(dimension_r.classRol == tipo_rol.error)
                    {
                        tabla_simbolos.limpiar_3d();                    
                        return dimension_r;
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
                    resultado.classValor = "Declaracion No realizada correctamente: las dimensiones del arreglo no pudieron ser definido.";
                    return resultado;
                }

                if(this.tipo_id2 != "" && this.lista_tam_dim != undefined) // si se le instanciara con new    
                {       
                    
                    var temporal_contador = "t" + tabla_simbolos.classTemporal;
                    var temporal_posicion_stack_array = "t" + tabla_simbolos.classTemporal;                    
                    var temporal_posicion_heap_array = "t" + tabla_simbolos.classTemporal;
                    var temporal_fin_posicion_heap_array = "t" + tabla_simbolos.classTemporal;

                    if(this.tipo_id == this.tipo_id2)
                    {   
                        tabla_simbolos.classCodigo_3D = "\n";                                             
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = 1;\n";
                        tabla_simbolos.classCodigo_3D = temporal_posicion_stack_array + " = P + " + ptr_entorno[0] + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_posicion_heap_array + " = H;\n";
                        tabla_simbolos.classCodigo_3D = "Stack[" + temporal_posicion_stack_array + "] = " + temporal_posicion_heap_array + ";\n"  
                        tabla_simbolos.classCodigo_3D = "H = H + 1;\n";

                        for(var i = 0; i < this.lista_tam_dim.length; i++)
                        {
                            var tam_dim :Simbolo;
                            if(this.lista_tam_dim[i] instanceof Expresion)
                            {
                                tam_dim = this.lista_tam_dim[i].ejecutar();
                            }
                            else if(this.lista_tam_dim[i] instanceof Simbolo)
                            {
                                tam_dim = this.lista_tam_dim[i];
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
                        if(this.tipo_id == "boolean")
                        {
                            tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 0;\n"; 
                        }
                        else if(this.tipo_id == "int")
                        {
                            tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 0;\n"; 
                        }
                        else if(this.tipo_id == "double")
                        {
                            tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 0.0;\n"; 
                        }
                        else if(this.tipo_id == "char")
                        {
                            tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = 3;\n"; 
                        }
                        else if(this.tipo_id == "String")
                        {
                            var temporal_pos_heap =  "t" + tabla_simbolos.classTemporal;
                            tabla_simbolos.classCodigo_3D = temporal_pos_heap + " =  H;\n";
                            tabla_simbolos.classCodigo_3D = "Heap[H] = 32;\n";
                            tabla_simbolos.classCodigo_3D = "H = H + 1;\n";
                            tabla_simbolos.classCodigo_3D = "Heap[H] = 3;\n";
                            tabla_simbolos.classCodigo_3D = "H = H + 1;\n";
                            tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] =  " + temporal_pos_heap +";\n"; 
                        }
                        else if(this.tipo_id == "null")
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

                        var nuevo_arreglo  = new Simbolo();
                        nuevo_arreglo.classAcceso = tipo_acceso.publico;
                        nuevo_arreglo.classRol = tipo_rol.arreglo;
                        nuevo_arreglo.classTipo = this.get_tipo_primitivo(this.tipo_id);
                        nuevo_arreglo.classIdentificador = this.lista_id[0];
                        nuevo_arreglo.classValor = "Stack[" + temporal_posicion_stack_array + "]";
                        nuevo_arreglo.classPos = ptr_entorno[0];
                        nuevo_arreglo.classTam = this.lista_tam_dim.length;

                        ptr_entorno[0]++; 

                        if(!entorno_local.has(this.lista_id[0]))
                        {
                            entorno_local.set(this.lista_id[0], nuevo_arreglo);
                        }
                        else
                        {
                            tabla_simbolos.limpiar_3d();

                            var resultado  = new Simbolo();
                            resultado.classAcceso = tipo_acceso.publico;
                            resultado.classRol = tipo_rol.error;
                            resultado.classTipo = tipo_dato_primitivo.cadena;
                            resultado.classIdentificador = "33-12";
                            resultado.classValor = "Declaracion No realizada correctamente: el identficador \"" + this.lista_id[0] +  "\" ya existe en este contexto.";
                            return resultado;
                        }

                        var resultado  = new Simbolo();
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.aceptado;
                        resultado.classTipo = tipo_dato_primitivo.cadena;
                        resultado.classIdentificador = "10-4";
                        resultado.classValor = "Declaracion realizada correctamente";
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
                        resultado.classValor = "Declaracion No realizada correctamente: No es posible asignar un valor del tipo \"" + this.tipo_id2 + "\" a un arreglo del tipo: \"" + this.tipo_id + "\".";
                        return resultado;
                    }    
                }
                else if(this.tipo_id2 == "" && this.lista_tam_dim != undefined) // si la instruccion se declara con un arreglo
                {
                    
                    var temporal_contador = "t" + tabla_simbolos.classTemporal;
                    var temporal_posicion_stack_array = "t" + tabla_simbolos.classTemporal;
                    var temporal_posicion_heap_array = "t" + tabla_simbolos.classTemporal;
   
                    tabla_simbolos.classCodigo_3D = "\n";                                             
                    tabla_simbolos.classCodigo_3D = temporal_contador + " = 1;\n";
                    tabla_simbolos.classCodigo_3D = temporal_posicion_stack_array + " = P + " + ptr_entorno[0] + ";\n";
                    tabla_simbolos.classCodigo_3D = temporal_posicion_heap_array + " = H;\n";
                    tabla_simbolos.classCodigo_3D = "Stack[" + temporal_posicion_stack_array + "] = " + temporal_posicion_heap_array + ";\n"  
                    tabla_simbolos.classCodigo_3D = "H = H + 1;\n";

                    for(var i = 0; i < this.lista_tam_dim.length; i++)
                    {
                        var tam_dim  = new Simbolo();
                        tam_dim.classAcceso = tipo_acceso.publico;
                        tam_dim.classRol = tipo_rol.aceptado;
                        tam_dim.classTipo = tipo_dato_primitivo.entero;
                        tam_dim.classIdentificador = "10-4";
                        tam_dim.classValor = this.lista_tam_dim[i].length; 
                                            
                        tabla_simbolos.classCodigo_3D = "\n";
                        tabla_simbolos.classCodigo_3D = temporal_contador + " = " + temporal_contador + " * " + tam_dim.classValor + ";\n";
                        tabla_simbolos.classCodigo_3D = "Heap[" + temporal_posicion_heap_array + "] = " + tam_dim.classValor + ";\n";
                        tabla_simbolos.classCodigo_3D = temporal_posicion_heap_array + " = " + temporal_posicion_heap_array + " + 1;\n";
                        tabla_simbolos.classCodigo_3D = "H = H + 1;\n";     
                    }
                    
                    tabla_simbolos.classCodigo_3D = "\n";                                       
                    tabla_simbolos.classCodigo_3D = "H = H + " + temporal_contador + ";\n";
                    
                    for(var x = 0; x < this.lista_tam_dim.length; x++)
                    {
                        var lista_valores = this.lista_tam_dim[x];
                        for(var y = 0; y < lista_valores.length; y++)
                        {
                            var resultado_d : Simbolo;
                            if(lista_valores[y] instanceof Simbolo)
                            {
                                resultado_d = lista_valores[y];
                            } 
                            else if(lista_valores[y] instanceof Expresion)
                            {
                                resultado_d = lista_valores[y].ejecutar();
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

                            if(this.get_tipo_primitivo(this.tipo_id) == resultado_d.classTipo)
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
                                resultado.classValor = "Declaracion No realizada correctamente: No es posible asignar un valor del tipo \"" + resultado_d.classTipo + "\" a un arreglo del tipo: \"" + this.tipo_id + "\".";
                                return resultado;
                            }
                        }
                    }
                    var nuevo_arreglo  = new Simbolo();
                    nuevo_arreglo.classAcceso = tipo_acceso.publico;
                    nuevo_arreglo.classRol = tipo_rol.arreglo;
                    nuevo_arreglo.classTipo = this.get_tipo_primitivo(this.tipo_id);
                    nuevo_arreglo.classIdentificador = this.lista_id[0];
                    nuevo_arreglo.classValor = "Stack[" + temporal_posicion_stack_array + "]";
                    nuevo_arreglo.classPos = ptr_entorno[0];
                    nuevo_arreglo.classTam = this.lista_tam_dim.length;

                    ptr_entorno[0]++; 

                    if(!entorno_local.has(this.lista_id[0]))
                    {
                        entorno_local.set(this.lista_id[0], nuevo_arreglo);
                    }
                    else
                    {
                        tabla_simbolos.limpiar_3d();

                        var resultado  = new Simbolo();
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.error;
                        resultado.classTipo = tipo_dato_primitivo.cadena;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "Declaracion No realizada correctamente: el identficador \"" + this.lista_id[0] +  "\" ya existe en este contexto.";
                        return resultado;
                    }

                    var resultado  = new Simbolo();
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.cadena;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "Declaracion realizada correctamente";
                    return resultado;

                }
                else //solo se declarara
                {
                   
                    var etiqueta_contador = "t" + tabla_simbolos.classTemporal;
                    var etiqueta_posicion_stack_array = "t" + tabla_simbolos.classTemporal;
                    var etiqueta_posicion_heap_array = "t" + tabla_simbolos.classTemporal;

                    tabla_simbolos.classCodigo_3D = "\n";                                             
                    tabla_simbolos.classCodigo_3D = etiqueta_contador + " = 1;\n";
                    tabla_simbolos.classCodigo_3D = etiqueta_posicion_stack_array + " = P + " + ptr_entorno[0] + ";\n";
                    tabla_simbolos.classCodigo_3D = etiqueta_posicion_heap_array + " = H;\n";
                    tabla_simbolos.classCodigo_3D = "Stack[" + etiqueta_posicion_stack_array + "] = " + etiqueta_posicion_heap_array + ";\n"  

                    var nuevo_arreglo  = new Simbolo();
                    nuevo_arreglo.classAcceso = tipo_acceso.publico;
                    nuevo_arreglo.classRol = tipo_rol.arreglo;
                    nuevo_arreglo.classTipo = this.get_tipo_primitivo(this.tipo_id);
                    nuevo_arreglo.classIdentificador = this.lista_id[0];
                    nuevo_arreglo.classValor = "Stack[" + etiqueta_posicion_stack_array + "]";
                    nuevo_arreglo.classPos = ptr_entorno[0];
                    nuevo_arreglo.classTam = dimension_r.classValor;

                    ptr_entorno[0]++; 

                    if(!entorno_local.has(this.lista_id[0]))
                    {
                        entorno_local.set(this.lista_id[0], nuevo_arreglo);
                    }
                    else
                    {
                        tabla_simbolos.limpiar_3d();

                        var resultado  = new Simbolo();
                        resultado.classAcceso = tipo_acceso.publico;
                        resultado.classRol = tipo_rol.error;
                        resultado.classTipo = tipo_dato_primitivo.cadena;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "Declaracion No realizada correctamente: el identficador \"" + this.lista_id[0] +  "\" ya existe en este contexto.";
                        return resultado;
                    }

                    var resultado  = new Simbolo();
                    resultado.classAcceso = tipo_acceso.publico;
                    resultado.classRol = tipo_rol.aceptado;
                    resultado.classTipo = tipo_dato_primitivo.cadena;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "Declaración realizada correctamente";
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
                resultado.classValor = "Declaracion No realizada correctamente: Tipo de declaracion no valida";
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
            resultado.classValor = "Declaracion No realizada correctamente: " + Error.Message;
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

export default Sentencia_Declaracion_Instancia;