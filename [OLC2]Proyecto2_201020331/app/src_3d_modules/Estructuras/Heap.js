"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Simbolo_1 = __importDefault(require("./Simbolo"));
var Heap = /** @class */ (function () {
    function Heap() {
        this.simbolo_inicio = new Simbolo_1.default(0, 1);
        this.tamaño = 0;
        this.vacio = true;
    }
    Heap.prototype.estavacia = function () {
        return this.vacio;
    };
    Heap.prototype.agregar = function (nuevo_simbolo) {
        if (this.estavacia()) {
            this.simbolo_inicio = nuevo_simbolo;
            this.vacio = false;
            this.tamaño++;
        }
        else {
            nuevo_simbolo.classNext = this.simbolo_inicio;
            this.simbolo_inicio = nuevo_simbolo;
            this.tamaño++;
        }
    };
    Heap.prototype.desapilar = function () {
        var retorno;
        if (!this.estavacia()) {
            retorno = this.simbolo_inicio;
            this.simbolo_inicio = this.simbolo_inicio.classNext;
            this.tamaño--;
            return retorno;
        }
        else {
            retorno = new Simbolo_1.default(-33, -12);
            return retorno;
        }
    };
    Heap.prototype.peek = function () {
        if (!this.estavacia()) {
            return this.simbolo_inicio;
        }
        else {
            return new Simbolo_1.default(-33, -12);
        }
    };
    Heap.prototype.obtener = function (posicion) {
        if (!this.estavacia()) {
            if (this.tamaño > posicion) {
                var aux = this.simbolo_inicio;
                for (var i = 1; i < posicion; i++) {
                    aux = aux.classNext;
                }
                return aux;
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
        this.simbolo_inicio =
            new Simbolo_1.default(0, 0);
        this.tamaño = 1;
        this.vacio = true;
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
