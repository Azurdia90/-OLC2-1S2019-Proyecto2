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
var Expresion_1 = __importDefault(require("../Expresion"));
var Simbolo_1 = __importDefault(require("../../Tabla_Simbolos/Simbolo"));
var Tabla_Simbolos_1 = __importDefault(require("../../Tabla_Simbolos/Tabla_Simbolos"));
var Suma = /** @class */ (function (_super) {
    __extends(Suma, _super);
    function Suma(p_operador1, p_operador2) {
        var _this = _super.call(this, p_operador1, "+", p_operador2) || this;
        _this.tabla_suma = [
            /*nulo*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*booleano*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 37 /* concatenacion */, 73 /* error */, 73 /* error */],
            /*entero*/ [73 /* error */, 73 /* error */, 0 /* suma_entero */, 1 /* suma_decimal */, 2 /* suma_entero_caracter */, 37 /* concatenacion */, 73 /* error */, 73 /* error */],
            /*decimal*/ [73 /* error */, 73 /* error */, 1 /* suma_decimal */, 1 /* suma_decimal */, 4 /* suma_decimal_caracter */, 37 /* concatenacion */, 73 /* error */, 73 /* error */],
            /*caracter*/ [73 /* error */, 73 /* error */, 3 /* suma_caracter_entero */, 5 /* suma_caracter_decimal */, 37 /* concatenacion */, 37 /* concatenacion */, 73 /* error */, 73 /* error */],
            /*cadena*/ [73 /* error */, 37 /* concatenacion */, 37 /* concatenacion */, 37 /* concatenacion */, 37 /* concatenacion */, 37 /* concatenacion */, 73 /* error */, 73 /* error */],
            /*error*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
        ];
        return _this;
    }
    Suma.prototype.ejecutar = function () {
        var tipo_suma;
        var valor1;
        var valor2;
        var resultado;
        try {
            if (this.operador1 instanceof Expresion_1.default) {
                valor1 = this.operador1.ejecutar();
            }
            else {
                valor1 = this.operador1;
            }
            if (this.operador2 instanceof Expresion_1.default) {
                valor2 = this.operador2.ejecutar();
            }
            else {
                valor2 = this.operador2;
            }
            if (valor1.classRol == 10 /* error */) {
                return valor1;
            }
            if (valor2.classRol == 10 /* error */) {
                return valor2;
            }
            tipo_suma = this.tabla_suma[valor1.classTipo][valor2.classTipo];
            resultado = new Simbolo_1.default();
            switch (tipo_suma) {
                case 0 /* suma_entero */:
                    var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " + " + valor2.classValor + ";\n";
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 2 /* entero */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "t" + etiqueta_actual;
                    return resultado;
                case 1 /* suma_decimal */:
                    var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " + " + valor2.classValor + ";\n";
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 3 /* decimal */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "t" + etiqueta_actual;
                    return resultado;
                case 2 /* suma_entero_caracter */:
                    var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " + " + valor2.classValor + ";\n";
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 2 /* entero */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "t" + etiqueta_actual;
                    return resultado;
                case 3 /* suma_caracter_entero */:
                    var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " + " + valor2.classValor + ";\n";
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 2 /* entero */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "t" + etiqueta_actual;
                    return resultado;
                case 4 /* suma_decimal_caracter */:
                    var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " + " + valor2.classValor + ";\n";
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 3 /* decimal */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "t" + etiqueta_actual;
                    return resultado;
                case 5 /* suma_caracter_decimal */:
                    var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " + " + valor2.classValor + ";\n";
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 3 /* decimal */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "t" + etiqueta_actual;
                    return resultado;
                case 37 /* concatenacion */:
                    var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " + " + valor2.classValor + ";\n";
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 5 /* cadena */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "t" + etiqueta_actual;
                    return resultado;
                case 73 /* error */:
                    Tabla_Simbolos_1.default.limpiar_3d();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 6 /* error */;
                    resultado.classIdentificador = this.fila + "-" + this.columna;
                    resultado.classValor = "No es posible sumar un valor del tipo " + valor1.classTipo + " con un valor tipo " + valor2.classTipo + ".";
                    return resultado;
                default:
                    Tabla_Simbolos_1.default.limpiar_3d();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 6 /* error */;
                    resultado.classIdentificador = this.fila + "-" + this.columna;
                    resultado.classValor = "No es posible realizar la suma, verifique el tipo de los valores.";
                    return resultado;
            }
        }
        catch (Error) {
            Tabla_Simbolos_1.default.limpiar_3d();
            resultado = new Simbolo_1.default();
            resultado.classRol = 10 /* error */;
            resultado.classTipo = 6 /* error */;
            resultado.classIdentificador = this.fila + "-" + this.columna;
            resultado.classValor = "Error: " + Error.message;
            return resultado;
        }
    };
    return Suma;
}(Expresion_1.default));
exports.default = Suma;
