"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Simbolo_1 = __importDefault(require("./Simbolo"));
var Heap = /** @class */ (function () {
    function Heap() {
        this.items = Array();
        this.tamaño = this.items.length;
    }
    Heap.prototype.estavacia = function () {
        if (this.items.length < 1) {
            return true;
        }
        else {
            return false;
        }
    };
    Heap.prototype.agregar = function (nuevo_simbolo, pos) {
        this.items[pos] = nuevo_simbolo;
        this.tamaño = this.items.length;
    };
    Heap.prototype.desapilar = function () {
        var retorno;
        if (!this.estavacia()) {
            retorno = this.items.pop();
            this.tamaño = this.items.length;
            return retorno;
        }
        else {
            retorno = new Simbolo_1.default(-33, -12);
            return retorno;
        }
    };
    Heap.prototype.peek = function () {
        if (!this.estavacia()) {
            return this.items[this.classTamaño - 1];
        }
        else {
            return new Simbolo_1.default(-33, -12);
        }
    };
    Heap.prototype.obtener = function (posicion) {
        if (!this.estavacia()) {
            if (this.tamaño >= posicion) {
                return this.items[posicion];
            }
            else {
                return new Simbolo_1.default(-33, -12);
            }
        }
        else {
            return new Simbolo_1.default(-33, -12);
        }
    };
    Heap.prototype.vaciar = function () {
        this.items = new Array();
        this.tamaño = 0;
    };
    Object.defineProperty(Heap.prototype, "classTama\u00F1o", {
        get: function () {
            return this.tamaño;
        },
        set: function (p_tamaño) {
            this.tamaño = p_tamaño;
        },
        enumerable: true,
        configurable: true
    });
    return Heap;
}());
exports.default = Heap;
