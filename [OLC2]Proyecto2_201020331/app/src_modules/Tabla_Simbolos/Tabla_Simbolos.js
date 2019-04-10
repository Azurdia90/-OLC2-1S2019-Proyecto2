"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tabla_Simbolos = /** @class */ (function () {
    function Tabla_Simbolos() {
        this._codigo_3D = "";
        this._temporal = 100;
        this._etiqueta = 0;
    }
    Tabla_Simbolos.prototype.limpiar = function () {
        this._codigo_3D = "";
        this._temporal = 100;
        this._etiqueta = 0;
    };
    Object.defineProperty(Tabla_Simbolos.prototype, "classCodigo_3D", {
        get: function () {
            return this._codigo_3D;
        },
        set: function (p_codigo) {
            this._codigo_3D = this._codigo_3D + p_codigo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tabla_Simbolos.prototype, "classTemporal", {
        get: function () {
            var t = this._temporal;
            this._temporal++;
            return t;
        },
        set: function (p_temporal) {
            this._temporal = p_temporal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tabla_Simbolos.prototype, "classEtiqueta", {
        get: function () {
            var e = this._etiqueta;
            this._etiqueta++;
            return e;
        },
        set: function (p_etiqueta) {
            this._etiqueta = p_etiqueta;
        },
        enumerable: true,
        configurable: true
    });
    Tabla_Simbolos.prototype.limpiar_3d = function () {
        this._codigo_3D = "";
    };
    return Tabla_Simbolos;
}());
var tabla_simbolos = new Tabla_Simbolos;
exports.default = tabla_simbolos;
