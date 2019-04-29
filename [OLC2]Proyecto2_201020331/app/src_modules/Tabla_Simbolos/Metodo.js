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
var Simbolo_1 = __importDefault(require("./Simbolo"));
var Tabla_Simbolos_1 = __importDefault(require("./Tabla_Simbolos"));
var Sentencia_Break_1 = __importDefault(require("../Sentencias/Sentencia_Break"));
var Sentencia_Continue_1 = __importDefault(require("../Sentencias/Sentencia_Continue"));
var Sentencia_Return_1 = __importDefault(require("../Sentencias/Sentencia_Return"));
var Metodo = /** @class */ (function (_super) {
    __extends(Metodo, _super);
    function Metodo(p_lista_modificador, p_tipo_metodo, p_identificador, p_lista_parametros, p_lista_instrucciones) {
        var _this = _super.call(this, 0, 0) || this;
        _this.lista_modficadores = p_lista_modificador;
        _this.tipo_metodo = p_tipo_metodo;
        _this.identificador = p_identificador;
        _this.lista_parametros = p_lista_parametros;
        _this.lista_sentencias = p_lista_instrucciones;
        _this.ptr_entorno = new Array();
        _this.ptr_entorno[0] = 2;
        return _this;
        //0 es pa this
        //1 es pa return
    }
    Metodo.prototype.ejecutar = function (entorno_padre, ptr_entorno) {
        try {
            this.entorno_local = new Map();
            Tabla_Simbolos_1.default.classEntornos.agregar(this.entorno_local);
            for (var a = 0; a < this.lista_parametros.length; a++) {
                var parametros = this.lista_parametros[a];
                parametros.classPos = this.ptr_entorno[0];
                this.entorno_local.set(parametros.classIdentificador, parametros);
                this.ptr_entorno[0]++;
            }
            var bk_3d = Tabla_Simbolos_1.default.classCodigo_3D;
            var etiqueta_retorno = "L" + Tabla_Simbolos_1.default.classTemporal;
            Tabla_Simbolos_1.default.limpiar_3d();
            Tabla_Simbolos_1.default.limpiar_temporal();
            for (var i = 0; i < this.lista_sentencias.length; i++) {
                var sentencia;
                var resultado_sentencia;
                sentencia = this.lista_sentencias[i];
                if (sentencia instanceof Sentencia_Break_1.default) {
                    var resultado = new Simbolo_1.default();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 5 /* cadena */;
                    resultado.classIdentificador = "33-12";
                    resultado.classValor = "Metodo No realizado correctamente: No se permite una sentencia break en un metodo.";
                    return resultado;
                }
                else if (sentencia instanceof Sentencia_Continue_1.default) {
                    var resultado = new Simbolo_1.default();
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 5 /* cadena */;
                    resultado.classIdentificador = "33-12";
                    resultado.classValor = "Metodo No realizado correctamente: No se permite una sentencia continue en un metodo.";
                    return resultado;
                }
                else if (sentencia instanceof Sentencia_Return_1.default) //pendiente ceremonia cambio de ambito
                 {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, this.ptr_entorno, etiqueta_retorno);
                }
                else {
                    resultado_sentencia = sentencia.ejecutar(this.entorno_local, this.ptr_entorno, etiqueta_retorno);
                }
                if (resultado_sentencia.classRol == 10 /* error */) {
                    Tabla_Simbolos_1.default.classEntornos.desapilar();
                    return resultado_sentencia;
                }
            }
            Tabla_Simbolos_1.default.classCodigo_3D = "\n";
            Tabla_Simbolos_1.default.classCodigo_3D = etiqueta_retorno + ":\n";
            Tabla_Simbolos_1.default.classCodigo_3D = "end\n";
            Tabla_Simbolos_1.default.classEntornos.desapilar();
            var bk_metodo = Tabla_Simbolos_1.default.classCodigo_3D;
            var cd_metodo = "\n";
            cd_metodo = cd_metodo + "proc " + this.identificador + "\n";
            cd_metodo = cd_metodo + "begin\n";
            cd_metodo = cd_metodo + "\n";
            cd_metodo = cd_metodo + this.build_declaracion_etiquetas();
            cd_metodo = cd_metodo + bk_metodo;
            Tabla_Simbolos_1.default.limpiar_3d();
            Tabla_Simbolos_1.default.classCodigo_3D = bk_3d + cd_metodo;
            var resultado = new Simbolo_1.default();
            resultado.classAcceso = 0 /* publico */;
            resultado.classRol = 9 /* aceptado */;
            resultado.classTipo = 5 /* cadena */;
            resultado.classIdentificador = "10-4";
            resultado.classValor = "Metodo realizado correctamente";
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
            resultado.classValor = "Metodo No realizado correctamente: " + Error.Message;
            return resultado;
        }
    };
    Metodo.prototype.build_declaracion_etiquetas = function () {
        var dec_etiquetas = "var ";
        var begin_etiquetas = 100;
        var end_etiquetas = Tabla_Simbolos_1.default.classTemporal;
        dec_etiquetas = dec_etiquetas + "t" + begin_etiquetas;
        for (var i = (begin_etiquetas + 1); i < end_etiquetas; i++) {
            dec_etiquetas = dec_etiquetas + ",t" + i;
        }
        var dec_etiquetas_final = dec_etiquetas + ";\n";
        return dec_etiquetas_final;
    };
    Object.defineProperty(Metodo.prototype, "classTipo", {
        get: function () {
            return this.tipo_metodo;
        },
        set: function (p_tipo) {
            this.tipo_metodo = p_tipo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Metodo.prototype, "classIdentificador", {
        get: function () {
            return this.identificador;
        },
        set: function (p_identificador) {
            this.identificador = p_identificador;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Metodo.prototype, "classLista_parametros", {
        get: function () {
            return this.lista_parametros;
        },
        set: function (p_lista_parametros) {
            this.lista_parametros = p_lista_parametros;
        },
        enumerable: true,
        configurable: true
    });
    return Metodo;
}(Instruccion_1.default));
exports.default = Metodo;
