"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Simbolo = /** @class */ (function () {
    function Simbolo(p_valor, p_tam) {
        this.valor = p_valor;
        this.tam = p_tam;
    }
    Object.defineProperty(Simbolo.prototype, "classValor", {
        //gets y sets
        get: function () {
            return this.valor;
        },
        set: function (p_valor) {
            this.valor = p_valor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Simbolo.prototype, "classTam", {
        get: function () {
            return this.tam;
        },
        set: function (p_tam) {
            this.tam = p_tam;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Simbolo.prototype, "classNext", {
        get: function () {
            return this.next;
        },
        set: function (p_next) {
            this.next = p_next;
        },
        enumerable: true,
        configurable: true
    });
    return Simbolo;
}());
exports.default = Simbolo;
