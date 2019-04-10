"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Stack_1 = __importDefault(require("./Stack"));
var Heap_1 = __importDefault(require("./Heap"));
var Simbolo_1 = __importDefault(require("./Simbolo"));
var Tabla_Simbolos = /** @class */ (function () {
    function Tabla_Simbolos() {
        this.mi_stack = new Stack_1.default();
        this.mi_heap = new Heap_1.default();
        this.lista_entorno = new Array();
        this.entorno_global = new Map();
        this.lista_entorno[0] = this.entorno_global;
        this.tam_entorno = 1;
        this.consola = "";
    }
    Object.defineProperty(Tabla_Simbolos.prototype, "classTabla_Simbolos", {
        get: function () {
            return this.lista_entorno;
        },
        set: function (p_tabla_temporales) {
            this.lista_entorno = p_tabla_temporales;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tabla_Simbolos.prototype, "classStack", {
        get: function () {
            return this.mi_stack;
        },
        set: function (p_stack) {
            this.mi_stack = p_stack;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tabla_Simbolos.prototype, "classHeap", {
        get: function () {
            return this.mi_heap;
        },
        set: function (p_heap) {
            this.mi_heap = p_heap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tabla_Simbolos.prototype, "classConsola", {
        get: function () {
            return this.consola;
        },
        set: function (p_consola) {
            this.consola = this.consola + p_consola;
        },
        enumerable: true,
        configurable: true
    });
    Tabla_Simbolos.prototype.crear_entorno = function (entorno_local) {
        this.tam_entorno++;
        this.lista_entorno[this.tam_entorno] = entorno_local;
    };
    Tabla_Simbolos.prototype.eliminar_entorno = function () {
        this.lista_entorno[this.tam_entorno] = new Map();
        this.tam_entorno--;
    };
    Tabla_Simbolos.prototype.obtener_simbolo = function (p_id) {
        for (var i = (this.tam_entorno - 1); i > -1; i--) {
            var entorno_aux = this.lista_entorno[i];
            if (entorno_aux.has(p_id)) {
                return entorno_aux.get(p_id);
            }
        }
        return new Simbolo_1.default(-33, -12);
    };
    Tabla_Simbolos.prototype.existe_simbolo = function (p_id) {
        for (var i = (this.tam_entorno - 1); i > -1; i--) {
            var entorno_aux = this.lista_entorno[i];
            if (entorno_aux.has(p_id)) {
                return true;
            }
        }
        return false;
    };
    Tabla_Simbolos.prototype.limpiar = function () {
        this.mi_stack = new Stack_1.default();
        this.mi_heap = new Heap_1.default();
        this.lista_entorno = new Array(1024);
        this.entorno_global = new Map();
        this.lista_entorno[0] = this.entorno_global;
        this.tam_entorno = 1;
        this.consola = "";
    };
    return Tabla_Simbolos;
}());
var tabla_simbolos = new Tabla_Simbolos();
exports.default = tabla_simbolos;
