"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Simbolo = /** @class */ (function () {
    function Simbolo() {
        this._acceso = 0 /* publico */;
        this._rol = 0 /* valor */;
        this._tipo = 0 /* nulo */;
        this._identificador = "";
        this._in_heap = false;
        this._pos = 0;
        this._tam = 0;
    }
    Object.defineProperty(Simbolo.prototype, "classAcceso", {
        //get y set
        get: function () {
            return this._acceso;
        },
        set: function (p_acceso) {
            this._acceso = p_acceso;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Simbolo.prototype, "classRol", {
        get: function () {
            return this._rol;
        },
        set: function (p_rol) {
            this._rol = p_rol;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Simbolo.prototype, "classTipo", {
        get: function () {
            return this._tipo;
        },
        set: function (p_tipo) {
            this._tipo = p_tipo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Simbolo.prototype, "classIdentificador", {
        get: function () {
            return this._identificador;
        },
        set: function (p_identificador) {
            this._identificador = p_identificador;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Simbolo.prototype, "classValor", {
        get: function () {
            return this._valor;
        },
        set: function (p_valor) {
            this._valor = p_valor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Simbolo.prototype, "class_In_Heap", {
        get: function () {
            return this._in_heap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Simbolo.prototype, "classPos", {
        get: function () {
            return this._pos;
        },
        set: function (p_pos) {
            this._pos = p_pos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Simbolo.prototype, "classTam", {
        get: function () {
            return this._tam;
        },
        set: function (p_tam) {
            this._tam = p_tam;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Simbolo.prototype, "classIn_Heap", {
        set: function (p_in_heap) {
            this._in_heap = p_in_heap;
        },
        enumerable: true,
        configurable: true
    });
    return Simbolo;
}());
exports.default = Simbolo;
