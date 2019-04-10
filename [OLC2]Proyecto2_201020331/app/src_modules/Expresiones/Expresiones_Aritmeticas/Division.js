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
var Division = /** @class */ (function (_super) {
    __extends(Division, _super);
    function Division(p_operador1, p_operador2) {
        var _this = _super.call(this, p_operador1, "/", p_operador2) || this;
        _this.tabla_division = [
            /*nulo*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*booleano*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*entero*/ [73 /* error */, 73 /* error */, 18 /* division_decimal */, 18 /* division_decimal */, 19 /* division_decimal_caracter */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*decimal*/ [73 /* error */, 73 /* error */, 18 /* division_decimal */, 18 /* division_decimal */, 19 /* division_decimal_caracter */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*caracter*/ [73 /* error */, 73 /* error */, 20 /* division_caracter_decimal */, 20 /* division_caracter_decimal */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*cadena*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*error*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
        ];
        return _this;
    }
    Division.prototype.ejecutar = function () {
        var tipo_division;
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
            tipo_division = this.tabla_division[valor1.classTipo][valor2.classTipo];
            resultado = new Simbolo_1.default();
            switch (tipo_division) {
                case 18 /* division_decimal */:
                    if (valor2.classValor != 0) {
                        var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                        Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " / " + valor2.classValor + ";\n";
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 9 /* aceptado */;
                        resultado.classTipo = 3 /* decimal */;
                        resultado.classIdentificador = "10-4";
                        resultado.classValor = "t" + etiqueta_actual;
                    }
                    else {
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 10 /* error */;
                        resultado.classTipo = 6 /* error */;
                        resultado.classIdentificador = this.fila + "-" + this.columna;
                        resultado.classValor = "Division entre cero.";
                    }
                    return resultado;
                case 20 /* division_caracter_decimal */:
                    if (valor2.classValor != 0) {
                        var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                        Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " / " + valor2.classValor + ";\n";
                        resultado.classRol = 9 /* aceptado */;
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classIdentificador = "10-4";
                        resultado.classTipo = 3 /* decimal */;
                        resultado.classValor = "t" + etiqueta_actual;
                    }
                    else {
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 10 /* error */;
                        resultado.classTipo = 6 /* error */;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "Division entre cero.";
                    }
                    return resultado;
                case 19 /* division_decimal_caracter */:
                    if (valor2.classValor != 0) {
                        var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                        Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " / " + valor2.classValor + ";\n";
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 9 /* aceptado */;
                        resultado.classTipo = 3 /* decimal */;
                        resultado.classIdentificador = "10-4";
                        resultado.classValor = "t" + etiqueta_actual;
                    }
                    else {
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 10 /* error */;
                        resultado.classTipo = 6 /* error */;
                        resultado.classIdentificador = this.fila + "-" + this.columna;
                        resultado.classValor("Division entre cero.");
                    }
                    return resultado;
                case 73 /* error */:
                    Tabla_Simbolos_1.default.limpiar_3d();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 6 /* error */;
                    resultado.classIdentificador = this.fila + "-" + this.columna;
                    resultado.classValor = "No es posible division un valor del tipo " + valor1.classTipo + " con un valor tipo " + valor2.classTipo + ".";
                    return resultado;
                default:
                    Tabla_Simbolos_1.default.limpiar_3d();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 6 /* error */;
                    resultado.classIdentificador = this.fila + "-" + this.columna;
                    resultado.classValor = "No es posible realizar la division, verifique los valores.";
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
    return Division;
}(Expresion_1.default));
exports.default = Division;
