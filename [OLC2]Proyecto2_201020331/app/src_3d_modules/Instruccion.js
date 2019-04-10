"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Simbolo_1 = __importDefault(require("./Estructuras/Simbolo"));
var Instruccion = /** @class */ (function () {
    function Instruccion(pfila, pcolumna) {
        this.fila = pfila;
        this.columna = pcolumna;
    }
    Instruccion.prototype.ejecutar = function (entorno_local) {
        return new Simbolo_1.default(0, 0);
    };
    return Instruccion;
}());
exports.default = Instruccion;
