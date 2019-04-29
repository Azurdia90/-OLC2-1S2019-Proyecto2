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
var Operador_Potencia = /** @class */ (function (_super) {
    __extends(Operador_Potencia, _super);
    function Operador_Potencia(p_expresion1, p_expresion2) {
        var _this = _super.call(this, p_expresion1, "^", p_expresion2) || this;
        _this.tabla_potencia = [
            /*nulo*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*booleano*/ [73 /* error */, 27 /* potencia_entero */, 28 /* potencia_decimal */, 27 /* potencia_entero */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*entero*/ [73 /* error */, 27 /* potencia_entero */, 27 /* potencia_entero */, 28 /* potencia_decimal */, 27 /* potencia_entero */, 73 /* error */, 73 /* error */],
            /*decimal*/ [73 /* error */, 27 /* potencia_entero */, 27 /* potencia_entero */, 28 /* potencia_decimal */, 27 /* potencia_entero */, 73 /* error */, 73 /* error */],
            /*caracter*/ [73 /* error */, 27 /* potencia_entero */, 27 /* potencia_entero */, 28 /* potencia_decimal */, 27 /* potencia_entero */, 73 /* error */, 73 /* error */],
            /*cadena*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*error*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
        ];
        return _this;
    }
    Operador_Potencia.prototype.ejecutar = function (entorno_padre, ptr_entorno) {
        var tipo_potencia;
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
            tipo_potencia = this.tabla_potencia[valor1.classTipo][valor2.classTipo];
            resultado = new Simbolo_1.default();
            switch (tipo_potencia) {
                case 27 /* potencia_entero */:
                    var tam_metodo = ptr_entorno[0];
                    var temporal_simulado = "t" + Tabla_Simbolos_1.default.classTemporal;
                    var temporal_contador = "t" + Tabla_Simbolos_1.default.classTemporal;
                    var temporal_pos_return = "t" + Tabla_Simbolos_1.default.classTemporal;
                    var temporal_retorno = "t" + Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_simulado + " = P + " + tam_metodo + ";\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor1.classValor + ";\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  3;\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor2.classValor + ";\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "P = P + " + tam_metodo + ";\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "call pow_potencia_entero;\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 3 /* decimal */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = temporal_retorno;
                    return resultado;
                case 28 /* potencia_decimal */:
                    var tam_metodo = ptr_entorno[0];
                    var temporal_simulado = "t" + Tabla_Simbolos_1.default.classTemporal;
                    var temporal_contador = "t" + Tabla_Simbolos_1.default.classTemporal;
                    var temporal_pos_return = "t" + Tabla_Simbolos_1.default.classTemporal;
                    var temporal_retorno = "t" + Tabla_Simbolos_1.default.classTemporal;
                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_simulado + " = P + " + tam_metodo + ";\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  2;\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor1.classValor + ";\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_contador + " = " + temporal_simulado + " +  3;\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "Stack[" + temporal_contador + "] = " + valor2.classValor + ";\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "P = P + " + tam_metodo + ";\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "call pow_potencia_decimal;\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_pos_return + " = P + 1;\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = temporal_retorno + " = Stack[" + temporal_pos_return + "];\n";
                    Tabla_Simbolos_1.default.classCodigo_3D = "P = P - " + tam_metodo + ";\n";
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 3 /* decimal */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = temporal_retorno;
                    return resultado;
                case 73 /* error */:
                    Tabla_Simbolos_1.default.limpiar_3d();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 6 /* error */;
                    resultado.classIdentificador = this.fila + "-" + this.columna;
                    resultado.classValor("No es posible realizar la funcion potencia de un valor del tipo " + valor1.classTipo + " con un valor tipo " + valor2.classTipo + ".");
                    return resultado;
                default:
                    Tabla_Simbolos_1.default.limpiar_3d();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 6 /* error */;
                    resultado.classIdentificador = this.fila + "-" + this.columna;
                    resultado.classValor("No es posible realizar la función Potencia, verifique los valores.");
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
    Operador_Potencia.prototype.evaluar = function (entorno_padre, ptr_entorno) {
        var tipo_potencia;
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
            tipo_potencia = this.tabla_potencia[valor1.classTipo][valor2.classTipo];
            resultado = new Simbolo_1.default();
            switch (tipo_potencia) {
                case 27 /* potencia_entero */:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 3 /* decimal */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = "10-4";
                    return resultado;
                case 28 /* potencia_decimal */:
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
                    resultado.classIdentificador = this.fila + "-" + this.columna;
                    resultado.classValor("No es posible realizar la funcion potencia de un valor del tipo " + valor1.classTipo + " con un valor tipo " + valor2.classTipo + ".");
                    return resultado;
                default:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 6 /* error */;
                    resultado.classIdentificador = this.fila + "-" + this.columna;
                    resultado.classValor("No es posible realizar la función Potencia, verifique los valores.");
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
    return Operador_Potencia;
}(Expresion_1.default));
exports.default = Operador_Potencia;
