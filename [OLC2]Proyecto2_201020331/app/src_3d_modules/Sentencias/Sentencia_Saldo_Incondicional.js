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
var Sentencia_Salto_Destino_1 = __importDefault(require("./Sentencia_Salto_Destino"));
var Sentencia_Salto_Incondicional = /** @class */ (function (_super) {
    __extends(Sentencia_Salto_Incondicional, _super);
    function Sentencia_Salto_Incondicional(p_lista_instrucciones, p_etiqueta_destino) {
        var _this = _super.call(this, 0, 0) || this;
        _this.lista_instrucciones = p_lista_instrucciones;
        _this.etiqueta_destino = p_etiqueta_destino;
        return _this;
    }
    Sentencia_Salto_Incondicional.prototype.ejecutar = function (entorno_local) {
        try {
            for (var i = 0; i < this.lista_instrucciones.length; i++) {
                if (this.lista_instrucciones[i] instanceof Sentencia_Salto_Destino_1.default) {
                    var destino = this.lista_instrucciones[i];
                    if (destino.classEtiqueta == this.etiqueta_destino) {
                        return new Simbolo_1.default(i, 1);
                    }
                }
            }
            return new Simbolo_1.default(-33, -12);
        }
        catch (Error) {
            return new Simbolo_1.default(-33, -12);
        }
    };
    return Sentencia_Salto_Incondicional;
}(Instruccion_1.default));
exports.default = Sentencia_Salto_Incondicional;
