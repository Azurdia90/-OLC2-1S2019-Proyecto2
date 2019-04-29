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
var Operador_Ternario = /** @class */ (function (_super) {
    __extends(Operador_Ternario, _super);
    function Operador_Ternario(p_expresion_comparacion, p_expresion1, p_expresion2) {
        var _this = _super.call(this, new Simbolo_1.default(), "?") || this;
        _this.comparacion = p_expresion_comparacion;
        _this.expresion1 = p_expresion1;
        _this.expresion2 = p_expresion2;
        return _this;
    }
    Operador_Ternario.prototype.ejecutar = function (entorno_padre, ptr_entorno) {
        try {
            var valor_comparacion;
            var valor_expresion1;
            var valor_expresion2;
            if (this.comparacion instanceof Expresion_1.default) {
                valor_comparacion = this.comparacion.ejecutar(entorno_padre, ptr_entorno);
            }
            else if (this.comparacion instanceof Simbolo_1.default) {
                valor_comparacion = this.comparacion;
            }
            else {
                Tabla_Simbolos_1.default.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Ternario No realizada correctamente: La comparación no pudo ser definida.";
                return resultado;
            }
            var temporal_resultado = "t" + Tabla_Simbolos_1.default.classTemporal;
            var etiqueta_verdadera = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            var etiqueta_falsa = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            var etiqueta_salida = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            Tabla_Simbolos_1.default.classCodigo_3D = "if(" + valor_comparacion.classValor + ") goto " + etiqueta_verdadera + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = "goto " + etiqueta_falsa + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_verdadera + ":\n";
            if (this.expresion1 instanceof Expresion_1.default) {
                valor_expresion1 = this.expresion1.ejecutar(entorno_padre, ptr_entorno);
            }
            else if (this.expresion1 instanceof Simbolo_1.default) {
                valor_expresion1 = this.expresion1;
            }
            else {
                Tabla_Simbolos_1.default.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Ternario No realizada correctamente: El valor 1 no pudo ser definido.";
                return resultado;
            }
            Tabla_Simbolos_1.default.classCodigo_3D = temporal_resultado + " = " + valor_expresion1.classValor + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = "goto " + etiqueta_salida + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_falsa + ":\n";
            if (this.expresion2 instanceof Expresion_1.default) {
                valor_expresion2 = this.expresion2.ejecutar(entorno_padre, ptr_entorno);
            }
            else if (this.expresion2 instanceof Simbolo_1.default) {
                valor_expresion2 = this.expresion2;
            }
            else {
                Tabla_Simbolos_1.default.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Ternario No realizada correctamente: El valor2 no pudo ser definido.";
                return resultado;
            }
            Tabla_Simbolos_1.default.classCodigo_3D = temporal_resultado + " = " + valor_expresion2.classValor + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_salida + ":\n";
            if (valor_expresion1.classTipo != valor_expresion2.classTipo) {
                console.log(valor_expresion1.classTipo);
                console.log(valor_expresion2.classTipo);
                Tabla_Simbolos_1.default.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Ternario No realizada correctamente: Los posibles valores a retornar no son del mismo tipo.";
                return resultado;
            }
            var resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 9 /* aceptado */;
            resultado.classTipo = valor_expresion1.classTipo;
            resultado.classIdentificador = "10-4";
            resultado.classValor = temporal_resultado;
            resultado.classTam = valor_expresion1.classTam;
            return resultado;
        }
        catch (Error) {
            Tabla_Simbolos_1.default.limpiar_3d();
            var resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 10 /* error */;
            resultado.classTipo = 5 /* cadena */;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Sentencia Ternario No realizada correctamente: " + Error.Message;
            return resultado;
        }
    };
    Operador_Ternario.prototype.evaluar = function (entorno_padre, ptr_entorno) {
        try {
            var valor_comparacion;
            var valor_expresion1;
            var valor_expresion2;
            if (this.comparacion instanceof Expresion_1.default) {
                valor_comparacion = this.comparacion.evaluar(entorno_padre, ptr_entorno);
            }
            else if (this.comparacion instanceof Simbolo_1.default) {
                valor_comparacion = this.comparacion;
            }
            else {
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Ternario No realizada correctamente: La comparación no pudo ser definida.";
                return resultado;
            }
            if (this.expresion1 instanceof Expresion_1.default) {
                valor_expresion1 = this.expresion1.evaluar(entorno_padre, ptr_entorno);
            }
            else if (this.expresion1 instanceof Simbolo_1.default) {
                valor_expresion1 = this.expresion1;
            }
            else {
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Ternario No realizada correctamente: El valor 1 no pudo ser definido.";
                return resultado;
            }
            if (this.expresion2 instanceof Expresion_1.default) {
                valor_expresion2 = this.expresion2.evaluar(entorno_padre, ptr_entorno);
            }
            else if (this.expresion2 instanceof Simbolo_1.default) {
                valor_expresion2 = this.expresion2;
            }
            else {
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Ternario No realizada correctamente: El valor2 no pudo ser definido.";
                return resultado;
            }
            if (valor_expresion1.classTipo != valor_expresion2.classTipo) {
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Ternario No realizada correctamente: Los posibles valores a retornar no son del mismo tipo.";
                return resultado;
            }
            var resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 9 /* aceptado */;
            resultado.classTipo = valor_expresion1.classTipo;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "10-4";
            return resultado;
        }
        catch (Error) {
            var resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 10 /* error */;
            resultado.classTipo = 5 /* cadena */;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Sentencia Ternario No realizada correctamente: " + Error.Message;
            return resultado;
        }
    };
    return Operador_Ternario;
}(Expresion_1.default));
exports.default = Operador_Ternario;
