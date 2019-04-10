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
var Simbolo_1 = __importDefault(require("../Tabla_Simbolos/Simbolo"));
var Tabla_Simbolos_1 = __importDefault(require("../Tabla_Simbolos/Tabla_Simbolos"));
var Sentencia_Imprimir = /** @class */ (function (_super) {
    __extends(Sentencia_Imprimir, _super);
    function Sentencia_Imprimir(p_expresion) {
        var _this = _super.call(this, 0, 0) || this;
        _this.expresion = p_expresion;
        return _this;
    }
    Sentencia_Imprimir.prototype.ejecutar = function () {
        try {
            var resultado;
            var simbolo_exp = this.expresion.ejecutar();
            if (simbolo_exp.classTipo == 1 /* booleano */) {
                Tabla_Simbolos_1.default.classCodigo_3D = "call imprimir_booleano();\n";
            }
            else if (simbolo_exp.classTipo == 2 /* entero */) {
                Tabla_Simbolos_1.default.classCodigo_3D = "call imprimir_entero();\n";
            }
            else if (simbolo_exp.classTipo == 3 /* decimal */) {
                Tabla_Simbolos_1.default.classCodigo_3D = "call imprimir_decimal();\n";
            }
            else if (simbolo_exp.classTipo == 4 /* caracter */) {
                Tabla_Simbolos_1.default.classCodigo_3D = "call imprimir_caracter();\n";
            }
            else if (simbolo_exp.classTipo == 5 /* cadena */) {
                Tabla_Simbolos_1.default.classCodigo_3D = "call imprimir_cadena()\n";
            }
            resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 9 /* aceptado */;
            resultado.classTipo = 5 /* cadena */;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Impresión realizada correctamente";
            return resultado;
        }
        catch (Error) {
            Tabla_Simbolos_1.default.classCodigo_3D = "";
            resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 9 /* aceptado */;
            resultado.classTipo = 5 /* cadena */;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Impresión realizada correctamente";
            return resultado;
        }
    };
    return Sentencia_Imprimir;
}(Instruccion_1.default));
exports.default = Sentencia_Imprimir;
