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
var Simbolo_1 = __importDefault(require("../../Tabla_Simbolos/Simbolo"));
var Or = /** @class */ (function (_super) {
    __extends(Or, _super);
    function Or(p_operador1, p_operador2) {
        return _super.call(this, p_operador1, "||", p_operador2) || this;
    }
    Or.prototype.ejecutar = function () {
        var valor1;
        var valor2;
        var resultado;
        try {
            if (this.operador1 instanceof Expresion_1.default) {
                valor1 = this.operador1.ejecutar();
            }
            else {
                valor1 = this.operador1;
            }
            if (this.operador2 instanceof Expresion_1.default) {
                valor2 = this.operador2.ejecutar();
            }
            else {
                valor2 = this.operador2;
            }
            if (valor1.classRol == 10 /* error */) {
                return valor1;
            }
            if (valor2.classRol == 10 /* error */) {
                return valor2;
            }
            resultado = new Simbolo_1.default();
            if (valor1.classTipo == 1 /* booleano */ && valor2.classTipo == 1 /* booleano */) {
                //boolean val1_boolean = valor1.getValor().toString().equals("verdadero") ? true : false;
                //boolean val2_boolean = valor2.getValor().toString().equals("verdadero") ? true : false;
                //boolean resultado = val1_boolean && val2_boolean;
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 9 /* aceptado */;
                resultado.classTipo = 1 /* booleano */;
                resultado.classIdentificador = "10-4";
                resultado.classValor = valor1.classValor + "|| " + valor2.classValor;
                return resultado;
            }
            else {
                resultado.classAcceso = 0 /* publico */;
                resultado.classRol = 10 /* error */;
                resultado.classTipo = 6 /* error */;
                resultado.classIdentificador = this.fila + "-" + this.columna;
                resultado.classValor = "No es posible realizar Or con valores no booleanos.";
                return resultado;
            }
        }
        catch (Error) {
            resultado = new Simbolo_1.default();
            resultado.classRol = 10 /* error */;
            resultado.classTipo = 6 /* error */;
            resultado.classIdentificador = this.fila + "-" + this.columna;
            resultado.classValor = "Error: " + Error.message;
            return resultado;
        }
    };
    return Or;
}(Expresion_1.default));
exports.default = Or;
