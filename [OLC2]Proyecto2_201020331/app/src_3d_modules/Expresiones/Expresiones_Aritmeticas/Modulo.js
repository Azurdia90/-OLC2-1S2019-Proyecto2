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
var Expresion_1 = __importDefault(require("../Expresion"));
var Simbolo_1 = __importDefault(require("../../Estructuras/Simbolo"));
var Modulo = /** @class */ (function (_super) {
    __extends(Modulo, _super);
    function Modulo(p_operador1, p_operador2) {
        return _super.call(this, p_operador1, "%", p_operador2) || this;
    }
    Modulo.prototype.ejecutar = function (entorno_local) {
        var resultado;
        try {
            var valor1 = this.operador1.ejecutar(entorno_local);
            var valor2 = this.operador2.ejecutar(entorno_local);
            if (valor1 == undefined) {
                return new Simbolo_1.default(-33, -12);
            }
            if (valor2 == undefined) {
                return new Simbolo_1.default(-33, -12);
            }
            var res_mod;
            var new_tam;
            res_mod = valor1.classValor % valor2.classValor;
            new_tam = valor1.classTam + valor2.classTam;
            resultado = new Simbolo_1.default(res_mod, new_tam);
            return resultado;
        }
        catch (Error) {
            //resultado.classValor =  "Error: " + Error.message;  
            resultado = new Simbolo_1.default(-33, -12);
            return resultado;
        }
    };
    return Modulo;
}(Expresion_1.default));
exports.default = Modulo;
