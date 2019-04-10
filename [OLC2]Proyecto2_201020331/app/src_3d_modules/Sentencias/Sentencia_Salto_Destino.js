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
var Sentencia_Salto_Destino = /** @class */ (function (_super) {
    __extends(Sentencia_Salto_Destino, _super);
    function Sentencia_Salto_Destino(p_etiqueta) {
        var _this = _super.call(this, 0, 0) || this;
        _this.etiqueta = p_etiqueta;
        return _this;
    }
    Object.defineProperty(Sentencia_Salto_Destino.prototype, "classEtiqueta", {
        get: function () {
            return this.etiqueta;
        },
        set: function (p_etiqueta) {
            this.etiqueta = p_etiqueta;
        },
        enumerable: true,
        configurable: true
    });
    Sentencia_Salto_Destino.prototype.ejecutar = function (entorno_local) {
        return new Simbolo_1.default(-10, -4);
    };
    return Sentencia_Salto_Destino;
}(Instruccion_1.default));
exports.default = Sentencia_Salto_Destino;
