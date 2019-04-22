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
var Expresion_1 = __importDefault(require("./Expresion"));
var Simbolo_1 = __importDefault(require("../Tabla_Simbolos/Simbolo"));
var Tabla_Simbolos_1 = __importDefault(require("../Tabla_Simbolos/Tabla_Simbolos"));
var Sentencia_Decremento = /** @class */ (function (_super) {
    __extends(Sentencia_Decremento, _super);
    function Sentencia_Decremento(operador, p_tipo, p_posicion) {
        var _this = _super.call(this, operador, "--") || this;
        _this.identificador = operador.classValor;
        _this.tipo = p_tipo;
        return _this;
    }
    Sentencia_Decremento.prototype.ejecutar = function () {
        try {
            if (this.tipo == 0) {
                if (Tabla_Simbolos_1.default.existe_simbolo(this.identificador)) {
                    var retorno = Tabla_Simbolos_1.default.obtener_simbolo(this.identificador);
                    if (retorno != undefined) {
                        if ((retorno.classTipo == 2 /* entero */) || (retorno.classTipo == 3 /* decimal */)) {
                            Tabla_Simbolos_1.default.classCodigo_3D = retorno.classValor + " = " + retorno.classValor + " - 1;\n";
                            var resultado = new Simbolo_1.default();
                            resultado.classAcceso = 0 /* publico */;
                            resultado.classRol = 9 /* aceptado */;
                            resultado.classTipo = retorno.classTipo;
                            resultado.classIdentificador = "10-4";
                            resultado.classValor = retorno.classValor + " = " + retorno.classValor + " - 1;\n";
                            return resultado;
                        }
                        else {
                            var resultado = new Simbolo_1.default();
                            resultado.classAcceso = 0 /* publico */;
                            resultado.classRol = 10 /* error */;
                            resultado.classTipo = 5 /* cadena */;
                            resultado.classIdentificador = "33-12";
                            resultado.classValor = "Decremento NO realizado correctamente: La variable \"" + this.identificador + "\" no es de tipo numerico.";
                            return resultado;
                        }
                    }
                    else {
                        var resultado = new Simbolo_1.default();
                        resultado.classAcceso = 0 /* publico */;
                        resultado.classRol = 10 /* error */;
                        resultado.classTipo = 5 /* cadena */;
                        resultado.classIdentificador = "33-12";
                        resultado.classValor = "Decremento NO realizado correctamente: La variable \"" + this.identificador + "\" no existe.";
                        return resultado;
                    }
                }
                else {
                    var resultado = new Simbolo_1.default();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 5 /* cadena */;
                    resultado.classIdentificador = "33-12";
                    resultado.classValor = "Decremento NO realizado correctamente: La variable \"" + this.identificador + "\" no existe.";
                    return resultado;
                }
            }
            else {
                Tabla_Simbolos_1.default.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Decremento No realizado correctamente: Funcionalidad No implementada Aun.";
                return resultado;
            }
        }
        catch (Error) {
            Tabla_Simbolos_1.default.limpiar_3d();
            var resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 10 /* error */;
            resultado.classTipo = 5 /* cadena */;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Decremento No realizado correctamente: " + Error.Message;
            return resultado;
        }
    };
    return Sentencia_Decremento;
}(Expresion_1.default));
exports.default = Sentencia_Decremento;
