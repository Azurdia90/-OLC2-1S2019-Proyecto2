import tabla_simbolos from "./Tabla_Simbolos/Tabla_Simbolos";
import Simbolo from "./Tabla_Simbolos/Simbolo";
import Instruccion from "./Instruccion";
import Sentencia_Declaracion from "./Sentencias/Sentencia_Declaracion";
import Sentencia_Imprimir from "./Sentencias/Sentencia_Imprimir";
import Suma from "./Expresiones/Expresiones_Aritmeticas/Suma";
import Resta from "./Expresiones/Expresiones_Aritmeticas/Resta";
import Multiplicacion from "./Expresiones/Expresiones_Aritmeticas/Multiplicacion";
import Division from "./Expresiones/Expresiones_Aritmeticas/Division";
import Modulo from "./Expresiones/Expresiones_Aritmeticas/Modulo";
import Menor_Que from "./Expresiones/Expresiones_Relacionales/Menor_Que";
import Mayor_Que from "./Expresiones/Expresiones_Relacionales/Mayor_Que";
import Menor_Igual_Que from "./Expresiones/Expresiones_Relacionales/Menor_Igual_Que";
import Mayor_Igual_Que from "./Expresiones/Expresiones_Relacionales/Mayor_Igual_Que";
import Igual_Que from "./Expresiones/Expresiones_Relacionales/Igual_Que";
import Diferente_Que from "./Expresiones/Expresiones_Relacionales/Diferente_Que";
import And from "./Expresiones/Expresiones_Logicas/And";
import Or from "./Expresiones/Expresiones_Logicas/Or";
import Not from "./Expresiones/Expresiones_Logicas/Not";
import Sentencia_Acceso from "./Expresiones/Expresiones_Unarias/Sentencia_Acceso";
import Sentencia_Declaracion_Instancia from "./Sentencias/Sentencia_Declaracion";
import Sentencia_Asignacion from "./Sentencias/Sentencia_Asignacion";
import Sentencia_If from "./Sentencias/Sentencia_If";
import Sentencia_While from "./Sentencias/Sentencia_While";
import Sentencia_Do_While from "./Sentencias/Sentencia_Do_While";
import Sentencia_Incremento from "./Expresiones/Expresiones_Unarias/Sentencia_Incremento";
import Sentencia_Decremento from "./Expresiones/Expresiones_Unarias/Sentencia_Decremento";
import Sentencia_For from "./Sentencias/Sentencia_For";
import Sentencia_Break from "./Sentencias/Sentencia_Break";
import Sentencia_Continue from "./Sentencias/Sentencia_Continue";
import Sentencia_Return from "./Sentencias/Sentencia_Return";
import Operador_Ternario from "./Expresiones/Expresiones_Unarias/Operador_Ternario";
import Sentencia_Switch from "./Sentencias/Sentencia_Switch";
import Sentencia_Caso from "./Sentencias/Sentencia_Caso";
import Sentencia_For_Each from "./Sentencias/Sentencia_For_Each";





class AST_CAAS
{
    private superjason : JSON;
    private lista_instrucciones : Array<Instruccion>;
    private entorno_temporal : Map<String,Simbolo>;

    private ptr_entorno: Array<number>;

    constructor(psuperjason : JSON)
    {
        this.lista_instrucciones = new Array<Instruccion>();
        
        tabla_simbolos.limpiar();
        this.entorno_temporal = new Map<String,Simbolo>();        
        tabla_simbolos.classEntornos.agregar(this.entorno_temporal);
        
        this.superjason = psuperjason;        

        this.ptr_entorno = new Array<number>();
        this.ptr_entorno[0] = 1;

        this.build_ast();
    }

    build_ast()
    {   
        for(var i :number = 0; i < this.superjason['sentencias'].length; i++ )
        {            
            var instruccion = this.fabrica_instrucciones(this.superjason['sentencias'][i]);
            if(instruccion != undefined)
            {
                this.lista_instrucciones.push(instruccion);    
            }            
        }
        this.exec_ast(this.lista_instrucciones);
    }

    exec_ast(lsita_instruccciones : Array<Instruccion>)
    {

        for(var i = 0; i < this.lista_instrucciones.length; i++)
        {            
            //console.log("cuantos valores tiene el entorno_global " + tabla_simbolos.classEntornos[0]);
            var resultado : Simbolo;
            resultado = this.lista_instrucciones[i].ejecutar(this.entorno_temporal, this.ptr_entorno);
            if(resultado.classRol == tipo_rol.error)
            {
                console.log("Algo Salio mal con la sentencia, No.: " +  i + ", " + resultado.classValor);
                break;
            }
        }    
        console.log("Se ejecutaron todas las sentencias");
        var bk_3d : string = tabla_simbolos.classCodigo_3D;
        var declaracion_etiquetas : string = this.build_declaracion_etiquetas();
        var declaracion_variables : string = this.build_declaracion_variables();
        var metodos_impresion : string = this.build_metodos_impresion();
        var final_3d : string = declaracion_etiquetas + declaracion_variables + bk_3d + metodos_impresion;
        tabla_simbolos.limpiar_3d();
        tabla_simbolos.classCodigo_3D = final_3d;
    }

    build_declaracion_etiquetas()
    {
        var dec_etiquetas_reser : string = "var t0,t1,t2,t3,t4;\n\n";
        var dec_etiquetas : string = "var ";
        var begin_etiquetas : number = 100;
        var end_etiquetas : number = tabla_simbolos.classTemporal;

        dec_etiquetas = dec_etiquetas + "t" + begin_etiquetas;

        for(var i = (begin_etiquetas + 1); i < end_etiquetas; i++)
        {
            dec_etiquetas = dec_etiquetas + ",t" + i;
        }
        
        var dec_etiquetas_final = dec_etiquetas_reser + dec_etiquetas + ";\n\n";
        
        return dec_etiquetas_final;
    }

    build_declaracion_variables()
    {
        var dec_ptr_heap_reser : string = "var Heap[];\n";
        var dec_ptr_stack_reser : string = "var Stack[];\n";
        var dec_heap_reser : string = "var H = 0;\n";
        var dec_stack_reser : string = "var P = 0;\n";
        var dec_variables : string = "var "; 

        dec_variables = dec_ptr_heap_reser + dec_ptr_stack_reser + dec_heap_reser + dec_stack_reser + '\n';
        
        return dec_variables;
    }

    build_metodos_impresion()
    {
        var proc_impresion_booleano : string;

        var proc_impresion_entero : string;

        var proc_impresion_decimal : string;

        var proc_impresion_caracter : string;

        var proc_impresion_cadena : string;

        var all_proc_impresion : string;

        proc_impresion_booleano = "proc imprimir_booleano\n"
                                 +"begin\n"
                                 +"    var fin,retorno;\n"
                                 +"    fin = 10;\n"
                                 +"    retorno = 13;\n"                                 
                                 +"    if(t0 == 1) goto L0; \n"
                                 +"    var car_f,car_a,car_l,car_s,car_e;\n"
                                 +"    car_f = 102;\n"
                                 +"    car_a = 97;\n"
                                 +"    car_l = 108;\n"
                                 +"    car_s = 115;\n"
                                 +"    car_e = 101;\n"
                                 +"    print(\"%c\",car_f);\n"
                                 +"    print(\"%c\",car_a);\n"
                                 +"    print(\"%c\",car_l);\n"
                                 +"    print(\"%c\",car_s);\n"
                                 +"    print(\"%c\",car_e);\n"
                                 +"    goto L1;\n"
                                 +"    L0:\n"
                                 +"    var car_t,car_r,car_u,car_e;\n"
                                 +"    car_t = 116;\n"
                                 +"    car_r = 114;\n"
                                 +"    car_u = 117;\n"
                                 +"    car_e = 101;\n"
                                 +"    print(\"%c\",car_t);\n"
                                 +"    print(\"%c\",car_r);\n"
                                 +"    print(\"%c\",car_u);\n" 
                                 +"    print(\"%c\",car_e);\n" 
                                 +"    L1:\n"
                                 +"    print(\"%c\",fin);\n"
                                 +"    print(\"%c\",retorno);\n"
                                 +"end\n";

        proc_impresion_entero = "proc imprimir_entero\n"
                                +"begin\n"
                                +"    var fin,retorno;\n"
                                +"    fin = 10;\n"
                                +"    retorno = 13;\n"
                                +"    print(\"%e\",t1);\n"
                                +"    print(\"%c\",fin);\n"
                                +"    print(\"%c\",retorno);\n"
                                +"end\n";

        proc_impresion_decimal = "proc imprimir_decimal\n"
                                +"begin\n"
                                +"    var fin,retorno;\n"
                                +"    fin = 10;\n"
                                +"    retorno = 13;\n"
                                +"    print(\"%d\",t2);\n"
                                +"    print(\"%c\",fin);\n"
                                +"    print(\"%c\",retorno);\n"
                                +"end\n";

        proc_impresion_caracter = "proc imprimir_caracter\n"
                                +"begin\n"
                                +"    var fin,retorno;\n"
                                +"    fin = 10;\n"
                                +"    retorno = 13;\n"
                                +"    print(\"%c\",t3);\n"
                                +"    print(\"%c\",fin);\n"
                                +"    print(\"%c\",retorno);\n"
                                +"end\n";  
                                
        proc_impresion_cadena = "proc imprimir_cadena\n"
                               +"begin\n"
                               +"    var tmp,car,fin,retorno;\n"
                               +"    fin = 10;\n"
                               +"    retorno = 13;\n"                               
                               +"    L2:\n"
                               +"    car = Heap[t4];\n"
                               +"    if(car == 3) goto L3;\n"
                               +"    print(\"%c\",car);\n"
                               +"    t4 = t4 + 1;\n"
                               +"    goto L2;\n"
                               +"    L3:\n"                               
                               +"    print(\"%c\",fin);\n"
                               +"    print(\"%c\",retorno);\n"
                               +"end\n";

        all_proc_impresion = "\n"+proc_impresion_booleano+"\n"+proc_impresion_entero+"\n"+proc_impresion_decimal+"\n"+proc_impresion_caracter+"\n"+proc_impresion_cadena;

        return all_proc_impresion;
    }

    fabrica_instrucciones(subsuperjason : JSON)
    {    
        if(subsuperjason['etiqueta'] == "sentencia_declaracion_instancia")
        {
            var expresion: any;
            var lista_tam_dim : Array<any> = new Array<any>();

            if(subsuperjason['tipo'] == 0)
            {
                if(subsuperjason['valor'] != undefined)
                {
                    expresion = this.fabrica_expresiones(subsuperjason['valor']);
                }                
            }
            else if(subsuperjason['tipo'] == 1)
            {
                expresion = new Simbolo();
                expresion.classAcceso = tipo_acceso.publico;
                expresion.classRol = tipo_rol.aceptado;
                expresion.classTipo = tipo_dato_primitivo.entero;
                expresion.classIdentificador = "10-4";
                expresion.classValor = subsuperjason['posicion'];
                
                if(subsuperjason['tipo_valor2'] != "")
                {
                    if(subsuperjason['posicion2'] != undefined)
                    {
                        var subsubsuperjason = subsuperjason['posicion2'];
    
                        for(var i = 0; i < subsubsuperjason['lista_dimensiones'].length; i++)
                        {
                            var json_expresion = subsubsuperjason['lista_dimensiones'][i];
                            var tamaño_dim = this.fabrica_expresiones(json_expresion['valor']);
                            if(tamaño_dim != undefined)
                            {
                                lista_tam_dim.push(tamaño_dim);
                            }                        
                        }                    
                    }
                }
                else
                {                                        
                    var subsubsuperjason = subsuperjason['posicion2'];                    
                    var subsubsubsuperjason = subsubsuperjason['valor'];
                    //recorrido de dimesiones
                    for(var x = 0; x < subsubsubsuperjason['lista_dimensiones'].length; x++)
                    {                        
                        var subsubsubsubsuperjason = subsubsubsuperjason['lista_dimensiones'][x];
                        var json_dimensiones = subsubsubsubsuperjason['valor'];
                        var json_expresiones = json_dimensiones['expresiones'];
                        
                        var lista_valores_dim = new Array<any>();
                        lista_tam_dim.push(lista_valores_dim);

                        for(var y = 0; y < json_expresiones.length; y++)
                        {
                            var expresion_r = this.fabrica_expresiones(json_expresiones[y]);
                            if(expresion_r != undefined)
                            {
                                lista_valores_dim.push(expresion_r);
                            }
                        }                                               
                    }
                }                
            }

            var sentencia_declaracion = new Sentencia_Declaracion_Instancia(subsuperjason['tipo'],subsuperjason['tipo_valor'],subsuperjason['identificador'],expresion,subsuperjason['tipo_valor2'],lista_tam_dim);
            return  sentencia_declaracion;
        }    
        else if(subsuperjason['etiqueta'] == "sentencia_asignacion")
        {
            var expresion: any;
            var posicion: any;

            var sentencia_asignacion;
            
            if(subsuperjason['tipo'] == 0)
            {
                if(subsuperjason['tipo_valor'] == undefined)
                {
                    expresion = this.fabrica_expresiones(subsuperjason['valor']);
                }
                else if(subsuperjason['tipo_valor'] != "")
                {
                    var subsubsuperjason = subsuperjason['valor'];
                    expresion = new Array<any>();

                    for(var i = 0; i < subsubsuperjason['lista_dimensiones'].length; i++)
                    {
                        var json_expresion = subsubsuperjason['lista_dimensiones'][i];
                        var tamaño_dim = this.fabrica_expresiones(json_expresion['valor']);
                        if(tamaño_dim != undefined)
                        {
                            expresion.push(tamaño_dim);
                        }                        
                    }
                }
                else if(subsuperjason['tipo_valor'] == "")
                {
                    expresion = new Array<any>();
                    var subsubsuperjason = subsuperjason['valor'];                    
                    var subsubsubsuperjason = subsubsuperjason['valor'];
                    //recorrido de dimesiones
                    for(var x = 0; x < subsubsubsuperjason['lista_dimensiones'].length; x++)
                    {                        
                        var subsubsubsubsuperjason = subsubsubsuperjason['lista_dimensiones'][x];
                        var json_dimensiones = subsubsubsubsuperjason['valor'];
                        var json_expresiones = json_dimensiones['expresiones'];
                        
                        var lista_valores_dim = new Array<any>();
                        expresion.push(lista_valores_dim);

                        for(var y = 0; y < json_expresiones.length; y++)
                        {
                            var expresion_r = this.fabrica_expresiones(json_expresiones[y]);
                            if(expresion_r != undefined)
                            {
                                lista_valores_dim.push(expresion_r);
                            }
                        }                                               
                    }

                }                
            }   
            else if(subsuperjason['tipo'] == 1)
            {                
                expresion = this.fabrica_expresiones(subsuperjason['valor']);
                posicion = new Array<any>();

                var subsubsuperjason = subsuperjason['posicion'];
                for(var i = 0; i < subsubsuperjason['lista_dimensiones'].length; i++)
                {
                    var json_expresion = subsubsuperjason['lista_dimensiones'][i];
                    var tamaño_dim = this.fabrica_expresiones(json_expresion['valor']);
                    if(tamaño_dim != undefined)
                    {
                        posicion.push(tamaño_dim);
                    }                        
                }                            
            }
            sentencia_asignacion = new Sentencia_Asignacion(subsuperjason['identificador'],subsuperjason['tipo'],subsuperjason['tipo_valor'],expresion, posicion);
            return  sentencia_asignacion;
        }
        else if(subsuperjason['etiqueta'] == "sentencia_if")
        {
            var condicion : any  = this.fabrica_expresiones(subsuperjason['condicion']);
            var lista_sentencias = new Array<Instruccion>();
            var lista_sentencias_else_if = new Array<Instruccion>();
            var lista_sentencias_else = new Array<Instruccion>();            

            var subsubsuperjason = subsuperjason['sentencias'];
            for(var i = 0; i < subsubsuperjason['sentencias'].length; i++)
            {
                var instruccion = this.fabrica_instrucciones(subsubsuperjason['sentencias'][i]);
                if(instruccion != undefined)
                {
                    lista_sentencias.push(instruccion);
                }                
            }

            if(subsuperjason['lista_else_if'] != undefined)
            {
                var subsubsuperjason = subsuperjason['lista_else_if'];
                for(var i = 0; i < subsubsuperjason['sentencias_else_if'].length; i++)
                {
                    var instruccion = this.fabrica_instrucciones(subsubsuperjason['sentencias_else_if'][i]);
                    if(instruccion != undefined)
                    {
                        lista_sentencias_else_if.push(instruccion);
                    }                    
                }
            }
            
            if(subsuperjason['sentencias_else'] != undefined)
            {
                var subsubsuperjason = subsuperjason['sentencias_else'];
                for(var i = 0; i < subsubsuperjason['sentencias'].length; i++)
                {
                    var instruccion = this.fabrica_instrucciones(subsubsuperjason['sentencias'][i]);
                    if(instruccion != undefined)
                    {
                        lista_sentencias_else.push(instruccion);
                    }                    
                }
            }
            
            var sentencia_if = new Sentencia_If(subsuperjason['tipo'],condicion,lista_sentencias,lista_sentencias_else_if,lista_sentencias_else);

            return sentencia_if;
        }
        else if(subsuperjason['etiqueta'] == "sentencia_switch")
        {
            var condicion : any  = this.fabrica_expresiones(subsuperjason['condicion']);
            var lista_casos = new Array<Sentencia_Caso>();
            var lista_sentencias : Array<Instruccion>;

            var subsubsuperjason = subsuperjason['lista_casos'];
            for(var x = 0; x < subsubsuperjason['lista_casos'].length; x++)
            {
                var subsubsubsuperjason = subsubsuperjason['lista_casos'][x];                
                var expresion = this.fabrica_expresiones(subsubsubsuperjason['valor']);
                
                var subsubsubsubsuperjason = subsubsubsuperjason['sentencias'];
                lista_sentencias = new Array<Instruccion>();
                for(var y=0; y < subsubsubsubsuperjason['sentencias'].length; y++)
                {
                    var sentencia = this.fabrica_instrucciones(subsubsubsubsuperjason['sentencias'][y]);
                    if(sentencia != undefined)
                    {
                        lista_sentencias.push(sentencia);
                    }                    
                }                
                var caso_nuevo = new Sentencia_Caso(expresion,lista_sentencias);  
                lista_casos.push(caso_nuevo);              
            }
            
            var subsubsuperjason = subsuperjason['defecto'];   
            var json_sentencia =  subsubsuperjason['sentencias']['sentencias'];
            lista_sentencias = new Array<Instruccion>();
            console.log(json_sentencia);
            for(var i = 0; i < json_sentencia.length; i++)
            {                                
                var instruccion = this.fabrica_instrucciones(json_sentencia[i]);
                if(instruccion != undefined)
                {
                    lista_sentencias.push(instruccion);
                }
            }
            
            var sentencia_switch = new Sentencia_Switch(condicion,lista_casos,lista_sentencias);
            return sentencia_switch;
        }
        else if(subsuperjason['etiqueta'] == "sentencia_do_while")
        {
            var condicion : any  = this.fabrica_expresiones(subsuperjason['condicion']);
            var lista_sentencias = new Array<Instruccion>();

            var subsubsuperjason = subsuperjason['sentencias'];
            for(var i = 0; i < subsubsuperjason['sentencias'].length; i++)
            {
                var instruccion = this.fabrica_instrucciones(subsubsuperjason['sentencias'][i]);
                if(instruccion != undefined)
                {
                    lista_sentencias.push(instruccion);
                }                
            }

            var sentencia_do_while = new Sentencia_Do_While(condicion,lista_sentencias);
            return sentencia_do_while;
        }
        else if(subsuperjason['etiqueta'] == "sentencia_while")
        {
            var condicion : any  = this.fabrica_expresiones(subsuperjason['condicion']);
            var lista_sentencias = new Array<Instruccion>();

            var subsubsuperjason = subsuperjason['sentencias'];
            for(var i = 0; i < subsubsuperjason['sentencias'].length; i++)
            {
                var instruccion = this.fabrica_instrucciones(subsubsuperjason['sentencias'][i]);
                if(instruccion != undefined)
                {
                    lista_sentencias.push(instruccion);
                }                
            }

            var sentencia_while = new Sentencia_While(condicion,lista_sentencias);
            return sentencia_while;
        } 
        else if(subsuperjason['etiqueta'] == "sentencia_for")
        {
            var inicio : any  = this.fabrica_instrucciones(subsuperjason['inicio']);
            var condicion : any  = this.fabrica_expresiones(subsuperjason['condicion']);
            var actualizacion : any  = this.fabrica_expresiones(subsuperjason['actualizacion']);

            var lista_sentencias = new Array<Instruccion>();

            var subsubsuperjason = subsuperjason['sentencias'];
            for(var i = 0; i < subsubsuperjason['sentencias'].length; i++)
            {
                var instruccion = this.fabrica_instrucciones(subsubsuperjason['sentencias'][i]);
                if(instruccion != undefined)
                {
                    lista_sentencias.push(instruccion);
                }                
            }

            var sentencia_for = new Sentencia_For(inicio,condicion,actualizacion,lista_sentencias);
            return sentencia_for;
        } 
        else if(subsuperjason['etiqueta'] == "sentencia_for_each")
        {            
            //console.log(subsuperjason['inicio']);
            var declaracion : any  = this.fabrica_instrucciones(subsuperjason['inicio']);
            var valor : any  = this.fabrica_expresiones(subsuperjason['valor']);
            var lista_sentencias = new Array<Instruccion>();            
            
            var subsubsuperjason = subsuperjason['sentencias'];
            for(var i = 0; i < subsubsuperjason['sentencias'].length; i++)
            {
                var instruccion = this.fabrica_instrucciones(subsubsuperjason['sentencias'][i]);
                if(instruccion != undefined)
                {
                    lista_sentencias.push(instruccion);
                }                
            }

            var sentencia_for_each = new Sentencia_For_Each(declaracion,valor,lista_sentencias);
            return sentencia_for_each;
        } 
        else if(subsuperjason['etiqueta'] == "sentencia_break")
        {            
            var sentencia_break = new Sentencia_Break(subsuperjason['etiqueta']);
            return  sentencia_break;
        }
        else if(subsuperjason['etiqueta'] == "sentencia_continue")
        {            
            var sentencia_continue = new Sentencia_Continue(subsuperjason['etiqueta']);
            return  sentencia_continue;
        }
        else if(subsuperjason['etiqueta'] == "sentencia_return")
        {     
            var expresion: any = this.fabrica_expresiones(subsuperjason['valor']);       
            var sentencia_return = new Sentencia_Return(subsuperjason['etiqueta'], expresion);
            return  sentencia_return;
        }        
        else if(subsuperjason['etiqueta'] == "sentencia_imprimir")
        {
            var expresion: any = this.fabrica_expresiones(subsuperjason['valor']);
            var sentencia_imprimir = new Sentencia_Imprimir(expresion);
            return  sentencia_imprimir;
        }
        else if(subsuperjason['etiqueta'] == 'sentencia_incremento')
        {
            var operador = new Simbolo();
            operador.classValor = subsuperjason['identificador'];
            var nuevo_incremento = new Sentencia_Incremento(operador,subsuperjason['tipo'],subsuperjason['posicion']);
            return nuevo_incremento;
        }
        else if(subsuperjason['etiqueta'] == 'sentencia_decremento')
        {
            var operador = new Simbolo();
            operador.classValor = subsuperjason['identificador'];
            var nuevo_decremento = new Sentencia_Decremento(operador,subsuperjason['tipo'],subsuperjason['posicion']);
            return nuevo_decremento;
        }
        else
        {
            console.log("etiqueta no reconocida: " + subsuperjason['etiqueta'] );
        }        
    } 

    fabrica_expresiones(subsubsuperrjason : JSON)
    {
        if(subsubsuperrjason['etiqueta'] == "expresion")
        {
            this.fabrica_expresiones(subsubsuperrjason['valor']);
        }
        else if(subsubsuperrjason['etiqueta'] == "expresion_aritmetica")
        {                    
            if(subsubsuperrjason['tipo'] == "+")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nueva_suma = new Suma(operador1,operador2);  
                return nueva_suma;              
            }
            else if(subsubsuperrjason['tipo'] == "-")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nueva_resta = new Resta(operador1,operador2);  
                return nueva_resta; 
            }
            else if(subsubsuperrjason['tipo'] == "*")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nueva_multiplicacion = new Multiplicacion(operador1,operador2);  
                return nueva_multiplicacion; 
            }
            else if(subsubsuperrjason['tipo'] == "/")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nueva_division = new Division(operador1,operador2);  
                return nueva_division; 
            } 
            else if(subsubsuperrjason['tipo'] == "%")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_modulo = new Modulo(operador1,operador2);  
                return nuevo_modulo; 
            }
        }
        else if(subsubsuperrjason['etiqueta'] == "expresion_relacional")
        {
            if(subsubsuperrjason['tipo'] == "<")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_menor_que = new Menor_Que(operador1,operador2);  
                return nuevo_menor_que;              
            }
            else if(subsubsuperrjason['tipo'] == ">")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_mayor_que = new Mayor_Que(operador1,operador2);  
                return nuevo_mayor_que; 
            }
            else if(subsubsuperrjason['tipo'] == "<=")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_menor_igual_que = new Menor_Igual_Que(operador1,operador2);  
                return nuevo_menor_igual_que; 
            }
            else if(subsubsuperrjason['tipo'] == ">=")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_mayor_igual_que = new Mayor_Igual_Que(operador1,operador2);  
                return nuevo_mayor_igual_que; 
            } 
            else if(subsubsuperrjason['tipo'] == "==")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_igual_que= new Igual_Que(operador1,operador2);  
                return nuevo_igual_que; 
            }
            else if(subsubsuperrjason['tipo'] == "!=")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_diferente_que = new Diferente_Que(operador1,operador2);  
                return nuevo_diferente_que; 
            }
        }
        else if(subsubsuperrjason['etiqueta'] == "expresion_logica")
        {
            if(subsubsuperrjason['tipo'] == "&&")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_and = new And(operador1,operador2);  
                return nuevo_and;              
            }
            else if(subsubsuperrjason['tipo'] == "||")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_or = new Or(operador1,operador2);  
                return nuevo_or; 
            }
            else if(subsubsuperrjason['tipo'] == "!")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var nuevo_not = new Not(operador1);  
                return nuevo_not; 
            }
        }
        else if(subsubsuperrjason['etiqueta'] == "expresion_unaria")
        {            
            this.fabrica_expresiones(subsubsuperrjason['operador1']);            
        }
        else if(subsubsuperrjason['etiqueta'] == "operador_ternario")
        {   
            var condicion = this.fabrica_expresiones(subsubsuperrjason['comparacion']);
            var valor1 = this.fabrica_expresiones(subsubsuperrjason['valor1']);      
            var valor2 = this.fabrica_expresiones(subsubsuperrjason['valor2']);
            var operador_ternario  = new Operador_Ternario(condicion,valor1,valor2);
            return operador_ternario;
        }
        else if(subsubsuperrjason['etiqueta'] == 'sentencia_acceso')
        {
            var operador = new Simbolo();
            operador.classIdentificador = subsubsuperrjason['identificador'];

            var lista_pos = new Array<any>();

            var nuevo_acceso;
            if(subsubsuperrjason['tipo'] == 0)
            {
                nuevo_acceso = new Sentencia_Acceso(operador,subsubsuperrjason['tipo'],subsubsuperrjason['posicion']);
            }
            else if(subsubsuperrjason['tipo'] == 1)
            {
                var subsubsubsuperjason = subsubsuperrjason['posicion'];

                for(var i = 0; i < subsubsubsuperjason['lista_dimensiones'].length; i++)
                {
                    var json_expresion = subsubsubsuperjason['lista_dimensiones'][i];
                    var tamaño_dim = this.fabrica_expresiones(json_expresion['valor']);
                    if(tamaño_dim != undefined)
                    {
                        lista_pos.push(tamaño_dim);
                    }                        
                }
                nuevo_acceso = new Sentencia_Acceso(operador,subsubsuperrjason['tipo'],lista_pos);
            }
            return nuevo_acceso;
        }
        else if(subsubsuperrjason['etiqueta'] == 'sentencia_incremento')
        {
            var operador = new Simbolo();
            operador.classValor = subsubsuperrjason['identificador'];
            var nuevo_incremento = new Sentencia_Incremento(operador,subsubsuperrjason['tipo'],subsubsuperrjason['posicion']);
            return nuevo_incremento;
        }
        else if(subsubsuperrjason['etiqueta'] == 'sentencia_decremento')
        {
            var operador = new Simbolo();
            operador.classValor = subsubsuperrjason['identificador'];
            var nuevo_decremento = new Sentencia_Decremento(operador,subsubsuperrjason['tipo'],subsubsuperrjason['posicion']);
            return nuevo_decremento;
        }
        else if(subsubsuperrjason['etiqueta'] == "valor_primitivo")
        {
            var nuevo_simbolo = new Simbolo();
            nuevo_simbolo.classAcceso = tipo_acceso.publico;
            nuevo_simbolo.classRol = tipo_rol.valor;                    
            nuevo_simbolo.classTipo = this.get_tipo_primitivo(subsubsuperrjason['tipo']);
            nuevo_simbolo.classIdentificador = "10-4";

            if(nuevo_simbolo.classTipo == tipo_dato_primitivo.caracter)
            {               
                console.log("si entro a caracter");                 
                var cadena:string = subsubsuperrjason['valor'];                
                var caracter = cadena.charCodeAt(0);
                nuevo_simbolo.classValor =  caracter ;
            }
            else if(nuevo_simbolo.classTipo == tipo_dato_primitivo.cadena)
            {
                var cadena:string = subsubsuperrjason['valor'];
                var temporal_pos_heap =  "t" + tabla_simbolos.classTemporal;

                tabla_simbolos.classCodigo_3D = "\n";
                tabla_simbolos.classCodigo_3D = temporal_pos_heap + " =  H;\n";
                for(var i = 0; i < cadena.length; i++)
                {
                    var caracter= cadena.charCodeAt(i);
                    tabla_simbolos.classCodigo_3D = "Heap[H] = " + caracter + ";\n";
                    tabla_simbolos.classCodigo_3D = "H = H + 1;\n";                    
                }
                tabla_simbolos.classCodigo_3D = "Heap[H] = 3;\n";
                tabla_simbolos.classCodigo_3D = "H = H + 1;\n";

                nuevo_simbolo.classValor =  temporal_pos_heap;
                nuevo_simbolo.classPos = 0;
                nuevo_simbolo.classTam = cadena.length; 
            }
            else
            {
                nuevo_simbolo.classValor =  subsubsuperrjason['valor'];    
            }
        
            return nuevo_simbolo;
        }
    }
    
    get_tipo_primitivo(p_tipo : String)
    {
        if(p_tipo == "booleano")
        {
            return tipo_dato_primitivo.booleano;
        }
        else if(p_tipo == "entero")
        {
            return tipo_dato_primitivo.entero;
        }
        else if(p_tipo == "decimal")
        {
            return tipo_dato_primitivo.decimal;
        }
        else if(p_tipo == "caracter")
        {
            return tipo_dato_primitivo.caracter;
        }
        else if(p_tipo == "cadena")
        {
            return tipo_dato_primitivo.cadena;
        }
        else if(p_tipo == "nulo")
        {
            return tipo_dato_primitivo.nulo;
        }
        else
        {
            return tipo_dato_primitivo.error;
        }
    }    
}

export default AST_CAAS;