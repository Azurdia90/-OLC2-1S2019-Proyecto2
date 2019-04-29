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
import Metodo from "./Tabla_Simbolos/Metodo";
import Sentencia_LLamada from "./Sentencias/Sentencia_LLamada";
import Operador_Potencia from "./Expresiones/Expresiones_Unarias/Operador_Potencia";

class AST_CAAS
{
    private superjason : JSON;
    private lista_metodos : Array<Instruccion>;
    private entorno_temporal : Map<String,Simbolo>;

    constructor(psuperjason : JSON)
    {
        this.lista_metodos = new Array<Instruccion>();
        
        tabla_simbolos.limpiar();
        this.entorno_temporal = new Map<String,Simbolo>();        
        tabla_simbolos.classEntornos.agregar(this.entorno_temporal);
        
        this.superjason = psuperjason;                

        this.build_ast();
    }

    build_ast()
    {   
        for(var i :number = 0; i < this.superjason['lista_metodos'].length; i++ )
        {            
            var metodos = this.fabrica_metodos(this.superjason['lista_metodos'][i]);
            if(metodos != undefined)
            {
                tabla_simbolos.classLista_parametros.push(metodos);
            }            
        }
        this.exec_ast(this.lista_metodos);
    }

    exec_ast(lsita_instruccciones : Array<Instruccion>)
    {
        tabla_simbolos.classCodigo_3D = "\ncall main;\n";
        for(var i = 0; i < tabla_simbolos.classLista_parametros.length; i++)
        {            
            //console.log("cuantos valores tiene el entorno_global " + tabla_simbolos.classEntornos[0]);
            var resultado : Simbolo;
            resultado = tabla_simbolos.classLista_parametros[i].ejecutar(this.entorno_temporal);
            if(resultado.classRol == tipo_rol.error)
            {
                console.log("Algo Salio mal con el metodo, No. " +  i + ": " + resultado.classValor);
                break;
            }
        }    
        console.log("Se ejecutaron todas las sentencias");
        var bk_3d : string = tabla_simbolos.classCodigo_3D;
        var declaracion_etiquetas : string = this.build_declaracion_etiquetas();
        var declaracion_variables : string = this.build_declaracion_variables();
        var metodos_impresion : string = this.build_metodos_impresion();
        var final_3d : string;
        if(tabla_simbolos.classCodigo_3D != "")
        {
            final_3d  = declaracion_etiquetas + declaracion_variables + bk_3d + metodos_impresion;
        }
        else
        {
            final_3d = declaracion_etiquetas + declaracion_variables + bk_3d + metodos_impresion;
        }
        tabla_simbolos.limpiar_3d();
        tabla_simbolos.classCodigo_3D = final_3d;
    }

    build_declaracion_etiquetas()
    {
        var dec_etiquetas : string = "var ";
        var begin_etiquetas : number = 1;
        var end_etiquetas : number = tabla_simbolos.classTemporal_global;

        dec_etiquetas = dec_etiquetas + "t_g" + begin_etiquetas;

        for(var i = (begin_etiquetas + 1); i < end_etiquetas; i++)
        {
            dec_etiquetas = dec_etiquetas + ",t_g" + i;
        }
        
        return dec_etiquetas + ";\n";
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

        var proc_pow_potencia_entero : string;

        var proc_pow_potencia_decimal : string;

        var proc_impresion_entero : string;

        var proc_impresion_decimal : string;

        var proc_impresion_caracter : string;

        var proc_impresion_cadena : string;

        var proc_concatenacion_cadena : string;

        var proc_cast_boolean_cadena : string;

        var proc_cast_char_cadena : string;

        var proc_cast_int_cadena : string;

        var proc_cast_decimal_cadena : string;

        var proc_get_length_array : string;

        var all_proc_impresion : string;

        proc_impresion_booleano = "proc imprimir_booleano\n"
                                 +"begin\n"
                                 +"    var resultado,fin,retorno;\n"
                                 +"    var t1;\n"
                                 +"    fin = 10;\n"
                                 +"    retorno = 13;\n"  
                                 +"    t1 = P + 2;\n"
                                 +"    resultado = Stack[t1];\n"                               
                                 +"    if(resultado == 1) goto L0; \n"
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
                                +"    var resultado,fin,retorno;\n"
                                +"    var t1;\n"
                                +"    fin = 10;\n"
                                +"    retorno = 13;\n"
                                +"    t1 = P + 2;\n"
                                +"    resultado = Stack[t1];\n"
                                +"    print(\"%e\",resultado);\n"
                                +"    print(\"%c\",fin);\n"
                                +"    print(\"%c\",retorno);\n"
                                +"end\n";

        proc_impresion_decimal = "proc imprimir_decimal\n"
                                +"begin\n"
                                +"    var resultado,fin,retorno;\n"
                                +"    var t1;\n"
                                +"    fin = 10;\n"                                
                                +"    retorno = 13;\n"
                                +"    t1 = P + 2;\n"
                                +"    resultado = Stack[t1];\n"
                                +"    print(\"%d\",resultado);\n"
                                +"    print(\"%c\",fin);\n"
                                +"    print(\"%c\",retorno);\n"
                                +"end\n";

        proc_impresion_caracter = "proc imprimir_caracter\n"
                                +"begin\n"
                                +"    var resultado,fin,retorno;\n"
                                +"    var t1;\n"
                                +"    fin = 10;\n"
                                +"    retorno = 13;\n"
                                +"    t1 = P + 2;\n"
                                +"    resultado = Stack[t1];\n"
                                +"    print(\"%c\",resultado);\n"
                                +"    print(\"%c\",fin);\n"
                                +"    print(\"%c\",retorno);\n"
                                +"end\n";  
                                
        proc_impresion_cadena = "proc imprimir_cadena\n"
                               +"begin\n"
                               +"    var resultado,car,fin,retorno;\n"
                               +"    var t1;"
                               +"    fin = 10;\n"
                               +"    retorno = 13;\n"                     
                               +"    t1 = P + 2;\n"
                               +"    resultado = Stack[t1];\n"
                               +"    L2:\n"
                               +"    car = Heap[resultado];\n"
                               +"    if(car == 3) goto L3;\n"
                               +"    print(\"%c\",car);\n"
                               +"    resultado = resultado + 1;\n"
                               +"    goto L2;\n"
                               +"    L3:\n"                               
                               +"    print(\"%c\",fin);\n"
                               +"    print(\"%c\",retorno);\n"
                               +"end\n";
        
        proc_pow_potencia_entero = "proc pow_potencia_entero\n"
                                  +"begin\n"
                                  +"    var resultado,base,potencia;\n"
                                  +"    var cont,t0,t1,t2,t3;\n"
                                  +"    t1 = P + 2;\n"
                                  +"    base = Stack[t1];\n"
                                  +"    t2 = P + 3;\n"
                                  +"    potencia = Stack[t2];\n"
                                  +"    if(potencia!=0) goto L1;\n" 
                                  +"    resultado = 1;\n"
                                  +"    goto L0;"
                                  +"    L1:\n"
                                  +"    cont = 1;\n"
                                  +"    resultado = base;\n"
                                  +"    L2:\n"
                                  +"    if(cont >= potencia) goto L0;\n"
                                  +"    resultado = resultado * base;\n"
                                  +"    cont = cont + 1;\n"
                                  +"    goto L2;\n"
                                  +"    L0:\n"                               
                                  +"    t3 = P + 1;\n"
                                  +"    Stack[t3] = resultado;\n"
                                  +"end\n";
                                  
        proc_pow_potencia_decimal = "proc pow_potencia_decimal\n"
                                    +"begin\n"
                                    +"    var resultado,car,fin,retorno;\n"
                                    +"    var t1;"
                                    +"    fin = 10;\n"
                                    +"    retorno = 13;\n"                     
                                    +"    t1 = P + 2;\n"
                                    +"    resultado = Stack[t1];\n"
                                    +"    L2:\n"
                                    +"    car = Heap[resultado];\n"
                                    +"    if(car == 3) goto L3;\n"
                                    +"    print(\"%c\",car);\n"
                                    +"    resultado = resultado + 1;\n"
                                    +"    goto L2;\n"
                                    +"    L3:\n"                               
                                    +"    print(\"%c\",fin);\n"
                                    +"    print(\"%c\",retorno);\n"
                                    +"end\n";                                  
        
        proc_concatenacion_cadena = "proc concatenacion_cadena\n"
                                   +"begin\n"
                                   +"    var car1,car2,resultado;\n"
                                   +"    var p1,t1,p2,t2,t3;\n"
                                   +"    var cont;\n"
                                   +"    t1 = P + 2;\n"
                                   +"    t2 = P + 3;\n"
                                   +"    p1 = Stack[t1];\n"
                                   +"    p2 = Stack[t2];\n"
                                   +"    resultado = H;\n"
                                   +"    cont = resultado;\n"
                                   +"    L0:\n"
                                   +"    car1 = Heap[p1];\n"
                                   +"    if(car1 == 3) goto L1;\n"
                                   +"    Heap[cont] = car1;\n"
                                   +"    cont = cont + 1;\n"
                                   +"    p1 = p1 + 1;\n"
                                   +"    goto L0;\n"
                                   +"    L1:\n"
                                   +"    L2:\n"
                                   +"    car2 = Heap[p2];\n"
                                   +"    if(car2 == 3) goto L3;\n"
                                   +"    Heap[cont] = car2;\n"
                                   +"    cont = cont + 1;\n"
                                   +"    p2 = p2 + 1;\n"
                                   +"    goto L2;\n"
                                   +"    L3:\n"
                                   +"    Heap[cont] = 3;\n"
                                   +"    cont = cont + 1;\n"
                                   +"    H = cont + 1;\n"
                                   +"    t3 = P + 1;\n"
                                   +"    Stack[t3] = resultado;\n"
                                   +"end\n";

        proc_cast_boolean_cadena = "proc cast_boolean_cadena\n"
                                   +"begin\n"
                                   +"    var resultado,valor;\n"
                                   +"    var t1,t3,cont;\n"
                                   +"    t1 = P + 2;\n"
                                   +"    valor = Stack[t1];\n"                               
                                   +"    if(valor == 1) goto L0; \n"
                                   +"    var car_f,car_a,car_l,car_s,car_e;\n"
                                   +"    car_f = 102;\n"
                                   +"    car_a = 97;\n"
                                   +"    car_l = 108;\n"
                                   +"    car_s = 115;\n"
                                   +"    car_e = 101;\n"
                                   +"    resultado = H;\n"
                                   +"    cont = resultado;\n"
                                   +"    Heap[cont] = car_f;\n"
                                   +"    cont = cont + 1;\n"
                                   +"    Heap[cont] = car_a;\n"
                                   +"    cont = cont + 1;\n"
                                   +"    Heap[cont] = car_l;\n"
                                   +"    cont = cont + 1;\n"
                                   +"    Heap[cont] = car_s;\n"
                                   +"    cont = cont + 1;\n"
                                   +"    Heap[cont] = car_e;\n"
                                   +"    cont = cont + 1;\n"
                                   +"    goto L1;\n"
                                   +"    L0:\n"
                                   +"    var car_t,car_r,car_u,car_e;\n"
                                   +"    car_t = 116;\n"
                                   +"    car_r = 114;\n"
                                   +"    car_u = 117;\n"
                                   +"    car_e = 101;\n"
                                   +"    resultado = H;\n"
                                   +"    cont = resultado;\n"
                                   +"    Heap[cont] = car_t;\n"
                                   +"    cont = cont + 1;\n"
                                   +"    Heap[cont] = car_r;\n"
                                   +"    cont = cont + 1;\n"
                                   +"    Heap[cont] = car_u;\n" 
                                   +"    cont = cont + 1;\n"
                                   +"    Heap[cont] = car_e;\n" 
                                   +"    cont = cont + 1;\n"
                                   +"    L1:\n"
                                   +"    Heap[cont] = 3;\n" 
                                   +"    H = cont + 1;\n"
                                   +"    t3 = P + 1;\n"
                                   +"    Stack[t3] = resultado;\n"
                                   +"end\n";

        proc_cast_char_cadena = "proc cast_char_cadena\n"
                                +"begin\n"
                                +"    var resultado,valor;\n"
                                +"    var t1,t3,cont;\n"
                                +"    t1 = P + 2;\n"
                                +"    valor = Stack[t1];\n"                                                               
                                +"    resultado = H;\n"
                                +"    cont = resultado;\n"
                                +"    if(valor < 32) goto L1;\n"
                                +"    Heap[cont] = valor;\n"
                                +"    goto L0;\n"
                                +"    L1:\n"
                                +"    Heap[cont] = 32;\n"
                                +"    L0:"
                                +"    cont = cont + 1;\n"                                
                                +"    Heap[cont] = 3;\n" 
                                +"    H = cont + 1;\n"
                                +"    t3 = P + 1;\n"
                                +"    Stack[t3] = resultado;\n"
                                +"end\n";                                   

        proc_cast_int_cadena = "proc cast_int_cadena\n"
                                +"begin\n"
                                +"    var valor,valor_aux,base,ajuste,resultado;\n"
                                +"    var cont,dig,t1,t3;\n"
                                +"    base = 10;\n"
                                +"    t1 = P + 2;\n"
                                +"    valor = Stack[t1];\n"
                                +"    valor_aux = Stack[t1];\n"
                                +"    resultado = H;\n"
                                +"    cont = resultado;\n"
                                +"    if(valor == 0) goto L0;"
                                +"    goto L1;"
                                +"    L0:\n"
                                +"    Heap[cont] = 48 + 0;\n"
                                +"    cont = cont + 1;\n"
                                +"    Heap[cont] = 3;\n"
                                +"    cont = cont + 1;\n"
                                +"    H = cont + 1;\n"
                                +"    goto L2;\n"
                                +"    L1:\n"
                                +"    if(valor < 0) goto L3;\n" 
                                +"    goto L4;\n"
                                +"    L3:\n"                                
                                +"    Heap[cont] = 45;\n"
                                +"    cont = cont + 1;\n"
                                +"    valor = valor * -1;\n"
                                +"    valor_aux = valor_aux * -1;\n"  
                                +"    L4:\n"                                
                                +"    if(valor_aux >= 1) goto L5;\n"
                                +"    goto L6;\n"
                                +"    L5:\n" 
                                +"    valor_aux = valor_aux / base;\n"
                                +"    cont = cont + 1;\n"
                                +"    goto L4;\n"
                                +"    L6:\n"                                
                                +"    H = cont + 1;\n"
                                +"    Heap[cont] = 3;\n"
                                +"    cont = cont - 1;\n"
                                +"    L7:\n"
                                +"    dig = valor % base;\n"
                                +"    Heap[cont] = 48 + dig;\n"
                                +"    cont = cont - 1;\n"   
                                +"    ajuste = 10 - dig;\n"
                                +"    ajuste = ajuste / base;\n"
                                +"    valor = valor / base;\n"
                                +"    valor = valor + ajuste;\n"
                                +"    valor = valor - 1;\n"
                                +"    if(valor != 0) goto L7;\n"
                                +"    L2:\n"
                                +"    t3 = P + 1;\n"
                                +"    Stack[t3] = resultado;\n"
                                +"end\n";

        proc_cast_decimal_cadena =   "proc cast_decimal_cadena\n"
                                    +"begin\n"
                                    +"    var valor,valor_entero,valor_entero_aux,valor_decimal;\n"
                                    +"    var base,ajuste,resultado;\n"
                                    +"    var cont,cont2,dig,dig2,t1,t3;\n"
                                    +"    base = 10;\n"
                                    +"    t1 = P + 2;\n"
                                    +"    valor = Stack[t1];\n"
                                    +"    valor_decimal = valor % 1;\n"
                                    +"    valor_entero = valor - valor_decimal;\n"
                                    +"    valor_entero_aux  = valor_entero;\n"
                                    +"    resultado = H;\n"
                                    +"    cont = resultado;\n"
                                    +"    if(valor == 0) goto L0;\n"
                                    +"    goto L1;\n"
                                    +"    L0:\n"
                                    +"    Heap[cont] = 48 + 0;\n"
                                    +"    cont = cont + 1;\n"
                                    +"    Heap[cont] = 46;\n"
                                    +"    cont = cont + 1;\n"
                                    +"    Heap[cont] = 48 + 0;\n"
                                    +"    cont = cont + 1;\n"
                                    +"    Heap[cont] = 48 + 0;\n"
                                    +"    cont = cont + 1;\n"
                                    +"    Heap[cont] = 3;\n"
                                    +"    cont = cont + 1;\n"
                                    +"    H = cont + 1;\n"
                                    +"    goto L10;\n"
                                    +"    L1:\n"
                                    +"    if(valor < 0) goto L3;\n" 
                                    +"    goto L4;\n"
                                    +"    L3:\n"                                
                                    +"    Heap[cont] = 45;\n"
                                    +"    cont = cont + 1;\n"
                                    +"    valor_entero = valor_entero * -1;\n"
                                    +"    valor_entero_aux = valor_entero_aux * -1;\n"
                                    +"    valor_decimal = valor_decimal * -1;\n"
                                    +"    L4:\n"
                                    +"    if(valor_entero == 0) goto L5;\n"
                                    +"    goto L6;\n"
                                    +"    L5:\n"
                                    +"    Heap[cont] = 48 + 0;\n"
                                    +"    cont = cont + 1;\n"
                                    +"    goto L8;\n"
                                    +"    L6:\n"                                
                                    +"    if(valor_entero_aux >= 1) goto L7;\n"
                                    +"    goto L8;\n"
                                    +"    L7:\n" 
                                    +"    valor_entero_aux = valor_entero_aux / base;\n"
                                    +"    cont = cont + 1;\n"
                                    +"    goto L6;\n"
                                    +"    L8:\n"                                
                                    +"    cont2 = cont + 1;\n"
                                    +"    Heap[cont] = 46;\n"
                                    +"    cont = cont - 1;\n"
                                    +"    L9:\n"
                                    +"    dig = valor_entero % base;\n"
                                    +"    Heap[cont] = 48 + dig;\n"
                                    +"    cont = cont - 1;\n"   
                                    +"    ajuste = 10 - dig;\n"
                                    +"    ajuste = ajuste / base;\n"
                                    +"    valor_entero = valor_entero / base;\n"
                                    +"    valor_entero = valor_entero + ajuste;\n"
                                    +"    valor_entero = valor_entero - 1;\n"
                                    +"    if(valor_entero != 0) goto L9;\n"
                                    +"    L2:\n"
                                    +"    valor_decimal = valor_decimal * base;\n"
                                    +"    dig2 = valor_decimal;\n"
                                    +"    valor_decimal = valor_decimal % 1;\n"
                                    +"    dig2 = dig2 - valor_decimal;\n"
                                    +"    Heap[cont2] = 48 + dig2;\n"
                                    +"    cont2 = cont2 + 1;\n"
                                    +"    if(valor_decimal !=  0) goto L11;\n"
                                    +"    L11: \n"
                                    +"    if(dig2 != 0) goto L2;\n"
                                    +"    L10:\n"   
                                    +"    Heap[cont2] = 3;\n"
                                    +"    H = cont2 + 1;\n"
                                    +"    t3 = P + 1;\n"
                                    +"    cont2 = cont2 + 1;\n"
                                    +"    Stack[t3] = resultado;\n"
                                    +"end\n";
        
        proc_get_length_array = "proc get_length_array\n"
                                +"begin\n"
                                +"    var valor,car,resultado;\n"
                                +"    var t1,t3,cont;\n"
                                +"    t1 = P + 2;\n"
                                +"    valor = Stack[t1];\n"
                                +"    cont = 1;\n"
                                +"    car = Heap[valor];\n"
                                +"    if(car < 32) goto L1;\n"
                                +"    valor = valor + 1;\n"
                                +"    cont = cont + 1;"
                                +"    L1:\n"
                                +"    resultado = cont;"
                                +"    t3 = P + 1;\n"
                                +"    Stack[t3] = resultado;\n"
                                +"end\n";

        all_proc_impresion = "\n"+proc_impresion_booleano+"\n"+proc_impresion_entero+"\n"+proc_impresion_decimal+"\n"+proc_impresion_caracter+"\n"
                             +proc_impresion_cadena+"\n"+proc_pow_potencia_entero+"\n"+proc_pow_potencia_decimal+"\n"+proc_concatenacion_cadena+"\n"
                             +proc_cast_boolean_cadena+"\n"+proc_cast_char_cadena+"\n"+proc_cast_int_cadena+"\n"+proc_cast_decimal_cadena;

        return all_proc_impresion;
    }

    fabrica_metodos(jason : JSON)
    {
        if(jason['etiqueta'] == "metodo")
        {
            var lista_modificadores = new Array<tipo_acceso>();
            var tipo_metodo = this.get_tipo_primitivo(jason['tipo']);
            var identificador = jason['identificador'];
            var lista_parametros = new Array<Simbolo>();
            var lista_sentencias = new Array<Instruccion>();

            if(jason['parametros'] != undefined)
            {
                var subsuperjason = jason['parametros'];
                for(var i = 0; i < subsuperjason['lista_parametros'].length; i++)
                {                    
                    var parametro = this.fabrica_parametros(subsuperjason['lista_parametros'][i]);
                    if(parametro != undefined)
                    {
                        lista_parametros.push(parametro);
                    }                
                }
            }            
            var subsuperjason = jason['sentencias'];
            for(var i = 0; i < subsuperjason['sentencias'].length; i++)
            {
                var instruccion = this.fabrica_instrucciones(subsuperjason['sentencias'][i]);
                if(instruccion != undefined)
                {
                    lista_sentencias.push(instruccion);
                }                
            }

            var nuevo_metodo = new Metodo(lista_modificadores, tipo_metodo, identificador, lista_parametros, lista_sentencias);
            return nuevo_metodo;
        }
        else
        {
            console.log("esto no es un metodo");
        }
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
        else if(subsuperjason['etiqueta'] == "sentencia_llamada")
        {
            var lista_parametros = new Array<any>();
            if(subsuperjason['lista_parametros'] != undefined)
            {
                var subsubsuperjason = subsuperjason['lista_parametros']
                for(var i = 0; i < subsubsuperjason['expresiones'].length; i++)
                {
                    var instruccion = this.fabrica_expresiones(subsubsuperjason['expresiones'][i]);
                    if(instruccion != undefined)
                    {
                        lista_parametros.push(instruccion);
                    }                
                }
            }            
            var sentencia_llamada = new Sentencia_LLamada(subsuperjason['identificador'], lista_parametros);
            return sentencia_llamada;
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

    fabrica_expresiones(subsubsuperjason : JSON)
    {
        if(subsubsuperjason['etiqueta'] == "expresion")
        {
            this.fabrica_expresiones(subsubsuperjason['valor']);
        }
        else if(subsubsuperjason['etiqueta'] == "expresion_aritmetica")
        {                    
            if(subsubsuperjason['tipo'] == "+")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nueva_suma = new Suma(operador1,operador2);  
                return nueva_suma;              
            }
            else if(subsubsuperjason['tipo'] == "-")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nueva_resta = new Resta(operador1,operador2);  
                return nueva_resta; 
            }
            else if(subsubsuperjason['tipo'] == "*")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nueva_multiplicacion = new Multiplicacion(operador1,operador2);  
                return nueva_multiplicacion; 
            }
            else if(subsubsuperjason['tipo'] == "/")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nueva_division = new Division(operador1,operador2);  
                return nueva_division; 
            } 
            else if(subsubsuperjason['tipo'] == "%")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_modulo = new Modulo(operador1,operador2);  
                return nuevo_modulo; 
            }
        }
        else if(subsubsuperjason['etiqueta'] == "expresion_relacional")
        {
            if(subsubsuperjason['tipo'] == "<")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_menor_que = new Menor_Que(operador1,operador2);  
                return nuevo_menor_que;              
            }
            else if(subsubsuperjason['tipo'] == ">")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_mayor_que = new Mayor_Que(operador1,operador2);  
                return nuevo_mayor_que; 
            }
            else if(subsubsuperjason['tipo'] == "<=")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_menor_igual_que = new Menor_Igual_Que(operador1,operador2);  
                return nuevo_menor_igual_que; 
            }
            else if(subsubsuperjason['tipo'] == ">=")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_mayor_igual_que = new Mayor_Igual_Que(operador1,operador2);  
                return nuevo_mayor_igual_que; 
            } 
            else if(subsubsuperjason['tipo'] == "==")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_igual_que= new Igual_Que(operador1,operador2);  
                return nuevo_igual_que; 
            }
            else if(subsubsuperjason['tipo'] == "!=")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_diferente_que = new Diferente_Que(operador1,operador2);  
                return nuevo_diferente_que; 
            }
        }
        else if(subsubsuperjason['etiqueta'] == "expresion_logica")
        {
            if(subsubsuperjason['tipo'] == "&&")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_and = new And(operador1,operador2);  
                return nuevo_and;              
            }
            else if(subsubsuperjason['tipo'] == "||")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 : any = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_or = new Or(operador1,operador2);  
                return nuevo_or; 
            }
            else if(subsubsuperjason['tipo'] == "!")
            {
                var operador1 : any = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var nuevo_not = new Not(operador1);  
                return nuevo_not; 
            }
        }
        else if(subsubsuperjason['etiqueta'] == "expresion_unaria")
        {            
            this.fabrica_expresiones(subsubsuperjason['operador1']);            
        }
        else if(subsubsuperjason['etiqueta'] == "operador_ternario")
        {   
            var condicion = this.fabrica_expresiones(subsubsuperjason['comparacion']);
            var valor1 = this.fabrica_expresiones(subsubsuperjason['valor1']);      
            var valor2 = this.fabrica_expresiones(subsubsuperjason['valor2']);
            var operador_ternario  = new Operador_Ternario(condicion,valor1,valor2);
            return operador_ternario;
        }
        else if(subsubsuperjason['etiqueta'] == "operador_pow")
        {            
            var valor1 = this.fabrica_expresiones(subsubsuperjason['base']);
            var valor2 = this.fabrica_expresiones(subsubsuperjason['potencia']);
            console.log(subsubsuperjason);
            
            var operador_pow = new Operador_Potencia(valor1,valor2);
            return operador_pow;
        }
        else if(subsubsuperjason['etiqueta'] == 'sentencia_acceso')
        {
            var operador = new Simbolo();
            operador.classIdentificador = subsubsuperjason['identificador'];

            var lista_pos = new Array<any>();

            var nuevo_acceso;
            if(subsubsuperjason['tipo'] == 0)
            {
                nuevo_acceso = new Sentencia_Acceso(operador,subsubsuperjason['tipo'],subsubsuperjason['posicion']);
            }
            else if(subsubsuperjason['tipo'] == 1)
            {
                var subsubsubsuperjason = subsubsuperjason['posicion'];

                for(var i = 0; i < subsubsubsuperjason['lista_dimensiones'].length; i++)
                {
                    var json_expresion = subsubsubsuperjason['lista_dimensiones'][i];
                    var tamaño_dim = this.fabrica_expresiones(json_expresion['valor']);
                    if(tamaño_dim != undefined)
                    {
                        lista_pos.push(tamaño_dim);
                    }                        
                }
                nuevo_acceso = new Sentencia_Acceso(operador,subsubsuperjason['tipo'],lista_pos);
            }
            return nuevo_acceso;
        }
        else if(subsubsuperjason['etiqueta'] == "sentencia_llamada")
        {            
            var lista_parametros = new Array<any>();
            if(subsubsuperjason['lista_parametros'] != undefined)
            {
                var subsubsubsuperjason = subsubsuperjason['lista_parametros']
                for(var i = 0; i < subsubsubsuperjason['expresiones'].length; i++)
                {
                    var instruccion = this.fabrica_expresiones(subsubsubsuperjason['expresiones'][i]);
                    if(instruccion != undefined)
                    {
                        lista_parametros.push(instruccion);
                    }                
                }
            }            
            var sentencia_llamada = new Sentencia_LLamada(subsubsuperjason['identificador'], lista_parametros);
            return sentencia_llamada;
        }
        else if(subsubsuperjason['etiqueta'] == 'sentencia_incremento')
        {
            var operador = new Simbolo();
            operador.classValor = subsubsuperjason['identificador'];
            var nuevo_incremento = new Sentencia_Incremento(operador,subsubsuperjason['tipo'],subsubsuperjason['posicion']);
            return nuevo_incremento;
        }
        else if(subsubsuperjason['etiqueta'] == 'sentencia_decremento')
        {
            var operador = new Simbolo();
            operador.classValor = subsubsuperjason['identificador'];
            var nuevo_decremento = new Sentencia_Decremento(operador,subsubsuperjason['tipo'],subsubsuperjason['posicion']);
            return nuevo_decremento;
        }
        else if(subsubsuperjason['etiqueta'] == "valor_primitivo")
        {
            var nuevo_simbolo = new Simbolo();
            nuevo_simbolo.classAcceso = tipo_acceso.publico;
            nuevo_simbolo.classRol = tipo_rol.valor;                    
            nuevo_simbolo.classTipo = this.get_tipo_primitivo(subsubsuperjason['tipo']);
            nuevo_simbolo.classIdentificador = "10-4";

            if(nuevo_simbolo.classTipo == tipo_dato_primitivo.booleano)
            {
                nuevo_simbolo.classValor = subsubsuperjason['valor'] == "true" ? 1 : 0;
            }
            else if(nuevo_simbolo.classTipo == tipo_dato_primitivo.caracter)
            {                                
                var cadena:string = subsubsuperjason['valor'];                
                var caracter = cadena.charCodeAt(0);
                nuevo_simbolo.classValor =  caracter ;
            }
            else if(nuevo_simbolo.classTipo == tipo_dato_primitivo.cadena)
            {
                var cadena:string = subsubsuperjason['valor'];
                var temporal_pos_heap =  "t_g" + tabla_simbolos.classTemporal_global;

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
                nuevo_simbolo.classValor =  subsubsuperjason['valor'];    
            }
        
            return nuevo_simbolo;
        }
    }

    fabrica_parametros(subsuperjason : JSON)
    {
        var identificador = subsuperjason['identificador']['valor'];
        
        var parametro  = new Simbolo();
        parametro.classAcceso = tipo_acceso.publico;
        if(subsuperjason['estado'] == 0)
        {
            parametro.classRol = tipo_rol.arreglo;
        }
        else
        {
            parametro.classRol = tipo_rol.identificador;
        }        
        parametro.classTipo = this.get_tipo_primitivo(subsuperjason['tipo']);
        parametro.classIdentificador = identificador;
        parametro.classValor = "Pendiente";
        return parametro;
    }
    
    get_tipo_primitivo(p_tipo : String)
    {
        if(p_tipo == "booleano" || p_tipo == "boolean")
        {
            return tipo_dato_primitivo.booleano;
        }
        else if(p_tipo == "entero" || p_tipo == "int")
        {
            return tipo_dato_primitivo.entero;
        }
        else if(p_tipo == "decimal" || p_tipo == "double")
        {
            return tipo_dato_primitivo.decimal;
        }
        else if(p_tipo == "caracter" || p_tipo == "char")
        {
            return tipo_dato_primitivo.caracter;
        }
        else if(p_tipo == "cadena" || p_tipo == "String")
        {
            return tipo_dato_primitivo.cadena;
        }
        else if(p_tipo == "nulo" || p_tipo == "null" || p_tipo == "void")
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