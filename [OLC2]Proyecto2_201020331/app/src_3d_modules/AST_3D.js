"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Instruccion_1 = __importDefault(require("./Instruccion"));
var Valor_1 = __importDefault(require("./Expresiones/Valor"));
var Multiplicacion_1 = __importDefault(require("./Expresiones/Expresiones_Aritmeticas/Multiplicacion"));
var Diferente_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Diferente_Que"));
var Igual_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Igual_Que"));
var Menor_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Menor_Que"));
var Mayor_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Mayor_Que"));
var Sentencia_Declaracion_1 = __importDefault(require("./Sentencias/Sentencia_Declaracion"));
var Division_1 = __importDefault(require("./Expresiones/Expresiones_Aritmeticas/Division"));
var Sentencia_Asignacion_1 = __importDefault(require("./Sentencias/Sentencia_Asignacion"));
var Modulo_1 = __importDefault(require("./Expresiones/Expresiones_Aritmeticas/Modulo"));
var Sentencia_Imprimir_1 = __importDefault(require("./Sentencias/Sentencia_Imprimir"));
var Resta_1 = __importDefault(require("./Expresiones/Expresiones_Aritmeticas/Resta"));
var Suma_1 = __importDefault(require("./Expresiones/Expresiones_Aritmeticas/Suma"));
var Mayor_Igual_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Mayor_Igual_Que"));
var Menor_Igual_Que_1 = __importDefault(require("./Expresiones/Expresiones_Relacionales/Menor_Igual_Que"));
var Tabla_Simbolos_1 = __importDefault(require("./Estructuras/Tabla_Simbolos"));
var Sentencia_Salto_Destino_1 = __importDefault(require("./Sentencias/Sentencia_Salto_Destino"));
var Simbolo_1 = __importDefault(require("./Estructuras/Simbolo"));
var Sentencia_Saldo_Incondicional_1 = __importDefault(require("./Sentencias/Sentencia_Saldo_Incondicional"));
var console_1 = require("console");
var Sentencia_If_1 = __importDefault(require("./Sentencias/Sentencia_If"));
var Sentencia_If_False_1 = __importDefault(require("./Sentencias/Sentencia_If_False"));
var Sentencia_Metodo_1 = __importDefault(require("./Sentencias/Sentencia_Metodo"));
var Sentencia_LLamada_Metodo_1 = __importDefault(require("./Sentencias/Sentencia_LLamada_Metodo"));
var AST_3D = /** @class */ (function () {
    function AST_3D(psuperjason) {
        this.superjason = psuperjason;
        this.lista_instrucciones = [];
        Tabla_Simbolos_1.default.limpiar();
        console_1.clear();
        console.clear();
        this.build_ast();
    }
    AST_3D.prototype.build_ast = function () {
        for (var i = 0; i < this.superjason['sentencias'].length; i++) {
            this.lista_instrucciones.push(this.fabrica_instrucciones(this.superjason['sentencias'][i]));
        }
        this.exec_ast();
    };
    AST_3D.prototype.fabrica_instrucciones = function (subsuperjason) {
        if (subsuperjason['etiqueta'] == "sentencia_declaracion") {
            if (subsuperjason['valor'] != undefined) {
                var expresion = this.fabrica_expresiones(subsuperjason['valor']);
                return new Sentencia_Declaracion_1.default(subsuperjason['id'], expresion);
            }
            else {
                return new Sentencia_Declaracion_1.default(subsuperjason['id']);
            }
        }
        else if (subsuperjason['etiqueta'] == "sentencia_asignacion") {
            var expresion = this.fabrica_expresiones(subsuperjason['valor']);
            if (subsuperjason['tipo'] == 0 || subsuperjason['tipo'] == 1) {
                return new Sentencia_Asignacion_1.default(subsuperjason['id'], subsuperjason['tipo'], expresion);
            }
            else {
                var posicion = this.fabrica_expresiones(subsuperjason['posicion']);
                return new Sentencia_Asignacion_1.default(subsuperjason['id'], subsuperjason['tipo'], expresion, posicion);
            }
        }
        else if (subsuperjason['etiqueta'] == "salto") {
            return new Sentencia_Salto_Destino_1.default(subsuperjason['expresion']);
        }
        else if (subsuperjason['etiqueta'] == "sentencia_salto") {
            return new Sentencia_Saldo_Incondicional_1.default(this.lista_instrucciones, subsuperjason['expresion']);
        }
        else if (subsuperjason['etiqueta'] == "sentencia_if") {
            var expresion_relacional = this.fabrica_expresiones(subsuperjason['expresion']);
            return new Sentencia_If_1.default(expresion_relacional, subsuperjason['verdadero'], this.lista_instrucciones);
        }
        else if (subsuperjason['etiqueta'] == "sentencia_if_false") {
            var expresion_relacional = this.fabrica_expresiones(subsuperjason['expresion']);
            return new Sentencia_If_False_1.default(expresion_relacional, subsuperjason['falso'], this.lista_instrucciones);
        }
        else if (subsuperjason['etiqueta'] == "sentencia_metodo") {
            return new Sentencia_Metodo_1.default(subsuperjason['valor'], subsuperjason['valor2'], this.lista_instrucciones);
        }
        else if (subsuperjason['etiqueta'] == "sentencia_llamada") {
            return new Sentencia_LLamada_Metodo_1.default(subsuperjason['valor'], this.lista_instrucciones);
        }
        else if (subsuperjason['etiqueta'] == "sentencia_imprimir") {
            return new Sentencia_Imprimir_1.default(subsuperjason['tipo'], subsuperjason['valor']);
        }
        else {
        }
        return new Instruccion_1.default(0, 0);
    };
    AST_3D.prototype.fabrica_expresiones = function (subsubsuperjason) {
        if (subsubsuperjason['etiqueta'] == "expresion_aritmetica") {
            if (subsubsuperjason['simbolo'] == '+') {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Suma_1.default(operador1, operador2);
            }
            else if (subsubsuperjason['simbolo'] == '-') {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Resta_1.default(operador1, operador2);
            }
            else if (subsubsuperjason['simbolo'] == '*') {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Multiplicacion_1.default(operador1, operador2);
            }
            else if (subsubsuperjason['simbolo'] == '/') {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Division_1.default(operador1, operador2);
            }
            else if (subsubsuperjason['simbolo'] == '%') {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Modulo_1.default(operador1, operador2);
            }
            else {
            }
        }
        else if (subsubsuperjason['etiqueta'] == "expresion_relacional") {
            if (subsubsuperjason['simbolo'] == '<') {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Menor_Que_1.default(operador1, operador2);
            }
            else if (subsubsuperjason['simbolo'] == '>') {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Mayor_Que_1.default(operador1, operador2);
            }
            else if (subsubsuperjason['simbolo'] == '<=') {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Menor_Igual_Que_1.default(operador1, operador2);
            }
            else if (subsubsuperjason['simbolo'] == '>=') {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Mayor_Igual_Que_1.default(operador1, operador2);
            }
            else if (subsubsuperjason['simbolo'] == '==') {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Igual_Que_1.default(operador1, operador2);
            }
            else if (subsubsuperjason['simbolo'] == '!=') {
                var operador1 = this.fabrica_expresiones(subsubsuperjason['operador1']);
                var operador2 = this.fabrica_expresiones(subsubsuperjason['operador2']);
                return new Diferente_Que_1.default(operador1, operador2);
            }
            else {
            }
        }
        else if (subsubsuperjason['etiqueta'] == "valor_primitivo") {
            if (subsubsuperjason['tipo'] == 0 || subsubsuperjason['tipo'] == 1 || subsubsuperjason['tipo'] == 2 || subsubsuperjason['tipo'] == 5) {
                return new Valor_1.default(subsubsuperjason['valor'], subsubsuperjason['tipo']);
            }
            else {
                var posicion = this.fabrica_expresiones(subsubsuperjason['posicion']);
                return new Valor_1.default(subsubsuperjason['valor'], subsubsuperjason['tipo'], posicion);
            }
        }
        else {
        }
    };
    AST_3D.prototype.exec_ast = function () {
        for (var i = 0; i < this.lista_instrucciones.length; i++) {
            console.log("cuantos valores tiene el primer entorno " + Tabla_Simbolos_1.default.classTabla_Simbolos[0].size);
            var resultado;
            var sentencia;
            sentencia = this.lista_instrucciones[i];
            if (sentencia instanceof Sentencia_Metodo_1.default) {
                resultado = new Simbolo_1.default(-10, -4);
            }
            else {
                resultado = sentencia.ejecutar(Tabla_Simbolos_1.default.classTabla_Simbolos[0]);
            }
            if (sentencia instanceof Sentencia_Saldo_Incondicional_1.default) {
                if (resultado.classValor > 0) {
                    i = resultado.classValor - 1;
                }
                else {
                    break;
                }
            }
            else if (sentencia instanceof Sentencia_If_1.default) {
                if (resultado.classValor > -11) {
                    if (resultado.classValor > 0) {
                        i = resultado.classValor - 1;
                    }
                }
                else {
                    break;
                }
            }
            else if (sentencia instanceof Sentencia_If_False_1.default) {
                if (resultado.classValor > -11) {
                    if (resultado.classValor > 0) {
                        i = resultado.classValor - 1;
                    }
                }
                else {
                    break;
                }
            }
            else if (resultado.classTam == -12) {
                break;
            }
        }
    };
    return AST_3D;
}());
exports.default = AST_3D;
