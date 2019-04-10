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
var Expresion_1 = __importDefault(require("./Expresion"));
var Simbolo_1 = __importDefault(require("../Tabla_Simbolos/Simbolo"));
var Multiplicacion = /** @class */ (function (_super) {
    __extends(Multiplicacion, _super);
    function Multiplicacion(p_operador1, p_operador2) {
        var _this = _super.call(this, p_operador1, "*", p_operador2) || this;
        _this.tabla_multiplicacion = [
            /*nulo*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*booleano*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*entero*/ [73 /* error */, 73 /* error */, 12 /* multiplicacion_entero */, 13 /* multiplicacion_decimal */, 14 /* multiplicacion_entero_caracter */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*decimal*/ [73 /* error */, 73 /* error */, 13 /* multiplicacion_decimal */, 13 /* multiplicacion_decimal */, 16 /* multiplicacion_decimal_caracter */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*caracter*/ [73 /* error */, 73 /* error */, 15 /* multiplicacion_caracter_entero */, 17 /* multiplicacion_caracter_decimal */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*cadena*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
            /*error*/ [73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */, 73 /* error */],
        ];
        return _this;
    }
    Multiplicacion.prototype.ejecutar = function () {
        var tipo_multiplicacion;
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
                valor2 = this.operador1.ejecutar();
            }
            else {
                valor2 = this.operador1;
            }
            if (valor1.classRol == 10 /* error */) {
                return valor1;
            }
            if (valor2.classRol == 10 /* error */) {
                return valor2;
            }
            tipo_multiplicacion = this.tabla_multiplicacion[valor1.classTipo][valor2.classTipo];
            resultado = new Simbolo_1.default();
            switch (tipo_multiplicacion) {
                case 12 /* multiplicacion_entero */:
                    //int val1_entero = Integer.parseInt(valor1.getValor().toString());
                    //int val2_entero = Integer.parseInt(valor2.getValor().toString());
                    //int resultado_final_entero = val1_entero * val2_entero;
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 2 /* entero */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = valor1.classValor + " * " + valor2.classValor + "\n";
                    return resultado;
                case 13 /* multiplicacion_decimal */:
                    //double val1_double = Double.parseDouble(valor1.getValor().toString());
                    //double val2_double = Double.parseDouble(valor2.getValor().toString());
                    //double resultado_final_double = val1_double * val2_double;
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 3 /* decimal */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = valor1.classValor + " * " + valor2.classValor + "\n";
                    return resultado;
                case 14 /* multiplicacion_entero_caracter */:
                    //val1_entero = Integer.parseInt(valor1.getValor().toString()); 
                    //val2_entero = (int) valor2.getValor().toString().charAt(0); 
                    //resultado_final_entero = val1_entero * val2_entero;
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 2 /* entero */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = valor1.classValor + " * " + valor2.classValor + "\n";
                    return resultado;
                case 15 /* multiplicacion_caracter_entero */:
                    //val1_entero = (int) valor1.getValor().toString().charAt(0);
                    //val2_entero = Integer.parseInt(valor2.getValor().toString());
                    //resultado_final_entero = val1_entero * val2_entero;
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 2 /* entero */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = valor1.classValor + " * " + valor2.classValor + "\n";
                    return resultado;
                case 16 /* multiplicacion_decimal_caracter */:
                    //val1_double = Double.parseDouble(valor1.getValor().toString());
                    //val2_double = (int) valor2.getValor().toString().charAt(0);
                    //resultado_final_double = val1_double * val2_double;
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 3 /* decimal */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = valor1.classValor + " * " + valor2.classValor + "\n";
                    return resultado;
                case 17 /* multiplicacion_caracter_decimal */:
                    //val1_double = (int) valor1.getValor().toString().charAt(0);
                    //val2_double = Double.parseDouble(valor2.getValor().toString());
                    //resultado_final_double = val1_double * val2_double;
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 9 /* aceptado */;
                    resultado.classTipo = 3 /* decimal */;
                    resultado.classIdentificador = "10-4";
                    resultado.classValor = valor1.classValor + " * " + valor2.classValor + "\n";
                    return resultado;
                case 73 /* error */:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 6 /* error */;
                    resultado.classIdentificador = this.fila + "-" + this.columna;
                    resultado.classValor("No es posible multiplicacion un valor del tipo " + valor1.classTipo + " con un valor tipo " + valor2.classTipo + ".");
                    return resultado;
                default:
                    resultado.classAcceso = 0 /* publico */;
                    resultado.classRol = 10 /* error */;
                    resultado.classTipo = 6 /* error */;
                    resultado.classIdentificador = this.fila + "-" + this.columna;
                    resultado.classValor("No es posible realizar la multiplicacion, verifique los valores.");
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
    return Multiplicacion;
}(Expresion_1.default));
exports.default = Multiplicacion;
