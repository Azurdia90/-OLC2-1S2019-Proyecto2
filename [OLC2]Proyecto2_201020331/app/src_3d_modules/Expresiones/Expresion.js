"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Simbolo_1 = __importDefault(require("../Estructuras/Simbolo"));
var Expresion = /** @class */ (function () {
    function Expresion(p_operador1, p_tipo, p_operador2) {
        this.operador1 = p_operador1;
        this.tipo = p_tipo;
        this.operador2 = p_operador2;
    }
    Expresion.prototype.ejecutar = function (entorno_local) {
        try {
            return new Simbolo_1.default(-10, -4);
        }
        catch (Error) {
            return new Simbolo_1.default(-33, -12);
        }
    };
    return Expresion;
}());
exports.default = Expresion;
