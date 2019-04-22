"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pila_Entornos = /** @class */ (function () {
    function Pila_Entornos() {
        this.items = Array();
        this.tamaño = this.items.length;
    }
    Pila_Entornos.prototype.estavacia = function () {
        if (this.items.length < 1) {
            return true;
        }
        else {
            return false;
        }
    };
    Pila_Entornos.prototype.agregar = function (nuevo_simbolo) {
        this.items.push(nuevo_simbolo);
        this.tamaño = this.items.length;
    };
    Pila_Entornos.prototype.desapilar = function () {
        if (!this.estavacia()) {
            var retorno;
            retorno = this.items.pop();
            this.tamaño = this.items.length;
            return retorno;
        }
        else {
            return undefined;
        }
    };
    Pila_Entornos.prototype.peek = function () {
        if (!this.estavacia()) {
            return this.items[this.classTamaño - 1];
        }
        else {
            return undefined;
        }
    };
    Pila_Entornos.prototype.obtener = function (posicion) {
        if (!this.estavacia()) {
            if (this.tamaño >= posicion) {
                return this.items[posicion];
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    };
    Pila_Entornos.prototype.vaciar = function () {
        this.items = new Array();
        this.tamaño = 0;
    };
    Object.defineProperty(Pila_Entornos.prototype, "classTama\u00F1o", {
        get: function () {
            return this.tamaño;
        },
        set: function (p_tamaño) {
            this.tamaño = p_tamaño;
        },
        enumerable: true,
        configurable: true
    });
    return Pila_Entornos;
}());
exports.default = Pila_Entornos;
