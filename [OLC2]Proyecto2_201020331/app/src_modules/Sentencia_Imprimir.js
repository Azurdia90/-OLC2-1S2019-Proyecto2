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
var Instruccion_1 = __importDefault(require("./Instruccion"));
var Simbolo_1 = __importDefault(require("./Simbolo"));
var Sentencia_Imprimir = /** @class */ (function (_super) {
    __extends(Sentencia_Imprimir, _super);
    function Sentencia_Imprimir(p_expresion) {
        var _this = _super.call(this, 0, 0) || this;
        _this.expresion = p_expresion;
        return _this;
    }
    Sentencia_Imprimir.prototype.ejecutar = function () {
        var resultado;
        var simbolo_exp = this.expresion.ejecutar();
        this.cadena_3D = simbolo_exp.classValor + "imprimir expresion desde ejecutar";
        console.log(this.cadena_3D);
        resultado = new Simbolo_1.default();
        resultado.classAcceso = 0 /* publico */;
        resultado.classRol = 9 /* aceptado */;
        resultado.classTipo = 5 /* cadena */;
        resultado.classIdentificador = "10-4";
        resultado.classValor = this.cadena_3D;
        return resultado;
    };
    return Sentencia_Imprimir;
}(Instruccion_1.default));
exports.default = Sentencia_Imprimir;
