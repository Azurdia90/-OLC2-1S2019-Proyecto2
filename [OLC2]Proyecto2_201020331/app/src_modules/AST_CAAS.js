"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Tabla_Simbolos_1 = __importDefault(require("./Tabla_Simbolos/Tabla_Simbolos"));
var Simbolo_1 = __importDefault(require("./Tabla_Simbolos/Simbolo"));
var Sentencia_Imprimir_1 = __importDefault(require("./Sentencias/Sentencia_Imprimir"));
var Suma_1 = __importDefault(require("./Expresiones/Expresiones_Aritmeticas/Suma"));
var Resta_1 = __importDefault(require("./Expresiones/Expresiones_Aritmeticas/Resta"));
var Multiplicacion_1 = __importDefault(require("./Expresiones/Expresiones_Aritmeticas/Multiplicacion"));
var Division_1 = __importDefault(require("./Expresiones/Expresiones_Aritmeticas/Division"));
var Modulo_1 = __importDefault(require("./Expresiones/Expresiones_Aritmeticas/Modulo"));
var Menor_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Menor_Que"));
var Mayor_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Mayor_Que"));
var Menor_Igual_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Menor_Igual_Que"));
var Mayor_Igual_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Mayor_Igual_Que"));
var Igual_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Igual_Que"));
var Diferente_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Diferente_Que"));
var And_1 = __importDefault(require("./Expresiones/Expresiones_Logicas/And"));
var Or_1 = __importDefault(require("./Expresiones/Expresiones_Logicas/Or"));
var Not_1 = __importDefault(require("./Expresiones/Expresiones_Logicas/Not"));
var Sentencia_Acceso_1 = __importDefault(require("./Expresiones/Expresiones_Unarias/Sentencia_Acceso"));
var Sentencia_Declaracion_1 = __importDefault(require("./Sentencias/Sentencia_Declaracion"));
var Sentencia_Asignacion_1 = __importDefault(require("./Sentencias/Sentencia_Asignacion"));
var Sentencia_If_1 = __importDefault(require("./Sentencias/Sentencia_If"));
var Sentencia_While_1 = __importDefault(require("./Sentencias/Sentencia_While"));
var Sentencia_Do_While_1 = __importDefault(require("./Sentencias/Sentencia_Do_While"));
var Sentencia_Incremento_1 = __importDefault(require("./Expresiones/Expresiones_Unarias/Sentencia_Incremento"));
var Sentencia_Decremento_1 = __importDefault(require("./Expresiones/Expresiones_Unarias/Sentencia_Decremento"));
var Sentencia_For_1 = __importDefault(require("./Sentencias/Sentencia_For"));
var Sentencia_Break_1 = __importDefault(require("./Sentencias/Sentencia_Break"));
var Sentencia_Continue_1 = __importDefault(require("./Sentencias/Sentencia_Continue"));
var Sentencia_Return_1 = __importDefault(require("./Sentencias/Sentencia_Return"));
var Operador_Ternario_1 = __importDefault(require("./Expresiones/Expresiones_Unarias/Operador_Ternario"));
var Sentencia_Switch_1 = __importDefault(require("./Sentencias/Sentencia_Switch"));
var Sentencia_Caso_1 = __importDefault(require("./Sentencias/Sentencia_Caso"));
var Sentencia_For_Each_1 = __importDefault(require("./Sentencias/Sentencia_For_Each"));
var Metodo_1 = __importDefault(require("./Tabla_Simbolos/Metodo"));
var Sentencia_LLamada_1 = __importDefault(require("./Sentencias/Sentencia_LLamada"));
var Operador_Potencia_1 = __importDefault(require("./Expresiones/Expresiones_Unarias/Operador_Potencia"));
var AST_CAAS = /** @class */ (function () {
    function AST_CAAS(psuperjason) {
        this.lista_metodos = new Array();
        Tabla_Simbolos_1.default.limpiar();
        this.entorno_temporal = new Map();
        Tabla_Simbolos_1.default.classEntornos.agregar(this.entorno_temporal);
        this.superjason = psuperjason;
        this.build_ast();
    }
    AST_CAAS.prototype.build_ast = function () {
        for (var i = 0; i < this.superjason['lista_metodos'].length; i++) {
            var metodos = this.fabrica_metodos(this.superjason['lista_metodos'][i]);
            if (metodos != undefined) {
                Tabla_Simbolos_1.default.classLista_parametros.push(metodos);
            }
        }
        this.exec_ast(this.lista_metodos);
    };
    AST_CAAS.prototype.exec_ast = function (lsita_instruccciones) {
        Tabla_Simbolos_1.default.classCodigo_3D = "\ncall main;\n";
        for (var i = 0; i < Tabla_Simbolos_1.default.classLista_parametros.length; i++) {
            //console.log("cuantos valores tiene el entorno_global " + tabla_simbolos.classEntornos[0]);
            var resultado;
            resultado = Tabla_Simbolos_1.default.classLista_parametros[i].ejecutar(this.entorno_temporal);
            if (resultado.classRol == 10 /* error */) {
                console.log("Algo Salio mal con el metodo, No. " + i + ": " + resultado.classValor);
                break;
            }
        }
        console.log("Se ejecutaron todas las sentencias");
        var bk_3d = Tabla_Simbolos_1.default.classCodigo_3D;
        var declaracion_etiquetas = this.build_declaracion_etiquetas();
        var declaracion_variables = this.build_declaracion_variables();
        var metodos_impresion = this.build_metodos_impresion();
        var final_3d;
        if (Tabla_Simbolos_1.default.classCodigo_3D != "") {
            final_3d = declaracion_etiquetas + declaracion_variables + bk_3d + metodos_impresion;
        }
        else {
            final_3d = declaracion_etiquetas + declaracion_variables + bk_3d + metodos_impresion;
        }
        Tabla_Simbolos_1.default.limpiar_3d();
        Tabla_Simbolos_1.default.classCodigo_3D = final_3d;
    };
    AST_CAAS.prototype.build_declaracion_etiquetas = function () {
        var dec_etiquetas = "var ";
        var begin_etiquetas = 1;
        var end_etiquetas = Tabla_Simbolos_1.default.classTemporal_global;
        dec_etiquetas = dec_etiquetas + "t_g" + begin_etiquetas;
        for (var i = (begin_etiquetas + 1); i < end_etiquetas; i++) {
            dec_etiquetas = dec_etiquetas + ",t_g" + i;
        }
        return dec_etiquetas + ";\n";
    };
    AST_CAAS.prototype.build_declaracion_variables = function () {
        var dec_ptr_heap_reser = "var Heap[];\n";
        var dec_ptr_stack_reser = "var Stack[];\n";
        var dec_heap_reser = "var H = 0;\n";
        var dec_stack_reser = "var P = 0;\n";
        var dec_variables = "var ";
        dec_variables = dec_ptr_heap_reser + dec_ptr_stack_reser + dec_heap_reser + dec_stack_reser + '\n';
        return dec_variables;
    };
    AST_CAAS.prototype.build_metodos_impresion = function () {
        var proc_impresion_booleano;
        var proc_pow_potencia_entero;
        var proc_pow_potencia_decimal;
        var proc_impresion_entero;
        var proc_impresion_decimal;
        var proc_impresion_caracter;
        var proc_impresion_cadena;
        var proc_concatenacion_cadena;
        var proc_cast_boolean_cadena;
        var proc_cast_char_cadena;
        var proc_cast_int_cadena;
        var proc_cast_decimal_cadena;
        var proc_get_length_array;
        var all_proc_impresion;
        proc_impresion_booleano = "proc imprimir_booleano\n"
            + "begin\n"
            + "    var resultado,fin,retorno;\n"
            + "    var t1;\n"
            + "    fin = 10;\n"
            + "    retorno = 13;\n"
            + "    t1 = P + 2;\n"
            + "    resultado = Stack[t1];\n"
            + "    if(resultado == 1) goto L0; \n"
            + "    var car_f,car_a,car_l,car_s,car_e;\n"
            + "    car_f = 102;\n"
            + "    car_a = 97;\n"
            + "    car_l = 108;\n"
            + "    car_s = 115;\n"
            + "    car_e = 101;\n"
            + "    print(\"%c\",car_f);\n"
            + "    print(\"%c\",car_a);\n"
            + "    print(\"%c\",car_l);\n"
            + "    print(\"%c\",car_s);\n"
            + "    print(\"%c\",car_e);\n"
            + "    goto L1;\n"
            + "    L0:\n"
            + "    var car_t,car_r,car_u,car_e;\n"
            + "    car_t = 116;\n"
            + "    car_r = 114;\n"
            + "    car_u = 117;\n"
            + "    car_e = 101;\n"
            + "    print(\"%c\",car_t);\n"
            + "    print(\"%c\",car_r);\n"
            + "    print(\"%c\",car_u);\n"
            + "    print(\"%c\",car_e);\n"
            + "    L1:\n"
            + "    print(\"%c\",fin);\n"
            + "    print(\"%c\",retorno);\n"
            + "end\n";
        proc_impresion_entero = "proc imprimir_entero\n"
            + "begin\n"
            + "    var resultado,fin,retorno;\n"
            + "    var t1;\n"
            + "    fin = 10;\n"
            + "    retorno = 13;\n"
            + "    t1 = P + 2;\n"
            + "    resultado = Stack[t1];\n"
            + "    print(\"%e\",resultado);\n"
            + "    print(\"%c\",fin);\n"
            + "    print(\"%c\",retorno);\n"
            + "end\n";
        proc_impresion_decimal = "proc imprimir_decimal\n"
            + "begin\n"
            + "    var resultado,fin,retorno;\n"
            + "    var t1;\n"
            + "    fin = 10;\n"
            + "    retorno = 13;\n"
            + "    t1 = P + 2;\n"
            + "    resultado = Stack[t1];\n"
            + "    print(\"%d\",resultado);\n"
            + "    print(\"%c\",fin);\n"
            + "    print(\"%c\",retorno);\n"
            + "end\n";
        proc_impresion_caracter = "proc imprimir_caracter\n"
            + "begin\n"
            + "    var resultado,fin,retorno;\n"
            + "    var t1;\n"
            + "    fin = 10;\n"
            + "    retorno = 13;\n"
            + "    t1 = P + 2;\n"
            + "    resultado = Stack[t1];\n"
            + "    print(\"%c\",resultado);\n"
            + "    print(\"%c\",fin);\n"
            + "    print(\"%c\",retorno);\n"
            + "end\n";
        proc_impresion_cadena = "proc imprimir_cadena\n"
            + "begin\n"
            + "    var resultado,car,fin,retorno;\n"
            + "    var t1;"
            + "    fin = 10;\n"
            + "    retorno = 13;\n"
            + "    t1 = P + 2;\n"
            + "    resultado = Stack[t1];\n"
            + "    L2:\n"
            + "    car = Heap[resultado];\n"
            + "    if(car == 3) goto L3;\n"
            + "    print(\"%c\",car);\n"
            + "    resultado = resultado + 1;\n"
            + "    goto L2;\n"
            + "    L3:\n"
            + "    print(\"%c\",fin);\n"
            + "    print(\"%c\",retorno);\n"
            + "end\n";
        proc_pow_potencia_entero = "proc pow_potencia_entero\n"
            + "begin\n"
            + "    var resultado,base,potencia;\n"
            + "    var cont,t0,t1,t2,t3;\n"
            + "    t1 = P + 2;\n"
            + "    base = Stack[t1];\n"
            + "    t2 = P + 3;\n"
            + "    potencia = Stack[t2];\n"
            + "    if(potencia!=0) goto L1;\n"
            + "    resultado = 1;\n"
            + "    goto L0;"
            + "    L1:\n"
            + "    cont = 1;\n"
            + "    resultado = base;\n"
            + "    L2:\n"
            + "    if(cont >= potencia) goto L0;\n"
            + "    resultado = resultado * base;\n"
            + "    cont = cont + 1;\n"
            + "    goto L2;\n"
            + "    L0:\n"
            + "    t3 = P + 1;\n"
            + "    Stack[t3] = resultado;\n"
            + "end\n";
        proc_pow_potencia_decimal = "proc pow_potencia_decimal\n"
            + "begin\n"
            + "    var resultado,car,fin,retorno;\n"
            + "    var t1;"
            + "    fin = 10;\n"
            + "    retorno = 13;\n"
            + "    t1 = P + 2;\n"
            + "    resultado = Stack[t1];\n"
            + "    L2:\n"
            + "    car = Heap[resultado];\n"
            + "    if(car == 3) goto L3;\n"
            + "    print(\"%c\",car);\n"
            + "    resultado = resultado + 1;\n"
            + "    goto L2;\n"
            + "    L3:\n"
            + "    print(\"%c\",fin);\n"
            + "    print(\"%c\",retorno);\n"
            + "end\n";
        proc_concatenacion_cadena = "proc concatenacion_cadena\n"
            + "begin\n"
            + "    var car1,car2,resultado;\n"
            + "    var p1,t1,p2,t2,t3;\n"
            + "    var cont;\n"
            + "    t1 = P + 2;\n"
            + "    t2 = P + 3;\n"
            + "    p1 = Stack[t1];\n"
            + "    p2 = Stack[t2];\n"
            + "    resultado = H;\n"
            + "    cont = resultado;\n"
            + "    L0:\n"
            + "    car1 = Heap[p1];\n"
            + "    if(car1 == 3) goto L1;\n"
            + "    Heap[cont] = car1;\n"
            + "    cont = cont + 1;\n"
            + "    p1 = p1 + 1;\n"
            + "    goto L0;\n"
            + "    L1:\n"
            + "    L2:\n"
            + "    car2 = Heap[p2];\n"
            + "    if(car2 == 3) goto L3;\n"
            + "    Heap[cont] = car2;\n"
            + "    cont = cont + 1;\n"
            + "    p2 = p2 + 1;\n"
            + "    goto L2;\n"
            + "    L3:\n"
            + "    Heap[cont] = 3;\n"
            + "    cont = cont + 1;\n"
            + "    H = cont + 1;\n"
            + "    t3 = P + 1;\n"
            + "    Stack[t3] = resultado;\n"
            + "end\n";
        proc_cast_boolean_cadena = "proc cast_boolean_cadena\n"
            + "begin\n"
            + "    var resultado,valor;\n"
            + "    var t1,t3,cont;\n"
            + "    t1 = P + 2;\n"
            + "    valor = Stack[t1];\n"
            + "    if(valor == 1) goto L0; \n"
            + "    var car_f,car_a,car_l,car_s,car_e;\n"
            + "    car_f = 102;\n"
            + "    car_a = 97;\n"
            + "    car_l = 108;\n"
            + "    car_s = 115;\n"
            + "    car_e = 101;\n"
            + "    resultado = H;\n"
            + "    cont = resultado;\n"
            + "    Heap[cont] = car_f;\n"
            + "    cont = cont + 1;\n"
            + "    Heap[cont] = car_a;\n"
            + "    cont = cont + 1;\n"
            + "    Heap[cont] = car_l;\n"
            + "    cont = cont + 1;\n"
            + "    Heap[cont] = car_s;\n"
            + "    cont = cont + 1;\n"
            + "    Heap[cont] = car_e;\n"
            + "    cont = cont + 1;\n"
            + "    goto L1;\n"
            + "    L0:\n"
            + "    var car_t,car_r,car_u,car_e;\n"
            + "    car_t = 116;\n"
            + "    car_r = 114;\n"
            + "    car_u = 117;\n"
            + "    car_e = 101;\n"
            + "    resultado = H;\n"
            + "    cont = resultado;\n"
            + "    Heap[cont] = car_t;\n"
            + "    cont = cont + 1;\n"
            + "    Heap[cont] = car_r;\n"
            + "    cont = cont + 1;\n"
            + "    Heap[cont] = car_u;\n"
            + "    cont = cont + 1;\n"
            + "    Heap[cont] = car_e;\n"
            + "    cont = cont + 1;\n"
            + "    L1:\n"
            + "    Heap[cont] = 3;\n"
            + "    H = cont + 1;\n"
            + "    t3 = P + 1;\n"
            + "    Stack[t3] = resultado;\n"
            + "end\n";
        proc_cast_char_cadena = "proc cast_char_cadena\n"
            + "begin\n"
            + "    var resultado,valor;\n"
            + "    var t1,t3,cont;\n"
            + "    t1 = P + 2;\n"
            + "    valor = Stack[t1];\n"
            + "    resultado = H;\n"
            + "    cont = resultado;\n"
            + "    if(valor < 32) goto L1;\n"
            + "    Heap[cont] = valor;\n"
            + "    goto L0;\n"
            + "    L1:\n"
            + "    Heap[cont] = 32;\n"
            + "    L0:"
            + "    cont = cont + 1;\n"
            + "    Heap[cont] = 3;\n"
            + "    H = cont + 1;\n"
            + "    t3 = P + 1;\n"
            + "    Stack[t3] = resultado;\n"
            + "end\n";
        proc_cast_int_cadena = "proc cast_int_cadena\n"
            + "begin\n"
            + "    var valor,valor_aux,base,ajuste,resultado;\n"
            + "    var cont,dig,t1,t3;\n"
            + "    base = 10;\n"
            + "    t1 = P + 2;\n"
            + "    valor = Stack[t1];\n"
            + "    valor_aux = Stack[t1];\n"
            + "    resultado = H;\n"
            + "    cont = resultado;\n"
            + "    if(valor == 0) goto L0;"
            + "    goto L1;"
            + "    L0:\n"
            + "    Heap[cont] = 48 + 0;\n"
            + "    cont = cont + 1;\n"
            + "    Heap[cont] = 3;\n"
            + "    cont = cont + 1;\n"
            + "    H = cont + 1;\n"
            + "    goto L2;\n"
            + "    L1:\n"
            + "    if(valor < 0) goto L3;\n"
            + "    goto L4;\n"
            + "    L3:\n"
            + "    Heap[cont] = 45;\n"
            + "    cont = cont + 1;\n"
            + "    valor = valor * -1;\n"
            + "    valor_aux = valor_aux * -1;\n"
            + "    L4:\n"
            + "    if(valor_aux >= 1) goto L5;\n"
            + "    goto L6;\n"
            + "    L5:\n"
            + "    valor_aux = valor_aux / base;\n"
            + "    cont = cont + 1;\n"
            + "    goto L4;\n"
            + "    L6:\n"
            + "    H = cont + 1;\n"
            + "    Heap[cont] = 3;\n"
            + "    cont = cont - 1;\n"
            + "    L7:\n"
            + "    dig = valor % base;\n"
            + "    Heap[cont] = 48 + dig;\n"
            + "    cont = cont - 1;\n"
            + "    ajuste = 10 - dig;\n"
            + "    ajuste = ajuste / base;\n"
            + "    valor = valor / base;\n"
            + "    valor = valor + ajuste;\n"
            + "    valor = valor - 1;\n"
            + "    if(valor != 0) goto L7;\n"
            + "    L2:\n"
            + "    t3 = P + 1;\n"
            + "    Stack[t3] = resultado;\n"
            + "end\n";
        proc_cast_decimal_cadena = "proc cast_decimal_cadena\n"
            + "begin\n"
            + "    var valor,valor_entero,valor_entero_aux,valor_decimal;\n"
            + "    var base,ajuste,resultado;\n"
            + "    var cont,cont2,dig,dig2,t1,t3;\n"
            + "    base = 10;\n"
            + "    t1 = P + 2;\n"
            + "    valor = Stack[t1];\n"
            + "    valor_decimal = valor % 1;\n"
            + "    valor_entero = valor - valor_decimal;\n"
            + "    valor_entero_aux  = valor_entero;\n"
            + "    resultado = H;\n"
            + "    cont = resultado;\n"
            + "    if(valor == 0) goto L0;\n"
            + "    goto L1;\n"
            + "    L0:\n"
            + "    Heap[cont] = 48 + 0;\n"
            + "    cont = cont + 1;\n"
            + "    Heap[cont] = 46;\n"
            + "    cont = cont + 1;\n"
            + "    Heap[cont] = 48 + 0;\n"
            + "    cont = cont + 1;\n"
            + "    Heap[cont] = 48 + 0;\n"
            + "    cont = cont + 1;\n"
            + "    Heap[cont] = 3;\n"
            + "    cont = cont + 1;\n"
            + "    H = cont + 1;\n"
            + "    goto L10;\n"
            + "    L1:\n"
            + "    if(valor < 0) goto L3;\n"
            + "    goto L4;\n"
            + "    L3:\n"
            + "    Heap[cont] = 45;\n"
            + "    cont = cont + 1;\n"
            + "    valor_entero = valor_entero * -1;\n"
            + "    valor_entero_aux = valor_entero_aux * -1;\n"
            + "    valor_decimal = valor_decimal * -1;\n"
            + "    L4:\n"
            + "    if(valor_entero == 0) goto L5;\n"
            + "    goto L6;\n"
            + "    L5:\n"
            + "    Heap[cont] = 48 + 0;\n"
            + "    cont = cont + 1;\n"
            + "    goto L8;\n"
            + "    L6:\n"
            + "    if(valor_entero_aux >= 1) goto L7;\n"
            + "    goto L8;\n"
            + "    L7:\n"
            + "    valor_entero_aux = valor_entero_aux / base;\n"
            + "    cont = cont + 1;\n"
            + "    goto L6;\n"
            + "    L8:\n"
            + "    cont2 = cont + 1;\n"
            + "    Heap[cont] = 46;\n"
            + "    cont = cont - 1;\n"
            + "    L9:\n"
            + "    dig = valor_entero % base;\n"
            + "    Heap[cont] = 48 + dig;\n"
            + "    cont = cont - 1;\n"
            + "    ajuste = 10 - dig;\n"
            + "    ajuste = ajuste / base;\n"
            + "    valor_entero = valor_entero / base;\n"
            + "    valor_entero = valor_entero + ajuste;\n"
            + "    valor_entero = valor_entero - 1;\n"
            + "    if(valor_entero != 0) goto L9;\n"
            + "    L2:\n"
            + "    valor_decimal = valor_decimal * base;\n"
            + "    dig2 = valor_decimal;\n"
            + "    valor_decimal = valor_decimal % 1;\n"
            + "    dig2 = dig2 - valor_decimal;\n"
            + "    Heap[cont2] = 48 + dig2;\n"
            + "    cont2 = cont2 + 1;\n"
            + "    if(valor_decimal !=  0) goto L11;\n"
            + "    L11: \n"
            + "    if(dig2 != 0) goto L2;\n"
            + "    L10:\n"
            + "    Heap[cont2] = 3;\n"
            + "    H = cont2 + 1;\n"
            + "    t3 = P + 1;\n"
            + "    cont2 = cont2 + 1;\n"
            + "    Stack[t3] = resultado;\n"
            + "end\n";
        proc_get_length_array = "proc get_length_array\n"
            + "begin\n"
            + "    var valor,car,resultado;\n"
            + "    var t1,t3,cont;\n"
            + "    t1 = P + 2;\n"
            + "    valor = Stack[t1];\n"
            + "    cont = 1;\n"
            + "    car = Heap[valor];\n"
            + "    if(car < 32) goto L1;\n"
            + "    valor = valor + 1;\n"
            + "    cont = cont + 1;"
            + "    L1:\n"
            + "    resultado = cont;"
            + "    t3 = P + 1;\n"
            + "    Stack[t3] = resultado;\n"
            + "end\n";
        all_proc_impresion = "\n" + proc_impresion_booleano + "\n" + proc_impresion_entero + "\n" + proc_impresion_decimal + "\n" + proc_impresion_caracter + "\n"
            + proc_impresion_cadena + "\n" + proc_pow_potencia_entero + "\n" + proc_pow_potencia_decimal + "\n" + proc_concatenacion_cadena + "\n"
            + proc_cast_boolean_cadena + "\n" + proc_cast_char_cadena + "\n" + proc_cast_int_cadena + "\n" + proc_cast_decimal_cadena;
        return all_proc_impresion;
    };
    AST_CAAS.prototype.fabrica_metodos = function (jason) {
        if (jason['etiqueta'] == "metodo") {
            var lista_modificadores = new Array();
            var tipo_metodo = this.get_tipo_primitivo(jason['tipo']);
            var identificador = jason['identificador'];
            var lista_parametros = new Array();
            var lista_sentencias = new Array();
            if (jason['parametros'] != undefined) {
                var subsuperjason = jason['parametros'];
                for (var i = 0; i < subsuperjason['lista_parametros'].length; i++) {
                    var parametro = this.fabrica_parametros(subsuperjason['lista_parametros'][i]);
                    if (parametro != undefined) {
                        lista_parametros.push(parametro);
                    }
                }
            }
            var subsuperjason = jason['sentencias'];
            for (var i = 0; i < subsuperjason['sentencias'].length; i++) {
                var instruccion = this.fabrica_instrucciones(subsuperjason['sentencias'][i]);
                if (instruccion != undefined) {
                    lista_sentencias.push(instruccion);
                }
            }
            var nuevo_metodo = new Metodo_1.default(lista_modificadores, tipo_metodo, identificador, lista_parametros, lista_sentencias);
            return nuevo_metodo;
        }
        else {
            console.log("esto no es un metodo");
        }
    };
    AST_CAAS.prototype.fabrica_instrucciones = function (subsuperjason) {
        if (subsuperjason['etiqueta'] == "sentencia_declaracion_instancia") {
            var expresion;
            var lista_tam_dim = new Array();
            if (subsuperjason['tipo'] == 0) {
                if (subsuperjason['valor'] != undefined) {
                    expresion = this.fabrica_expresiones(subsuperjason['valor']);
                }
            }
            else if (subsuperjason['tipo'] == 1) {
                expresion = new Simbolo_1.default();
                expresion.classAcceso = 0 /* publico */;
                expresion.classRol = 9 /* aceptado */;
                expresion.classTipo = 2 /* entero */;
                expresion.classIdentificador = "10-4";
                expresion.classValor = subsuperjason['posicion'];
                if (subsuperjason['tipo_valor2'] != "") {
                    if (subsuperjason['posicion2'] != undefined) {
                        var subsubsuperjason = subsuperjason['posicion2'];
                        for (var i = 0; i < subsubsuperjason['lista_dimensiones'].length; i++) {
                            var json_expresion = subsubsuperjason['lista_dimensiones'][i];
                            var tamaño_dim = this.fabrica_expresiones(json_expresion['valor']);
                            if (tamaño_dim != undefined) {
                                lista_tam_dim.push(tamaño_dim);
                            }
                        }
                    }
                }
                else {
                    var subsubsuperjason = subsuperjason['posicion2'];
                    var subsubsubsuperjason = subsubsuperjason['valor'];
                    //recorrido de dimesiones
                    for (var x = 0; x < subsubsubsuperjason['lista_dimensiones'].length; x++) {
                        var subsubsubsubsuperjason = subsubsubsuperjason['lista_dimensiones'][x];
                        var json_dimensiones = subsubsubsubsuperjason['valor'];
                        var json_expresiones = json_dimensiones['expresiones'];
                        var lista_valores_dim = new Array();
                        lista_tam_dim.push(lista_valores_dim);
                        for (var y = 0; y < json_expresiones.length; y++) {
                            var expresion_r = this.fabrica_expresiones(json_expresiones[y]);
                            if (expresion_r != undefined) {
                                lista_valores_dim.push(expresion_r);
                            }
                        }
                    }
                }
            }
            var sentencia_declaracion = new Sentencia_Declaracion_1.default(subsuperjason['tipo'], subsuperjason['tipo_valor'], subsuperjason['identificador'], expresion, subsuperjason['tipo_valor2'], lista_tam_dim);
            return sentencia_declaracion;
        }
        else if (subsuperjason['etiqueta'] == "sentencia_asignacion") {
            var expresion;
            var posicion;
            var sentencia_asignacion;
            if (subsuperjason['tipo'] == 0) {
                if (subsuperjason['tipo_valor'] == undefined) {
                    expresion = this.fabrica_expresiones(subsuperjason['valor']);
                }
                else if (subsuperjason['tipo_valor'] != "") {
                    var subsubsuperjason = subsuperjason['valor'];
                    expresion = new Array();
                    for (var i = 0; i < subsubsuperjason['lista_dimensiones'].length; i++) {
                        var json_expresion = subsubsuperjason['lista_dimensiones'][i];
                        var tamaño_dim = this.fabrica_expresiones(json_expresion['valor']);
                        if (tamaño_dim != undefined) {
                            expresion.push(tamaño_dim);
                        }
                    }
                }
                else if (subsuperjason['tipo_valor'] == "") {
                    expresion = new Array();
                    var subsubsuperjason = subsuperjason['valor'];
                    var subsubsubsuperjason = subsubsuperjason['valor'];
                    //recorrido de dimesiones
                    for (var x = 0; x < subsubsubsuperjason['lista_dimensiones'].length; x++) {
                        var subsubsubsubsuperjason = subsubsubsuperjason['lista_dimensiones'][x];
                        var json_dimensiones = subsubsubsubsuperjason['valor'];
                        var json_expresiones = json_dimensiones['expresiones'];
                        var lista_valores_dim = new Array();
                        expresion.push(lista_valores_dim);
                        for (var y = 0; y < json_expresiones.length; y++) {
                            var expresion_r = this.fabrica_expresiones(json_expresiones[y]);
                            if (expresion_r != undefined) {
                                lista_valores_dim.push(expresion_r);
                            }
                        }
                    }
                }
            }
            else if (subsuperjason['tipo'] == 1) {
                expresion = this.fabrica_expresiones(subsuperjason['valor']);
                posicion = new Array();
                var subsubsuperjason = subsuperjason['posicion'];
                for (var i = 0; i < subsubsuperjason['lista_dimensiones'].length; i++) {
                    var json_expresion = subsubsuperjason['lista_dimensiones'][i];
                    var tamaño_dim = this.fabrica_expresiones(json_expresion['valor']);
                    if (tamaño_dim != undefined) {
                        posicion.push(tamaño_dim);
                    }
                }
            }
            sentencia_asignacion = new Sentencia_Asignacion_1.default(subsuperjason['identificador'], subsuperjason['tipo'], subsuperjason['tipo_valor'], expresion, posicion);
            return sentencia_asignacion;
        }
        else if (subsuperjason['etiqueta'] == "sentencia_if") {
            var condicion = this.fabrica_expresiones(subsuperjason['condicion']);
            var lista_sentencias = new Array();
            var lista_sentencias_else_if = new Array();
            var lista_sentencias_else = new Array();
            var subsubsuperjason = subsuperjason['sentencias'];
            for (var i = 0; i < subsubsuperjason['sentencias'].length; i++) {
                var instruccion = this.fabrica_instrucciones(subsubsuperjason['sentencias'][i]);
                if (instruccion != undefined) {
                    lista_sentencias.push(instruccion);
                }
            }
            if (subsuperjason['lista_else_if'] != undefined) {
                var subsubsuperjason = subsuperjason['lista_else_if'];
                for (var i = 0; i < subsubsuperjason['sentencias_else_if'].length; i++) {
                    var instruccion = this.fabrica_instrucciones(subsubsuperjason['sentencias_else_if'][i]);
                    if (instruccion != undefined) {
                        lista_sentencias_else_if.push(instruccion);
                    }
                }
            }
            if (subsuperjason['sentencias_else'] != undefined) {
                var subsubsuperjason = subsuperjason['sentencias_else'];
                for (var i = 0; i < subsubsuperjason['sentencias'].length; i++) {
                    var instruccion = this.fabrica_instrucciones(subsubsuperjason['sentencias'][i]);
                    if (instruccion != undefined) {
                        lista_sentencias_else.push(instruccion);
                    }
                }
            }
            var sentencia_if = new Sentencia_If_1.default(subsuperjason['tipo'], condicion, lista_sentencias, lista_sentencias_else_if, lista_sentencias_else);
            return sentencia_if;
        }
        else if (subsuperjason['etiqueta'] == "sentencia_switch") {
            var condicion = this.fabrica_expresiones(subsuperjason['condicion']);
            var lista_casos = new Array();
            var lista_sentencias;
            var subsubsuperjason = subsuperjason['lista_casos'];
            for (var x = 0; x < subsubsuperjason['lista_casos'].length; x++) {
                var subsubsubsuperjason = subsubsuperjason['lista_casos'][x];
                var expresion = this.fabrica_expresiones(subsubsubsuperjason['valor']);
                var subsubsubsubsuperjason = subsubsubsuperjason['sentencias'];
                lista_sentencias = new Array();
                for (var y = 0; y < subsubsubsubsuperjason['sentencias'].length; y++) {
                    var sentencia = this.fabrica_instrucciones(subsubsubsubsuperjason['sentencias'][y]);
                    if (sentencia != undefined) {
                        lista_sentencias.push(sentencia);
                    }
                }
                var caso_nuevo = new Sentencia_Caso_1.default(expresion, lista_sentencias);
                lista_casos.push(caso_nuevo);
            }
            var subsubsuperjason = subsuperjason['defecto'];
            var json_sentencia = subsubsuperjason['sentencias']['sentencias'];
            lista_sentencias = new Array();
            for (var i = 0; i < json_sentencia.length; i++) {
                var instruccion = this.fabrica_instrucciones(json_sentencia[i]);
                if (instruccion != undefined) {
                    lista_sentencias.push(instruccion);
                }
            }
            var sentencia_switch = new Sentencia_Switch_1.default(condicion, lista_casos, lista_sentencias);
            return sentencia_switch;
        }
        else if (subsuperjason['etiqueta'] == "sentencia_do_while") {
            var condicion = this.fabrica_expresiones(subsuperjason['condicion']);
            var lista_sentencias = new Array();
            var subsubsuperjason = subsuperjason['sentencias'];
            for (var i = 0; i < subsubsuperjason['sentencias'].length; i++) {
                var instruccion = this.fabrica_instrucciones(subsubsuperjason['sentencias'][i]);
                if (instruccion != undefined) {
                    lista_sentencias.push(instruccion);
                }
            }
            var sentencia_do_while = new Sentencia_Do_While_1.default(condicion, lista_sentencias);
            return sentencia_do_while;
        }
        else if (subsuperjason['etiqueta'] == "sentencia_while") {
            var condicion = this.fabrica_expresiones(subsuperjason['condicion']);
            var lista_sentencias = new Array();
            var subsubsuperjason = subsuperjason['sentencias'];
            for (var i = 0; i < subsubsuperjason['sentencias'].length; i++) {
                var instruccion = this.fabrica_instrucciones(subsubsuperjason['sentencias'][i]);
                if (instruccion != undefined) {
                    lista_sentencias.push(instruccion);
                }
            }
            var sentencia_while = new Sentencia_While_1.default(condicion, lista_sentencias);
            return sentencia_while;
        }
        else if (subsuperjason['etiqueta'] == "sentencia_for") {
            var inicio = this.fabrica_instrucciones(subsuperjason['inicio']);
            var condicion = this.fabrica_expresiones(subsuperjason['condicion']);
            var actualizacion = this.fabrica_expresiones(subsuperjason['actualizacion']);
            var lista_sentencias = new Array();
            var subsubsuperjason = subsuperjason['sentencias'];
            for (var i = 0; i < subsubsuperjason['sentencias'].length; i++) {
                var instruccion = this.fabrica_instrucciones(subsubsuperjason['sentencias'][i]);
                if (instruccion != undefined) {
                    lista_sentencias.push(instruccion);
                }
            }
            var sentencia_for = new Sentencia_For_1.default(inicio, condicion, actualizacion, lista_sentencias);
            return sentencia_for;
        }
        else if (subsuperjason['etiqueta'] == "sentencia_for_each") {
            var declaracion = this.fabrica_instrucciones(subsuperjason['inicio']);
            var valor = this.fabrica_expresiones(subsuperjason['valor']);
            var lista_sentencias = new Array();
            var subsubsuperjason = subsuperjason['sentencias'];
            for (var i = 0; i < subsubsuperjason['sentencias'].length; i++) {
                var instruccion = this.fabrica_instrucciones(subsubsuperjason['sentencias'][i]);
                if (instruccion != undefined) {
                    lista_sentencias.push(instruccion);
                }
            }
            var sentencia_for_each = new Sentencia_For_Each_1.default(declaracion, valor, lista_sentencias);
            return sentencia_for_each;
        }
        else if (subsuperjason['etiqueta'] == "sentencia_break") {
            var sentencia_break = new Sentencia_Break_1.default(subsuperjason['etiqueta']);
            return sentencia_break;
        }
        else if (subsuperjason['etiqueta'] == "sentencia_continue") {
            var sentencia_continue = new Sentencia_Continue_1.default(subsuperjason['etiqueta']);
            return sentencia_continue;
        }
        else if (subsuperjason['etiqueta'] == "sentencia_return") {
            var expresion = this.fabrica_expresiones(subsuperjason['valor']);
            var sentencia_return = new Sentencia_Return_1.default(subsuperjason['etiqueta'], expresion);
            return sentencia_return;
        }
        else if (subsuperjason['etiqueta'] == "sentencia_llamada") {
            var lista_parametros = new Array();
            if (subsuperjason['lista_parametros'] != undefined) {
                var subsubsuperjason = subsuperjason['lista_parametros'];
                for (var i = 0; i < subsubsuperjason['expresiones'].length; i++) {
                    var instruccion = this.fabrica_expresiones(subsubsuperjason['expresiones'][i]);
                    if (instruccion != undefined) {
                        lista_parametros.push(instruccion);
                    }
                }
            }
            var sentencia_llamada = new Sentencia_LLamada_1.default(subsuperjason['identificador'], lista_parametros);
            return sentencia_llamada;
        }
        else if (subsuperjason['etiqueta'] == "sentencia_imprimir") {
            var expresion = this.fabrica_expresiones(subsuperjason['valor']);
            var sentencia_imprimir = new Sentencia_Imprimir_1.default(expresion);
            return sentencia_imprimir;
        }
        else if (subsuperjason['etiqueta'] == 'sentencia_incremento') {
            var operador = new Simbolo_1.default();
            operador.classValor = subsuperjason['identificador'];
            var nuevo_incremento = new Sentencia_Incremento_1.default(operador, subsuperjason['tipo'], subsuperjason['posicion']);
            return nuevo_incremento;
        }
        else if (subsuperjason['etiqueta'] == 'sentencia_decremento') {
            var operador = new Simbolo_1.default();
            operador.classValor = subsuperjason['identificador'];
            var nuevo_decremento = new Sentencia_Decremento_1.default(operador, subsuperjason['tipo'], subsuperjason['posicion']);
            return nuevo_decremento;
        }
        else {
            console.log("etiqueta no reconocida: " + subsuperjason['etiqueta']);
        }
    };
    AST_CAAS.prototype.fabrica_expresiones = function (subsubsuperjason) {
        if (subsubsuperjason['etiqueta'] == "expresion") {
            this.fabrica_expresiones(subsubsuperjason['valor']);
        }
        else if (subsubsuperjason['etiqueta'] == "expresion_aritmetica") {
            if (subsubsuperjason['tipo'] == "+") {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nueva_suma = new Suma_1.default(operador1, operador2);
                return nueva_suma;
            }
            else if (subsubsuperjason['tipo'] == "-") {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nueva_resta = new Resta_1.default(operador1, operador2);
                return nueva_resta;
            }
            else if (subsubsuperjason['tipo'] == "*") {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nueva_multiplicacion = new Multiplicacion_1.default(operador1, operador2);
                return nueva_multiplicacion;
            }
            else if (subsubsuperjason['tipo'] == "/") {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nueva_division = new Division_1.default(operador1, operador2);
                return nueva_division;
            }
            else if (subsubsuperjason['tipo'] == "%") {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_modulo = new Modulo_1.default(operador1, operador2);
                return nuevo_modulo;
            }
        }
        else if (subsubsuperjason['etiqueta'] == "expresion_relacional") {
            if (subsubsuperjason['tipo'] == "<") {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_menor_que = new Menor_Que_1.default(operador1, operador2);
                return nuevo_menor_que;
            }
            else if (subsubsuperjason['tipo'] == ">") {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_mayor_que = new Mayor_Que_1.default(operador1, operador2);
                return nuevo_mayor_que;
            }
            else if (subsubsuperjason['tipo'] == "<=") {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_menor_igual_que = new Menor_Igual_Que_1.default(operador1, operador2);
                return nuevo_menor_igual_que;
            }
            else if (subsubsuperjason['tipo'] == ">=") {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_mayor_igual_que = new Mayor_Igual_Que_1.default(operador1, operador2);
                return nuevo_mayor_igual_que;
            }
            else if (subsubsuperjason['tipo'] == "==") {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_igual_que = new Igual_Que_1.default(operador1, operador2);
                return nuevo_igual_que;
            }
            else if (subsubsuperjason['tipo'] == "!=") {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_diferente_que = new Diferente_Que_1.default(operador1, operador2);
                return nuevo_diferente_que;
            }
        }
        else if (subsubsuperjason['etiqueta'] == "expresion_logica") {
            if (subsubsuperjason['tipo'] == "&&") {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_and = new And_1.default(operador1, operador2);
                return nuevo_and;
            }
            else if (subsubsuperjason['tipo'] == "||") {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                var nuevo_or = new Or_1.default(operador1, operador2);
                return nuevo_or;
            }
            else if (subsubsuperjason['tipo'] == "!") {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var nuevo_not = new Not_1.default(operador1);
                return nuevo_not;
            }
        }
        else if (subsubsuperjason['etiqueta'] == "expresion_unaria") {
            this.fabrica_expresiones(subsubsuperjason['operador1']);
        }
        else if (subsubsuperjason['etiqueta'] == "operador_ternario") {
            var condicion = this.fabrica_expresiones(subsubsuperjason['comparacion']);
            var valor1 = this.fabrica_expresiones(subsubsuperjason['valor1']);
            var valor2 = this.fabrica_expresiones(subsubsuperjason['valor2']);
            var operador_ternario = new Operador_Ternario_1.default(condicion, valor1, valor2);
            return operador_ternario;
        }
        else if (subsubsuperjason['etiqueta'] == "operador_pow") {
            var valor1 = this.fabrica_expresiones(subsubsuperjason['base']);
            var valor2 = this.fabrica_expresiones(subsubsuperjason['potencia']);
            console.log(subsubsuperjason);
            var operador_pow = new Operador_Potencia_1.default(valor1, valor2);
            return operador_pow;
        }
        else if (subsubsuperjason['etiqueta'] == 'sentencia_acceso') {
            var operador = new Simbolo_1.default();
            operador.classIdentificador = subsubsuperjason['identificador'];
            var lista_pos = new Array();
            var nuevo_acceso;
            if (subsubsuperjason['tipo'] == 0) {
                nuevo_acceso = new Sentencia_Acceso_1.default(operador, subsubsuperjason['tipo'], subsubsuperjason['posicion']);
            }
            else if (subsubsuperjason['tipo'] == 1) {
                var subsubsubsuperjason = subsubsuperjason['posicion'];
                for (var i = 0; i < subsubsubsuperjason['lista_dimensiones'].length; i++) {
                    var json_expresion = subsubsubsuperjason['lista_dimensiones'][i];
                    var tamaño_dim = this.fabrica_expresiones(json_expresion['valor']);
                    if (tamaño_dim != undefined) {
                        lista_pos.push(tamaño_dim);
                    }
                }
                nuevo_acceso = new Sentencia_Acceso_1.default(operador, subsubsuperjason['tipo'], lista_pos);
            }
            return nuevo_acceso;
        }
        else if (subsubsuperjason['etiqueta'] == "sentencia_llamada") {
            var lista_parametros = new Array();
            if (subsubsuperjason['lista_parametros'] != undefined) {
                var subsubsubsuperjason = subsubsuperjason['lista_parametros'];
                for (var i = 0; i < subsubsubsuperjason['expresiones'].length; i++) {
                    var instruccion = this.fabrica_expresiones(subsubsubsuperjason['expresiones'][i]);
                    if (instruccion != undefined) {
                        lista_parametros.push(instruccion);
                    }
                }
            }
            var sentencia_llamada = new Sentencia_LLamada_1.default(subsubsuperjason['identificador'], lista_parametros);
            return sentencia_llamada;
        }
        else if (subsubsuperjason['etiqueta'] == 'sentencia_incremento') {
            var operador = new Simbolo_1.default();
            operador.classValor = subsubsuperjason['identificador'];
            var nuevo_incremento = new Sentencia_Incremento_1.default(operador, subsubsuperjason['tipo'], subsubsuperjason['posicion']);
            return nuevo_incremento;
        }
        else if (subsubsuperjason['etiqueta'] == 'sentencia_decremento') {
            var operador = new Simbolo_1.default();
            operador.classValor = subsubsuperjason['identificador'];
            var nuevo_decremento = new Sentencia_Decremento_1.default(operador, subsubsuperjason['tipo'], subsubsuperjason['posicion']);
            return nuevo_decremento;
        }
        else if (subsubsuperjason['etiqueta'] == "valor_primitivo") {
            var nuevo_simbolo = new Simbolo_1.default();
            nuevo_simbolo.classAcceso = 0 /* publico */;
            nuevo_simbolo.classRol = 0 /* valor */;
            nuevo_simbolo.classTipo = this.get_tipo_primitivo(subsubsuperjason['tipo']);
            nuevo_simbolo.classIdentificador = "10-4";
            if (nuevo_simbolo.classTipo == 1 /* booleano */) {
                nuevo_simbolo.classValor = subsubsuperjason['valor'] == "true" ? 1 : 0;
            }
            else if (nuevo_simbolo.classTipo == 4 /* caracter */) {
                var cadena = subsubsuperjason['valor'];
                var caracter = cadena.charCodeAt(0);
                nuevo_simbolo.classValor = caracter;
            }
            else if (nuevo_simbolo.classTipo == 5 /* cadena */) {
                var cadena = subsubsuperjason['valor'];
                var temporal_pos_heap = "t_g" + Tabla_Simbolos_1.default.classTemporal_global;
                Tabla_Simbolos_1.default.classCodigo_3D = "\n";
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_pos_heap + " =  H;\n";
                for (var i = 0; i < cadena.length; i++) {
                    var caracter = cadena.charCodeAt(i);
                    Tabla_Simbolos_1.default.classCodigo_3D = "Heap[H] = " + caracter + ";\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "H = H + 1;\n";
                }
                Tabla_Simbolos_1.default.classCodigo_3D = "Heap[H] = 3;\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "H = H + 1;\n";
                nuevo_simbolo.classValor = temporal_pos_heap;
                nuevo_simbolo.classPos = 0;
                nuevo_simbolo.classTam = cadena.length;
            }
            else {
                nuevo_simbolo.classValor = subsubsuperjason['valor'];
            }
            return nuevo_simbolo;
        }
    };
    AST_CAAS.prototype.fabrica_parametros = function (subsuperjason) {
        var identificador = subsuperjason['identificador']['valor'];
        var parametro = new Simbolo_1.default();
        parametro.classAcceso = 0 /* publico */;
        if (subsuperjason['estado'] == 0) {
            parametro.classRol = 2 /* arreglo */;
        }
        else {
            parametro.classRol = 1 /* identificador */;
        }
        parametro.classTipo = this.get_tipo_primitivo(subsuperjason['tipo']);
        parametro.classIdentificador = identificador;
        parametro.classValor = "Pendiente";
        return parametro;
    };
    AST_CAAS.prototype.get_tipo_primitivo = function (p_tipo) {
        if (p_tipo == "booleano" || p_tipo == "boolean") {
            return 1 /* booleano */;
        }
        else if (p_tipo == "entero" || p_tipo == "int") {
            return 2 /* entero */;
        }
        else if (p_tipo == "decimal" || p_tipo == "double") {
            return 3 /* decimal */;
        }
        else if (p_tipo == "caracter" || p_tipo == "char") {
            return 4 /* caracter */;
        }
        else if (p_tipo == "cadena" || p_tipo == "String") {
            return 5 /* cadena */;
        }
        else if (p_tipo == "nulo" || p_tipo == "null" || p_tipo == "void") {
            return 0 /* nulo */;
        }
        else {
            return 6 /* error */;
        }
    };
    return AST_CAAS;
}());
exports.default = AST_CAAS;
