"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Pila_Entornos_1 = __importDefault(require("./Pila_Entornos"));
var Simbolo_1 = __importDefault(require("./Simbolo"));
var Tabla_Simbolos = /** @class */ (function () {
    function Tabla_Simbolos() {
        this._entorno = new Pila_Entornos_1.default();
        this._lista_metodos = new Array();
        this._codigo_3D = "";
        this._temporal_global = 1;
        this._temporal = 1;
        this._etiqueta = 1;
    }
    Tabla_Simbolos.prototype.limpiar = function () {
        this._entorno = new Pila_Entornos_1.default();
        this._lista_metodos = new Array();
        this._codigo_3D = "";
        this._temporal_global = 1;
        this._temporal = 1;
        this._etiqueta = 1;
    };
    Object.defineProperty(Tabla_Simbolos.prototype, "classEntornos", {
        get: function () {
            return this._entorno;
        },
        set: function (p_pila_entornos) {
            this._entorno = p_pila_entornos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tabla_Simbolos.prototype, "classCodigo_3D", {
        get: function () {
            return this._codigo_3D;
        },
        set: function (p_codigo) {
            this._codigo_3D = this._codigo_3D + p_codigo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tabla_Simbolos.prototype, "classTemporal_global", {
        get: function () {
            var t = this._temporal_global;
            this._temporal_global++;
            return t;
        },
        set: function (p_temporal_global) {
            this._temporal_global = p_temporal_global;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tabla_Simbolos.prototype, "classTemporal", {
        get: function () {
            var t = this._temporal;
            this._temporal++;
            return t;
        },
        set: function (p_temporal) {
            this._temporal = p_temporal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tabla_Simbolos.prototype, "classEtiqueta", {
        get: function () {
            var e = this._etiqueta;
            this._etiqueta++;
            return e;
        },
        set: function (p_etiqueta) {
            this._etiqueta = p_etiqueta;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tabla_Simbolos.prototype, "classLista_parametros", {
        /******* AREA TEMPORAL BORRAR DESPUES *******/
        get: function () {
            return this._lista_metodos;
        },
        set: function (p_lista_parametros) {
            this._lista_metodos = p_lista_parametros;
        },
        enumerable: true,
        configurable: true
    });
    /******* FIN AREA TEMPORAL BORRAR DESPUES *******/
    Tabla_Simbolos.prototype.obtener_simbolo = function (p_id) {
        for (var i = (this._entorno.classTamaño - 1); i > -1; i--) {
            var entorno_aux = this._entorno.obtener(i);
            if (entorno_aux != undefined) {
                if (entorno_aux.has(p_id)) {
                    return entorno_aux.get(p_id);
                }
            }
            else {
                tabla_simbolos.limpiar_3d();
                var resultado = new Simbolo_1.default();
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 5 /* cadena */;
                resultado.classIdentificador = "33-12";
                resultado.classValor = "Existio un error con la tabla de simbolos: El entorno no fue encontrado.";
                return resultado;
            }
        }
        tabla_simbolos.limpiar_3d();
        var resultado = new Simbolo_1.default();
        resultado.classAcceso = 0 /* publico */;
        resultado.classRol = 10 /* error */;
        resultado.classTipo = 5 /* cadena */;
        resultado.classIdentificador = "33-12";
        resultado.classValor = "La variable \"" + p_id + "\" no existe.";
        return resultado;
    };
    Tabla_Simbolos.prototype.existe_simbolo = function (p_id) {
        for (var i = (this._entorno.classTamaño - 1); i > -1; i--) {
            var entorno_aux = this._entorno.obtener(i);
            if (entorno_aux != undefined) {
                if (entorno_aux.has(p_id)) {
                    return true;
                }
            }
            else {
                return false;
            }
        }
        return false;
    };
    Tabla_Simbolos.prototype.limpiar_temporal = function () {
        this._temporal = 100;
    };
    Tabla_Simbolos.prototype.limpiar_etiqueta = function () {
        this._etiqueta = 100;
    };
    Tabla_Simbolos.prototype.limpiar_3d = function () {
        this._codigo_3D = "";
    };
    return Tabla_Simbolos;
}());
var tabla_simbolos = new Tabla_Simbolos;
exports.default = tabla_simbolos;
