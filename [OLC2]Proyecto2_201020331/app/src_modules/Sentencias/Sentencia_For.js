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
var Tabla_Simbolos_1 = __importDefault(require("../Tabla_Simbolos/Tabla_Simbolos"));
var Simbolo_1 = __importDefault(require("../Tabla_Simbolos/Simbolo"));
var Expresion_1 = __importDefault(require("../Expresiones/Expresion"));
var Instruccion_1 = __importDefault(require("../Instruccion"));
var Sentencia_Break_1 = __importDefault(require("./Sentencia_Break"));
var Sentencia_Continue_1 = __importDefault(require("./Sentencia_Continue"));
var Sentencia_Return_1 = __importDefault(require("./Sentencia_Return"));
var Sentencia_If_1 = __importDefault(require("./Sentencia_If"));
var Sentencia_Switch_1 = __importDefault(require("./Sentencia_Switch"));
var Sentencia_For = /** @class */ (function (_super) {
    __extends(Sentencia_For, _super);
    function Sentencia_For(p_sentencia_inicio, p_sentencia_comparacion, p_sentencia_final, p_lista_instrucciones) {
        var _this = _super.call(this, 0, 0) || this;
        _this.sentencia_inicio = p_sentencia_inicio;
        _this.sentencia_comparacion = p_sentencia_comparacion;
        _this.sentencia_fin = p_sentencia_final;
        _this.lista_sentencias = p_lista_instrucciones;
        return _this;
    }
    Sentencia_For.prototype.ejecutar = function (entorno_padre, ptr_entorno, etiqueta_retorno) {
        try {
            this.entorno_local = new Map();
            Tabla_Simbolos_1.default.classEntornos.agregar(this.entorno_local);
            var etiqueta_inicio = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            var etiqueta_ejecucion = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            var etiqueta_continue = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            var etiqueta_fin = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            var condicion_f;
            var inicio = this.sentencia_inicio.ejecutar(this.entorno_local, ptr_entorno);
            if (inicio.classRol == 10 /* error */) {
                Tabla_Simbolos_1.default.classEntornos.desapilar();
                return inicio;
            }
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_inicio + ":\n";
            if (this.sentencia_comparacion instanceof Expresion_1.default) {
                condicion_f = this.sentencia_comparacion.ejecutar();
            }
            else if (this.sentencia_comparacion instanceof Simbolo_1.default) {
                condicion_f = this.sentencia_comparacion;
            }
            else {
                Tabla_Simbolos_1.default.classEntornos.desapilar();
                Tabla_Simbolos_1.default.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia For No realizada correctamente: No existe una expresion relacional.";
                return resultado;
            }
            if (condicion_f.classTipo != 1 /* booleano */) {
                Tabla_Simbolos_1.default.classEntornos.desapilar();
                Tabla_Simbolos_1.default.limpiar_3d();
                console.log(condicion_f.classValor);
                console.log(condicion_f.classTipo);
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia For No realizada correctamente: La expresion relacional no resulta un valor booleano.";
                return resultado;
            }
            Tabla_Simbolos_1.default.classCodigo_3D = "if(" + condicion_f.classValor + " ) goto " + etiqueta_ejecucion + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = "goto " + etiqueta_fin + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_ejecucion + " :\n";
            for (var i = 0; i < this.lista_sentencias.length; i++) {
                var sentencia;
                var resultado_sentencia;
                sentencia = this.lista_sentencias[i];
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
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno, etiqueta_fin, etiqueta_continue);
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
            var fin = this.sentencia_fin.ejecutar();
            if (fin.classRol == 10 /* error */) {
                Tabla_Simbolos_1.default.classEntornos.desapilar();
                return fin;
            }
            Tabla_Simbolos_1.default.classCodigo_3D = "goto " + etiqueta_inicio + ";\n";
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_fin + " :\n";
            Tabla_Simbolos_1.default.classEntornos.desapilar();
            var resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 9 /* aceptado */;
            resultado.classTipo = 5 /* cadena */;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Sentencia If  realizada correctamente";
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
            resultado.classValor = "Sentencia If No realizada correctamente: " + Error.Message;
            return resultado;
        }
    };
    return Sentencia_For;
}(Instruccion_1.default));
exports.default = Sentencia_For;
