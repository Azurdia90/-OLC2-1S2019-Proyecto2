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
var AST_CAAS = /** @class */ (function () {
    function AST_CAAS(psuperjason) {
        this.lista_instrucciones = new Array();
        Tabla_Simbolos_1.default.limpiar();
        this.entorno_temporal = new Map();
        Tabla_Simbolos_1.default.classEntornos.agregar(this.entorno_temporal);
        this.superjason = psuperjason;
        this.ptr_entorno = new Array();
        this.ptr_entorno[0] = 1;
        this.build_ast();
    }
    AST_CAAS.prototype.build_ast = function () {
        for (var i = 0; i < this.superjason['sentencias'].length; i++) {
            var instruccion = this.fabrica_instrucciones(this.superjason['sentencias'][i]);
            if (instruccion != undefined) {
                this.lista_instrucciones.push(instruccion);
            }
        }
        this.exec_ast(this.lista_instrucciones);
    };
    AST_CAAS.prototype.exec_ast = function (lsita_instruccciones) {
        for (var i = 0; i < this.lista_instrucciones.length; i++) {
            //console.log("cuantos valores tiene el entorno_global " + tabla_simbolos.classEntornos[0]);
            var resultado;
            resultado = this.lista_instrucciones[i].ejecutar(this.entorno_temporal, this.ptr_entorno);
            if (resultado.classRol == 10 /* error */) {
                console.log("Algo Salio mal con la sentencia, No.: " + i + ", " + resultado.classValor);
                break;
            }
        }
        console.log("Se ejecutaron todas las sentencias");
        var bk_3d = Tabla_Simbolos_1.default.classCodigo_3D;
        var declaracion_etiquetas = this.build_declaracion_etiquetas();
        var declaracion_variables = this.build_declaracion_variables();
        var metodos_impresion = this.build_metodos_impresion();
        var final_3d = declaracion_etiquetas + declaracion_variables + bk_3d + metodos_impresion;
        Tabla_Simbolos_1.default.limpiar_3d();
        Tabla_Simbolos_1.default.classCodigo_3D = final_3d;
    };
    AST_CAAS.prototype.build_declaracion_etiquetas = function () {
        var dec_etiquetas_reser = "var t0,t1,t2,t3,t4;\n\n";
        var dec_etiquetas = "var ";
        var begin_etiquetas = 100;
        var end_etiquetas = Tabla_Simbolos_1.default.classTemporal;
        dec_etiquetas = dec_etiquetas + "t" + begin_etiquetas;
        for (var i = (begin_etiquetas + 1); i < end_etiquetas; i++) {
            dec_etiquetas = dec_etiquetas + ",t" + i;
        }
        var dec_etiquetas_final = dec_etiquetas_reser + dec_etiquetas + ";\n\n";
        return dec_etiquetas_final;
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
        var proc_impresion_entero;
        var proc_impresion_decimal;
        var proc_impresion_caracter;
        var proc_impresion_cadena;
        var all_proc_impresion;
        proc_impresion_booleano = "proc imprimir_booleano\n"
            + "begin\n"
            + "    var fin,retorno;\n"
            + "    fin = 10;\n"
            + "    retorno = 13;\n"
            + "    if(t0 == 1) goto L0; \n"
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
            + "    var fin,retorno;\n"
            + "    fin = 10;\n"
            + "    retorno = 13;\n"
            + "    print(\"%e\",t1);\n"
            + "    print(\"%c\",fin);\n"
            + "    print(\"%c\",retorno);\n"
            + "end\n";
        proc_impresion_decimal = "proc imprimir_decimal\n"
            + "begin\n"
            + "    var fin,retorno;\n"
            + "    fin = 10;\n"
            + "    retorno = 13;\n"
            + "    print(\"%d\",t2);\n"
            + "    print(\"%c\",fin);\n"
            + "    print(\"%c\",retorno);\n"
            + "end\n";
        proc_impresion_caracter = "proc imprimir_caracter\n"
            + "begin\n"
            + "    var fin,retorno;\n"
            + "    fin = 10;\n"
            + "    retorno = 13;\n"
            + "    print(\"%c\",t3);\n"
            + "    print(\"%c\",fin);\n"
            + "    print(\"%c\",retorno);\n"
            + "end\n";
        proc_impresion_cadena = "proc imprimir_cadena\n"
            + "begin\n"
            + "    var tmp,car,fin,retorno;\n"
            + "    fin = 10;\n"
            + "    retorno = 13;\n"
            + "    L2:\n"
            + "    car = Heap[t4];\n"
            + "    if(car == 3) goto L3;\n"
            + "    print(\"%c\",car);\n"
            + "    t4 = t4 + 1;\n"
            + "    goto L2;\n"
            + "    L3:\n"
            + "    print(\"%c\",fin);\n"
            + "    print(\"%c\",retorno);\n"
            + "end\n";
        all_proc_impresion = "\n" + proc_impresion_booleano + "\n" + proc_impresion_entero + "\n" + proc_impresion_decimal + "\n" + proc_impresion_caracter + "\n" + proc_impresion_cadena;
        return all_proc_impresion;
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
            console.log(json_sentencia);
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
            //console.log(subsuperjason['inicio']);
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
    AST_CAAS.prototype.fabrica_expresiones = function (subsubsuperrjason) {
        if (subsubsuperrjason['etiqueta'] == "expresion") {
            this.fabrica_expresiones(subsubsuperrjason['valor']);
        }
        else if (subsubsuperrjason['etiqueta'] == "expresion_aritmetica") {
            if (subsubsuperrjason['tipo'] == "+") {
                var operador1 = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nueva_suma = new Suma_1.default(operador1, operador2);
                return nueva_suma;
            }
            else if (subsubsuperrjason['tipo'] == "-") {
                var operador1 = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nueva_resta = new Resta_1.default(operador1, operador2);
                return nueva_resta;
            }
            else if (subsubsuperrjason['tipo'] == "*") {
                var operador1 = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nueva_multiplicacion = new Multiplicacion_1.default(operador1, operador2);
                return nueva_multiplicacion;
            }
            else if (subsubsuperrjason['tipo'] == "/") {
                var operador1 = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nueva_division = new Division_1.default(operador1, operador2);
                return nueva_division;
            }
            else if (subsubsuperrjason['tipo'] == "%") {
                var operador1 = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_modulo = new Modulo_1.default(operador1, operador2);
                return nuevo_modulo;
            }
        }
        else if (subsubsuperrjason['etiqueta'] == "expresion_relacional") {
            if (subsubsuperrjason['tipo'] == "<") {
                var operador1 = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_menor_que = new Menor_Que_1.default(operador1, operador2);
                return nuevo_menor_que;
            }
            else if (subsubsuperrjason['tipo'] == ">") {
                var operador1 = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_mayor_que = new Mayor_Que_1.default(operador1, operador2);
                return nuevo_mayor_que;
            }
            else if (subsubsuperrjason['tipo'] == "<=") {
                var operador1 = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_menor_igual_que = new Menor_Igual_Que_1.default(operador1, operador2);
                return nuevo_menor_igual_que;
            }
            else if (subsubsuperrjason['tipo'] == ">=") {
                var operador1 = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_mayor_igual_que = new Mayor_Igual_Que_1.default(operador1, operador2);
                return nuevo_mayor_igual_que;
            }
            else if (subsubsuperrjason['tipo'] == "==") {
                var operador1 = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_igual_que = new Igual_Que_1.default(operador1, operador2);
                return nuevo_igual_que;
            }
            else if (subsubsuperrjason['tipo'] == "!=") {
                var operador1 = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_diferente_que = new Diferente_Que_1.default(operador1, operador2);
                return nuevo_diferente_que;
            }
        }
        else if (subsubsuperrjason['etiqueta'] == "expresion_logica") {
            if (subsubsuperrjason['tipo'] == "&&") {
                var operador1 = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_and = new And_1.default(operador1, operador2);
                return nuevo_and;
            }
            else if (subsubsuperrjason['tipo'] == "||") {
                var operador1 = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperrjason['operador2']);
                var nuevo_or = new Or_1.default(operador1, operador2);
                return nuevo_or;
            }
            else if (subsubsuperrjason['tipo'] == "!") {
                var operador1 = this.fabrica_expresiones(subsubsuperrjason['operador1']);
                var nuevo_not = new Not_1.default(operador1);
                return nuevo_not;
            }
        }
        else if (subsubsuperrjason['etiqueta'] == "expresion_unaria") {
            this.fabrica_expresiones(subsubsuperrjason['operador1']);
        }
        else if (subsubsuperrjason['etiqueta'] == "operador_ternario") {
            var condicion = this.fabrica_expresiones(subsubsuperrjason['comparacion']);
            var valor1 = this.fabrica_expresiones(subsubsuperrjason['valor1']);
            var valor2 = this.fabrica_expresiones(subsubsuperrjason['valor2']);
            var operador_ternario = new Operador_Ternario_1.default(condicion, valor1, valor2);
            return operador_ternario;
        }
        else if (subsubsuperrjason['etiqueta'] == 'sentencia_acceso') {
            var operador = new Simbolo_1.default();
            operador.classIdentificador = subsubsuperrjason['identificador'];
            var lista_pos = new Array();
            var nuevo_acceso;
            if (subsubsuperrjason['tipo'] == 0) {
                nuevo_acceso = new Sentencia_Acceso_1.default(operador, subsubsuperrjason['tipo'], subsubsuperrjason['posicion']);
            }
            else if (subsubsuperrjason['tipo'] == 1) {
                var subsubsubsuperjason = subsubsuperrjason['posicion'];
                for (var i = 0; i < subsubsubsuperjason['lista_dimensiones'].length; i++) {
                    var json_expresion = subsubsubsuperjason['lista_dimensiones'][i];
                    var tamaño_dim = this.fabrica_expresiones(json_expresion['valor']);
                    if (tamaño_dim != undefined) {
                        lista_pos.push(tamaño_dim);
                    }
                }
                nuevo_acceso = new Sentencia_Acceso_1.default(operador, subsubsuperrjason['tipo'], lista_pos);
            }
            return nuevo_acceso;
        }
        else if (subsubsuperrjason['etiqueta'] == 'sentencia_incremento') {
            var operador = new Simbolo_1.default();
            operador.classValor = subsubsuperrjason['identificador'];
            var nuevo_incremento = new Sentencia_Incremento_1.default(operador, subsubsuperrjason['tipo'], subsubsuperrjason['posicion']);
            return nuevo_incremento;
        }
        else if (subsubsuperrjason['etiqueta'] == 'sentencia_decremento') {
            var operador = new Simbolo_1.default();
            operador.classValor = subsubsuperrjason['identificador'];
            var nuevo_decremento = new Sentencia_Decremento_1.default(operador, subsubsuperrjason['tipo'], subsubsuperrjason['posicion']);
            return nuevo_decremento;
        }
        else if (subsubsuperrjason['etiqueta'] == "valor_primitivo") {
            var nuevo_simbolo = new Simbolo_1.default();
            nuevo_simbolo.classAcceso = 0 /* publico */;
            nuevo_simbolo.classRol = 0 /* valor */;
            nuevo_simbolo.classTipo = this.get_tipo_primitivo(subsubsuperrjason['tipo']);
            nuevo_simbolo.classIdentificador = "10-4";
            if (nuevo_simbolo.classTipo == 4 /* caracter */) {
                console.log("si entro a caracter");
                var cadena = subsubsuperrjason['valor'];
                var caracter = cadena.charCodeAt(0);
                nuevo_simbolo.classValor = caracter;
            }
            else if (nuevo_simbolo.classTipo == 5 /* cadena */) {
                var cadena = subsubsuperrjason['valor'];
                var temporal_pos_heap = "t" + Tabla_Simbolos_1.default.classTemporal;
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
                nuevo_simbolo.classValor = subsubsuperrjason['valor'];
            }
            return nuevo_simbolo;
        }
    };
    AST_CAAS.prototype.get_tipo_primitivo = function (p_tipo) {
        if (p_tipo == "booleano") {
            return 1 /* booleano */;
        }
        else if (p_tipo == "entero") {
            return 2 /* entero */;
        }
        else if (p_tipo == "decimal") {
            return 3 /* decimal */;
        }
        else if (p_tipo == "caracter") {
            return 4 /* caracter */;
        }
        else if (p_tipo == "cadena") {
            return 5 /* cadena */;
        }
        else if (p_tipo == "nulo") {
            return 0 /* nulo */;
        }
        else {
            return 6 /* error */;
        }
    };
    return AST_CAAS;
}());
exports.default = AST_CAAS;
