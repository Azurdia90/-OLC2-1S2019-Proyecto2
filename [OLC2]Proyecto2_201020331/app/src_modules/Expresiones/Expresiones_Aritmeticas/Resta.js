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
var Resta = /** @class */ (function (_super) {
    __extends(Resta, _super);
    function Resta(p_operador1, p_operador2) {
        var _this = _super.call(this, p_operador1, "-", p_operador2) || this;
        _this.tabla_resta = [
            /*nulo*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*booleano*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*entero*/ [73 /* error */, 73 /* error */, 6 /* resta_entero */, 7 /* resta_decimal */, 8 /* resta_entero_caracter */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*decimal*/ [73 /* error */, 73 /* error */, 7 /* resta_decimal */, 7 /* resta_decimal */, 10 /* resta_decimal_caracter */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*caracter*/ [73 /* error */, 73 /* error */, 9 /* resta_caracter_entero */, 11 /* resta_caracter_decimal */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*cadena*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*error*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
        ];
        return _this;
    }
    Resta.prototype.ejecutar = function (entorno_padre, ptr_entorno) {
        var tipo_resta;
        var valor1;
        var valor2;
        var resultado;
        try {
            if (this.operador1 instanceof Expresion_1.default) {
                valor1 = this.operador1.ejecutar(entorno_padre, ptr_entorno);
            }
            else {
                valor1 = this.operador1;
            }
            if (this.operador2 instanceof Expresion_1.default) {
                valor2 = this.operador2.ejecutar(entorno_padre, ptr_entorno);
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
            tipo_resta = this.tabla_resta[valor1.classTipo][valor2.classTipo];
            resultado = new Simbolo_1.default();
            switch (tipo_resta) {
                case 6 /* resta_entero */:
                    var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " - " + valor2.classValor + ";\n";
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 2 /* entero */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "t" + etiqueta_actual;
                    return resultado;
                case 7 /* resta_decimal */:
                    var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " - " + valor2.classValor + ";\n";
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 3 /* decimal */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "t" + etiqueta_actual;
                    return resultado;
                case 8 /* resta_entero_caracter */:
                    var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " - " + valor2.classValor + ";\n";
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 2 /* entero */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "t" + etiqueta_actual;
                    return resultado;
                case 9 /* resta_caracter_entero */:
                    var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " - " + valor2.classValor + ";\n";
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 2 /* entero */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "t" + etiqueta_actual;
                    return resultado;
                case 10 /* resta_decimal_caracter */:
                    var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " - " + valor2.classValor + ";\n";
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 3 /* decimal */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "t" + etiqueta_actual;
                    return resultado;
                case 11 /* resta_caracter_decimal */:
                    var etiqueta_actual = Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = "t" + etiqueta_actual + " = " + valor1.classValor + " - " + valor2.classValor + ";\n";
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 3 /* decimal */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "t" + etiqueta_actual;
                    return resultado;
                case 73 /* error */:
                    Tabla_Simbolos_1.default.limpiar_3d();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 6 /* error */;
                    resultado.classIdentificador = this.fila + " - " + this.columna;
                    resultado.classValor = "No es posible restar un valor del tipo " + valor1.classTipo + " con un valor tipo " + valor2.classTipo + ".";
                    return resultado;
                default:
                    Tabla_Simbolos_1.default.limpiar_3d();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classIdentificador = this.fila + "-" + this.columna;
                    resultado.classTipo = 6 /* error */;
                    resultado.classValor = "No es posible realizar la resta, verifique los valores.";
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
    Resta.prototype.evaluar = function (entorno_padre, ptr_entorno) {
        var tipo_resta;
        var valor1;
        var valor2;
        var resultado;
        try {
            if (this.operador1 instanceof Expresion_1.default) {
                valor1 = this.operador1.evaluar(entorno_padre, ptr_entorno);
            }
            else {
                valor1 = this.operador1;
            }
            if (this.operador2 instanceof Expresion_1.default) {
                valor2 = this.operador2.evaluar(entorno_padre, ptr_entorno);
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
            tipo_resta = this.tabla_resta[valor1.classTipo][valor2.classTipo];
            resultado = new Simbolo_1.default();
            switch (tipo_resta) {
                case 6 /* resta_entero */:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 2 /* entero */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "10-4";
                    return resultado;
                case 7 /* resta_decimal */:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 3 /* decimal */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "10-4";
                    return resultado;
                case 8 /* resta_entero_caracter */:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 2 /* entero */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "10-4";
                    return resultado;
                case 9 /* resta_caracter_entero */:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 2 /* entero */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "10-4";
                    return resultado;
                case 10 /* resta_decimal_caracter */:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 3 /* decimal */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "10-4";
                    return resultado;
                case 11 /* resta_caracter_decimal */:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 3 /* decimal */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "10-4";
                    return resultado;
                case 73 /* error */:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 6 /* error */;
                    resultado.classIdentificador = this.fila + " - " + this.columna;
                    resultado.classValor = "No es posible restar un valor del tipo " + valor1.classTipo + " con un valor tipo " + valor2.classTipo + ".";
                    return resultado;
                default:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classIdentificador = this.fila + "-" + this.columna;
                    resultado.classTipo = 6 /* error */;
                    resultado.classValor = "No es posible realizar la resta, verifique los valores.";
                    return resultado;
            }
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
    return Resta;
}(Expresion_1.default));
exports.default = Resta;
