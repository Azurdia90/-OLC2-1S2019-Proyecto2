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
var Simbolo_1 = __importDefault(require("../Tabla_Simbolos/Simbolo"));
var Instruccion_1 = __importDefault(require("../Instruccion"));
var Expresion = /** @class */ (function (_super) {
    __extends(Expresion, _super);
    function Expresion(p_operador1, p_tipo, p_operador2) {
        var _this = _super.call(this, 0, 0) || this;
        _this.operador1 = p_operador1;
        _this.tipo = p_tipo;
        _this.operador2 = p_operador2;
        return _this;
    }
    Expresion.prototype.ejecutar = function () {
        var valor1;
        var resultado;
        try {
            if (this.operador1 instanceof Expresion) {
                valor1 = this.operador1.ejecutar();
            }
            else {
                valor1 = this.operador1;
            }
            resultado = valor1;
            return resultado;
        }
        catch (Error) {
            resultado = new Simbolo_1.default();
            resultado.classRol = 10 /* error */;
            resultado.classTipo = 6 /* error */;
            resultado.classIdentificador = this.fila + "-" + this.columna;
            resultado.classValor = "Error: " + Error.message;
            return resultado;
        }
    };
    return Expresion;
}(Instruccion_1.default));
exports.default = Expresion;
