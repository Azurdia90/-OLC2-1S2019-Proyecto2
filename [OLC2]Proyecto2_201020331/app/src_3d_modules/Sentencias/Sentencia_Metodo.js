"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Instruccion_1 = __importDefault(require("../Instruccion"));
var Simbolo_1 = __importDefault(require("../Estructuras/Simbolo"));
var Sentencia_Declaracion_1 = __importDefault(require("./Sentencia_Declaracion"));
var Sentencia_Asignacion_1 = __importDefault(require("./Sentencia_Asignacion"));
var Sentencia_Salto_Destino_1 = __importDefault(require("./Sentencia_Salto_Destino"));
var Sentencia_Saldo_Incondicional_1 = __importDefault(require("./Sentencia_Saldo_Incondicional"));
var Sentencia_If_1 = __importDefault(require("./Sentencia_If"));
var Sentencia_If_False_1 = __importDefault(require("./Sentencia_If_False"));
var Sentencia_Imprimir_1 = __importDefault(require("./Sentencia_Imprimir"));
var Suma_1 = __importDefault(require("../Expresiones/Expresiones_Aritmeticas/Suma"));
var Resta_1 = __importDefault(require("../Expresiones/Expresiones_Aritmeticas/Resta"));
var Multiplicacion_1 = __importDefault(require("../Expresiones/Expresiones_Aritmeticas/Multiplicacion"));
var Division_1 = __importDefault(require("../Expresiones/Expresiones_Aritmeticas/Division"));
var Modulo_1 = __importDefault(require("../Expresiones/Expresiones_Aritmeticas/Modulo"));
var Menor_Que_1 = __importDefault(require("../Expresiones/Expresiones_Relacionales/Menor_Que"));
var Mayor_Que_1 = __importDefault(require("../Expresiones/Expresiones_Relacionales/Mayor_Que"));
var Mayor_Igual_Que_1 = __importDefault(require("../Expresiones/Expresiones_Relacionales/Mayor_Igual_Que"));
var Menor_Igual_Que_1 = __importDefault(require("../Expresiones/Expresiones_Relacionales/Menor_Igual_Que"));
var Igual_Que_1 = __importDefault(require("../Expresiones/Expresiones_Relacionales/Igual_Que"));
var Diferente_Que_1 = __importDefault(require("../Expresiones/Expresiones_Relacionales/Diferente_Que"));
var Valor_1 = __importDefault(require("../Expresiones/Valor"));
var Tabla_Simbolos_1 = __importDefault(require("../Estructuras/Tabla_Simbolos"));
var Sentencia_LLamada_Metodo_1 = __importDefault(require("./Sentencia_LLamada_Metodo"));
var Sentencia_Metodo = /** @class */ (function (_super) {
    __extends(Sentencia_Metodo, _super);
    function Sentencia_Metodo(p_id, p_subsuperjason, p_lista_instrucciones_padre) {
        var _this = _super.call(this, 0, 0) || this;
        _this.identificador = p_id;
        _this.subsuperjason = p_subsuperjason;
        _this.lista_instrucciones_padre = p_lista_instrucciones_padre;
        _this.lista_instrucciones = new Array();
        for (var i = 0; i < _this.subsuperjason['sentencias'].length; i++) {
            _this.lista_instrucciones.push(_this.fabrica_instrucciones(_this.subsuperjason['sentencias'][i]));
        }
        return _this;
    }
    Sentencia_Metodo.prototype.fabrica_instrucciones = function (subsuperjason) {
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
        else if (subsuperjason['etiqueta'] == "sentencia_llamada") {
            return new Sentencia_LLamada_Metodo_1.default(subsuperjason['valor'], this.lista_instrucciones_padre);
        }
        else if (subsuperjason['etiqueta'] == "sentencia_imprimir") {
            return new Sentencia_Imprimir_1.default(subsuperjason['tipo'], subsuperjason['valor']);
        }
        else {
        }
        return new Instruccion_1.default(0, 0);
    };
    Sentencia_Metodo.prototype.fabrica_expresiones = function (subsubsuperjason) {
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
    Sentencia_Metodo.prototype.ejecutar = function (entorno_padre) {
        console.log("/*******************************************************/");
        console.log("SE SE ESTA EJECUTANDO EL METODO: " + this.identificador);
        console.log("/*******************************************************/");
        try {
            this.entorno_local = new Map();
            Tabla_Simbolos_1.default.crear_entorno(this.entorno_local);
            for (var i = 0; i < this.lista_instrucciones.length; i++) {
                var resultado;
                var sentencia;
                sentencia = this.lista_instrucciones[i];
                resultado = sentencia.ejecutar(this.entorno_local);
                if (sentencia instanceof Sentencia_Saldo_Incondicional_1.default) {
                    if (resultado.classValor > 0) {
                        i = resultado.classValor;
                    }
                    else {
                        Tabla_Simbolos_1.default.eliminar_entorno();
                        break;
                    }
                }
                else if (sentencia instanceof Sentencia_If_1.default) {
                    if (resultado.classValor > -11) {
                        if (resultado.classValor > 0) {
                            i = resultado.classValor;
                        }
                    }
                    else {
                        Tabla_Simbolos_1.default.eliminar_entorno();
                        break;
                    }
                }
                else if (sentencia instanceof Sentencia_If_False_1.default) {
                    if (resultado.classValor > -11) {
                        if (resultado.classValor > 0) {
                            i = resultado.classValor;
                        }
                    }
                    else {
                        Tabla_Simbolos_1.default.eliminar_entorno();
                        break;
                    }
                }
                else if (resultado.classTam == -12) {
                    Tabla_Simbolos_1.default.eliminar_entorno();
                    break;
                }
            }
            Tabla_Simbolos_1.default.eliminar_entorno();
            return new Simbolo_1.default(-10, -4);
        }
        catch (Error) {
            Tabla_Simbolos_1.default.eliminar_entorno();
            return new Simbolo_1.default(-33, -12);
        }
    };
    Object.defineProperty(Sentencia_Metodo.prototype, "classId", {
        get: function () {
            return this.identificador;
        },
        set: function (p_id) {
            this.identificador = p_id;
        },
        enumerable: true,
        configurable: true
    });
    return Sentencia_Metodo;
}(Instruccion_1.default));
exports.default = Sentencia_Metodo;
