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
var Expresion_1 = __importDefault(require("../Expresiones/Expresion"));
var Sentencia_Break_1 = __importDefault(require("./Sentencia_Break"));
var Sentencia_Continue_1 = __importDefault(require("./Sentencia_Continue"));
var Sentencia_Return_1 = __importDefault(require("./Sentencia_Return"));
var Sentencia_If_1 = __importDefault(require("./Sentencia_If"));
var Sentencia_Switch_1 = __importDefault(require("./Sentencia_Switch"));
var Sentencia_Do_While = /** @class */ (function (_super) {
    __extends(Sentencia_Do_While, _super);
    function Sentencia_Do_While(p_evaluacion, p_lista_instrucciones) {
        var _this = _super.call(this, 0, 0) || this;
        _this.evaluacion = p_evaluacion;
        _this.lista_instrucciones = p_lista_instrucciones;
        return _this;
    }
    Sentencia_Do_While.prototype.ejecutar = function (entorno_padre, ptr_entorno, etiqueta_retorno) {
        try {
            this.entorno_local = new Map();
            Tabla_Simbolos_1.default.classEntornos.agregar(this.entorno_local);
            var comparacion_f;
            if (this.evaluacion instanceof Expresion_1.default) {
                comparacion_f = this.evaluacion.ejecutar();
            }
            else if (this.evaluacion instanceof Simbolo_1.default) {
                comparacion_f = this.evaluacion;
            }
            else {
                Tabla_Simbolos_1.default.classEntornos.desapilar();
                Tabla_Simbolos_1.default.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia While No realizada correctamente: No existe un valor definido.";
                return resultado;
            }
            var etiqueta_inicio = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            var etiqueta_continue = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            var etiqueta_fin = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_inicio + ":\n";
            for (var i = 0; i < this.lista_instrucciones.length; i++) {
                var sentencia;
                var resultado_sentencia;
                sentencia = this.lista_instrucciones[i];
                if (sentencia instanceof Sentencia_Break_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_fin);
                }
                else if (sentencia instanceof Sentencia_Continue_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_continue);
                }
                else if (sentencia instanceof Sentencia_Return_1.default) //pendiente ceremonia cambio de ambito
                 {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno);
                }
                else if (sentencia instanceof Sentencia_If_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno, etiqueta_fin, etiqueta_inicio);
                }
                else if (sentencia instanceof Sentencia_Switch_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno);
                }
                else {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno);
                }
                if (resultado_sentencia.classRol == 10 /* error */) {
                    Tabla_Simbolos_1.default.classEntornos.desapilar();
                    return resultado_sentencia;
                }
            }
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_continue + ":\n";
            Tabla_Simbolos_1.default.classCodigo_3D = "if(" + comparacion_f.classValor + " ) goto " + etiqueta_inicio + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_fin + ":\n";
            Tabla_Simbolos_1.default.classEntornos.desapilar();
            var resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 9 /* aceptado */;
            resultado.classTipo = 5 /* cadena */;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Sentencia While realizada correctamente.";
            return resultado;
        }
        catch (Error) {
            Tabla_Simbolos_1.default.limpiar_3d();
            Tabla_Simbolos_1.default.classEntornos.desapilar();
            var resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 10 /* error */;
            resultado.classTipo = 5 /* cadena */;
            resultado.classIdentificador = "33-12";
            resultado.classValor = "Sentencia While No realizada correctamente: " + Error.Message;
            return resultado;
        }
    };
    return Sentencia_Do_While;
}(Instruccion_1.default));
exports.default = Sentencia_Do_While;
