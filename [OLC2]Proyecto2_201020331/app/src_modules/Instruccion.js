"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Simbolo_1 = __importDefault(require("./Tabla_Simbolos/Simbolo"));
var Instruccion = /** @class */ (function () {
    function Instruccion(pfila, pcolumna) {
        this.fila = pfila;
        this.columna = pcolumna;
        this.codigo_3D = "";
    }
    Instruccion.prototype.ejecutar = function (entorno_local, ptr_entorno) {
        return new Simbolo_1.default();
    };
    return Instruccion;
}());
exports.default = Instruccion;
