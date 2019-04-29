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
var Simbolo_1 = __importDefault(require("../Tabla_Simbolos/Simbolo"));
var Instruccion_1 = __importDefault(require("../Instruccion"));
var Tabla_Simbolos_1 = __importDefault(require("../Tabla_Simbolos/Tabla_Simbolos"));
var Expresion_1 = __importDefault(require("../Expresiones/Expresion"));
var Sentencia_Break_1 = __importDefault(require("./Sentencia_Break"));
var Sentencia_Continue_1 = __importDefault(require("./Sentencia_Continue"));
var Sentencia_Return_1 = __importDefault(require("./Sentencia_Return"));
var Sentencia_Switch_1 = __importDefault(require("./Sentencia_Switch"));
var Sentencia_If = /** @class */ (function (_super) {
    __extends(Sentencia_If, _super);
    function Sentencia_If(p_tipo, p_evaluacion, p_lista_instrucciones, p_lista_instrucciones_else_if, p_lista_instrucciones_else) {
        var _this = _super.call(this, 0, 0) || this;
        _this.tipo = p_tipo;
        _this.evaluacion = p_evaluacion;
        _this.lista_instrucciones = p_lista_instrucciones;
        _this.lista_instrucciones_else_if = p_lista_instrucciones_else_if;
        _this.lista_instrucciones_else = p_lista_instrucciones_else;
        return _this;
    }
    Sentencia_If.prototype.ejecutar = function (entorno_padre, ptr_entorno, etiqueta_retorno, etiqueta_inicio, etiqueta_fin, p_etiqueta_falsa, p_etiqueta_salida) {
        try {
            this.entorno_local = new Map();
            Tabla_Simbolos_1.default.classEntornos.agregar(this.entorno_local);
            var etiqueta_verdadera;
            var etiqueta_falsa;
            var etiqueta_salida;
            var resultado_evaluacion;
            if (this.evaluacion instanceof Expresion_1.default) {
                resultado_evaluacion = this.evaluacion.ejecutar(entorno_padre);
            }
            else if (this.evaluacion instanceof Simbolo_1.default) {
                resultado_evaluacion = this.evaluacion;
            }
            else {
                Tabla_Simbolos_1.default.classEntornos.desapilar();
                Tabla_Simbolos_1.default.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia If No realizada correctamente: El valor a evaluar no es posible definir.";
                return resultado;
            }
            if (resultado_evaluacion.classRol == 10 /* error */) {
                Tabla_Simbolos_1.default.classEntornos.desapilar();
                return resultado_evaluacion;
            }
            etiqueta_verdadera = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            if (p_etiqueta_falsa != undefined && p_etiqueta_falsa != "") {
                etiqueta_falsa = p_etiqueta_falsa;
            }
            else {
                etiqueta_falsa = "L" + Tabla_Simbolos_1.default.classEtiqueta;
            }
            if (p_etiqueta_salida != undefined && p_etiqueta_salida != "") {
                etiqueta_salida = p_etiqueta_salida;
            }
            else {
                if (resultado_evaluacion.classTipo == 5 /* cadena */) {
                    etiqueta_salida = resultado_evaluacion.classValor;
                }
                else {
                    etiqueta_salida = "L" + Tabla_Simbolos_1.default.classEtiqueta;
                }
            }
            if (resultado_evaluacion.classTipo == 1 /* booleano */) {
                Tabla_Simbolos_1.default.classCodigo_3D = "if( " + resultado_evaluacion.classValor + ") goto " + etiqueta_verdadera + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = "goto " + etiqueta_falsa + ";\n";
                Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_verdadera + ":\n";
            }
            else if (resultado_evaluacion.classTipo == 5 /* cadena */) {
                /* SIGA EL FLRUJO DEL OR,AND,NOT */
            }
            else {
                Tabla_Simbolos_1.default.classEntornos.desapilar();
                Tabla_Simbolos_1.default.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Sentencia If No realizada correctamente: El valor a evaluar no es de tipo booleano.";
                return resultado;
            }
            for (var i = 0; i < this.lista_instrucciones.length; i++) {
                var sentencia;
                var resultado_sentencia;
                sentencia = this.lista_instrucciones[i];
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
                else if (sentencia instanceof Sentencia_Switch_1.default) {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno, etiqueta_inicio, etiqueta_fin);
                }
                else if (sentencia instanceof Sentencia_If) {
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
            Tabla_Simbolos_1.default.classCodigo_3D = "goto " + etiqueta_salida + ";\n";
            if (this.tipo == 0) {
                for (var i = 0; i < this.lista_instrucciones_else_if.length; i++) {
                    var sentencia;
                    var resultado_sentencia;
                    sentencia = this.lista_instrucciones_else_if[i];
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
                    else if (sentencia instanceof Sentencia_Switch_1.default) {
                        resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno, etiqueta_inicio, etiqueta_fin);
                    }
                    else if (sentencia instanceof Sentencia_If) {
                        resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno, etiqueta_inicio, etiqueta_fin, etiqueta_falsa, etiqueta_salida);
                    }
                    else {
                        resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno);
                    }
                    if (resultado_sentencia.classRol == 10 /* error */) {
                        Tabla_Simbolos_1.default.classEntornos.desapilar();
                        return resultado_sentencia;
                    }
                }
                Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_falsa + ":\n";
                for (var i = 0; i < this.lista_instrucciones_else.length; i++) {
                    var sentencia;
                    var resultado_sentencia;
                    sentencia = this.lista_instrucciones_else[i];
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
                    else if (sentencia instanceof Sentencia_Switch_1.default) {
                        resultado_sentencia = sentencia.ejecutar(this.entorno_local, ptr_entorno, etiqueta_retorno, etiqueta_inicio, etiqueta_fin);
                    }
                    else if (sentencia instanceof Sentencia_If) {
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
            }
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_salida + ":\n";
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
    return Sentencia_If;
}(Instruccion_1.default));
exports.default = Sentencia_If;
