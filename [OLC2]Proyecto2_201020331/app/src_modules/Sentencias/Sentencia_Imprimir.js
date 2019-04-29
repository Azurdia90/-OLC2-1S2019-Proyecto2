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
var Expresion_1 = __importDefault(require("../Expresiones/Expresion"));
var Simbolo_1 = __importDefault(require("../Tabla_Simbolos/Simbolo"));
var Tabla_Simbolos_1 = __importDefault(require("../Tabla_Simbolos/Tabla_Simbolos"));
var Sentencia_Imprimir = /** @class */ (function (_super) {
    __extends(Sentencia_Imprimir, _super);
    function Sentencia_Imprimir(p_expresion) {
        var _this = _super.call(this, 0, 0) || this;
        _this.expresion = p_expresion;
        return _this;
    }
    Sentencia_Imprimir.prototype.ejecutar = function (entorno_local, ptr_entorno) {
        try {
            var resultado;
            var simbolo_exp;
            if (this.expresion instanceof Expresion_1.default) {
                simbolo_exp = this.expresion.ejecutar(entorno_local, ptr_entorno);
                if (simbolo_exp.classRol == 10 /* error */) {
                    Tabla_Simbolos_1.default.limpiar_3d();
                    return simbolo_exp;
                }
            }
            else if (this.expresion instanceof Simbolo_1.default) {
                simbolo_exp = this.expresion;
                if (simbolo_exp.classRol == 10 /* error */) {
                    Tabla_Simbolos_1.default.limpiar_3d();
                    return simbolo_exp;
                }
            }
            else {
                Tabla_Simbolos_1.default.limpiar_3d();
                resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = this.fila + "-" + this.columna;
                resultado.classValor = "Impresión No realizada: No existe un valor a imprimir";
                return resultado;
            }
            var tam_metodo = ptr_entorno[0];
            var temporal_simulado = "t" + Tabla_Simbolos_1.default.classTemporal;
            var temporal_contador = "t" + Tabla_Simbolos_1.default.classTemporal;
            Tabla_Simbolos_1.default.classCodigo_3D = "\n";
            if (simbolo_exp.classTipo == 1 /* booleano */) {
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_simulado + " = P + " + tam_metodo + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + temporal_contador + "] = " + simbolo_exp.classValor + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "P = P + " + tam_metodo + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "call imprimir_booleano;\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
            }
            else if (simbolo_exp.classTipo == 2 /* entero */) {
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_simulado + " = P + " + tam_metodo + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + temporal_contador + "] = " + simbolo_exp.classValor + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "P = P + " + tam_metodo + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "call imprimir_entero;\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
            }
            else if (simbolo_exp.classTipo == 3 /* decimal */) {
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_simulado + " = P + " + tam_metodo + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + temporal_contador + "] = " + simbolo_exp.classValor + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "P = P + " + tam_metodo + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "call imprimir_decimal;\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
            }
            else if (simbolo_exp.classTipo == 4 /* caracter */) {
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_simulado + " = P + " + tam_metodo + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + temporal_contador + "] = " + simbolo_exp.classValor + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "P = P + " + tam_metodo + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "call imprimir_caracter;\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
            }
            else if (simbolo_exp.classTipo == 5 /* cadena */) {
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_simulado + " = P + " + tam_metodo + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + temporal_contador + "] = " + simbolo_exp.classValor + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "P = P + " + tam_metodo + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "call imprimir_cadena;\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
            }
            else {
                console.log("algo esta mal aca: " + simbolo_exp.classTipo);
                resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = this.fila + "-" + this.columna;
                resultado.classValor = "Impresión No realizada: El tipo de valor no fue reconocido";
                return resultado;
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
            Tabla_Simbolos_1.default.limpiar_3d();
            resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 10 /* error */;
            resultado.classTipo = 5 /* cadena */;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Impresión No realizada correctamente: " + Error.Message;
            return resultado;
        }
    };
    return Sentencia_Imprimir;
}(Instruccion_1.default));
exports.default = Sentencia_Imprimir;
