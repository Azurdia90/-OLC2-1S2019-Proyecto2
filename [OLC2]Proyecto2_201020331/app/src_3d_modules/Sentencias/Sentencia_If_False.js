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
var Sentencia_If_False = /** @class */ (function (_super) {
    __extends(Sentencia_If_False, _super);
    function Sentencia_If_False(p_expresion, p_etiqueta_falsa, p_lista_instrucciones) {
        var _this = _super.call(this, 0, 0) || this;
        _this.expresion = p_expresion;
        _this.etiqueta_falsa = p_etiqueta_falsa;
        _this.lista_instrucciones = p_lista_instrucciones;
        return _this;
    }
    Sentencia_If_False.prototype.ejecutar = function (entorno_local) {
        try {
            if (entorno_local != undefined) {
                var resultado_expresion = this.expresion.ejecutar(entorno_local);
                if (resultado_expresion.classValor == 0) {
                    for (var i = 0; i < this.lista_instrucciones.length; i++) {
                        var destino = this.lista_instrucciones[i];
                        if (destino.classEtiqueta == this.etiqueta_falsa) {
                            return new Simbolo_1.default(i, 1);
                        }
                    }
                    return new Simbolo_1.default(-33, -12);
                }
                else {
                    return new Simbolo_1.default(-10, -4);
                }
            }
            else {
                return new Simbolo_1.default(-33, -12);
            }
        }
        catch (Error) {
            return new Simbolo_1.default(-33, -12);
        }
    };
    return Sentencia_If_False;
}(Instruccion_1.default));
exports.default = Sentencia_If_False;
