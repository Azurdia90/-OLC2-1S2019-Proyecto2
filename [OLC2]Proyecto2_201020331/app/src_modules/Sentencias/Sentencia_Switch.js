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
var Sentencia_Caso_1 = __importDefault(require("./Sentencia_Caso"));
var Expresion_1 = __importDefault(require("../Expresiones/Expresion"));
var Sentencia_Break_1 = __importDefault(require("./Sentencia_Break"));
var Sentencia_Continue_1 = __importDefault(require("./Sentencia_Continue"));
var Sentencia_Return_1 = __importDefault(require("./Sentencia_Return"));
var Sentencia_If_1 = __importDefault(require("./Sentencia_If"));
var Sentencia_Switch = /** @class */ (function (_super) {
    __extends(Sentencia_Switch, _super);
    function Sentencia_Switch(p_comparacion, p_lista_casos, p_lista_defecto) {
        var _this = _super.call(this, 0, 0) || this;
        _this.comparacion = p_comparacion;
        _this.lista_casos = p_lista_casos;
        _this.lista_defecto = p_lista_defecto;
        return _this;
    }
    Sentencia_Switch.prototype.ejecutar = function (entorno_padre, ptr_entorno, etiqueta_retorno, etiqueta_inicio, etiqueta_fin, p_etiqueta_falsa) {
        try {
            Tabla_Simbolos_1.default.classCodigo_3D = "\n";
            var valor_comparacion;
            if (this.comparacion instanceof Expresion_1.default) {
                valor_comparacion = this.comparacion.ejecutar();
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
                resultado.classValor = "Sentencia Switch No realizada correctamente: El valor de comparación no pudo ser definido";
                return resultado;
            }
            var etiqueta_default = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            var etiqueta_verdadera;
            for (var i = 0; i < this.lista_casos.length; i++) {
                var valor2 = this.lista_casos[i].classValor;
                etiqueta_verdadera = "L" + Tabla_Simbolos_1.default.classEtiqueta;
                Tabla_Simbolos_1.default.classCodigo_3D = "if(" + valor_comparacion.classValor + " != " + valor2.classValor + ") goto " + etiqueta_verdadera + ";\n";
                this.lista_casos[i].ejecutar(entorno_padre, ptr_entorno, etiqueta_retorno, etiqueta_inicio, etiqueta_default);
                Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_verdadera + ": \n";
            }
            this.entorno_local = new Map();
            Tabla_Simbolos_1.default.classEntornos.agregar(this.entorno_local);
            for (var i = 0; i < this.lista_defecto.length; i++) {
                var sentencia;
                var resultado_sentencia;
                sentencia = this.lista_defecto[i];
                if (sentencia instanceof Sentencia_Break_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_default);
                }
                else if (sentencia instanceof Sentencia_Continue_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_inicio);
                }
                else if (sentencia instanceof Sentencia_Return_1.default) //pendiente ceremonia cambio de ambito
                 {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno);
                }
                else if (sentencia instanceof Sentencia_Caso_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno, etiqueta_inicio, etiqueta_default);
                }
                else if (sentencia instanceof Sentencia_If_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno, etiqueta_inicio, etiqueta_default);
                }
                else {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno);
                }
                if (resultado_sentencia.classRol == 10 /* error */) {
                    Tabla_Simbolos_1.default.classEntornos.desapilar();
                    return resultado_sentencia;
                }
            }
            Tabla_Simbolos_1.default.classEntornos.agregar(this.entorno_local);
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_default + ": \n";
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
    return Sentencia_Switch;
}(Instruccion_1.default));
exports.default = Sentencia_Switch;
