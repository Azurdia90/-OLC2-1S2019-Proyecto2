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
var Sentencia_Metodo_1 = __importDefault(require("./Sentencia_Metodo"));
var Sentencia_LLamada_Metodo = /** @class */ (function (_super) {
    __extends(Sentencia_LLamada_Metodo, _super);
    function Sentencia_LLamada_Metodo(p_id, p_lista_instrucciones) {
        var _this = _super.call(this, 0, 0) || this;
        _this.identificador = p_id;
        _this.lista_instrucciones = p_lista_instrucciones;
        return _this;
    }
    Sentencia_LLamada_Metodo.prototype.ejecutar = function (entorno_local) {
        try {
            for (var i = 0; i < this.lista_instrucciones.length; i++) {
                if (this.lista_instrucciones[i] instanceof Sentencia_Metodo_1.default) {
                    var destino = this.lista_instrucciones[i];
                    if (destino.classId == this.identificador) {
                        destino.ejecutar(entorno_local);
                        return new Simbolo_1.default(-10, -14);
                    }
                }
            }
            return new Simbolo_1.default(-33, -12);
        }
        catch (Error) {
            return new Simbolo_1.default(-33, -12);
        }
    };
    return Sentencia_LLamada_Metodo;
}(Instruccion_1.default));
exports.default = Sentencia_LLamada_Metodo;
