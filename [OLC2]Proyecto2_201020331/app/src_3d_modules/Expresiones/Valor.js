"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Simbolo_1 = __importDefault(require("../Estructuras/Simbolo"));
var Tabla_Simbolos_1 = __importDefault(require("../Estructuras/Tabla_Simbolos"));
var Valor = /** @class */ (function () {
    /*
     * 0. valor entero
     * 1. temporal
     * 2. identificador
     * 3. stack
     * 4. heap
     */
    function Valor(p_valor, p_tipo, p_pos) {
        this.valor = p_valor;
        this.tipo = p_tipo;
        this.pos = p_pos;
    }
    Valor.prototype.ejecutar = function (entorno_local) {
        var resultado;
        if (this.tipo == 0) {
            console.log("Vamos a devolver un valor primitivo : " + this.valor);
            resultado = new Simbolo_1.default(Number(this.valor), 4);
            return resultado;
        }
        else if (this.tipo == 1) {
            console.log("Vamos a devolver valor de la etiqueta : " + this.valor);
            if (Tabla_Simbolos_1.default.existe_simbolo(this.valor)) {
                return Tabla_Simbolos_1.default.obtener_simbolo(this.valor);
            }
            else {
                return new Simbolo_1.default(-33, -12);
            }
        }
        else if (this.tipo == 2) {
            console.log("Vamos a devolver valor de la variable : " + this.valor);
            if (Tabla_Simbolos_1.default.existe_simbolo(this.valor)) {
                var resultado = Tabla_Simbolos_1.default.obtener_simbolo(this.valor);
                return Tabla_Simbolos_1.default.obtener_simbolo(this.valor);
            }
            else {
                return new Simbolo_1.default(-33, -12);
            }
        }
        else if (this.tipo == 3) {
            var resultado_pos = this.pos.ejecutar(entorno_local);
            if (Tabla_Simbolos_1.default.classStack.classTamaño > resultado_pos.classValor) {
                console.log("vamos a devolver valor de la posicion del stack: " + resultado_pos.classValor);
                return Tabla_Simbolos_1.default.classStack.obtener(resultado_pos.classValor);
            }
            else {
                return new Simbolo_1.default(-33, 12);
            }
        }
        else if (this.tipo == 4) {
            var resultado_pos = this.pos.ejecutar(entorno_local);
            if (Tabla_Simbolos_1.default.classHeap.classTamaño > resultado_pos.classValor) {
                console.log("vamos a devolver valor de la posicion del Heap: " + resultado_pos.classValor);
                return Tabla_Simbolos_1.default.classHeap.obtener(resultado_pos.classValor);
            }
            else {
                return new Simbolo_1.default(-33, 12);
            }
        }
        else if (this.tipo == 5) {
            var valor_negativo = (-1) * Number(this.valor);
            console.log("Vamos a devolver un valor primitivo : " + valor_negativo);
            resultado = new Simbolo_1.default(valor_negativo, 4);
            return resultado;
        }
    };
    return Valor;
}());
exports.default = Valor;
