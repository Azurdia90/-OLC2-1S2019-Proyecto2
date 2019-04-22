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
var Sentencia_Break_1 = __importDefault(require("./Sentencia_Break"));
var Sentencia_Continue_1 = __importDefault(require("./Sentencia_Continue"));
var Sentencia_Return_1 = __importDefault(require("./Sentencia_Return"));
var Sentencia_If_1 = __importDefault(require("./Sentencia_If"));
var Expresion_1 = __importDefault(require("../Expresiones/Expresion"));
var Sentencia_Caso = /** @class */ (function (_super) {
    __extends(Sentencia_Caso, _super);
    function Sentencia_Caso(p_valor, p_lista_sentencias) {
        var _this = _super.call(this, 0, 0) || this;
        _this.valor = p_valor;
        _this.lista_sentencias = p_lista_sentencias;
        return _this;
    }
    Sentencia_Caso.prototype.ejecutar = function (entorno_padre, ptr_entorno, etiqueta_retorno, etiqueta_inicio, etiqueta_fin) {
        try {
            this.entorno_local = new Map();
            Tabla_Simbolos_1.default.classEntornos.agregar(this.entorno_local);
            for (var i = 0; i < this.lista_sentencias.length; i++) {
                var sentencia;
                var resultado_sentencia;
                sentencia = this.lista_sentencias[i];
                if (sentencia instanceof Sentencia_Break_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_fin);
                }
                else if (sentencia instanceof Sentencia_Continue_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_inicio);
                }
                else if (sentencia instanceof Sentencia_Return_1.default) //pendiente ceremonia cambio de ambito
                 {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno);
                }
                else if (sentencia instanceof Sentencia_If_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno, etiqueta_inicio, etiqueta_fin);
                }
                else {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno);
                }
                if (resultado_sentencia.classRol == 10 /* error */) {
                    Tabla_Simbolos_1.default.classEntornos.desapilar();
                    return resultado_sentencia;
                }
            }
            Tabla_Simbolos_1.default.classEntornos.desapilar();
            var resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 9 /* aceptado */;
            resultado.classTipo = 5 /* cadena */;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Sentencia Switch realizada correctamente";
            return resultado;
        }
        catch (Error) {
            Tabla_Simbolos_1.default.classEntornos.desapilar();
            Tabla_Simbolos_1.default.limpiar_3d();
            var resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 10 /* error */;
            resultado.classTipo = 5 /* cadena */;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Sentencia Switch No realizada correctamente: " + Error.Message;
            return resultado;
        }
    };
    Object.defineProperty(Sentencia_Caso.prototype, "classValor", {
        get: function () {
            if (this.valor instanceof Expresion_1.default) {
                return this.valor.ejecutar();
            }
            else if (this.valor instanceof Simbolo_1.default) {
                return this.valor;
            }
            else {
                Tabla_Simbolos_1.default.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia Switch No realizada correctamente: No se puede definir el valor del caso.";
                return resultado;
            }
        },
        set: function (p_valor) {
            this.valor = p_valor;
        },
        enumerable: true,
        configurable: true
    });
    return Sentencia_Caso;
}(Instruccion_1.default));
exports.default = Sentencia_Caso;
